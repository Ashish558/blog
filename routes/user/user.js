
var express = require('express')
var mongoose = require('mongoose')
var schedule = require('node-schedule')

//multer imports
const multer = require('multer')
const cloudinary = require('cloudinary')
const path = require('path')

var verify = require('../verifyToken')
var User = require('../../models/users')
var Post = require('../../models/post')

var router = express.Router()

//multer setup
const storage = multer.memoryStorage()
const multerUploads = multer({ storage }).single('profileImage')

const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const dataUri = req => {
    return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer)
}



function getHighestCount(arr, field) {
    return Number(
        Math.max.apply(
            Math,
            arr?.map(o => o[field] || 0),
        ) || 0,
    );
}

let highestCategories = []
function getTopCategories(arr, field) {
    highestCategories = []
    let data = loop(arr, field)
}

function loop(arr, field) {
    let highestCount = getHighestCount(arr, field)
    let remainingCategories = arr.filter(item => item.count !== highestCount)
    let highest = arr.filter(item => item.count === highestCount)

    highestCategories.push(...highest)
    if (highestCategories.length < 3) {
        loop(remainingCategories, field)
    } else {
        return
    }

}

router.get('/get/details', verify, async function (req, res) {
    const userId = req.user._id
    try {
        User.findById(userId)
            .select('image name email location')
            .exec((err, data) => {
                if (err) return res.status(400).json(err)
                return res.status(200).send(data)
            })
    }
    catch (error) {
        console.log(err)
        res.status(401).json("Server error")
    }
})

router.get('/profile/:id', verify, async function (req, res) {
    const userId = req.params.id

    try {
        User.findById(userId)
            .select('image name location')
            .exec((err, data) => {
                if (err) return res.status(400).json(err)

                Post.aggregate([
                    {
                        $match: {
                            postedBy: mongoose.Types.ObjectId(userId)
                        }
                    },
                    {
                        $project: {
                            category: 1
                        }
                    },
                    {
                        $group: {
                            '_id': '$category',
                            count: {
                                $count: {}
                            }
                        }
                    }
                ]).exec(function (e, d) {
                    if (d.length > 3) {
                        let cat = getTopCategories(d, 'count')
                    }
                    if (e) return res.status(400).json(e)
                    return res.status(200).json({ data, maxCategories: highestCategories })
                })

            })
    }
    catch (error) {
        console.log(err)
        res.status(401).json("Server error")
    }
})

// router.get('/profile/2/:id', verify, async function (req, res) {
//     // const userId = req.params.id
//     const userId = mongoose.Types.ObjectId(req.params.id)

//     try {
//         Post.aggregate([
//             {
//                 $match: {
//                     postedBy: userId
//                 }
//             },
//             {
//                 $project: {
//                     category: 1, title: 1,
//                 }
//             },
//             {
//                 $group: {
//                     '_id': '$category',
//                     count: {
//                         $count: {}
//                     }
//                 }
//             }
//         ]).exec(function (e, d) {
//             // let topCategories = []
//             let topCategories = getTopCategories(d, 'count')
//             if (e) return res.status(400).json(e)
//             return res.status(200).json(d)
//         })
//     }
//     catch (error) {
//         console.log(err)
//         res.status(401).json("Server error")
//     }
// })


//update user personal details
router.put('/update/details', verify, async function (req, res) {

    const userId = req.user._id
    const { firstName, lastName, email, city, country } = req.body

    try {

        await User.findOneAndUpdate(
            { _id: userId },
            {
                email,
                name: {
                    first: firstName,
                    last: lastName
                },
                location: {
                    city, country
                }
            },
            { new: true },
            function (err, docs) {
                if (err) return res.status(401).json("Error occured")
                const { name, email } = docs
                return res.status(200).json({ name, email })
            })
    } catch (err) {
        console.log(err)
    }

})

//saving profile image
router.post('/update/image', verify, multerUploads, async function (req, res) {
    if (req.file) {
        try {
            const file = dataUri(req).content;
            cloudinary.v2.uploader.upload(file, {
                folder: 'recipe/profile',
            }).then(async (result) => {
                const image = result.url;
                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        image: image
                    },
                    { new: true },
                    function (err, docs) {
                        // if (err) {
                        //     return res.status(401).json({ message: "Error occured", data: err })
                        // }
                        return res.status(200).json({
                            image: docs.image,
                            message: 'Your image has been uploded successfully to cloudinary',
                        })
                    })
            })

        } catch (err) {
            console.log(err)
        }

    }

})

//get dashboard details
router.get('/get/details/dashboard', verify, async function (req, res) {
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
                    _id: 1,
                    viewsHistory: 1,
                    likesCount: { $size: '$likes' },
                    commentsCount: { $size: '$comments' },
                    views: { $size: '$views' },

                }
            },
        ]).exec(function (e, data) {
            let likes = 0
            let comments = 0
            let views = 0

            data.forEach(item => likes += item.likesCount)
            data.forEach(item => comments += item.commentsCount)
            data.forEach(item => views += item.views)
            return res.status(200).json({ posts: data.length, likes, comments, views, data })
        })
    } catch (err) {
        console.log(err)
    }
})




var userBookmarksRoute = require('./bookmarks')
router.use('/bookmarks', userBookmarksRoute)

module.exports = router
