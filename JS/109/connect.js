const app = require('connect')();

app.use((req, res, next) => {
    res.setHeader('content-type', 'text/html');
    next();
});

app.use('/index.html', (req, res, next) => {
    res.end('<h1>Welcome to the home page!</h1>');

})
app.use(require('./authorization.js'));

app.use((req, res, next) => {
    req.searchParams.get('magicWord') == 'please'
        ? next()
        : res.end('<h2>You have no permision to view this page.</h2>')
})
app.use('/about.html', (req, res) => {
    res.end('<h2>This is the about page.</h2>')
})
app.use('/contactUs.html', (req, res) => {
    res.end('<h2>This is the contact us page</h2>')
})


app.listen(80);