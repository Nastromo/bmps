const Sequelize = require('sequelize');
const UserModel = require('./models/users');



const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        supportBigNumbers: true,
    },
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
})

const User = UserModel(db, Sequelize);


const syncDB = async () => {
    try {
        if (process.env.NODE_ENV === `production`) await db.sync();
        else await db.sync({ force: false, match: /_dev$/ });
        console.log(`${process.env.NODE_ENV} Database & tables created!`);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    db,
    User,
    syncDB
}

