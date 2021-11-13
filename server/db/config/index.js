const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (e) {
  console.log(`Error: ${error.message}`);
}
