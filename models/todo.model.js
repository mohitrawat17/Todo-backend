const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  taskCompleted: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'  // This refers to the UserModel collection
  }
});

const todoModel = new mongoose.model("todoModel", todoSchema);

module.exports = todoModel;
