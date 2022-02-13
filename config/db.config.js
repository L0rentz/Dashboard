module.exports = {
    host: 'postgres',
    port: 5432,
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