const router = require("express").Router();
const { verify } = require("../middlewares/auth");
const PostController = require("../controllers/post");

//create
router.post("/", verify, PostController.createPost);

//update
router.put("/:id", verify, PostController.updatePost);

//delete
router.delete("/:id", verify, PostController.deletePost);

//get trending posts
router.get("/trending", verify, PostController.getTrendingPosts);

//get post
router.get("/:id", verify, PostController.getPostById);

//get all posts
router.get("/", verify, PostController.getAllPosts);

module.exports = router;