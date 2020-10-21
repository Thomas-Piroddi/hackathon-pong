const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("../routes/users.route");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/5500", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));


app.use(express.json());
//use users route for api/users
app.use("/api/users", usersRoute);

io.on('connection', () => { /* … */ });
server.listen(3000);