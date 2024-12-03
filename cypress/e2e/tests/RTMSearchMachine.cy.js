/// <reference types = "Cypress"/>

const {getMachineDeatils,getMachineDeatilsByPage,login}=require('../../support/utils/apiutils');
const{searchMachineDetailsDB}=require('../../support/utils/dbUtils')
const { validateSearchMachineDetails } = require('../../e2e/Verifier/OrderVerifier');
import {serachMachine } from '../../fixtures/BookMachine.js';

const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');
let companyId
describe('Verify Search all machine details',() => {

it('Reterive all the Machine details when user search machines',()=>{

login(`${HirerLogin.username}`,`${HirerLogin.password}`).then((loginResult)=>{
    const accessToken = loginResult.token;
    companyId=loginResult.userId;
    
    
   const category = serachMachine.category
   const machineType = serachMachine.machineType
   

 getMachineDeatils(accessToken,category,machineType).then((response)=>{
 expect(response.status).to.be.eq(200);
 cy.log('Total Pages',response.body.totalPages)
 // Store all the paginated results in an array
 const allResults = [];
const maxPage=response.body.totalPages
const totalItems=response.body.totalItems

// Loop through each page and get results
for (let pageNumber = 1; pageNumber <= maxPage; pageNumber++) {
 getMachineDeatilsByPage(accessToken,category,machineType,pageNumber).then((pageResponse)=>{
  expect(pageResponse.status).to.be.eq(200);
  // Accumulate all the results in the array
  allResults.push(...pageResponse.body.paginatedResults); // spread operator to add each page's results
            
  cy.log(`Fetched data for Page ${pageNumber}:`, pageResponse.body.paginatedResults);
  
  // check after all pages are fetched
  if (pageNumber === maxPage) {
    cy.log('All pages fetched. Total records:', allResults.length);

    expect(totalItems).to.be.eq(allResults.length, 
      `Expected totalItems to be ${allResults.length}, but found ${totalItems}.`);
    
    cy.log(`Successfully validated totalItems: ${allResults.length} matches the expected value of ${totalItems}`);
    
    cy.log('companyId is',companyId)
    /* debugger; */

  searchMachineDetailsDB (companyId,category,machineType).then((dbResults)=>{

    console.log('DB Results Length:', dbResults.length);

    validateSearchMachineDetails (allResults, dbResults,)
    

 })

}
 

    })

}
})




})




})
})
