const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

// Get all blog posts

router.get("/", (req, res) => {
  Blog.findAll({
    include: [User, Comment],
  })
    .then((dbBlogs) => {
      if (dbBlogs.length) {
        res.json(dbBlogs);
      } else {
        res.status(404).json({ message: "No blogs found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err: err });
    });
});

// Create a blog post

router.post("/", (req, res) => {
  Blog.create({
    title: req.body.title,
    body: req.body.body,
    UserId: req.session.user.id,
  })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong", err: err });
    });
});

// Get a single blog post based on request parameter id

router.get("/:id", (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    include: [User, Comment],
  })
    .then((blogData) => {
      const hbsBlogs = blogData.get({ plain: true });
      if (req.session.user) {
        hbsBlogs.username = req.session.user.username;
        hbsBlogs.usernameId = req.session.user.id;
        res.render("singleblog", hbsBlogs);
      } else {
        res.render("singleblog", hbsBlogs);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occured", err: err });
    });
});

// Delete one blog post based on request parameter id

router.delete("/:id", (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  }).then((delBlog) => {
    res.json(delBlog);
  });
});

module.exports = router;
