const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// Show all posts
router.get(`/`, (req, res) => {
    Post.findAll({
        include: [User, Comment]
    }).then((dbPosts) => {
        res.json(dbPosts);
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
    Post.findByPk(req.params.id, {
        include: [User, Comment]
    }).then(dbPost => {
        if (!dbPost) {
            res.status(404).json({ msg: "no such post!" })
        } else {
            res.json(dbPost)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Create Post
router.post("/", (req, res) => {
    console.log(req.session.user);
    Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.user.id,
    }).then(newPost => {
        res.json(newPost)
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Update Post 
router.put("/edit/:id", (req, res) => {
    Post.update({
      title: req.body.title,
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    }).then(editPost => {
      res.json(editPost)
    }).catch(err => {
      res.status(500).json({ msg: "oh no!", err })
    })
})

// Delete Post
router.delete("/delete/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(delPost=>{
        res.json(`Post Deleted`)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Show all the posts of the logged in user 
router.get("/logged/posts", (req, res) => {
    Post.findAll({
        include: [User, Comment],
        where: {
            UserId: req.session.user.id
        }
    }).then((dbPosts) => {
        res.json(dbPosts);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: `Something went wrong :(`,
            err
        })
    })
});

module.exports = router;