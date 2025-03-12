const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();


const users = [];

const recentScores = [];
const allTimeScores = [];

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.post('/auth/create', async (req, res) => {

    if (await findUser('name', req.body.username)) {
        res.status(409).send("Username already taken");
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user);
        users.push(user);
    }
})

app.post('/auth/login', async (req, res) => {

    const user = await findUser('name', req.body.username);

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user);
    } else {
        res.status(401).send("Invalid username or password");
    }
})

app.delete('/auth/logout', async (req, res) => {

    const user = await findUser('token', req.cookies.authCookie);

    if (user) {
        clearAuthCookie(res, user);
    }

    res.status(204).end();

})

app.get('/alltimescores', (req, res) => {
    res.send(allTimeScores);
})

app.post('/alltimescores', async (req, res) => {
    const user = await findUser('token', req.cookies.authCookie);

    const score = {
        name: user.name,
        score: req.body.score,
        date: new Date().toISOString()
    }

    allTimeScores.push(score);

    allTimeScores.sort((a, b) => b.score - a.score);
    if (allTimeScores.length > 10) {
        allTimeScores.pop();
    }
    
    res.send(allTimeScores);
})

app.get('/recentscores', (req, res) => {
    res.send(recentScores);
})

app.post('/recentscores', async (req, res) => {
    const user = await findUser('token', req.cookies.authCookie);

    const score = {
        name: user.name,
        score: req.body.score,
        date: new Date().toISOString()
    }

    recentScores.push(score);

    recentScores.sort((a, b) => b.score - a.score);

    if (recentScores.length > 3) {
        recentScores.pop();
    }

    res.send(recentScores)
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