const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const {errorHandler} = require('./middlewares/errorMiddleware')


const app = express();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

///connect database
ConnectDB();

///Routes
// const createPost = require("./routers/createPostRoute");
const userAuth = require("./routers/userAuth");

// app.use("/api/post", createPost);
app.use("/api/auth", userAuth);
app.use(errorHandler)


///port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
