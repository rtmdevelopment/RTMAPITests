const mysql = require('mysql2');
export async function dbConnection() {
    const connection = mysql.createConnection({
    host: 'rtm.cleeiyuc0o49.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'RtmDbPwd12$',
    database: 'RTM',
    port : 3306
});
return new Promise((resolve, reject) => {
    connection.connect(err => {
        if (err) {
            return reject(err);
        }
        resolve(connection);
    });
});}
