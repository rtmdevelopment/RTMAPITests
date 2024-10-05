/// <reference types ="Cypress" />
    import { username, password } from '../../fixtures/HiererLogin'


    describe('User Authorization',()=>{


it('get auth',()=>{


    cy.request({

 method : 'POST',
 url : 'https://rtmws-a095aea7bc3e.herokuapp.com/api/users/login?username=&password=test',

 body : {
     
    "username" : username,
    "password" : password

 }

    }).then((res)=>{
        cy.log(JSON.stringify(res))
        expect(res.status).eq(200)
    }

    )
})



    })