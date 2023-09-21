if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const bcrypt = require('bcrypt');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();
app.use(express.urlencoded({extended:false}));

const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views')

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules','bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({extended: false}));



const initializePassport = require('./models/passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

app.post('/admin/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(users);
        res.redirect('/admin/login');
    } catch (e) {
        console.log(e);
        res.redirect('/admin/register');
    }
})

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // we wont ressave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//Configuration the login
app.post('/admin/login', passport.authenticate('local', {
    successRedirect: "/admin",
    failureRedirect: '/admin/login',
    failureFlash: true
}));




//Routes
app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use((req, res) => {
    const viewsData = {
        pageTitle: 'Page Note Found'
    };
    res.status(404).render('404', viewsData);
});

// Start local server 
app.listen(3000, () => {
    console.log('server started at port 3000');
});