
const userModel = (sequelize, DataTypes) => {

    const userSchema = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING(100),
                allowNull: false
                
            },
            lastName: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            username: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(30)
            }
        },
        {
            freezeTableName: true
        }
    )
    // const todo = require('../Models/Todo')(sequelize, DataTypes)
    // userSchema.hasMany(todo)

    return userSchema;
}

module.exports = userModel