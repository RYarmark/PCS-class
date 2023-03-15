

module.exports = (req, res, next) => {

    let numOfVisits = req.session.visits || 0;
    numOfVisits++;
    req.session.visits = numOfVisits;
    req.session.name = req.query.name || req.session.name || '';
    next();
}

