const express=require('express');
const { transformAuthInfo } = require('passport');
const router=require('express').Router();
const passport=require('passport');
const local=require('../passport/local-auth');

router.get('/',(req,res,next)=>{
res.render('index');
});

router.get('/signup',(req,res,next)=>{
res.render('signup');
});

router.post('/signup',passport.authenticate('local-signup',passport,{
successRedirect:'/profile',
failureRedirect:'/signup',
}));

router.post('/signin',passport.authenticate('local-signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    passReqToCallback:true
    }));

router.get('/profile',isAuthenticated,(req,res,next)=>{
    res.render('profile');
})

router.get('/logout',(req,res,next)=>{
   req.logout();
   res.render('/');
})

router.use((req,res,next)=>{
    isAuthenticated(req,res,next);
    next();
})


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }

module.exports=router;