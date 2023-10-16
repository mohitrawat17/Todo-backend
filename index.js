const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const { newUser, userLogin } = require("./controllers/usersController");
const todoController = require("./controllers/todoList");

const app = express();
app.use(express.json());   //to convert request body from json to object
const cors=require('cors');
app.use(cors());  //allow us to connect frontend with API without giving errors

app.use(express.json()); //middleware to parse json body
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ecviifd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected");
  });



  app.post('/register',newUser)
  app.post('/login',userLogin)



app.get("/data", todoController.getAllTodos);

app.post("/data", todoController.setTodos);

app.delete("/data/:id",todoController.deleteTodos)

app.patch('/data/:id',todoController.updateStatus);



const PORT=process.env.PORT || 3000


app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
