const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        required: true 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;