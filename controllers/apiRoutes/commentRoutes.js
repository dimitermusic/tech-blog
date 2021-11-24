const express = require("express");
const router = express.Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll()
    .then(commentData => {
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get("/:id", (req, res) => {
  Review.findByPk(req.params.id)
    .then(singleComment => {
      if (singleComment) {
        res.json(singleComment);
      } else {
        res.status(404).json({ err: "no such comment found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "You need to be logged in to view comments." });
  }
  Comment.create({
    comment_text: req.body.comment,
    UserId: req.session.user.id,
    PostId: req.body.PostId
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "You need to be logged in to edit comments." });
  }
  Review.findByPk(req.params.id)
    .then(foundRev => {
      if (req.session.user.id !== foundRev.UserId) {
        return res.status(403).json({ err: "This comment is not yours!" });
      }

      Comment.update(
        {
          comment_text: req.body.review,
          UserId: req.body.PostId
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(updatedData => {
          if (updatedData[0]) {
            res.json(updatedData);
          } else {
            res.status(404).json({ err: "no such comment found!" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "You need to be logged in to delete comments." });
  }
  Comment.findByPk(req.params.id).then(foundRev => {
    if (req.session.user.id !== foundRev.UserId) {
      return res.status(403).json({ err: "not your comment!" });
    }
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(delComment => {
        if (delComment) {
          res.json(delComment);
        } else {
          res.status(404).json({ err: "no such comment found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });;
});

module.exports = router;
