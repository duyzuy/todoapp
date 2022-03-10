
const PageModel = (sequelize, DataTypes) => {
    const pageSchema = sequelize.define(
        'Page', 
        {
            id: {
                type: DataTypes.UUID, 
                defaultValue: DataTypes.UUIDV4, 
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            shortDescriptions: {
                type: DataTypes.STRING, 
                allowNull: true
            },
            thumbnail: {
                type: DataTypes.STRING, 
                allowNull: true
            },
            descriptions: {
                type: DataTypes.STRING, 
                allowNull: true
            }
        }, 
        {
            freezeTableName: true
        }
    );
    return pageSchema;
}

module.exports = PageModel

