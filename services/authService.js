const User = require('../models/User');

function logout(session){
    delete session.user;
}

async function register(session, email, password, gender) {
    const existing = await getUserByUsername(email);

    if (existing){
        throw new Error('Username is taken');
    }

    const user = new User({
        email,
        hashedPass: password,
        gender
    });
    console.log(user, 'This is before saving');
    await user.save();
    session.user = {
        id: user._id,
        email: user.email
    }
}

async function login(session, email, password) {
    const user = await User.findOne({email});
    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            email: user.email
        }
        return true;
    } else {
        throw new Error('Incorrect username or password');
    }
}

async function getUserEmailById (userId) {
    const user = await User.findById(userId);
    return user.email;
}

async function getUserByUsername (usernameOrEmail) {
    return User.findOne({ email: usernameOrEmail});
}

// function isAuthor(session, authorId){
//     if (authorId == session.user.id){
//         return true
//     } else {
//         return false;
//     }
// }

module.exports = () => (req, res, next) => {
    if (req.session.user){
        res.locals.user = req.session.user;
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session),
        getUserEmailById
        //isAuthor: () => isAuthor(req.session, ...params)
    };
    next();
}