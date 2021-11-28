module.exports = {
    host: 'localhost',
    port: 8888,
    db: 'db',
    user: 'username',
    password: 'password',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};