/// <reference types = "Cypress"/>

const { getMachineDetailsByCompanyId, login } = require('../../support/utils/apiutils');
const { getMachineDetailsDB } = require('../../support/utils/dbUtils');
const { validateMachineDetails } = require('../../e2e/Verifier/OrderVerifier');
const HirerLogin = require('../../fixtures/HirerLogin.json');


describe('Verify Get Machine Details', () => {

    it('Reterive all the Machine details for Company', () => {

        login(`${HirerLogin.username}`, `${HirerLogin.password}`).then((loginResult) => {
            const accessToken = loginResult.token;
            const CompanyId = loginResult.userId;
            cy.log("Company Id is", CompanyId)

            getMachineDetailsByCompanyId(accessToken).then((apiResponse) => {
                expect(apiResponse.status).to.be.eq(200);

                const apiMachineDetailsArray = apiResponse.body.result;
                console.log('API Response Length:', apiMachineDetailsArray);
                getMachineDetailsDB(CompanyId).then((dbResults) => {

                    console.log('DB Results Length:', dbResults.response.length);
                    

                    // Make sure the arrays are the same length
                    expect(apiMachineDetailsArray.length).to.equal(dbResults.response.length, 'API Response and DB Response matched in the number of records');
                      const dbResult=dbResults.response;
                          // Validate API and DB fields
                    validateMachineDetails(apiMachineDetailsArray, dbResult); 


                })

            })


        })
    })




})