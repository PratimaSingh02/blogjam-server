const Post = require("../models/Post");

class PostController {
    createPost = async (req, res) => {
        const newPost = new Post(req.body);//create document
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updatePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, { new: true });
                    res.status(200).json(updatedPost);
                } catch (error) {
                    res.status(500).json(error);
                }
            }
            else
                res.status(401).json("You can update only your post!");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    deletePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    await Post.findByIdAndDelete(req.params.id);
                    res.status(200).json("Post has been deleted successfully!");
                } catch (error) {
                    res.status(500).json(error);
                }
            }
            else
                res.status(401).json("You can delete only your post!");
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getPostById = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getAllPosts = async (req, res) => {
        const username = req.query.user;//for filter
        const category = req.query.category;//for filter
        try {
            let posts;
            if (username) {
                posts = await Post.find({ username });
            }
            else if (category) {
                posts = await Post.find({
                    categories: { $in: [category] }//check category is there in categories array 
                })
            }
            else
                posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getTrendingPosts = async (req, res) => {
        try {
            const posts = await Post.aggregate([//aggregate for sorting using field length of every document
                { $unwind: "$likes" },
                {
                    $group:
                        { _id: '$_id', title: { "$first": "$title" }, likesCount: { $sum: 1 } }
                },
                { $sort: { likesCount: -1 } }
            ]);
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = new PostController();