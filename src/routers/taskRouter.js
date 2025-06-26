const express = require("express");
const {
  createTask,
  allTask,
  updateTask,
  singleTask,
  deleteTask,
} = require("../controllers/task");
const { authenticateUser } = require("../auths");

const router = express.Router();
router.post("/", authenticateUser, createTask);
router.get("/", authenticateUser, allTask);
router.get("/:id", authenticateUser, singleTask);
router.patch("/:id", authenticateUser, updateTask);
router.delete("/:id", authenticateUser, deleteTask);

module.exports = router;
