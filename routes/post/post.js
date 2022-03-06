
var express = require('express')
var mongoose = require('mongoose')
const multer = require('multer')
var path = require('path')
var schedule = require('node-schedule')

var verify = require('../verifyToken')
var Post = require('../../models/post')
var User = require('../../models/users')

var router = express.Router()


//cloudinary setup
const cloudinary = require('cloudinary')


//multer setup
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).any('postImage')

const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const dataUri = file => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer)
}

// //scheduled task
// var rule = new schedule.RecurrenceRule();
// rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// rule.hour = 14
// rule.minute = 15
// rule.second = 0

// let getViewObj = (viewsCount) => {

//     var now = new Date();
//     var nowStr = now.toDateString();
//     var currentDate = nowStr.split(' ')

//     let tempDate = new Date();
//     tempDate.setMonth(tempDate.getMonth() - 1)
//     const previousMonth = tempDate.toLocaleString('default', { month: 'long' });
//     previousMonth = previousMonth.substring(0, 3)

//     return {
//         year: currentDate[3],
//         month: previousMonth,
//         views: viewsCount
//     }
// }

// var job = schedule.scheduleJob(rule, async () => {
//     try {
//         Post.find({}, (err, data) => {
//             data.forEach(post => {
//                 let viewscount = post.views.length
//                 let viewsObj = getViewObj(viewscount)
//                 // console.log(viewsObj)
//                 post.viewsHistory.push(viewsObj)
//                 post.save((err, doc) => {
//                     console.log('saved')
//                 })
//             })
//         })
//         // Post.find({}, (err, data) => {
//         //     console.log(data[10].viewsHistory)
//         // })
//     } catch (err) {
//         console.log(err)
//     }
// })

const getPostProjection = (userId) => {
    const project = {
        postedBy: 1, title: 1, story: 1, category: 1, image: 1, createdAt: 1, _id: 1,
        likesCount: { $size: '$likes' },
        isLiked: {
            $cond: {
                if: { $in: [userId, "$likes"] },
                then: true,
                else: false
            }
        },
    }
    return project
}

