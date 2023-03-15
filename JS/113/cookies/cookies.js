
module.exports = (req, res, next) => {

    let numOfVisits = req.cookies['numOfVisits'] ? JSON.parse(req.cookies['numOfVisits']) : 0;
    numOfVisits++;
    res.cookie('numOfVisits', JSON.stringify(numOfVisits))
    req.visits = numOfVisits;

    let cookiesName = req.cookies['name'] ? JSON.parse(req.cookies['name']) : null;
    req.name = req.query.name || cookiesName || ''
    res.cookie('name', JSON.stringify(req.name));
    next();
}
