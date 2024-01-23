const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Post, Comment } = require('../models');

// Show all users
router.get(`/`, (req, res) => {
    User.findAll().then((dbUsers) => {
        res.json(dbUsers);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            msg: `Something went wrong :(`,
            err
        })
    })
});

// Show by ID
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {
        include: [Post, Comment]
    }).then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ msg: "no such user!" })
        } else {
            res.json(dbUser)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Create User
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
})

// Login
router.post("/login", (req, res) => {
    //TODO: ensure user isnt logged in
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(401).json({
                msg: "Invalid login credentials"
            })
        }
        else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json({
                msg: "Invalid login credentials"
            })
        }
        req.session.user = {
            id: foundUser.id,
            username: foundUser.username
        }
        res.json(foundUser)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp womp", err })
    })
})

// Logout of Session
router.get("/logout/", (req, res) => {
    console.log(req);
    // req.session.destroy();
    // res.send("logged out!")
})

// Delete User
router.delete("/delete/", (req, res) => {
    User.destroy({
        where: {
            id: req.session.user.id
        }
    }).then(delUser=>{
        req.session.destroy()
        if(!delUser){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(delUser)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "oh no!", err })
    })
});

// Find Session User
router.get("/session/:id", (req, res) => {
    User.findByPk(req.session.user.id, {
        include: [Post, Comment]
    }).then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ msg: "no such user!" })
        } else {
            res.json(dbUser)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

module.exports = router;