module.exports.getUserTest = async function (req, res, next) {
    res.render('tests/user.nunjuck.html');
};

module.exports.getAdminTest = async function (req, res, next) {
    res.render('tests/admin.nunjuck.html');
};