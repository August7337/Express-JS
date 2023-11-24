const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/path');
const cors = require('cors');
const dotenv = require('dotenv');

const coockieParser = require('cookie-parser');
const {dirname,join} = require('path');
const { fileURLToPath } = require('url');
const usersRouter = require('./routes/users-routes');
const authRouter = require('./routes/auth-routes');
const postsRouter = require('./routes/posts-routes');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();

const PORT = process.env.PORT || 5000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(coockieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening on port:${PORT}`);
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.set('views', 'views')

//Static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules','bootstrap', 'dist', 'css')));

//Routes
app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use((req, res) => {
    const viewsData = {
        pageTitle: 'Page Note Found'
    };
    res.status(404).render('404', viewsData);
});