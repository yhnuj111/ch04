const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send('ๅๅๅ่กจ');
});

module.exports = router;