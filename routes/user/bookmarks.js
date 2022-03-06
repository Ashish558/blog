
var express = require('express')

var verify = require('../verifyToken')
var router = express.Router()
var User = require('../../models/users')
var Post = require('../../models/post')
var mongoose = require('mongoose');

router.get('/', verify, async (req, res) => {

    await User.findById(req.user._id)
        .then(user => res.status(200).json(user.bookmarks))
        .catch(err => res.status(401).json("Error :" + err))
})



router.put('/add', verify, async (req, res) => {
    const { postId } = req.body
    if (!postId) return res.status(400).json('bad request')

    var conditions = {
        _id: req.user._id,
        bookmarks: { $ne: postId }
    }
    try {
        User.findOneAndUpdate(

            conditions,
            {
                $push:
                    { bookmarks: postId }
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs.bookmarks)
            })
    } catch (err) {
        console.log(err)
    }


    // await User.findById(req.user._id)
    //     .then(user => {
    //         if (CheckItemInArray(user.bookmarks, postId)) return res.status(406).json("already bookmarked")

    //         user.bookmarks.push(postId)

    //         user.save()
    //             .then(() => res.status(200).json("Added in favourites"))
    //             .catch(err => res.status(401).json("Error :" + err))
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         res.status(403).json("Server error" + err)
    //     })
})

router.put('/remove', verify, async (req, res) => {
    const { postId } = req.body
    
    if (!postId) return res.status(400).json('bad request')

    try {
        User.findOneAndUpdate(
            { _id: req.user._id, },
            {
                $pull:  { bookmarks: postId }
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs.bookmarks)
            })
    } catch (err) {
        console.log(err)
    }
})
/*
router.put('/remove/favourites', verify, async (req, res) => {
const { postId } = req.body

await User.findById(req.user._id)
    .then((user) => {

        user.favouriteRecipes = user.favouriteRecipes.filter(favRecipe => {
            return favRecipe.toString() !== postId
        })

        user.save()
            .then(() => res.status(200).json("Removed from favourites"))
            .catch(err => res.status(401).json("Error :" + err))
    })
    .catch(err => res.status(401).json("Server error" + err))

// try {
//     await User.findByIdAndUpdate(req.user._id,
//         { "$pull": { "favouriteRecipes": postId } },
//         { "new": true, "upsert": true },
//         function (err, result) {
//             if (err) console.log(err)
//             return res.status(200).json("Removed")
//         }
//     )
// } catch (err) {
//    return res.status(400).json("Error :" + err)
// }
})



router.get('/favourites/posts', verify, async (req, res) => {

try {
    User.findOne({ id: req.user._id })
        .populate({
            path: 'favouriteRecipes',
            populate: {
                path: 'postedBy',
                model: 'users',
                select: 'username profileImageSrc _id'
            }
        })
        .exec((err, posts) => {
            if (err) return res.json(err)
            res.json(posts)
        })
} catch (err) {
    console.log(err)
}
})


router.get('/favourites/posts/test', verify, async (req, res) => {

console.log(req.user._id)
// try {
//     await User.aggregate([
//         {
//             match: {
//                 _id: req.user._id
//             }
//         },
//         {
//             $project: {
//                 favouriteRecipes: 1, _id: 1
//             }
//         },
//         {
//             $lookup:
//             {
//                 from: "posts",
//                 let: { fav_recipes: "$favouriteRecipes" },
//                 pipeline: [
//                     {
//                         $match: {
//                             $expr: {
//                                 $and:
//                                     [
//                                         { $eq: ["$$fav_recipes", "$_id"] }
//                                     ]
//                             }
//                         }
//                     },
//                     {
//                         $project: {
//                             postedBy: 1, title: 1, type: 1, images: 1, createdAt: 1, _id: 1,
//                             likes: { $size: '$likes' }
//                         }
//                     }
//                 ],
//                 as: "fav_recipes"
//             }
//         }
//     ]).exec(function (e, d) {
//         res.status(200).json(d)
//     })
// } catch (err) {
//     console.log(err)
// }

try {
    // User.findOne({ id: req.user._id })
    //     .select('favouriteRecipes')
    //     .populate('favouriteRecipes', '_id postedBy title type images steps ingredients comments likes createdAt')
    //     .exec((err, data) => {
    //         if (err) return err
    //         return res.json(data)
    //     })

    User.findOne({ id: req.user._id })
        .populate({
            path: 'favouriteRecipes',
            populate: {
                path: 'postedBy',
                model: 'users',
                select: 'username profileImageSrc _id'
            }
        })
        .exec((err, posts) => {
            if (err) return res.json(err)
            res.json(posts)
        })
} catch (err) {
    console.log(err)
}

// try{
//     Post.findOne({ _id: postId })
//         .select("_id postedBy title type images steps ingredients comments likes createdAt")
//         .populate("postedBy", "username profileImageSrc _id")
//         .sort({ createdAt: -1 })
//         .exec((err, posts) => {
//             if (err) return res.json(err)
//             res.json(posts)
//         })
// }
// catch(err){
    console.log(err)
// }

})
*/
module.exports = router