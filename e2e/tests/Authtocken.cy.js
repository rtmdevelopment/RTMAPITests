/// <reference types ="Cypress" />
import { username, password } from '../../fixtures/HiererLogin'


    describe('User Authorization',()=>{


it('tests first login validation', ()=>{
    cy.log('username is ', username);
    cy.generateToken(username, password).then((res) => {
        let token = res.body.token;
        cy.request({
            method: 'GET',
            url: 'https://rtmws-a095aea7bc3e.herokuapp.com/api/users/isfirstlogin',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `Bearer ${token}`
            }
        }).then((firstLoginRes) => {
            cy.log(firstLoginRes.body);
            expect(firstLoginRes.body).to.equal(true);
        }).then(() => {
            cy.log('end of test');
        });
    });
})
    });