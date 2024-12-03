/// <reference types="Cypress" />
const { getCompanyById, login } = require('../../support/utils/apiutils.js');
const { fetchCompanyDetailsDB } = require('../../support/utils/dbUtils.js');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Validate Get Company Details API Calls', () => {
  let companiesFromDb = [];

  before(() => {
    // Fetch company details from DB before running the test
    fetchCompanyDetailsDB().then(dbResponse => {
      companiesFromDb = dbResponse.response; // Assign the company details to a variable
    });
  });

  it('should validate company details for each company in the DB', () => {
    // Iterate over companies using cy.each() for better control in Cypress
    cy.wrap(companiesFromDb).each((company) => {
      const userId = company.id;
      const expectedCompanyName = company.companyName;
      const expectedOffEmail = company.offEmail;
      const expectedFactoryEmail = company.factoryEmail;

      login(RenterLogin.username, RenterLogin.password).then((result) => {
        const accessToken = result.token; // Access the access_token

       
        // Call the API for this companyId
        getCompanyById(accessToken, userId).then((apiResponse) => {
          // Check if the API request is successful
          expect(apiResponse.status).to.eq(200);

          // Extract data from the API response
          const apiData = apiResponse.body.data;

          // Verify that the API response matches the DB data
          expect(apiData.companyName).to.eq(expectedCompanyName);
          expect(apiData.offEmail).to.eq(expectedOffEmail);
          expect(apiData.factoryEmail).to.eq(expectedFactoryEmail);
        });
      });
    });
  });
});
