if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app"),
  port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
