require('dotenv').config();
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');

const PORT = process.env.PORT || 3001;
const app = express();

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
    secret: 'somerandomstringoftext',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})