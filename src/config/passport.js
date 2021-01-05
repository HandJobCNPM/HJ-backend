const LocalStrategy = require('passport-local').Strategy;
const userService = require('../components/user/userService');
const hash = require('../services/hash');

module.exports = passport => {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, async (email, password, done) => {
            const user = await userService.getUserByEmail(email);
            if (user && hash.isPwdMatched(password, user.password)) {
                return done(null, user);
            }
            return done(null, false, { message: 'Incorrect email or password' });
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getUserById(id);
        let error;
        if (!user) { error = new Error('User not found'); }
        done(error, user);
    });
};
