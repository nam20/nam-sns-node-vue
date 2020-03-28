module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        userId:{
            type : DataTypes.STRING(40),
            allowNull : false,
            unique: true
        },
        name:{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        password:{
            type : DataTypes.STRING(200),
            allowNull : true,
        },
        // comment:{
        //     type: DataTypes.TEXT,
        //     allowNull: true,
        // },
        provider:{
            type: DataTypes.STRING(10),
            allowNull:false,
            defaultValue:'local'
        },
        snsId:{
            type: DataTypes.STRING(30),
            allowNull:true
        }
        // created_at:{
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // }
    },{
        timestamps: true,
        paranoid:true,
        charset: 'utf8mb4', //  한글+이모티콘
        collate: 'utf8mb4_general_ci',
    })
}