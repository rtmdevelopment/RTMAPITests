/* module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      supportFile: 'support/e2e.js'
      // implement node event listeners here
    },
  },
}; */
/* const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // e2e options here
  },
}) */
// cypress.config.js
// cypress.config.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'rtm.cleeiyuc0o49.us-east-2.rds.amazonaws.com',
        user: 'root',
        password: 'RtmDbPwd12$',
        database: 'RTM'
});

function setupNodeEvents(on, config) {
  // Register the queryDb task
  on('task', {
    queryDb({ query }) {
      return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    },
  });

  return config; // Important: return the config
}

// Optionally, if you want to ensure closure of the pool,
// you can use an 'after' hook in your test files to close it.

module.exports = {
  e2e: {
    setupNodeEvents,
  },
};
