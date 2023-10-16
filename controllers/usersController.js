const users=require('../models/users.model')
const jwt=require('jsonwebtoken')

module.exports={
    newUser:async(req,res)=>{
       try {
        const data=new users({
            name:req.body.name,
            username:req.body.username,
            password:req.body.password
        })
        const newUser=await data.save()
        res.send(newUser)
       } catch (error) {
        res.send(error)
       }
    },

    userLogin:async(req,res)=>{
        try {
            const user=await users.findOne({username:req.body.username})
            if(!user){
                res.status(400).json({message:"Invalid UserName or Password"})
            }
          const token=jwt.sign({
            username:user.username,
            _id:user._id
          },'secretmohitxrwt123')
          res.status(200).json({status:"ok",user:token})
        } catch (error) {
             return  res.status(500).json({status:"error",user:false})
        }
    }
}