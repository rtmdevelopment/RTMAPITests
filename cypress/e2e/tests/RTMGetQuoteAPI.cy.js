/// <reference types ="Cypress" />

const {  getQuotebyId,getAllQuotes,login,createShipment,registerMachine,saveQuote,updateQuote,updateShipment,createFirstSampleReport,
    updateFirstSampleReport,createFinalReport,updateFinalReport
  } =
    require('../../support/utils/apiutils.js');
    import { registerMachinePayload, saveQuotePayload, updateQuotePayload } from '../../fixtures/BookMachine';
    const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');


describe('Verify GetQuote API calls', () => {
    let machineId;
    

        it('Validate GetQuoteById and GetAllQuotes API calls with Db Query', () => {
            // Step 1: Register a machine by Renter
            login(`${RenterLogin.username}`, `${RenterLogin.password}`).then((loginResult) => {
              const accessToken = loginResult.token;
              const payload = registerMachinePayload;
          
              // Register the machine
              registerMachine(payload, accessToken).then((registerResponse) => {
                expect(registerResponse.status).to.eq(201);
                const machineId = registerResponse.body.results[0].id;
                cy.log('Machine Id is', machineId);
          
                // Hire a machine as Hirer
                login(`${HirerLogin.username}`, `${HirerLogin.password}`).then((hireLoginResult) => {
                  const hireAccessToken = hireLoginResult.token;
                  const hirePayload = saveQuotePayload;
                  hirePayload.machineid = machineId;
          
                  cy.log('Machine Id passed for hiring', machineId);
                  saveQuote(hirePayload, hireAccessToken).then((saveQuoteResponse) => {
                    expect(saveQuoteResponse.status).to.eq(201);
                    const quoteId = saveQuoteResponse.body.result.quote_id;
                    cy.log('Quote Id is', quoteId);
                    // Set quoteId in Cypress environment for sharing between tests
            Cypress.env('quoteId', quoteId); 
                    
                    getQuotebyId(accessToken,quoteId).then((quotebyIdResponse) => { 
                        expect(quotebyIdResponse.status).to.eq(200);
                        const hirerCompanyId=quotebyIdResponse.body.result.hirer_company_id;
                        const renterCompanyId=quotebyIdResponse.body.result.renter_company_id;


                        cy.task('queryDb', { query: `SELECT * FROM RTM.quote where quote_id = ${quoteId}` }).then((results) => {
                            // Use the results in tests
                            expect(results).to.have.length.greaterThan(0);
                            const dbQueryResult = results[0];
                            expect(dbQueryResult).to.have.property('quote_id', quoteId);
                            expect(dbQueryResult).to.have.property('machine_id',machineId);
                            expect(dbQueryResult).to.have.property('hirer_company_id',hirerCompanyId);
                            expect(dbQueryResult).to.have.property('renter_company_id',renterCompanyId);


                            getAllQuotes(accessToken).then((allQuoteResponse) => { 
                                expect(allQuoteResponse.status).to.eq(200);
                                expect(allQuoteResponse.body.result).to.be.an('array').that.is.not.empty;
                                // Get the last quote in the array
                                const lastQuoteId = allQuoteResponse.body.result[allQuoteResponse.body.result.length - 1];
                                // Validate that the last quote_id matches the one we passed in the previous request
                                expect(lastQuoteId).to.have.property('quote_id', quoteId);
                               cy.log('Last quote_id in the response: ', lastQuoteId.quote_id);

                               


                            
                          });

                    });
          
                  });
                });
              });
            });
          });
          
        })

       
    })