/// <reference types = "Cypress"/>

const {getAllOrders,login}=require('../../support/utils/apiutils');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Verify GetAllOrders',() => {

    it('Reterive all the Orders',()=>{
    
    login(`${HirerLogin.username}`,`${HirerLogin.password}`).then((loginResult)=>{
        const accessToken = loginResult.token;
         const CompanyId =loginResult.userId;
    cy.log("Company Id is"   ,CompanyId)
    
        getAllOrders(accessToken).then((apiResponse)=>{
     expect(apiResponse.status).to.be.eq(200);
     
     const apiOrdersArray = apiResponse.body.results;
     console.log('API Response Length:', apiOrdersArray);
     
    
     cy.task('queryDb', { query: `select O.*, Q.quote_id, B.machine_id, B.actual_start_date_time, B.actual_end_date_time, M.Category, M.Machine_Type
        from RTM.order O , order_specs S , booking B , Machine_Info_Save M, quote Q where 
        O.order_id = S.order_id and O.booking_id = B.booking_id and B.machine_id = M.id and B.quote_id = Q.quote_id
        and (O.hirer_company_id = ${CompanyId} or O.renter_company_id = ${CompanyId});` }).then((results) => {
           
            console.log('DB Results Length:', results.length);
            
            // Make sure the arrays are the same length
            expect(apiOrdersArray.length).to.equal(results.length, 'API and DB match in the number of records');
            
            expect(results).to.have.length.greaterThan(0);
            results.forEach((dbRecord, index) => {
                const apiRecord = apiOrdersArray[index]; // Assuming apiResponse is the array from your API response.
                
                // Validate Category
                expect(apiRecord.Category).to.equal(dbRecord.Category, `Category Match for order ${dbRecord.order_id}`);
                
                // Validate Machine Type
                expect(apiRecord.Machine_Type).to.equal(dbRecord.Machine_Type, `Machine_Type Match for order ${dbRecord.order_id}`);
                
                // Validate actual start and end date-time (they should be within tolerance, if needed)
                /* expect(apiRecord.actual_start_date_time).to.equal(dbRecord.actual_start_date_time, `Start time mismatch for order ${dbRecord.order_id}`);
                expect(apiRecord.actual_end_date_time).to.equal(dbRecord.actual_end_date_time, `End time mismatch for order ${dbRecord.order_id}`);
                 */
                // Validate actual hours
                expect(apiRecord.actual_hours).to.equal(dbRecord.actual_hours, `Actual hours Match for order ${dbRecord.order_id}`);
                
                // Validate order status
                expect(apiRecord.order_status).to.equal(dbRecord.order_status, `Order status Match for order ${dbRecord.order_id}`);
                
                // Validate goods status
                expect(apiRecord.goods_status).to.equal(dbRecord.goods_status, `Goods status Match for order ${dbRecord.order_id}`);
                
                // Validate planned hours 
                expect(apiRecord.planned_hours).to.equal(dbRecord.planned_hours, `Planned hours Match for order ${dbRecord.order_id}`);
                 // Validate quantity
                expect(apiRecord.quantity).to.equal(dbRecord.quantity, `Quantity Match for order ${dbRecord.order_id}`);
                
                // Validate company IDs
                expect(apiRecord.hirer_company_id).to.equal(dbRecord.hirer_company_id, `Hirer company Match for order ${dbRecord.order_id}`);
                expect(apiRecord.renter_company_id).to.equal(dbRecord.renter_company_id, `Renter company Match for order ${dbRecord.order_id}`);
                
                // Validate quote ID, machine ID, and booking ID
                expect(apiRecord.quote_id).to.equal(dbRecord.quote_id, `Quote ID Match for order ${dbRecord.order_id}`);
                expect(apiRecord.machine_id).to.equal(dbRecord.machine_id, `Machine ID Match for order ${dbRecord.order_id}`);
                expect(apiRecord.booking_id).to.equal(dbRecord.booking_id, `Booking ID Match for order ${dbRecord.order_id}`);
            });

        
     })
    
        })
    
    
    })
})




})