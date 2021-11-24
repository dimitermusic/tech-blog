const sequelize = require("../config/connection")
const { Post, User, Comment } = require("../models")
const postData = require("./post.json")
const userData = require("./user.json")
const commentData = require("./comment.json")

const seedMe = async () => {
    await sequelize.sync({ force: false });
    await Post.bulkCreate(postData);
    console.log('seeded text!')
    await User.bulkCreate(userData, { individualHooks: true });
    console.log('seeded users!')
    await Comment.bulkCreate(commentData);
    console.log('seeded comments!')
    process.exit(0);
}

seedMe()