const mongoose = require('mongoose')


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
const userModel = mongoose.model('user',userSchema)

module.exports = userModel