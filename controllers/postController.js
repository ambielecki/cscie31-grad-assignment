let Post   = require('../models/postModel');
let multer = require('multer');
let moment = require('moment-timezone');

const multer_storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/images/posts')
    },
    filename : function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    },
});

const imageFilter = function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(null, true);
    } else {
        cb(new Error('OnlyImageFilesAllowed'), false);
    }
};

module.exports.storage = multer_storage;
module.exports.imageFilter = imageFilter;

module.exports.getList = async function (req, res, next) {
    try {
        let posts = await Post.find({}).sort({createdAt : -1});
        posts.forEach((post) => {
            post.date = new moment(post.createdAt).format('MMMM Do, YYYY');
            let paragraphs = post.content.match(/(<p>.*?<\/p>)/g);
            if (paragraphs.length > 1) {
                post.content = paragraphs[0];
                post.read_more = true;
            }
        });

        res.render('posts/list.nunjuck.html', {
            posts : posts,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.getView = async function (req, res, next) {
    try {
        let post = await Post.findOne({_id : req.params.id});
        post.date = new moment(post.createdAt).format('MMMM Do, YYYY');
        res.render('posts/view.nunjuck.html', {
            post : post,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.getCreate = function (req, res, next) {
    res.render('posts/create.nunjuck.html');
};

module.exports.postCreate = async function (req, res, next) {
    let post = new Post({
        title      : req.body.title,
        content    : req.body.content,
        lead_image : typeof(req.file) !== 'undefined' ? req.file.filename : null,
    });

    try {
        await post.save();
        req.flash('success', 'New post created successfully');
        res.redirect('/');
    } catch (err) {
        for (let error_name in err.errors) {
            req.flash('error', err.errors[error_name].message)
        }
        req.flash('old', req.body);
        res.redirect('back');
    }
};

module.exports.getEdit = async function (req, res, next) {
    try {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit.nunjuck.html', {
            post : post,
        });
    } catch (err) {
        console.log(err);
        req.flash('error', 'Post not found.');
        res.redirect('/posts');
    }
};

module.exports.postEdit = async function (req, res, next) {
    try {
        let post     = await Post.findById(req.params.id);
        post.title   = req.body.title;
        post.content = req.body.content;

        if (typeof(req.file) !== 'undefined') {
            if (post.lead_image) {
                try {
                    fs.unlinkSync(`./public/images/posts/${post.lead_image}`);
                } catch (err) {
                    console.log('cannot delete image');
                }
            }
            post.lead_image = req.file.filename;
        }

        await post.save();
        req.flash('success', 'Post Edited Successfully');
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
        for (let error_name in err.errors) {
            req.flash('error', err.errors[error_name].message)
        }
        req.flash('old', req.body);
        res.redirect('back');
    }
};

module.exports.postDelete = async function (req, res, next) {
    try {
        await Post.remove({_id: req.params.id});
        req.flash('success', 'Post removed successfully');
        res.redirect('/posts');
    } catch (err) {
        req.flash('error', 'There was a problem handling your request.');
        res.redirect('back');
    }
};