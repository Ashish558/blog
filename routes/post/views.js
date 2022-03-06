
var express = require('express')

var verify = require('../verifyToken')
var router = express.Router()
var Post = require('../../models/post')
var mongoose = require('mongoose');

function getDate() {
    var now = new Date()
    var nowStr = now.toDateString();
    var date = nowStr.split(' ')
    const year = date[3]
    const month = date[1]
    return { year, month }
}

function getIndex(items, year, month) {
    for (const [index, item] of items.entries()) {
        if (item.year === year && item.month === month) {
            return index;
        }
    }
    return -1
}

router.put('/:id/view', verify, async (req, res) => {

    const postId = req.params.id
    if (!postId) return res.status(400).json('bad request')

    const userId = req.user._id

    var conditions = {
        _id: postId,
        views: { $ne: userId }
    }

    const { year, month } = getDate()

    try {
        Post.findOne(conditions, (err, post) => {
            if (post === null) return res.status(202).json("already viewed")
            if (err) return res.status(202).json("already viewed")

            post.views.push(userId)

            let idx = getIndex(post.viewsHistory, year, month)

            if (idx !== -1) {
                let prevView = post.viewsHistory[idx].views
                post.viewsHistory[idx] = { year, month, views: prevView + 1 }
            } else {
                // views = 1 if month doesnot exist in history
                post.viewsHistory.push({ year, month, views: 1 })
            }

            post.save(() => {
                return res.status(200).json('viewed !!')
            })

        })

        // Post.findOneAndUpdate(
        //     conditions,
        //     {
        //         $push:
        //             { views: userId }
        //     },
        //     { upsert: true, new: true },
        //     (err, docs) => {
        //         if (err) return res.status(202).json("already viewed")
        //         return res.status(200).json(docs.views.length)
        //     })
    } catch (err) {
        console.log(err)
    }

})


module.exports = router