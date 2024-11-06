

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

function registerMachine(payload, access_token) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.regMachine}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
        return response;

         /* response:response,
      machineId:response.body.results[0].id,  */
      
    });
  }

  function saveQuote(payload, access_token) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.saveQuote}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response;

      /* response:response,
      quote_Id:response.body.result.quote_id

      } */
    });
  }

  function updateQuote(payload, access_token) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.updateQuote}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response;

      /* response:response,
      quote_Id:response.body.result.quote_id

      } */
    });
  }

  function getQuotebyId(accessToken,quoteId)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.quoteById}${quoteId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getAllQuotes(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getAllQuotes}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getAllBooking(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getAllBooking}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
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
  
  function updateShipment(payload, access_token) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.shipmentUpdate}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }
  
  function createFirstSampleReport(payload, access_token) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.FirstSampleReport}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }
  function updateFirstSampleReport(payload, access_token) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.updateFirstSampleReport}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }

  function createFinalReport(payload, access_token) {
    return cy.request({
      method: 'POST',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.FinalReport}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: payload,
      failOnStatusCode: false, 
    }).then((response) => {
      return response; 
    });
  }

  function updateFinalReport(payload, access_token) {
    return cy.request({
      method: 'PATCH',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.updateFinalReport}`,
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
    createShipment,
    updateShipment,
    registerMachine,
    saveQuote,
    updateQuote,
    getQuotebyId,
    getAllQuotes,
    getAllBooking,
    createFirstSampleReport,
    updateFirstSampleReport,
    createFinalReport,
    updateFinalReport
  };
  