const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const overviews = require("../../overviews.json");

router.patch("/", (req, res) => {
  //   const child = spawn("python", ["./script.py", overviews]);
  //   child.stdout.pipe(process.stdout);
  //   child.stderr.pipe(process.stderr);
  //   process.stdin.pipe(child.stdin);
  //   child.on("exit", () => process.exit());
  //   res.json("POST request made to /api/overviews.");
  // const child = spawn(
  //   "python", // subprocess
  //   ["./script.py", overviews], // arguments to subprocess
  //   { stdio: ["pipe", "pipe", process.stderr] }
  // );
  // child.stdout.pipe(res);
  // req.pipe(child.stdin);
});

module.exports = router;
