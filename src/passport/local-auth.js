const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id)
});//se autentica al usuario por su id

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});



passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The email not available'));
    } else {
        const newUser = new User();//aca defino al nuevo usuario
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }



}))
//el done es un callback

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'No user found'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Incorrect pass'));
    }
    done(null, user);
}));