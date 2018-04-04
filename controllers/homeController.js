let Post   = require('../models/postModel');
let Event  = require('../models/eventModel');
let moment = require('moment-timezone');

module.exports.getHome = async function (req, res, next) {
    let today = moment().tz('America/New_York').format('YYYY-MM-DD');
    try {
        [events, post, previous_posts] = await Promise.all([
            Event.find({date : { $gte : today }}).sort({date : 1, time : 1}).limit(3),
            Post.findOne().sort({createdAt : -1}),
            Post.find().sort({createdAt : -1}).limit(3).skip(1),
        ]);
    } catch (err) {
        console.log(err);
    }

    post.date = new moment(post.createdAt).format('MMMM do, YYYY');

    previous_posts.forEach((post) => {
        post.date = new moment(post.createdAt).format('MMMM do, YYYY');
        let paragraphs = post.content.match(/(<p>.*?<\/p>)/g);
        if (paragraphs.length > 1) {
            post.content   = paragraphs[0];
            post.read_more = true;
        }
    });

    res.render('root/index.nunjuck.html', {
        lead_post      : null,
        events         : events,
        post           : post,
        previous_posts : previous_posts,
    });
};