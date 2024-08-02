
const Blogpost = require('./blogpost');
const User = require('./user');


User.hasMany(Blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

module.exports = { Blogpost , User};