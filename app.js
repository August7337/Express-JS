if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();
app.use(express.urlencoded({extended:false}));



//Auth
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fakeLocal = require('./data/fakeLocal.json');

app.get('/createtoken', async (req, res) => {
    let user = { name: 'joey', favColor: 'blue', id: '123'};

    const token = jwt.sign({ user: user }, 'TOP_SECRET_KEY');

    console.log('token: ', token);

    await fs.writeFile(
        'data/fakeLocal.json',
        JSON.stringify({ Authorization: `Bearer ${token}`}),
        (err) => {
            if (err) throw err;
            console.log('updated the fake localsstorage in the fake browser');
        }
    );
    res.send('u jsut made token and stored it in the json file. now visit /profile and /wrongsecret');
});

app.get('/profile', async (req, res) => {
    console.log('authorization token: ', fakeLocal.Authorization);

    const result = await jwt.verify(
        fakeLocal.Authorization.substring(7),
        'TOP_SECRET_KEY'
    );
    result.message = 'we were able to decrypt the token because we have a valid secret in the app, and the token. The usres data is inside the token';

    console.log('result: ', result);

    res.json(result);
});

app.get('/wrongsecret', async (req, res, next) => {

    try {
        await jwt.verify(fakeLocal.Authorization.substring(7),'INCORRECT_SECRET'); // comes out bad and causes an error

        res.send('/profile');
    } catch (err) {
        console.log('err: ', err);
        return res
            .status(400)
            .send('You failed to hack me! or your token is invalid');
    }

    res.send('coming soon wrongsecret')
});

// second part

app.get('/secureroute', async (req,res) => {
    res.send('secureroute');
});

app.get('/logout', async (req,res) => {
    res.send('logged out');
});

app.get('/login', async (req,res) => {
    const viewsData = {
        pageTitle: 'Login'
    };
    res.render('login', viewsData);
});

app.get('/signup', async (req,res) => {
    const viewsData = {
        pageTitle: 'signup'
    };
    res.render('signup', viewsData);
});

app.get('/failed', async (req,res, next) => {
    res.send('failed');
});

app.get('/sucess', async (req,res, next) => {
    res.send('sucess');
});

app.post('/login', async (req,res, next) => {
    res.send('login form submitted');
});

app.post('/signup', async (req,res, next) => {
    res.send('signup form submitted');
});





app.set('view engine', 'ejs');
app.set('views', 'views')

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules','bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({extended: false}));

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
app.listen(8080, () => {
    console.log('server started at port 3000');
});