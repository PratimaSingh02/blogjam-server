const router = require("express").Router();
const { verify } = require("../middlewares/auth");
const CategoryController = require("../controllers/category");
//create
router.post("/", verify, CategoryController.createCategory);

//get all categories
router.get("/", verify, CategoryController.getAllCategories);

module.exports = router;