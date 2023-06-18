const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    sequelize,
    modelName: 'Comment'
});

console.log(Comment === sequelize.models.Comment);

module.exports = Comment