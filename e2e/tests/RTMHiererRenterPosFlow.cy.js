/// <reference types ="Cypress" />

const { login,createShipment,registerMachine,saveQuote,getQuotebyId } = require('../../support/utils/apiutils.js');

import shipment from '../../fixtures/Shipment';
const HiererLogin = require('../../fixtures/HiererLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');
const payload = shipment

    describe('Hierer Renter postive flow', () => {
        it('Validates Hirer able to Hire a machine and receive the final product from Renter', () => {
          login(`${HiererLogin.username}`, `${HiererLogin.password}`)
          .then((result) => {
            const accessToken = result.token; // Access the access_token
           
            saveQuote(payload, accessToken).then((response) => {
              expect(response.status).to.eq(201); 
            
            });
          })
        })
      
      })