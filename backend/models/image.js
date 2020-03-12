module.exports = (sequlize,DataTypes)=>{
    return sequlize.define('image',{
        src:{
            type:DataTypes.STRING(200),
            allowNull:false
        }
    },{
        timestamps:true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
}