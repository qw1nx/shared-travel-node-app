const {Schema, model, Types: {ObjectId}} = require('mongoose');
const {comparePass, hashPassword} = require('../services/utilService');

const userSchema = new Schema({
    email: {type: String, required: true},
    hashedPass: {type: String, required: true},
    gender: {type: String, required: true},
    tripsHistory: {type: [ObjectId], ref: 'Trip'}
});

userSchema.index({email : 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

userSchema.methods.comparePassword = async function(password){
    //Use bcrypt to hash and compare incoming password with stores hashed password
    return await comparePass(password, this.hashedPass);
}

userSchema.methods.hashPwd = async function(password){
    return await hashPassword(password);
}

userSchema.pre('save', async function (next){
    console.log('Saving..')
    if (this.isModified('hashedPass')){
        console.log('Hashing pw');
        this.hashedPass = await hashPassword(this.hashedPass);
    };
    next();
})


const User = model('User', userSchema);

module.exports = User;