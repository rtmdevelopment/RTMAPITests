/// <reference types ="Cypress" />

const { login, createShipment, registerMachine, saveQuote, updateQuote, getShipmentById ,updateShipment,createFirstSampleReport,
    updateFirstSampleReport,createFinalReport,updateFinalReport
  } =
    require('../../support/utils/apiutils.js');
  
  import { shipmenPayload, shipUpdatePayload } from '../../fixtures/Shipment.js';
  import { registerMachinePayload, saveQuotePayload, updateQuotePayload } from '../../fixtures/BookMachine.js';
 
  import dayjs from 'dayjs';
 import utc from 'dayjs/plugin/utc';
 dayjs.extend(utc);
 
  const HirerLogin = require('../../fixtures/HirerLogin.json');
  const RenterLogin = require('../../fixtures/RenterLogin.json');
  
  
  describe('GetShipment Details by shpmentId and orderId', () => {
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
      login(`${HirerLogin.username}`, `${HirerLogin.password}`)
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
    it('Get Shipment Details By Shipment ID ', () => {
      cy.log('Current Order Id before check:', orderId);
      /*  cy.wrap(orderId).should('not.be.empty'); */
      login(`${HirerLogin.username}`, `${HirerLogin.password}`)
        .then((result) => {
          const accessToken = result.token; // Access the access_token
  
          const payload = shipmenPayload
        
          payload.orderid = orderId
          cy.log('Order Id is passed', orderId)
          createShipment(payload, accessToken).then((response) => {
  
            expect(response.status).to.eq(200);
            const shipmentId = response.body.result[0].shipment_id;
            cy.log('ShipmentId is', shipmentId)

            getShipmentById(accessToken,shipmentId).then((shipmentResponse) => {

                expect(shipmentResponse.status).to.eq(200);

                cy.task('queryDb', { query: `SELECT * FROM RTM.shipment_details where shipment_id = ${shipmentId}` }).then((dbResults) => {
                    expect(dbResults).to.have.length.greaterThan(0);

                    const dbShipment = dbResults[0]; // Get the first result, assuming shipment_id is unique.
                  

                    //  Compare the fields between the API response and DB response
            
                    // Compare each field in the response
                    expect(shipmentResponse.body.result.shipment_id).to.eq(dbShipment.shipment_id);
                    const apiShipmentDate = shipmentResponse.body.result.shipment_date;
                    const dbShipmentDate = dbShipment.shipment_date;
                    const apiDateUtc = dayjs(apiShipmentDate).utc();
                    const dbDateUtc = dayjs(dbShipmentDate).utc();
                
                   
                    cy.log('API Shipment Date (UTC):', apiDateUtc.format());
                    cy.log('DB Shipment Date (UTC):', dbDateUtc.format());
                
                   
                   /*  expect(apiDateUtc.isSame(dbDateUtc)).to.be.true;  */

                    cy.log('DB Shipment Date:', dbShipment.shipment_date);
                    /* expect(shipmentResponse.body.result.shipment_date).to.eq(dbShipment.shipment_date); */
                    expect(shipmentResponse.body.result.type_of_goods).to.eq(dbShipment.type_of_goods);
                    expect(shipmentResponse.body.result.description).to.eq(dbShipment.description);
                    expect(shipmentResponse.body.result.quantity).to.eq(dbShipment.quantity);
                    expect(shipmentResponse.body.result.UOM).to.eq(dbShipment.UOM);
                    expect(shipmentResponse.body.result.image).to.eq(dbShipment.image);
                    expect(shipmentResponse.body.result.invoice).to.eq(dbShipment.invoice);
                    expect(shipmentResponse.body.result.order_id).to.eq(dbShipment.order_id);
                    expect(shipmentResponse.body.result.received_quantity).to.eq(dbShipment.received_quantity); 
                    expect(shipmentResponse.body.result.received_status).to.eq(dbShipment.received_status); 
                 
                  


                })



            })
  
          });
        })
  
  
  
    })
    
    /* it('Validates Renter Review  Materials Sent by  Hirer ', () => {
      cy.log('Current Shipment Id before check:', shipmentId);
     
      login(`${RenterLogin.username}`, `${RenterLogin.password}`)
        .then((result) => {
          const accessToken = result.token; // Access the access_token
  
         const payload = shipUpdatePayload
         payload.orderid=orderId
         payload.shipment_details[0].shipmentid= shipmentId
         cy.log(payload.shipment_details[0].received_status)
         
          cy.log('Shipment Id is passed', shipmentId)
          updateShipment(payload, accessToken).then((response) => {
  
            expect(response.status).to.eq(200);
            
  
          });
        })
  
  
  
    })
   */
  
  
    })
  
  