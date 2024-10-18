/// <reference types ="Cypress" />

const { login,createShipment } = require('../../support/utils/apiutils.js');

import shipment from '../../fixtures/Shipment';
    import {dbConnection} from '../../support/utils/dbUtils.js';
const HiererLogin = require('../../fixtures/HiererLogin.json');
const payload = shipment
let orderid = shipment.orderid
orderid = 25

    describe('Create shipment', () => {
        it('Validate Hierer is able to create shipment', () => {
          login(`${HiererLogin.username}`, `${HiererLogin.password}`)
          .then((result) => {
            const accessToken = result.token; // Access the access_token
            
           cy.log('orderid is' + orderid );
            createShipment(payload, accessToken).then((response) => {
              expect(response.status).to.eq(200); 
            
            });
          })
        })
      
      })