require('dotenv').config();
const express = require('express');
const { syncDB } = require('./db');
const cors = require('cors');
const { router } = require('./routes/signup');
const login = require('./routes/login');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


console.log(process.env.NODE_ENV);
console.log(process.env.DB_USER);


app.use(`/v1/signup`, router);
app.use(`/v1/login`, login);

syncDB();

const port = process.env.MY_PORT;
if (process.env.NODE_ENV === 'production') {
    app.listen(port, '127.0.0.1', () => console.log(`Prod Main Server listening ${port} port...`));
} else {
    app.listen(port, () => console.log(`Dev Main Server listening ${port} port...`));
}