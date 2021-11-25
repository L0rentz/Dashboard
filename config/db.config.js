module.exports = {
    host: '10.16.249.177',
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