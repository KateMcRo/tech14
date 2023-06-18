const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Post extends Model {}

Post.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    sequelize,
    modelName: 'Post'
});

console.log(Post === sequelize.models.Post);

module.exports = Post