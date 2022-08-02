const { signUp, signIn } = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/signup", signUp);
router.get("/signin", signIn);

module.exports = router;
