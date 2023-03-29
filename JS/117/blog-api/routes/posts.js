const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const sessionOnlyMiddleware = require('../sessionOnlyMiddleware.js');

module.exports = function (socketIo) {
  router.route('/')
    .get(async (req, res, next) => {
      console.log('in post')
      const thePosts = await global.posts.find().toArray();
      res.send(thePosts);
    })
    .post(sessionOnlyMiddleware, async (req, res, next) => {
      console.log('in post POST')

      req.body.author = req.session.username;
      req.body.date = new Date();
      const result = await global.posts.insertOne(req.body);
      console.log(result);

      if (!result.insertedId) {
        return next(new Error('oops, couldnt insert post'));
      }

      req.body.id = result.insertedId;

      socketIo.emit('post', req.body);

      res.status(201)
        .send(req.body);
    });

  router.route('/:id')
    // .get(async (req, res, next) => {
    //   const theComments = await global.posts.find({_id : Mongo.ObjectId(req.params.id)},{ $eq: {} }).toArray();
    //     res.send(theComments); Mongo.ObjectId
    //})
    .post(sessionOnlyMiddleware, async (req, res, next) => {
      console.log(req.params);
      req.body.author = req.session.username;
      req.body.date = new Date();
      const result = await global.posts.updateOne({ _id: (new ObjectId(req.params.id)) },
        { $push: { comments: req.body } });

      console.log(result);
      console.log('end comment');

      if (result.modifiedCount === 0) {
        res.status(404)
        return next(new Error(`oops, couldnt insert a comment to post ${req.params.id}`));

      }

      req.body.id = result.insertedId;

      socketIo.emit('comment', { id: req.params.id, body: req.body });

      res.status(201)
        .send(req.body);
    });



  return router;
};