
var express = require('express')

var verify = require('../verifyToken')
var router = express.Router()
var Post = require('../../models/post')
var mongoose = require('mongoose');

/*
 hasBookmarked: {
            $cond: {
               if: { $in: [ $$post_id, "$bookmarks" ] },
               then: true,
               else: false
            }
         }
*/

router.get('/:id/likes', verify, async (req, res) => {

    const postId = req.params.id
    await Post.findById(postId)
        .then((post) => res.status(200).json(post.likes))
        .catch(err => res.status(401).json("Error :" + err))
})


router.put('/:id/add/like', verify, async (req, res) => {

    const postId = req.params.id
    if (!postId) return res.status(400).json('bad request')

    const userId = req.user._id

    var conditions = {
        _id: postId,
        likes: { $ne: userId }
    }
    try {
        Post.findOneAndUpdate(
            conditions,
            {
                $push:
                    { likes: userId }
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs.likes.length)
            })
    } catch (err) {
        console.log(err)
    }

})


router.put('/:id/remove/like', verify, async (req, res) => {

    const postId = req.params.id
    if (!postId) return res.status(400).json('bad request')

    const userId = req.user._id

    var conditions = {
        _id: postId
    }

    try {
        Post.findOneAndUpdate(
            conditions,
            {
                $pull:
                    { likes: userId }
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json(err)
                return res.status(200).json(docs.likes.length)
            })
    } catch (err) {
        console.log(err)
    }

})

module.exports = router