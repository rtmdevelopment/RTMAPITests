

import '../../support/commands';
const apiconfig = require('../../apiconfig.json');

function login(username, password) {
    return cy.request({
        method: 'POST',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.login}`, 
        body: {
            username: username,
            password: password,
        },
        failOnStatusCode: false, // Ignore the status code and continue the test
    }).then((response) => {
        return {
            response: response, // Return the response and access_token
            token: response.body.token, 
          };
    });
}

function createShipment(payload, access_token) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.shipment}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }
 
  
  
  module.exports = {
    login,
    createShipment
  };
  