const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// Gt all blog posts and render home page

router.get("/", (req, res) => {
    Blog.findAll({
        include: [User]
    }).then(blogData => {
        const hbsBlogs = blogData.map(blog => blog.get({ plain: true }))
        if (req.session.user) {
            res.render("home", {
                blogs: hbsBlogs,
                username: req.session.user.username
            })
        } else {
            res.render("home", {
                blogs: hbsBlogs
            })
        }
    })
})

// Check if user logged in then get all user blog posts and render dashboard page

router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    Blog.findAll({
        where: { UserId: req.session.user.id },
        include: [User, Comment]
    }).then(blogData => {
        const hbsBlogs = blogData.map(blog => blog.get({ plain: true }));
        res.render("dashboard", { blogs: hbsBlogs, username: req.session.user.username })
    })
})

// Render login page

router.get("/login", (req, res) => {
    res.render("login")
})

// Render sign up page

router.get("/signup", (req, res) => {
    res.render("signup")
})

// Render new post page

router.get("/newpost", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    res.render("newpost")
})

module.exports = router;