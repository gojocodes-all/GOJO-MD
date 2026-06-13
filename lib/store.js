const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'bot-db.json');

function readDB() {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ chats: {}, users: {} }, null, 2));
  return JSON.parse(fs.readFileSync(file));
}

function writeDB(db) {
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}

module.exports = { readDB, writeDB };
