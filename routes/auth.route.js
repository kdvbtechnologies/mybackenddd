const { signUp, signIn, logOut } = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logOut);

module.exports = router;
