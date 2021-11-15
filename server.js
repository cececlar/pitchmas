if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("./server/db/config/index");
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = app.listen(8080);
const io = new Server(server, { cors: { origin: "*" } });
const morgan = require("morgan");
const cors = require("cors");
const movieRoutes = require("./server/routes/movieRoutes");
const overviewRoutes = require("./server/routes/overviewRoutes");
const { spawn } = require("child_process");
const overviews = require("./overviews.json");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", movieRoutes);
app.use("/api/overviews", overviewRoutes);

io.on("connection", (socket) => {
  const child = spawn("python", ["./script.py", overviews]);
  let optionsArray = [];

  child.stdout.on("data", (data) => {
    optionsArray = data.toString().split("\n");
    optionsArray.pop();
    io.emit("options", optionsArray);
  });

  socket.on("selected word", (data) => {
    const index = optionsArray.findIndex((element) => element === data);
    if (index !== -1) {
      child.stdin.write(`${String(index)}\n`);
    } else {
      io.emit("options", optionsArray);
    }
  });
});

if (server) {
  console.log(`Express server running on port ${PORT}`);
}

module.exports = app;
