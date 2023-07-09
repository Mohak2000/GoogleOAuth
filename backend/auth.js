var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: '421912357583-lc2v2o7p3fm5beeo8n5k6ot7gt2phq4j.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true,
  },
  function(req, accessToken, refreshToken, profile, done) {
    // Register user here.
    console.log(profile);
    return done(null, profile);
  }
));