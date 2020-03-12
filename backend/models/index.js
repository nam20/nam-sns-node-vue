
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

 

  const sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize)
db.Comment = require('./comment')(sequelize,Sequelize)
db.Board = require('./board')(sequelize,Sequelize)
db.Hashtag = require('./hashtag')(sequelize,Sequelize)
db.Comment = require('./comment')(sequelize,Sequelize)
db.Image = require('./image')(sequelize,Sequelize)



db.User.hasMany(db.Board)
db.Board.belongsTo(db.User)

db.Board.belongsToMany(db.Hashtag,{through:'BoardHashtag'})
db.Hashtag.belongsToMany(db.Board,{through:'BoardHashtag'})

db.User.belongsToMany(db.Board,{through:'Like',as:'Liked'})
db.Board.belongsToMany(db.User,{through:'Like',as:'Likers'})

db.User.hasMany(db.Comment)
db.Board.hasMany(db.Comment)

db.Comment.belongsTo(db.User)
db.Comment.belongsTo(db.Board)

db.Board.hasMany(db.Image)
db.Image.belongsTo(db.Board)



db.User.belongsToMany(db.User,{
  foreignKey: 'followingId',
  as:'Followers',
  through: 'Follow'
})

db.User.belongsToMany(db.User,{
  foreignKey: 'followerId',
  as:'Followings',
  through: 'Follow'
})

// db.User.hasMany(db.Board)
// db.Board.belongsTo(db.User,{foreignKey:'userId',as:'writer'})

// db.Board.belongsToMany(db.Hashtag,{through:'BoardHashtag'})
// db.Hashtag.belongsToMany(db.Board,{through:'BoardHashtag'})

// db.User.belongsToMany(db.Board,{through:'good'})
// db.Board.belongsToMany(db.User,{foreignKey:'userId',through:'good',as:'Likers'})

// db.User.hasMany(db.Comment,{foreignKey: 'commenter',sourceKey:'id'});
// db.Comment.belongsTo(db.User,{foreignKey: 'commenter',targetKet:'id'});

module.exports = db;
