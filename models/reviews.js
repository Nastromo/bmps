module.exports = (db, type) => {
    return db.define('reviews', {
        userId: {
            type: type.STRING,
            allowNull: false,
        },
        rating: {
            type: type.INTEGER,
            allowNull: false,
        },
        title: {
            type: type.STRING,
            allowNull: true,
        },
        text: {
            type: type.STRING,
            allowNull: true,
        }
    })
}