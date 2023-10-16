const todo = require("../models/todo.model");
const jwt=require('jsonwebtoken')

module.exports = {
  getAllTodos: async (req, res) => {
    
    try {
      const token =  req.headers['x-access-token']
      const decoded=jwt.verify(token,process.env.SECRET_KEY)
           console.log(process.env.SECRET_KEY);
      const data = await todo.find({user:decoded._id}, { __v: 0});
      
      res.json({data,username:decoded.username});

      console.log(decoded);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error:'Internal server error'})
    }
  },

  setTodos: async (req, res) => {
    try {
      const token = req.headers['x-access-token'];
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Use environment variable for secret key
      const p1 = new todo({
        name: req.body.name,
        task: req.body.task,
        taskCompleted: req.body.taskCompleted,
        user: decoded._id
      });
      const result = await p1.save();
      res.send(result);
      console.log(decoded._id);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  deleteTodos:async(req,res)=>{
    try {
      const data=await todo.deleteOne({_id:req.params.id});
      res.send(data);
      
    } catch (error) {
      res.send(error)
    }

  },

  updateStatus:async(req,res)=>{
      try {
        const data=await todo.updateOne({_id:req.params.id},{$set:{taskCompleted:req.body.taskCompleted}})
        res.send({message:"Task updated"})
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
};
