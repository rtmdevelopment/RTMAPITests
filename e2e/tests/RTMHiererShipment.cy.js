/// <reference types ="Cypress" />

const { login,createShipment } = require('../../support/utils/apiutils.js');

import shipment from '../../fixtures/Shipment';
const HiererLogin = require('../../fixtures/HiererLogin.json');
const payload = shipment

    describe('Create shipment', () => {
        it('Validate Hierer is able to create shipment', () => {
          login(`${HiererLogin.username}`, `${HiererLogin.password}`)
          .then((result) => {
            const accessToken = result.token; // Access the access_token
           
            createShipment(payload, accessToken).then((response) => {
              expect(response.status).to.eq(200); 
            
            });
          })
        })
      
      })