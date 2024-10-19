/// <reference types ="Cypress" />

const { login, createShipment, registerMachine, saveQuote, updateQuote, getQuotebyId ,updateShipment} =
  require('../../support/utils/apiutils.js');

import shipment, { shipmenPayload, shipUpdatePayload } from '../../fixtures/Shipment';
import { registerMachinePayload, saveQuotePayload, updateQuotePayload } from '../../fixtures/BookMachine';
import db from '../../support/utils/dbUtils.js';
/* import updateQuote from '../../fixtures/UpdateQuote.js'; */
const HiererLogin = require('../../fixtures/HiererLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');


describe('Hierer Renter postive flow', () => {
  let machineId;
  let quoteId;
  let orderId;
  let shipmentId;

  it('Validates Register a machine by Renter', () => {
    login(`${RenterLogin.username}`, `${RenterLogin.password}`)
      .then((result) => {
        const accessToken = result.token; // Access the access_token
        const payload = registerMachinePayload
        registerMachine(payload, accessToken).then((response) => {

          expect(response.status).to.eq(201);
          machineId = response.body.results[0].id;
          cy.log('Machine Id is', machineId)

        });
      })


  })

  it('Validates Hire a machine ', () => {
    cy.log('Current Machine Id before check:', machineId);
    /*  cy.wrap(machineId).should('not.be.empty'); */
    login(`${HiererLogin.username}`, `${HiererLogin.password}`)
      .then((result) => {
        const accessToken = result.token; // Access the access_token

        const payload = saveQuotePayload
        payload.machineid = machineId
        cy.log('Machine Id passed', machineId)
        saveQuote(payload, accessToken).then((response) => {

          expect(response.status).to.eq(201);
          quoteId = response.body.result.quote_id;
          cy.log('quote Id is', quoteId)

        });
      })



  })


  it('Renter Accept a quote ', () => {
    cy.log('Current Quote Id Passed:', quoteId);
    login(`${RenterLogin.username}`, `${RenterLogin.password}`)
      .then((result) => {
        const accessToken = result.token; // Access the access_token
        const payload = updateQuotePayload
        payload.quoteid = quoteId
        payload.machineid = machineId
        updateQuote(payload, accessToken).then((response) => {

          expect(response.status).to.eq(200);
          const BookingStatus = response.body.result.bookingSave.booking_status;
          cy.log('Quote Status is',BookingStatus)
          expect(BookingStatus).to.eq("accepted")
          const OrderStatus = response.body.result.orderSave.order_status;
          cy.log('Order Status is',OrderStatus)
          expect(OrderStatus).to.eq("order_initiated")
          if (BookingStatus === "accepted") {
            console.log("Assertion passed: Booking status is accepted.");
          } else {
            console.error("Assertion failed: Booking status is not accepted.");
          }
          orderId = response.body.result.orderSave.order_id;
          cy.log('Order Id is', orderId)

        });
      })



  })
  it('Validates Hirer Ship Materials to Renter ', () => {
    cy.log('Current Order Id before check:', orderId);
    /*  cy.wrap(orderId).should('not.be.empty'); */
    login(`${HiererLogin.username}`, `${HiererLogin.password}`)
      .then((result) => {
        const accessToken = result.token; // Access the access_token

        const payload = shipmenPayload
        payload.orderid = orderId
        cy.log('Order Id is passed', orderId)
        createShipment(payload, accessToken).then((response) => {

          expect(response.status).to.eq(200);
          shipmentId = response.body.result[0].shipment_id;
          cy.log('ShipmentId is', shipmentId)

        });
      })



  })
  it('Validates Renter Review  Materials Sent by  Hirer ', () => {
    cy.log('Current Shipment Id before check:', shipmentId);
    /*  cy.wrap(orderId).should('not.be.empty'); */
    login(`${RenterLogin.username}`, `${RenterLogin.password}`)
      .then((result) => {
        const accessToken = result.token; // Access the access_token

       const payload = shipUpdatePayload
       payload.orderid=orderId
       payload.shipmentid= shipmentId
       cy.log(payload.received_status)
       
        cy.log('Shipment Id is passed', shipmentId)
        updateShipment(payload, accessToken).then((response) => {

          expect(response.status).to.eq(200);
          

        });
      })



  })

})