const userModel = require('../model/register.model')

// this func is for getting the Registration page
const userGet = async(req,res)=>{
  return await res.render('register')
}

// this function is for posting the details in the mongodb by using the post mehtod
const userPost = async(req,res)=>{
    try {


        if(req.body.upassword === req.body.cupassword){
            const userDetailSave = new userModel({
                firstName:req.body.uname,
                email:req.body.uemail,
                password:req.body.upassword
            })
            const result = await userDetailSave.save()
            console.log(result);
            return res.status(201).send(result)
            
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
   
}






module.exports = {userGet,userPost}