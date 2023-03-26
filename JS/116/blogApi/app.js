const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false
}));


constMongoClient = require('mongodb').MongoClient;
//const uri = 'mongodb://127.0.0.1.27017';
const uri = 'mongodb+srv://RYarmark:8MlPTtftOKVeX9aT@cluster0.aqbs637.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);


app.use(require('cors')(({
    origin: 'http://localhost:3000',
    credentials: true
})));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});



let users
app.use('/login', async (req, res, next) => {
    await client.connect();

    users = await client.db('blog').collection('users');
    req.session.user = { userName: req.body.userName, password: req.body.password };

    const result = await users.find({ userName: { $eq: req.body.userName } }).project({ userName: 1, password: 1 });
    let registered = false

    while (await result.hasNext()) {
        if (await result.next().password === req.body.password);
        registered = true;
        req.session.user = { userName: req.body.userName, password: req.body.password };
        return
    }
    if (!result.length) {
        res.status(401);
        return
    }


})
app.use('/register', async (req, res, next) => {
    console.log('in register')

    await client.connect();
    users = await client.db('blog').collection('users');

    const result = await users.insertOne(req.body);
    if (!result.insertedId) {
        return next('oops, couldnt insert post');
    }
    req.session.user = { userName: req.body.userName, password: req.body.password };
    req.body.id = result.insertedId;
    res.status(201)
        .send(req.body);
});


let posts;
app.use(async (req, res, next) => {
    await client.connect();
    posts = await client.db('blog').collection('posts');
    next();
});

app.route('/posts')
    .get(async (req, res, next) => {
        const thePosts = await posts.find().toArray();
        res.send(thePosts);
    })

function authentication(req, res, next) {
    if (req.session.user) {
        res.status(201)
        next();
    } else {

        res.status(401)
        res.redirect('/');
    }
};
app.use('/posts', authentication, async (req, res, next) => {
    const name = req.session.user.userName;
    req.body.author = name
    req.body.date = new Date();
    const result = await posts.insertOne(req.body);
    console.log(result);
    if (!result.insertedId) {
        return next('oops, couldnt insert post');
    }

    req.body.id = result.insertedId;
    res.status(201)
        .send(req.body);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('No such endpoint');
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.statusCode || 500)
        .send(err.message);
});

app.listen(8080);