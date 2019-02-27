module.exports = (db, type) => {
    return db.define('users', {
        userId: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: false,
        },
        photo: {
            type: type.STRING,
            allowNull: true,
        },
        userType: {
            type: type.STRING,
            allowNull: false,
        },
        regDate: {
            type: type.BIGINT,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: true,
            unique: true,
        },
        pass: {
            type: type.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: type.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: type.STRING,
            allowNull: true,
            unique: false,
        },
        lastName: {
            type: type.STRING,
            allowNull: true,
            unique: false,
        },
    })
}