const getPostLookup = () => {
    const lookup = {
        from: "users",
        let: { post_postedBy: "$postedBy", post_id: '$_id' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and:
                            [
                                { $eq: ["$$post_postedBy", "$_id"] }
                            ]
                    }
                }
            },
            {
                $project: {
                    name: 1, image: 1,
                    hasBookmarked: {
                        $cond: {
                            if: { $in: ["$$post_id", "$bookmarks"] },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ],
        as: "posted_by"
    }
    return lookup
}


const getHasBookmarked = (userId) => {
    const lookup2 = {
        from: "users",
        let: { post_id: '$_id' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and:
                            [
                                { $eq: [userId, "$_id"] }
                            ]
                    }
                }
            },
            {
                $project: {
                    hasBookmarked: {
                        $cond: {
                            if: { $in: ["$$post_id", "$bookmarks"] },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ],
        as: "isBookmarked"
    }
    return lookup2
}

//get all posts
router.post('/', verify, async (req, res) => {
    const { postsToSkip } = req.body

    //user who requested for posts
    const userId = mongoose.Types.ObjectId(req.user._id)
    const projection = getPostProjection(userId)
    const lookup = getPostLookup()
    const lookup2 = getHasBookmarked(userId)

    try {
        await Post.aggregate([
            {
                $project: projection
            },
            { $sort: { createdAt: -1 } },
            { $skip: postsToSkip },
            { $limit: 12 },

            {
                $lookup: lookup
            },
            {
                $lookup: lookup2
            },

        ]).exec(function (e, d) {
            const data = d.map(post => {
                let hasBookmarked = post.isBookmarked[0].hasBookmarked
                delete post.isBookmarked
                return { ...post, hasBookmarked: hasBookmarked }
            })
            if (data.length === 0) return res.status(204).json(data)
            return res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
    }
})


//get all posts of a specific user
router.post('/user/:id', verify, async (req, res) => {
    const { postsToSkip } = req.body

    //whose profile is being sent
    const userId = mongoose.Types.ObjectId(req.params.id)

    //one who requested
    const requestedUser = mongoose.Types.ObjectId(req.user._id)

    const projection = getPostProjection(requestedUser)
    const lookup = getPostLookup()
    const lookup2 = getHasBookmarked(userId)

    try {
        await Post.aggregate([
            {
                $match: {
                    postedBy: userId
                }
            },
            {
                $project: projection
            },
            { $sort: { createdAt: -1 } },
            { $skip: postsToSkip },
            { $limit: 12 },

            {
                $lookup: lookup
            },
            {
                $lookup: lookup2
            },

        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            const data = d.map(post => {
                let hasBookmarked = post.isBookmarked[0].hasBookmarked
                delete post.isBookmarked
                return { ...post, hasBookmarked: hasBookmarked }
            })
            if (data.length === 0) return res.status(204).json(data)
            return res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
    }
})

/*
hasBookmarked: { $eq : [ "$bookmarks", "$post_id" ] }
hasBookmarked: {
    $cond: {
       if: { $in: [ $$post_id, "$bookmarks" ] },
       then: true,
       else: false
    }
 }

*/


//get single post
router.get('/:id', verify, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const userId = mongoose.Types.ObjectId(req.user._id)
    const projection = getPostProjection(userId)
    const lookup = getPostLookup()
    const lookup2 = getHasBookmarked(userId)


    try {
        await Post.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $project: projection
            },
            { $limit: 1 },
            {
                $lookup: lookup
            },
            {
                $lookup: lookup2
            },
        ]).exec(function (e, d) {
            const data = d.map(post => {
                let hasBookmarked = post.isBookmarked[0].hasBookmarked
                delete post.isBookmarked
                return { ...post, hasBookmarked: hasBookmarked }
            })
            return res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
    }
})

//create post
router.post('/create', verify, async (req, res) => {
    const { title, story, category } = req.body

    const newPost = new Post({
        postedBy: req.user._id,
        title,
        story,
        category,
    })
    try {
        let savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        console.log(err)
    }

})

//saving post image
router.post('/:id/update/image', verify, multerUploads, async function (req, res) {
    const postId = req.params.id

    if (req.files[0]) {
        try {
            const file = dataUri(req.files[0]).content;

            cloudinary.v2.uploader.upload(file, {
                folder: 'blog/posts',
            }).then((result) => {
                const image = result.url
                Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        image: image
                    },
                    { upsert: true, new: true },
                    (err, docs) => {
                        if (err) return res.status(401).json("Error occured")
                        return res.status(200).json(docs)
                    })
            }).catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }

    } else {
        console.log('no file')
    }
})

//get bookmarked posts of current user
router.post('/bookmarks', verify, async (req, res) => {
    const { postsToSkip } = req.body
    const userId = mongoose.Types.ObjectId(req.user._id)

    const projection = getPostProjection(userId)
    const lookup = getPostLookup()
    const lookup2 = getHasBookmarked(userId)

    try {

        await User.findById(req.user._id)
            .select('bookmarks')
            .then(user => {
                const bookmarks = user.bookmarks

                Post.aggregate([
                    {
                        $match: {
                            _id: {
                                $in: bookmarks
                            }
                        }
                    },
                    {
                        $project: projection
                    },
                    { $sort: { createdAt: -1 } },
                    { $skip: postsToSkip },
                    { $limit: 12 },

                    {
                        $lookup: lookup
                    },
                    {
                        $lookup: lookup2
                    },

                ]).exec(function (e, d) {
                    if (e) console.log(e)
                    const data = d.map(post => {
                        let hasBookmarked = post.isBookmarked[0].hasBookmarked
                        delete post.isBookmarked
                        return { ...post, hasBookmarked: hasBookmarked }
                    })
                    if (data.length === 0) return res.status(204).json(data)
                    return res.status(200).json(data)
                })
            })
            .catch(err => {
                if (err) console.log(err)
                return res.status(403).json("Error :" + err)
            })


    } catch (err) {
        console.log(err)
    }
})

// get posts of current user
router.post('/user', verify, async (req, res) => {
    const { postsToSkip } = req.body
    const userId = mongoose.Types.ObjectId(req.user._id)

    try {
        await Post.aggregate([
            {
                $match: {
                    postedBy: userId
                }
            },
            {
                $project: {
                    postedBy: 1, title: 1, category: 1, image: 1, createdAt: 1, _id: 1,
                    likesCount: { $size: '$likes' },
                    isLiked: {
                        $cond: {
                            if: { $in: [userId, "$likes"] },
                            then: true,
                            else: false
                        }
                    },
                    commentsCount: { $size: '$comments' },
                    views: { $size: '$views' }
                }
            },
            { $sort: { createdAt: -1 } },
            { $skip: 0 },
            { $limit: 12 },
        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            return res.status(200).json(d)
        })
    } catch (err) {
        console.log(err)
    }
})

//edit post
router.put('/:id/edit', verify, async (req, res) => {
    const { title, story, category } = req.body
    const postId = req.params.id

    try {
        Post.findOneAndUpdate(
            { _id: postId },
            {
                title,
                story,
                category
            },
            { upsert: true, new: true },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs)
            })
    } catch (err) {
        console.log(err)
    }

})


router.put('/:id/delete', verify, async (req, res) => {
    const postId = req.params.id

    try {
        Post.findOneAndDelete(
            { _id: postId },
            (err, docs) => {
                if (err) return res.status(401).json("Error occured")
                return res.status(200).json(docs)
            })
    } catch (err) {
        console.log(err)
    }

})



// get posts by title and categories
router.post('/filter', verify, async (req, res) => {
    const { title, postsToSkip, categories } = req.body
    const userId = mongoose.Types.ObjectId(req.user._id)
    const projection = getPostProjection(userId)
    const lookup = getPostLookup()
    const lookup2 = getHasBookmarked(userId)

    var regexp = new RegExp(title, "i")

    if (title !== '') {
        match = {
            title: {
                $regex: regexp
            },
            category: { $in: categories }
        }
    } else {
        match = {
            category: { $in: categories }
        }
    }

    try {
        await Post.aggregate([
            {
                $match: match
            },
            {
                $project: projection
            },
            { $sort: { createdAt: -1 } },
            { $skip: postsToSkip },
            { $limit: 12 },

            {
                $lookup: lookup
            },
            {
                $lookup: lookup2
            },

        ]).exec(function (e, d) {
            if (e) return res.status(400).json(e)
            const data = d.map(post => {
                let hasBookmarked = post.isBookmarked[0].hasBookmarked
                delete post.isBookmarked
                return { ...post, hasBookmarked: hasBookmarked }
            })
            if (data.length === 0) return res.status(204).json(data)
            return res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
    }
})

var postLikesRoute = require('./likes')
router.use(postLikesRoute)

var postCommentsRoute = require('./comments')
router.use(postCommentsRoute)

var postViewsRoute = require('./views')
router.use(postViewsRoute)


module.exports = router