const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send('商品列表');
});

module.exports = router;