module.exports = function sessionOnlyMiddleware(req, res, next) {
    console.log('in session middleware')
    if (req.session.username) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}