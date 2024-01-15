const mongoose = require("mongoose");

async function connectToMondoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMondoDb,
};
