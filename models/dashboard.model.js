const { user } = require('../config/db.config');

module.exports = (sequelize, Sequelize) => {
    const Dashboard = sequelize.define('dashboard', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            notNull: true,
            get() {
                return () => this.getDataValue('userid')
            }
        },
        grid: {
            type: Sequelize.TEXT,
            notEmpty: false,
            notNull: false,
            get() {
                return () => this.getDataValue('grid')
            }
        }
    });

    return Dashboard;
}