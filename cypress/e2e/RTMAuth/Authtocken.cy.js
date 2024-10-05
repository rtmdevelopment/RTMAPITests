/// <reference types ="Cypress" />
    const dataJson = require ('../../fixtures/HiererLogin')


    describe('User Authorization',()=>{


it('get auth',()=>{


    cy.request({

 method : 'POST',
 url : 'https://rtmws-a095aea7bc3e.herokuapp.com/api/users/login?username=&password=test',

 body : {
     
    "username" : dataJson.username,
    "password" : dataJson.password

 }

    }).then((res)=>{
        cy.log(JSON.stringify(res))
        expect(res.status).eq(200)
    }

    )
})



    })