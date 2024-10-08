/// <reference types ="Cypress" />
import { username, password } from '../../fixtures/HiererLogin'

describe('Book a Machine', () => {
   it('tests Hier to book/renter a machine ', () => {

      cy.log('username is ', username);
      cy.generateToken(username, password).then((res) => {

         let token = res.body.token;
         const endpoint = '/api/booking/savequote';

         cy.fixture('BookMachine').then((data) => {

            const requestbody = data;

            cy.request({
               method: 'POST',
               url: (`${Cypress.env('BASE_URL')}${endpoint}`),
               body: requestbody,
               headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
               }
            })
               .then((savequote) => {
                  cy.log(savequote.body);
                  cy.log(savequote.body.result.quote_id)
                  expect(savequote.status).to.eq(201);



               }
               )


         })

      })


   })

})