const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
class UserController {
    updateUser = async (req, res) => {
        if (req.body.userId === req.params.id) {
            const userData = req.body
            if (userData.password) {
                const salt = await bcrypt.genSalt(10);
                userData.password = await bcrypt.hash(userData.password, salt);
            }
            try {
                const { username } = await User.findById(req.params.id);//get old username
                await Post.updateMany({ username }, {
                    $set: { username: userData.username }
                });
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: userData//sets fields present in userData, rest same
                }, { new: true });
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else
            res.status(401).json("You can update only your account!");
    }

    deleteUser = async (req, res) => {
        if (req.user._id === req.params.id) {//req.user.id comes from verify
            try {
                //first delete posts from this user 
                const user = await User.findById(req.params.id);
                try {
                    await Post.deleteMany({ username: user.username });
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted");
                } catch (error) {
                    res.status(500).json(error);
                }
            }
            catch (error) {
                res.status(404).json("User not found!");
            }
        }
        else
            res.status(401).json("You can delete only your account!");
    }

    getUserById = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...response } = user._doc;
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = new UserController();
