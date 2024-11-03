// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
///<reference types="Cypress"/>
/// 


Cypress.Commands.add('generateToken', (username, password) => {
    const endpoint = '/api/users/login';
    return cy.request({
        method: 'POST',
        url: (`${Cypress.env('BASE_URL')}${endpoint}`), // Corrected the URL
        body: {
            username: username,
            password: password,
        }
    }).then(response => { return response });
});

Cypress.Commands.add('updateQuote', (quote) => { 
    
    const endpoint = '/api/booking/updatequote';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQwLCJDb21wYW55SWQiOjEwNDAsImlhdCI6MTcyODUzMDkyNCwiZXhwIjoxNzI4NTQ1MzI0fQ.YHFilcjZT_jSzaVC5cfl1-3knP2gCSHkT1mXAE8JUW8'
    cy.request({
        url:(`${Cypress.env('BASE_URL')}${endpoint}`),
        method: 'PATCH',
        body: quote,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
         },
        failOnStatusCode: false
      }).then(response => {return response })
 })

