import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    DBHOST: process.env.DBHOST,
    DBPORT: process.env.DBPORT,
    DBNAME: process.env.DBNAME,
    DBUSER: process.env.DBUSER,
    DBPWD: process.env.DBPWD
}
