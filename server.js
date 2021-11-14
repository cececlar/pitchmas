if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app"),
  PORT = process.env.PORT,
  overviews = require("./overviews"),
  spawn = require("child_process").spawn;

const createDict = () => {
  const process = spawn("python", ["./script.py", overviews]);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });
};

createDict();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
