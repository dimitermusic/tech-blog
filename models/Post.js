const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    text: {
         type: DataTypes.STRING,
         unique:true
    }
},{
    sequelize
});

module.exports=Post