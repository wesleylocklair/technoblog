const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    //needs the password check
    checkPassword(loginPw) { //gives the user class a function called checkpasswor
        return bcrypt.compareSync(loginPw, this.password);
      }
}
console.log(sequelize);

User.init(
    //Name / password
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [5], //min length of 5
            },
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //1 account per email
            validate: {
              isEmail: true,
            },
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    },  
    // {
    //   }
);

module.exports = User;