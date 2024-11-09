/// <reference types = "Cypress"/>

const {getAllOrders,login}=require('../../support/utils/apiutils');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Verify GetAllOrders',() => {

    it('Reterive all the Orders',()=>{
    
    login(`${HirerLogin.username}`,`${HirerLogin.password}`).then((loginResult)=>{
        const accessToken = loginResult.token;
    
    
        getAllOrders(accessToken).then((response)=>{
     expect(response.status).to.be.eq(200);
    
     
    
        })
    
    
    })
})




})