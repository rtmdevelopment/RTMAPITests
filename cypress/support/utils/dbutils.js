const getOrderDB = (CompanyId) => {

return cy.task('queryDb',{

    
    query: `select O.*, Q.quote_id, B.machine_id, B.actual_start_date_time, B.actual_end_date_time, M.Category, M.Machine_Type
        from RTM.order O , order_specs S , booking B , Machine_Info_Save M, quote Q where 
        O.order_id = S.order_id and O.booking_id = B.booking_id and B.machine_id = M.id and B.quote_id = Q.quote_id
        and (O.hirer_company_id = ${CompanyId} or O.renter_company_id = ${CompanyId});`


})
}
const searchMachineDetailsDB = (companyId,category,machineType) => {

    return cy.task('queryDb',{
    
        
        query: `SELECT 
    m.Category, 
    m.Machine_Type, 
    m.Brand, 
    m.Model, 
    m.Machine_Name,
    m.Machine_Hour_Rate, 
    m.Variable_fields, 
    m.Score, 
    m.CompanyId, 
    m.id, 
    c.CompanyName, 
    a.factoryPin, 
    a.factoryLatitude, 
    a.factoryLongitude, 
    m.Machine_Photo
FROM 
    Machine_Info_Save m
JOIN 
    Company c ON m.CompanyId = c.id
JOIN 
    Company_Address a ON c.id = a.CompanyId
WHERE 
    m.Category = '${category}' 
    AND m.Machine_Type = '${machineType}'
    AND m.CompanyId !=${companyId};`
    
    
    })
    }
const getAllQuoteDB = (CompanyId) => {

    return cy.task('queryDb',{
    
        
        query: `select O.*, M.Category, M.Machine_Type,M.Year_of_Purchase
        from quote O, Machine_Info_Save M where (O.hirer_company_id = ${CompanyId} or O.renter_company_id = ${CompanyId}) and 
        O.quote_status <> "accepted" and   O.quote_status <> "rejected" and M.id=O.machine_id;`
    
    
    })
    }

    const getAllShipmentByOrderDB = (orderID) => {

        return cy.task('queryDb',{
        
            
            query: `SELECT * FROM RTM.shipment_details where order_id =${orderID}`
        
        
        })
        }

    const fetchQuoteIdDB = () => {
        return cy.task('queryDb', {
            query: `SELECT * FROM RTM.quote ORDER BY createdAt DESC LIMIT 1;`
        }).then((response) => {
            //  response is an array and we want the first (most recent) record
            const topRecord = response[0];  // Get the first record
            const quoteId = topRecord.quote_id;  // Extract quote_id
            const hirerCompanyId = topRecord.hirer_company_id;  // Extract hirer_company_id
    
            // Return an object with both values for further use
            return { quoteId, hirerCompanyId };
        });
    };

    const fetchShipmentIdDB = () => {
        return cy.task('queryDb', {
            query: `SELECT * FROM shipment_details ORDER BY createdAt DESC LIMIT 1;`
        }).then((response) => {
            //  response is an array and we want the first (most recent) record
            const topRecord = response[0];  // Get the first record
            const orderID = topRecord.order_id;  // Extract order_id
           const shipmentId =topRecord.shipment_id
            // Return an object with both values for further use
            return { orderID ,shipmentId};
        });
    };
const fetchShipmentByIdDB=(shipmentID)=>{

    return cy.task('queryDb',{
query:`SELECT * FROM RTM.shipment_details where shipment_id =${shipmentID}`

    })
}

const fetchCompanyEmailDB = (userId) =>{

    return cy.task('queryDb',{

        query:  `SELECT offEmail FROM Company WHERE id = ${userId}`

    }).then((response)=>{
const userEmail=response[0].offEmail;
return { userEmail };


    })
}

const fetchCompanyDetailsDB = () =>{

    return cy.task('queryDb',{

        query:  `SELECT * FROM Company`

    }).then((response)=>{

return { response };


    })
}


/* const getMachineDetailsDB = (CompanyId) =>{

    return cy.task('queryDb',{

        query:  `select * from Machine_Info_Save where CompanyId =${CompanyId}`

    })
} */

    const getMachineDetailsDB = (CompanyId) => {
        return cy.task('queryDb', {
          query: `SELECT * FROM Machine_Info_Save WHERE CompanyId = ${CompanyId}`,
        }).then((response) => {
          // Ensure Identical field is treated as integer or boolean
          response.forEach((row) => {
            row.Identical = row.Identical === 1 || row.Identical === '1'; // Convert to boolean
          });
      
          return { response };
        });
      };
      
const fetchOrderCompanyIdDB = (orderID) =>{

    return cy.task('queryDb',{

        query:  `SELECT hirer_company_id from RTM.order where order_id = ${orderID}`

    }).then((response)=>{
const companyId=response[0].hirer_company_id;
return { companyId };


    })
}
const fetchQuoteByIdDB = (quoteId) =>{

    return cy.task('queryDb',{

        query:  `SELECT * FROM quote where quote_id= ${quoteId}`

    })
}
const fetchSampleReportIdDB = () => {
    return cy.task('queryDb', {
        query: `SELECT * FROM first_sample_report ORDER BY createdAt DESC LIMIT 1;`
    }).then((response) => {
        //  response is an array and we want the first (most recent) record
        const topRecord = response[0];  // Get the first record
        const orderID = topRecord.order_id;  // Extract order_id
       const sampleId =topRecord.id
        // Return an object with both values for further use
        return { orderID ,sampleId};
    });
};
const fetchSampleReportByOrderDB = (orderID) => {

    return cy.task('queryDb',{
    
        
        query: `SELECT * FROM first_sample_report where order_id =${orderID}`
    
    
    })
    }
    const fetchFinalReportIdDB = () => {
        return cy.task('queryDb', {
            query: `SELECT * FROM final_report ORDER BY createdAt DESC LIMIT 1;`
        }).then((response) => {
            //  response is an array and we want the first (most recent) record
            const topRecord = response[0];  // Get the first record
            const orderID = topRecord.order_id;  // Extract order_id
           const finalId =topRecord.id
            // Return an object with both values for further use
            return { orderID ,finalId};
        });
    };

    const fetchFinalReportByOrderDB = (orderID) => {

        return cy.task('queryDb',{
        
            
            query: `SELECT * FROM final_report where order_id =${orderID}`
        
        
        })
        }

module.exports ={

    getOrderDB,
    fetchQuoteIdDB,
    fetchCompanyEmailDB,getMachineDetailsDB,searchMachineDetailsDB,
    fetchQuoteByIdDB,getAllQuoteDB,fetchShipmentIdDB,fetchOrderCompanyIdDB,fetchShipmentByIdDB,
    getAllShipmentByOrderDB,fetchSampleReportIdDB,fetchSampleReportByOrderDB,fetchFinalReportIdDB,
    fetchFinalReportByOrderDB,fetchCompanyDetailsDB
};