const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //name: String,
    name: {
        type: String,
        unique: [true, 'Yourr username must unique.'],
        required: [true, 'Yourrr username cannot be blank.'],
    },
    email: {
        type: String,
        required: [true, 'Yourrr email cannot be blank.'],
    },
    password: String
});



module.exports = mongoose.model('User', userSchema);
