const userModel = require('../model/register.model')
const bcrypt = require('bcrypt')



const userLoginGet = (req,res)=>{
    res.render('login')
}

const userLoginPost = async(req,res)=>{

    try {
        const email = req.body.uemail
        const password = req.body.upassword
      
        const dbmail = await userModel.findOne({email:email})

        // bcrypt hash is checked in the database using the compare 
        const isMatch = bcrypt.compare(password,dbmail.password)
        if(isMatch){
            
          return  res.status(201).send('login successfully')
         
        }
        else{
         return   res.send('invalid login details')
        }
    } catch (error) {
       return res.status(400).send(error)
    }

   
}





module.exports ={userLoginGet, userLoginPost}
