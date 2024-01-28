const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require("../models")

const userRoutes = require(`./userRoutes`);
router.use(`/api/user`, userRoutes);

const postRoutes = require(`./postRoutes`);
router.use(`/api/post`, postRoutes);

const commentRoutes = require(`./commentRoutes`);
router.use(`/api/comment`, commentRoutes);

// other routes

// Home page
router.get(`/`, (req, res) => {
  const isLoggedIn = req.session.user !== undefined;
  console.log(isLoggedIn)
  res.render("home", { isLoggedIn });
  console.log("Homepage")
});

// Dashboard pageBreakAfter: 
router.get(`/dashboard`, (req, res) => {
  if(req.session.user){
    res.render("dashboard");
  } else {
    res.render("login")
  }    
});

// Login Page 
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/")
  } else {
    res.render("login")
  }
})

// Logout Page 
router.get(`/logout`, (req, res) => {
  res.render("logout");
});

// Single Post Page 
router.get(`/singlePost/:id`, (req, res) => {
  if(req.session.user){
    res.render(`singlePost`)
  } else {
    res.render("login")
  }    
});

module.exports = router;
