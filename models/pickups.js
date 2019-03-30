module.exports = (db, type) => {
    return db.define('pickups', {
        userId: {
            type: type.STRING,
            allowNull: false,
        },
        pickups: {
            type: type.STRING,
            allowNull: false,
        }
    })
}