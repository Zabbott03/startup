const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

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
        await DB.updateUser(user)
        setAuthCookie(res, user);
        res.status(201).send();
    }

})

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('name', req.body.username);

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4()
        await DB.updateUser(user);
        setAuthCookie(res, user);
        res.status(201).send();
    } else {
        res.status(401).send({error: "Invalid username or password"});
    }
})

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies.authCookie);

    if (user) {
        delete user.token;
        await DB.updateUser(user);
        clearAuthCookie(res, user);
    }

    res.status(204).end();
})

apiRouter.get('/alltimescores', authenticate, async (req, res) => {
    const allTimeScores = await DB.getAllTimeScores();
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
        date: req.body.date
    }

    await DB.addAllTimeScore(score);
    
    res.status(201).send(await DB.getAllTimeScores());
})

apiRouter.get('/recentscores', authenticate, async (req, res) => {
    const recentScores = await DB.getRecentScores();
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
        date: req.body.date
    }

    await DB.addRecentScore(score);

    res.send(await DB.getRecentScores())
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
    if (!value) return null;

    if (field === 'token') {
        return await DB.getUserByToken(value);
      }
    return await DB.getUser(value);
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        name: username,
        password: passwordHash,
    }
    await DB.addUser(user);

    user.token = uuid.v4();
    await DB.updateUser(user)

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


const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
peerProxy(httpService);