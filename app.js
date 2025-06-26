const express = require("express");

// database
const { connect } = require("./src/database");
// router
const userRouter = require("./src/routers/userRouter");
const taskRouter = require("./src/routers/taskRouter");
const cookie_parser = require("cookie-parser");

const app = express();

const PORT = 3005;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie_parser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (_, res) => {
  res.send(
    `<a href='https://documenter.getpostman.com/view/28936241/2sB2xECoxV'>TASK MANAGER API</a>`
  );
});

// app.get("*", (req, res) => {
//   res.status(404).json({
//     data: null,
//     error: "Route not found",
//   });
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: "Server Error",
  });
});

//connect database to server
connect();
app.listen(PORT, () => {
  console.log("Server started");
});
