
const todoModel = (sequelize, DataTypes) => {

    const todoSchema = sequelize.define(
        'Todo',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING(),
                allowNull: false
                
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            priority: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            freezeTableName: true
        }
    )
    const user = require('../Models/User')(sequelize, DataTypes);
    todoSchema.belongsTo(user, {
        name: 'userId',
    })
    user.hasMany(todoSchema)

    return todoSchema;
}

module.exports = todoModel