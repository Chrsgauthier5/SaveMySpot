const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function(next) {
    try{
        if(!this.isModified('password')){
            return next() //if everything comes back normally from DB, do notthing and go to next function
        }
        const hashed = await bcrypt.hash(this.password, 10); //10 is strength of hash
        this.password = hashed;
        return next();
    } catch (err){
        return next(err)
    }
});


userSchema.methods.comparePassword = async function(attempt, next){

    try {

        return await bcrypt.compare(attempt, this.password); // returns a Boolean

    } catch(err){
        next(err);
    }

}



module.exports = mongoose.model('User', userSchema);

//need to install bcrypt package to encrypt passwords

//npm install bcrpytjs

// //{
// 	"firstname": "chris",
// 	"lastname": "gauthier",
// 	"username": "Frankie123",
// 	"password": "password",
// 	"email": "example123@gmail.com"
// }