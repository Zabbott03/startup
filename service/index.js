const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();


const users = [];

const recentScores = [];
const allTimeScore = [];

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.post('/auth/create', (req, res) => {

})

app.put('/auth/login', (req, res) => {

})

app.delete('/auth/logout', (req, res) => {

})

app.get('/alltimescores', (req, res) => {

})

app.post('/alltimescores', (req, res) => {

})

app.get('/recentscores', (req, rest) => {

})

app.post('/recentscores', (req, res) => {

})

async function findUser(field, value) {
    if (value) {
        return users.find(user => user[field] === value);
    }
    return null;
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        name: username,
        password: passwordHash,
        token: uuid.v4()
    }
    users.push(user);

    return user;
}

function setAuthCookie(res, user) {
    res.cookie("authCookie", user.token, {
        secure: true,
        httpOnly: true,
        sameSite: "strict"
    })
}

function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie("authCookie")
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});