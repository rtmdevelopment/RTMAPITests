/// <reference types ="Cypress" />

const {  getQuotebyId,getAllQuotes,login,createShipment,registerMachine,saveQuote,updateQuote,updateShipment,createFirstSampleReport,
    updateFirstSampleReport,createFinalReport,updateFinalReport
  } =
    require('../../support/utils/apiutils.js');
    import { registerMachinePayload, saveQuotePayload, updateQuotePayload } from '../../fixtures/BookMachine';
    const HiererLogin = require('../../fixtures/HiererLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');


describe('Verify GetQuote API calls', () => {
    
    

        it('Validate GetQuoteById and GetAllQuotes API calls when Quote is Accepted by Renter', () => {
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
                login(`${HiererLogin.username}`, `${HiererLogin.password}`).then((hireLoginResult) => {
                  const hireAccessToken = hireLoginResult.token;
                  const hirePayload = saveQuotePayload;
                  hirePayload.machineid = machineId;
          
                  cy.log('Machine Id passed for hiring', machineId);
                  saveQuote(hirePayload, hireAccessToken).then((saveQuoteResponse) => {
                    expect(saveQuoteResponse.status).to.eq(201);
                    const quoteId = saveQuoteResponse.body.result.quote_id;
                    cy.log('Quote Id is', quoteId);
            /*         // Set quoteId in Cypress environment for sharing between tests
            Cypress.env('quoteId', quoteId);  */
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
          const orderId = response.body.result.orderSave.order_id;
          cy.log('Order Id is', orderId)

        });
      })

                    
                    getQuotebyId(accessToken,quoteId).then((quotebyIdResponse) => { 
                        expect(quotebyIdResponse.status).to.eq(200);
                        const hirerCompanyId=quotebyIdResponse.body.result.hirer_company_id;
                        const renterCompanyId=quotebyIdResponse.body.result.renter_company_id;
                        cy.log('Quote Status:', quotebyIdResponse.body.result.quote_status);
                        expect(quotebyIdResponse.body.result.quote_status).to.eq('accepted');


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
                                expect(lastQuoteId.quote_id).to.not.eq(quoteId); 
                               cy.log('Aceepted quote_id in the response: ', quoteId);

                               


                            
                          });

                    });
          
                  });
                });
              });
            });
          });
          
        })

       
    })