const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('snakewars');
const userCollection = db.collection('user');
const recentScoresCollection = db.collection("recentScores")
const allTimeScoresCollection = db.collection('allTimeScores');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ name: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ name: user.name }, { $set: user });
}

async function addRecentScore(score) {
  return recentScoresCollection.insertOne(score);
}

async function addAllTimeScore(score) {
  return allTimeScoresCollection.insertOne(score)
}

function getRecentScores() {
    const query = { score: { $gt: 0, $lt: 1000 } };
    const options = {
        sort: { _id: -1 },
        limit: 3,
    }
    const cursor = recentScoresCollection.find(query, options);
    return cursor.toArray();
}

function getAllTimeScores() {
    const query = { score: { $gt: 0, $lt: 1000 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    }
    const cursor = allTimeScoresCollection.find(query, options);
    return cursor.toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addRecentScore,
  addAllTimeScore,
  getRecentScores,
  getAllTimeScores
};
