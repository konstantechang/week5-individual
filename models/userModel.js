const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '請輸入姓名'],
        },
        email: {
            type: String,
            required: [true, '請輸入Email'],
            select: false,

        },
        photo: {
            type: String,
            default: '',

        }

    },
    {
        versionKey: false,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;