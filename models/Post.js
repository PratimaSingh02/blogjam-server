const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: [DescriptionSchema],
        required: true,
        unique: true
    },
    photo: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    likes: {
        type: Array
    },
    comments: {
        type: [CommentSchema]
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("post", PostSchema);