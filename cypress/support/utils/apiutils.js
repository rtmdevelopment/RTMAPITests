

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
            userId: response.body.userData,
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
  function getMachineDeatils(accessToken,category,machineType)
  {
      return  cy.request({
          method: 'GET',
          url: `${apiconfig.baseUrl}${apiconfig.endpoints.getMachine}category=${category}&machineType=${machineType}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          failOnStatusCode: false, 
        }).then((response) => {
          return response;
        })
  }
  function getMachineDeatilsByPage(accessToken,category,machineType,pageNumber)
  {
      return  cy.request({
          method: 'GET',
          url: `${apiconfig.baseUrl}${apiconfig.endpoints.getMachine}category=${category}&machineType=${machineType}&page=${pageNumber}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          failOnStatusCode: false, 
        }).then((response) => {
          return response;
        })
  }
  function getCompanyById(accessToken,userId)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.companyById}${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getMachineDetailsByCompanyId(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.machineDeatilsById}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
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
      timeout: 30000, 
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

function getAllOrders(accessToken)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getAllOrder}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getShipmentById(accessToken,shipmentId)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getShipmentId}${shipmentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}
function getShipmentByOrderId(accessToken,orderID)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getShipmentByOrderId}${orderID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}

function getFirstSampleReportByOrderId(accessToken,orderID)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getFirstSampleByOrderId}${orderID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        failOnStatusCode: false, 
      }).then((response) => {
        return response;
      })
}
function getFinalReportByOrderId(accessToken,orderID)
{
    return  cy.request({
        method: 'GET',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.getFinalReportByOrderId}${orderID}`,
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
    getMachineDeatils,
    getMachineDeatilsByPage,
    getCompanyById,
    getMachineDetailsByCompanyId,
    saveQuote,
    updateQuote,
    getQuotebyId,
    getShipmentByOrderId,
    getAllQuotes,
    getAllBooking,
    getAllOrders,
    getFirstSampleReportByOrderId,
    getFinalReportByOrderId,
    getShipmentById,
    createFirstSampleReport,
    updateFirstSampleReport,
    createFinalReport,
    updateFinalReport
  };
  