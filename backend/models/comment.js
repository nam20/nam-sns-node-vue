module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('comment',{
        content:{
            type: DataTypes.STRING(140),
            allowNull: false,
        }
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestampes: true
    })
}