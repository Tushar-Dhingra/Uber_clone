const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieparser = require('cookie-parser');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/users', userRoutes)


module.exports = app;
