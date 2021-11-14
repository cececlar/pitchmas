if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app"),
  PORT = process.env.PORT,
  { spawn } = require("child_process"),
  overviews = require("./overviews.json");

// TODO: Decide where to move this.
// const createDict = () => {
//   const child = spawn("python", ["./script.py", overviews]);

//   child.stdout.pipe(process.stdout);
//   child.stderr.pipe(process.stderr);
//   process.stdin.pipe(child.stdin);

//   child.on("exit", () => process.exit());
// };

// createDict();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
