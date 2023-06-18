const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment")

User.hasMany(Post, { foreignKey: 'userId', onDelete: "CASCADE"});
Post.belongsTo(User, { foreignKey: 'userId'})

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { User, Post, Comment }