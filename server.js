if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app"),
  PORT = process.env.PORT,
  overviews = require("./overviews.json"),
  spawn = require("child_process").spawn;
// Example of how to spawn a python child process and feed data from req.query
// TODO: Update code block so that all movie overviews are fed to python child process for eventually creating a corpus of text made up of Christmas movie overviews.

const createCorpus = () => {
  const process = spawn("python", ["./script.py", overviews]);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });
};

createCorpus();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
