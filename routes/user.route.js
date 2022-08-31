const { getAllUsers, userInfo } = require("../controllers/user.controller");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", userInfo);

module.exports = router;
