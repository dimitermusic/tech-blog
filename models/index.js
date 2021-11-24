const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")

User.hasMany(Comment, {
    onDelete: "CASCADE"
});

Post.hasMany(Comment, {
    onDelete: "CASCADE"
});

Comment.belongsTo(User);

User.belongsToMany(Post, {
    through: "UserPost"
})

Post.belongsTo(User)

module.exports = {
    User,
    Post,
    Comment
}