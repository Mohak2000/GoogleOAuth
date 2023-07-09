const express = require('express');
const passport = require("passport");

const cookieSession = require('cookie-session');
  
require('./auth.js');

const app = express();
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));

app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());


app.get("/google", passport.authenticate('google',{scope: ["profile","email"]}));

app.get('/google/callback',
    passport.authenticate( 'google', {failureRedirect: '/failed'}),
    function(req,res) {
    res.redirect('/success')
});
app.get('/', (req,res) => {
    res.render("pages/index");
    // console.log('On home page');
})

app.get('/success', (req,res) => {
    res.render("pages/profle.ejs", {
        name: req.user.displayName,
        email: req.user.emails[0].value
    });
    // console.log('On home page');
})

app.listen(5000, ()=> {
    console.log('App is running on port 5000');
} )