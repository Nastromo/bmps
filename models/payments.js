module.exports = (db, type) => {
    return db.define('payments', {
        userId: {
            type: type.STRING,
            allowNull: false,
        },
        paymentId: {
            type: type.STRING,
            allowNull: false,
        },
        paymentStatus: {
            type: type.STRING,
            allowNull: false,
        },
        createdAt: {
            type: type.STRING,
            allowNull: false,
        },
        amount: {
            type: type.STRING,
            allowNull: false,
        },
        currency: {
            type: type.STRING,
            allowNull: false,
        }
    })
}