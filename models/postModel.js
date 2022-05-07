const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, "使用者名稱必填"], 
        },
        tags: {
            type: ['String'],
        },
        type:{
            type: String,
            default: '',
        },
        image:{
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        content:{
            type: String,
            required: [true, '貼文內容必填'],
        },
        likes:{
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },

    },
    {
        versionKey:false,
    }
);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;