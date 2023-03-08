var express = require('express');
var router = express.Router();
const pool = require('../pool.js');
const debug = require('debug')('contactsapi:contactsApiRouter');

router.route('/:id')
    .get(function (req, res, next) {
        debug('getting all contacts');
        pool.query(
            'SELECT * FROM contacts WHERE id = ?', [req.params.id],
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Unable to load contacts');
                }
                res.send(results);
            });
    })
router.route('/')
    .get(function (req, res, next) {
        debug('getting all contacts');
        pool.query(
            'SELECT * FROM contacts',
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Unable to load contacts');
                }
                res.send(results);
            });
    })
    .post(function (req, res, next) {
        pool.query(
            'INSERT INTO contacts(first, last, email, phone) VALUES (?,?,?,?)', [req.body.first, req.body.last, req.body.email, req.body.phone],
            (err, results, fields) => {
                console.log(results);

                if (err) {
                    res.statusCode = 500;
                    return res.end('Unable to add contact');
                }
                req.body.id = results.insertId;
                res.status(201)
                    .location(`/${req.body.id}`)
                    .send(req.body);
            });
    });

module.exports = router;