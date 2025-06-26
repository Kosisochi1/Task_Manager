const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reqquired: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "Inprogress", "completed"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
