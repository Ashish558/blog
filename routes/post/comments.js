
var express = require('express')

var verify = require('../verifyToken')
var router = express.Router()
var Post = require('../../models/post')
var mongoose = require('mongoose');

router.get('/:id/comments', verify, async (req, res) => {

    const postId = req.params.id
    // await Post.findById(postId)
    //     .then((post) => res.status(200).json(post.comments))
    //     .catch(err => res.status(401).json("Error :" + err))

    try {
        Post.findById(postId)
            .select('comments')
            .populate('comments.commentedBy', 'name image _id')
            .exec((err, data) => {
                if (err) return res.json(err)
                return res.status(200).json(data)
            })

    }
    catch (err) {
        res.send(err)
    }

})


router.post('/:id/comment/add', verify, async (req, res) => {

    const postId = req.params.id
    const { comment } = req.body
    /*
        await Post.findById(postId)
            .then((post) => {
                post.commentedBy.push({
                    commentedBy: req.user._id,
                    body: comment
                })
    
                post.save()
                    .then(() => res.status(200).json("commented"))
                    .catch(err => res.status(401).json("Error :" + err))
            })
            .catch(err => res.status(401).json("Server error" + err))
    
    */
    const commentObj = { commentedBy: req.user._id, body: comment }
    Post.findOneAndUpdate(
        { _id: postId },
        {
            $push: {
                comments: commentObj
            }
        },
        { new: true },
        function (err, data) {
            if (err) {
                console.log(err)
                return res.status(400).json(err);
            }
            let len = data.comments.length
            return res.status(200).json('comment added');
        }
    )

})

module.exports = router