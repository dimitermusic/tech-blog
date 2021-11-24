const express = require('express');
const router = express.Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");


router.use("/post",postRoutes);
router.use("/users",userRoutes);
router.use("/comments",commentRoutes);
router.get("/",(req,res)=>{
    res.send("hello from api!")
})

module.exports = router;