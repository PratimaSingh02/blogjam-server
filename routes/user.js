const router = require("express").Router();
const { verify } = require("../middlewares/auth");
const UserController = require("../controllers/user");

//update
router.put("/:id", verify, UserController.updateUser);

//delete
router.delete("/:id", verify, UserController.deleteUser);

//get user
router.get("/:id", verify, UserController.getUserById);

module.exports = router;