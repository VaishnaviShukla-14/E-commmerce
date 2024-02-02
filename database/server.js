const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URI;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./routes/user.routes'))

app.use('/api/product',require("./routes/Product"))

app.use(express.static("uploads"))

mongoose
  .connect(URL)
  .then(() => {
    console.log("MOngodb Connected successfully", URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error to connect", err);
  });
