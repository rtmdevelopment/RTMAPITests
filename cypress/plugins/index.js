const mysql = require('mysql2');
module.exports = (on, config) => {
  on('task', {
    queryDb({ query }) {
      const connection = mysql.createConnection({
        host: 'rtm.cleeiyuc0o49.us-east-2.rds.amazonaws.com',
        user: 'root',
        password: 'RtmDbPwd12$',
        database: 'RTM'
      });
      return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      }).finally(() => {
        connection.end(); 
      });
    }
  });
}; 