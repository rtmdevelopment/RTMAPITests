/// <reference types ="Cypress" />
    import { username, password } from '../../fixtures/HiererLogin'


    describe ('Search Machine',()=>{
 it('auth',()=>{

    cy.request({

        method : 'POST',
        url : 'https://rtmws-a095aea7bc3e.herokuapp.com/api/users/login?username=&password=test',
       
        body : {
            
           "username" : username,
           "password" : password
       
        }
       
           }).then(Response=>{

            cy.log(JSON.stringify(Response));
            cy.log(Response.body.token);
            authtoken = Response.body.token;

           }


           )

 }



 )


    }




    )