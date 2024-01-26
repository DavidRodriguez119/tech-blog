const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// Show all posts
router.get(`/`, (req, res) => {
    Comment.findAll({
        include: [User, Post]
    }).then((dbComments) => {
        res.json(dbComments);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: `Something went wrong :(`,
            err
        })
    })
});

// Show by ID
router.get("/find/:id", (req, res) => {
    Comment.findByPk(req.params.id, {
        include: [User, Post]
    }).then(dbComment => {
        if (!dbComment) {
            res.status(404).json({ msg: "no such Comment!" })
        } else {
            res.json(dbComment)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Create Post
router.post("/", (req, res) => {
    Comment.create({
        content: req.body.content,
    }).then(newComment => {
        res.json(newComment)
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Update Comment 
router.put("/edit/:id", (req, res) => {
    Comment.update({
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    }).then(editComment => {
      res.json(editComment)
    }).catch(err => {
      res.status(500).json({ msg: "oh no!", err })
    })
})

// Delete Comment
router.delete("/delete/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(delComment=>{
        res.json(`Comment Deleted`)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Show all the comments in a post


module.exports = router;