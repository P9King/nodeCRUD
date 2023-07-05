const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            file_attach: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            likes:{
                type: Sequelize.INTEGER,
                allowNull: true
            }
        },
            {
                sequelize,
                modelName: 'Board',
                tableName: 'Boards',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            })
    }
    static associate(db){
        db.Board.hasMany(db.File, {foreignKey: 'boardId', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' })
        db.Board.belongsTo(db.User, {foreignKey: 'writer', targetKey: 'id'})
        db.Board.belongsToMany(db.User, {through:'likes',foreignKey: 'boardId', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'})
    }
}

module.exports = Board;