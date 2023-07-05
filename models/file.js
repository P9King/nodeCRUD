const Sequelize = require('sequelize');

class File extends Sequelize.Model {
    static initiate(sequelize) {
        File.init({
            originalName: {
                type: Sequelize.STRING
            },
            storedName: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            }
        },
            {
                sequelize,
                modelName: 'File',
                tableName: 'files',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            })
    }
    static associate(db){
        db.File.belongsTo(db.Board, {foreignKey: 'boardId', targetKey: 'id'})
    }
}

module.exports = File;