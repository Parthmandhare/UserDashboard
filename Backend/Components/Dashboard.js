const { Router } = require("express");
const { isThere } = require("../Middlewares/auth");
const user = require("../DB");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await user.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong. Try again later." });
  }
});

module.exports = router;