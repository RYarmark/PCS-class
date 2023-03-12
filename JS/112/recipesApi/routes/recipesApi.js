var express = require('express');
var router = express.Router();
const pool = require('../pool');
const debug = require('debug')('recipesapi:recipesApiRouter');

router.route('/')
    .get(function (req, res, next) {
        debug('getting all recipes');
        pool.query(
            'SELECT recipe_name, category FROM recipes',
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Unable to load recipes. Please try again later.');
                }
                res.send(results);
            });
    })
    .post(function (req, res, next) {
        pool.query(

            'INSERT INTO recipes(recipe_name, recipe_desc, instructions, category) VALUES (?,?,?,?)',
            [req.body.recipe_name, req.body.recipe_desc, req.body.instructions, req.body.category],
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Unable to add recipe')
                }
                req.body.id = results.insertId;
                res.status(201)
                    .location(`/${req.body.id}`)
                    .end(req.body);
            }
        )
    })

router.route('/:id')
    .get(function (req, res, next) {
        debug(`getting recipe ${req.params.id}`);
        pool.query(
            'SELECT * FROM recipes WHERE id = ?', [req.params.id],
            (err, results, fields) => {
                if (err) {
                    console.log('in err')
                    res.statusCode = 500;
                    return res.end(`Unable to load contact ${req.params.id}`);
                }
                console.log('no err')
                res.send(results);
            });
    })
    .delete(function (req, res, next) {
        debug(`deleting recipe ${req.params.id}`);
        pool.query(
            'DELETE * FROM recipes WHERE id = ?', [req.params.id],
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500
                }
                if (!results.affectedRows) {
                    res.statusCode = 404;
                    return res.end(`Unable to delete recipe. Recipe ${req.params.id} does not exist.`)
                }
                res.sendStatus(204);
            }

        )
    })
    .put(function (req, res, next) {
        debug(`updating recipe ${req.params.id}`);
        pool.query(
            'UPDATE recipes SET recipe_name = ?, recipe_desc = ?, instructions = ?, category = ?',
            [req.body.recipe_name, req.body.recipe_desc, req.body.instructions, req.body.category],
            (err, results, fields) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end(`Unable to update recipe ${req.params.is}`);
                }
                if (!results.affectedRows) {
                    console.log(err);
                    res.statusCode = 404;
                    return res.end('no changes were made');
                }
                res.sendStatus(204);
            });
    })



module.exports = router;