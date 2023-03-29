const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.route('/register')
    .post((req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return next(new Error('username and password are required'));
        }

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return next(err);
            }
            async function insert() {
                try {
                    const result = await global.users.insertOne({ username: req.body.username, password: req.body.password });
                    console.log(result);
                }
                catch (err) {
                    if (err.code === 11000) {
                        return next(rewError('that username is taken. Please try another.'));
                    }
                    return next(new Error('registration failed'));
                }

                res.sendStatus(201);
            }

        });

    });

router.post('/login', async (req, res, next) => {
    const result = await global.user.findOne({ username: req.body.username });
    if (result) {
        const result2 = await bcrypt.compare(req.body.password, reuslt.password);
        if (result2) {
            req.session.username = req.body.username;
            return res.sendStatus(200);
        }
    }
    const err = new Error('invalid username or password');
    err.statusCode = 401;
    return next(err);
});

router.post('/logout', (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
})

module.exports = router;