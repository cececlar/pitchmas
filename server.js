if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = require("./server/app"),
  PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
