const userModel = require('../model/register.model')




const userLoginGet = (req,res)=>{
    res.render('login')
}

const userLoginPost = async(req,res)=>{

    try {
        const email = req.body.uemail
        const password = req.body.upassword
      
        const dbmail = await userModel.findOne({email:email})
        
        if(dbmail.password ===password){
            
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
