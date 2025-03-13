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

const port = process.argv.length > 2 ? process.argv[2] : 4000;

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {

    if (await findUser('name', req.body.username)) {
        res.status(409).send({error: "Username already taken"});
    } else {
        const user = await createUser(req.body.username, req.body.password);
        user.token = uuid.v4()
        setAuthCookie(res, user);
        res.status(201).send();
    }
})

apiRouter.post('/auth/login', async (req, res) => {
    console.log("login beginning");
    const user = await findUser('name', req.body.username);

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4()
        setAuthCookie(res, user);
        console.log("set cookie again");
        res.status(200).send();
    } else {
        res.status(401).send({error: "Invalid username or password"});
    }
})

apiRouter.delete('/auth/logout', async (req, res) => {

    const user = await findUser('token', req.cookies.authCookie);

    if (user) {
        clearAuthCookie(res, user);
    }

    res.status(204).end();

})

apiRouter.get('/alltimescores', authenticate, (req, res) => {
    res.send(allTimeScores);
})

apiRouter.post('/alltimescores', authenticate, async (req, res) => {
    const user = await findUser('token', req.cookies.authCookie);
    if (!user) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }
    const score = {
        name: user.name,
        score: req.body.score,
        date: new Date().toLocaleDateString()
    }

    allTimeScores.push(score);

    allTimeScores.sort((a, b) => b.score - a.score);
    if (allTimeScores.length > 10) {
        allTimeScores.pop();
    }
    
    res.status(201).send(allTimeScores);
})

apiRouter.get('/recentscores', authenticate, (req, res) => {
    res.send(recentScores);
})

apiRouter.post('/recentscores', authenticate, async (req, res) => {
    const user = await findUser('token', req.cookies.authCookie);

    if (!user) {
        res.status(401).send({error: "Unauthorized"});
        return;
    }

    const score = {
        name: user.name,
        score: req.body.score,
        date: new Date().toLocaleDateString()
    }

    if (recentScores.length > 2) {
        recentScores.shift();
    }

    recentScores.push(score);

    res.send(recentScores)
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

async function authenticate(req, res, next) {
    const user = await findUser('token', req.cookies.authCookie);
    if (user) {
        next();
    } else {
        res.status(401).send({error: "Unauthorized"});
    }
}

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