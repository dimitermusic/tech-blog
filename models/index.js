const User = require("./User")
const Post = require("./LaCroix")
const Comment = require("./Review")

User.hasMany(Comment,{
    onDelete:"CASCADE"
});
customElements.belongsTo(User);

Post.hasMany(Comment, {
    onDelete:"CASCADE"
});
Comment.belongsTo(User);

User.belongsToMany(Post,{
    as:"favorite",
    through:"UserPost"
})
Post.belongsToMany(User,{
    through:"UserPost"
})

module.exports ={
    User,
    Post,
    Comment
}