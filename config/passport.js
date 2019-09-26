const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  'register',
  new LocalStrategy(
    {
      username: 'username',
      password: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      console.log(username);
      console.log(req.body.email);

      try {
        User.findOne({"username": username 
        }).then(user => {
          if (user != null) {
            console.log('username or email already taken');
            return done(null, false, {
              message: 'username or email already taken',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              username,
              password: hashedPassword,
              email: req.body.email,
            }).then(user => {
              console.log('user created');
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({"username": username}).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use("google",
  new GoogleStrategy(
    {
      clientID: 'your-client-id',
      clientSecret: 'your-secret-key',
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      console.log("done"+ done)
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("found user");
          return done(null, existingUser)
        } else {
          console.log("creating a new user");
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
          })
            .save()
            .then((user)=>{
              console.log("done");
              return done(null, user)
            });
        }
      });
    }
  )
);




