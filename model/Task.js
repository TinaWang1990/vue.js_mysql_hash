const Sequelize = require("sequelize")
const db= require("../database/db")

module.exports = db.sequelize.define(
    "tasks",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taskname: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)