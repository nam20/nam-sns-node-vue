module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board',{
       
       
        content:{
            type : DataTypes.TEXT,
            allowNull : false,
        }
    },{
        timestamps: true,
        // paranoid:true,
        charset: 'utf8mb4', //  한글+이모티콘
        collate: 'utf8mb4_general_ci',
    })
}