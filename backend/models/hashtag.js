module.exports = (sequlize,DataTypes)=>{
    return sequlize.define('hashtag',{
        title:{
            type:DataTypes.STRING(15),
            allowNull:false,
            unique:true
        }
    },{
        timestamps:true,
        paranoid:true,
        charset: 'utf8mb4', //  한글+이모티콘
        collate: 'utf8mb4_general_ci',
    })
}