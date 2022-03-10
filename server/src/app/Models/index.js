const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../Config/dbConfig');


const sequelize = new Sequelize(
    dbConfig.DBNAME, 
    dbConfig.USERNAME, 
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
         
    }
);

const connect = async () => {
    try {
  
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
const dbModels = () => {
    const db = {};

   
    db.Page =  require('../Models/Page')(sequelize, DataTypes)
    db.User =  require('../Models/User')(sequelize, DataTypes)
    db.Todo =  require('../Models/Todo')(sequelize, DataTypes)
 

    return db
}
sequelize.sync({force: false})

module.exports = {connect, dbModels}






 