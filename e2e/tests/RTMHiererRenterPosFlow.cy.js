/// <reference types ="Cypress" />

const { login,createShipment,registerMachine,saveQuote,getQuotebyId } = 
require('../../support/utils/apiutils.js');

import shipment from '../../fixtures/Shipment';
import { registerMachinePayload, saveQuotePayload, updateQuotePayload }from '../../fixtures/BookMachine';
import db from '../../support/utils/dbUtils.js';
/* import updateQuote from '../../fixtures/UpdateQuote.js'; */
const HiererLogin = require('../../fixtures/HiererLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');


    describe('Hierer Renter postive flow', () => {
        let machineId ;

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
            cy.log('Machine Id passed',machineId)
            saveQuote(payload, accessToken).then((response) => {
               
                expect(response.status).to.eq(201); 
               let quote_id = response.body.result.quote_id;
                cy.log('quote Id is', quote_id)
            
            });
          })


       
        })
      
/* 
        it('Renter Accept a quote ', () => {
            login(`${RenterLogin.username}`, `${RenterLogin.password}`)
             .then((result) => {
               const accessToken = result.token; // Access the access_token
               const payload = updateQuotePayload
               updateQuote(payload, accessToken).then((response) => {
                  
                   expect(response.status).to.eq(200); 
                  let quote_id = response.body.result.quote_id;
                   cy.log('quote Id is', quote_id)
               
               });
             })
   
   
          
           }) */
         
      })