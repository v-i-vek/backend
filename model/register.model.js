const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


// this is the schema or we can say blue print in which the data will be stored in monogdb(vivek) name of db = vivek
const userSchema = mongoose.Schema({
    firstName:{type:String,
               require:true
               },

    email:{type:String,
               require:true,
                unique:true
              },
     password:{type:String,
               require:true
            }
})



// ask this to kenil bhai to explain on monday 

// this will encrypt your password using hash (bycrypt)
userSchema.pre('save',async function(next){
if(this.isModified('password')){

  console.log(this.password)
  this.password = await bcrypt.hash(this.password,10)
  console.log(this.password);
}
  next()
})



const userModel = mongoose.model('user',userSchema)

module.exports = userModel