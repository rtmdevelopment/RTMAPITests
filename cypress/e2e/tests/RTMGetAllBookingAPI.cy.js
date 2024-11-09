/// <reference types = "Cypress"/>

const {getAllBooking,login}=require('../../support/utils/apiutils');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Verify GetAllBooking',() => {

it('Reterive all the booking records for Hirer',()=>{

login(`${HirerLogin.username}`,`${HirerLogin.password}`).then((loginResult)=>{
    const accessToken = loginResult.token;
    
   const companyId = loginResult.userId;
    
    cy.log('companyId', companyId);
    cy.log('access', accessToken);

   
    getAllBooking(accessToken).then((response)=>{
 expect(response.status).to.be.eq(200);

 cy.wrap(response.body.results).each((booking) => {
    expect(booking.hirer_company_id).to.eq(companyId);  // Assert Hirer_company_id is the same for each Booking
  });

    })


})




})




})

