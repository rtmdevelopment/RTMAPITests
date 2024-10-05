<reference types ="Cypress" />
    const dataJson = require ('../../fixtures/HiererLogin')


    describe ('Search Machine',()=>{
 it('auth',()=>{

    cy.request({

        method : 'POST',
        url : 'https://rtmws-a095aea7bc3e.herokuapp.com/api/users/login?username=&password=test',
       
        body : {
            
           "username" : dataJson.username,
           "password" : dataJson.password
       
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