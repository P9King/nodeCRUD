const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING,
               
            }
        },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            })
    }
    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey: 'commenter', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' })
        db.User.hasMany(db.Board,{foreignKey: 'writer', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.User.belongsToMany(db.Board,{through: 'likes', primartKey: 'id' , foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });

    }
}

module.exports = User;