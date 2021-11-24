const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require("../../models")

router.get('/', (req, res) => {
    return res.render("home")
})

router.get("/posts", (req, res) => {
    Post.findAll().then(PostData => {
        console.log(PostData)
        console.log("=================")
        const hbsLCData = PostData.map(item => item.get({ plain: true }))
        console.log(hbsLCData)
        return res.render("posts/index", {
            flavors: hbsLCData
        })
    })
})

router.get("/posts/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [{
            model: Comment,
            include: [User]
        }]
    }).then(PostData => {
        const hbsData = PostData.get({ plain: true })
        console.log(hbsData);
        res.render("posts/single", hbsData);
    })
})
router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id, {
        include: [{
            model: Comment,
            include: [Post]
        }]
    }).then(userData => {
        const hbsData = userData.get({ plain: true })
        console.log(hbsData);
        res.render("profile", hbsData);
    })
})


router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect(`/profile/${req.session.user.id}`)
    }
    return res.render("login")
})


router.get("/comments/add/:id", (req, res) => {
    if (!req.session.user) {
        return res.redirect(`/login`)
    }
    Post.findByPk(req.params.id).then(singlePost => {
        const hbsData = singlePost.get({ plain: true })
        console.log(hbsData);
        res.render("comments/add", hbsData)
    })
})
module.exports = router;