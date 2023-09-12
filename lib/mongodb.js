//config mongoDB
const mongoose = require("mongoose");

const connection = {};

async function connectMongo() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://yuvi0201:FYOE7o1balSkJgma@cluster.so3giau.mongodb.net/?retryWrites=true&w=majority"
  );
  connection.isConnected = db.connections[0].readyState;
}

export default connectMongo;
