/**
 * Function to sort an array of objects by a specific key in descending order.
 * @param {Array} array - Array of objects to be sorted.
 * @param {string} key - The key to sort by ('order_id').
 * @returns {Array} - Sorted array in descending order.
 */

const sortByFieldDesc = (array ,key)=> {

    if (!Array.isArray(array)) {
        console.error('Input is not an array:', array);
        throw new Error('Input must be an array');
    }

    return array.sort((a,b)=>{

if ( a[key] < b[key]){

    return 1;//b should display before a
}
if (a[key]> b[key]){

    return -1;//a should display before b
}
return 0;//equal a,b

    });
};

const assert =require('assert')


/**
 * Function to validate that the API response matches the DB result for order details.
 * @param {Array} apiOrdersArray - Array of orders from the API response.
 * @param {Array} dbResults - Array of orders from the DB query result.
 * @param {string} sortKey - The key by which to sort the orders before comparison
 */
const validateOrderDetails = (apiOrdersArray, dbResults, sortKey='order_id') => {
    const sortedApiOrders = sortByFieldDesc(apiOrdersArray, sortKey);
    const sortedDbResults = sortByFieldDesc(dbResults, sortKey);
    // Loop through each order from the DB and API response and compare fields
    sortedDbResults.forEach((dbRecord, index) => {
        const apiRecord = sortedApiOrders[index];

        // Validate Category
        expect(apiRecord.Category).to.equal(dbRecord.Category, `Category Matched for order ${dbRecord.order_id}`);

        // Validate Machine Type
        expect(apiRecord.Machine_Type).to.equal(dbRecord.Machine_Type, `Machine_Type Matched for order ${dbRecord.order_id}`);

        // Validate actual hours
        expect(apiRecord.actual_hours).to.equal(dbRecord.actual_hours, `Actual hours Matched for order ${dbRecord.order_id}`);

        // Validate order status
        expect(apiRecord.order_status).to.equal(dbRecord.order_status, `Order status Matched for order ${dbRecord.order_id}`);

        // Validate goods status
        expect(apiRecord.goods_status).to.equal(dbRecord.goods_status, `Goods status Matched for order ${dbRecord.order_id}`);

        // Validate planned hours
        expect(apiRecord.planned_hours).to.equal(dbRecord.planned_hours, `Planned hours Matched for order ${dbRecord.order_id}`);

        // Validate quantity
        expect(apiRecord.quantity).to.equal(dbRecord.quantity, `Quantity Matched for order ${dbRecord.order_id}`);

        // Validate company IDs
        expect(apiRecord.hirer_company_id).to.equal(dbRecord.hirer_company_id, `Hirer company Matched for order ${dbRecord.order_id}`);
        expect(apiRecord.renter_company_id).to.equal(dbRecord.renter_company_id, `Renter company Matched for order ${dbRecord.order_id}`);

        // Validate quote ID, machine ID, and booking ID
        expect(apiRecord.quote_id).to.equal(dbRecord.quote_id, `Quote ID Matched for order ${dbRecord.order_id}`);
        expect(apiRecord.machine_id).to.equal(dbRecord.machine_id, `Machine ID Matched for order ${dbRecord.order_id}`);
        expect(apiRecord.booking_id).to.equal(dbRecord.booking_id, `Booking ID Matchedx for order ${dbRecord.order_id}`);
    });
};

const verifyQuoteByIdDetails = (apiResponse, dbRecord) => {
    
// Validate Quote Id
    expect(apiResponse.quote_id).to.equal(dbRecord.quote_id, `Quote ID Matched: ${dbRecord.quote_id}`);

    /* // Validate Planned Start Date
    expect(apiResponse.planned_start_date_time).to.equal(dbRecord.planned_start_date_time, `Planned Start Date Matched: ${dbRecord.planned_start_date_time}`);
  
    // Validate Planned End Date
    expect(apiResponse.planned_end_date_time).to.equal(dbRecord.planned_end_date_time, `Planned End Date Matched: ${dbRecord.planned_end_date_time}`);
   */
    // Validate Machine ID
    expect(apiResponse.machine_id).to.equal(dbRecord.machine_id, `Machine ID Matched: ${dbRecord.machine_id}`);
  
    // Validate Order Drawing
    expect(apiResponse.order_drawing).to.equal(dbRecord.order_drawing, `Order Drawing Matched: ${dbRecord.order_drawing_url}`);
  
    // Validate Quote Status
    expect(apiResponse.quote_status).to.equal(dbRecord.quote_status, `Quote Status Matched: ${dbRecord.quote_status}`);
  
    // Validate Hirer Company ID
    expect(apiResponse.hirer_company_id).to.equal(dbRecord.hirer_company_id, `Hirer Company ID Matched: ${dbRecord.hirer_company_id}`);
  
    // Validate Renter Company ID
    expect(apiResponse.renter_company_id).to.equal(dbRecord.renter_company_id, `Renter Company ID Matched: ${dbRecord.renter_company_id}`);
  
    // Validate Quantity
    expect(apiResponse.quantity).to.equal(dbRecord.quantity, `Quantity Matched: ${dbRecord.quantity}`);
  
    /* // Validate Created At Timestamp
    expect(apiResponse.createdAt).to.equal(dbRecord.createdAt, `Created At Matched: ${dbRecord.created_at}`);
  
    // Validate Updated At Timestamp
    expect(apiResponse.updatedAt).to.equal(dbRecord.updatedAt, `Updated At Matched: ${dbRecord.updated_at}`); */
  
    };


/**
 * Function to validate that the API response matches the DB result for order details.
 * @param {Array} apiOrdersArray - Array of orders from the API response.
 * @param {Array} dbResults - Array of orders from the DB query result.
 * @param {string} sortKey - The key by which to sort the orders before comparison
 */
    const verifyAllQuoteDetails = (apiOrdersArray, dbResults, sortKey = 'machine_id') => {
        const sortedApiOrders = sortByFieldDesc(apiOrdersArray, sortKey);
        const sortedDbResults = sortByFieldDesc(dbResults, sortKey);
        // Loop through each order from the DB and API response and compare fields
        sortedDbResults.forEach((dbResponse, index) => {
            const apiResponse = sortedApiOrders[index];
            expect(apiResponse.quote_id).to.equal(dbResponse.quote_id, `Quote ID Matched: ${dbResponse.quote_id}`);

            // Validate Planned Start Date
            /* expect(apiResponse.planned_start_date_time).to.equal(dbResponse.planned_start_date_time, `Planned Start Date Matched: ${dbResponse.planned_start_date_time}`); */
          
            // Validate Planned End Date
            /* expect(apiResponse.planned_end_date_time).to.equal(dbResponse.planned_end_date_time, `Planned End Date Matched: ${dbResponse.planned_end_date_time}`); */
          
            // Validate Machine ID
            expect(apiResponse.machine_id).to.equal(dbResponse.machine_id, `Machine ID Matched: ${dbResponse.machine_id}`);
          
            // Validate Order Drawing URL
            expect(apiResponse.order_drawing).to.equal(dbResponse.order_drawing, `Order Drawing URL Matched: ${dbResponse.order_drawing}`);
          
            // Validate Quote Status
            expect(apiResponse.quote_status).to.equal(dbResponse.quote_status, `Quote Status Matched: ${dbResponse.quote_status}`);
          
            // Validate Hirer Company ID
            expect(apiResponse.hirer_company_id).to.equal(dbResponse.hirer_company_id, `Hirer Company ID Matched: ${dbResponse.hirer_company_id}`);
          
            // Validate Renter Company ID
            expect(apiResponse.renter_company_id).to.equal(dbResponse.renter_company_id, `Renter Company ID Matched: ${dbResponse.renter_company_id}`);
          
            // Validate Quantity
            expect(apiResponse.quantity).to.equal(dbResponse.quantity, `Quantity Matched: ${dbResponse.quantity}`);
          
           /*  // Validate Created At Timestamp
            expect(apiResponse.createdAt).to.equal(dbResponse.createdAt, `Created At Matched: ${dbResponse.createdAt}`);
          
            // Validate Updated At Timestamp
            expect(apiResponse.updatedAt).to.equal(dbResponse.updatedAt, `Updated At Matched: ${dbResponse.updatedAt}`); */
          
            // Validate Category
            expect(apiResponse.Category).to.equal(dbResponse.Category, `Category Matched: ${dbResponse.Category}`);
          
            // Validate Machine Type
            expect(apiResponse.Machine_Type).to.equal(dbResponse.Machine_Type, `Machine Type Matched: ${dbResponse.Machine_Type}`);
          
            // Validate Year of Purchase
            expect(apiResponse.Year_of_Purchase).to.equal(dbResponse.Year_of_Purchase, `Year of Purchase Matched: ${dbResponse.Year_of_Purchase}`);
          
          
          
            });
        };
        const verifyShipmentByIdDetails = (apiResponse, dbResponse) => {
    
            // Validate UOM
    expect(apiResponse.UOM).to.equal(dbResponse.UOM, `UOM Matched: ${dbResponse.UOM}`);

    // Validate Created At (Allow for a small time difference if necessary)
   /*  expect(apiResponse.createdAt).to.equal(dbResponse.createdAt, `Created At Matched: ${dbResponse.createdAt}`); */

    // Validate Description
    expect(apiResponse.description).to.equal(dbResponse.description, `Description Matched: ${dbResponse.description}`);

    // Validate Image URL
    expect(apiResponse.image).to.equal(dbResponse.image, `Image URL Matched: ${dbResponse.image}`);

    // Validate Invoice URL
    expect(apiResponse.invoice).to.equal(dbResponse.invoice, `Invoice URL Matched: ${dbResponse.invoice}`);

    // Validate Order ID
    expect(apiResponse.order_id).to.equal(dbResponse.order_id, `Order ID Matched: ${dbResponse.order_id}`);

    // Validate Quantity
    expect(apiResponse.quantity).to.equal(dbResponse.quantity, `Quantity Matched: ${dbResponse.quantity}`);

    // Validate Received Quantity
    expect(apiResponse.received_quantity).to.equal(dbResponse.received_quantity, `Received Quantity Matched: ${dbResponse.received_quantity}`);

    // Validate Received Status
    expect(apiResponse.received_status).to.equal(dbResponse.received_status, `Received Status Matched: ${dbResponse.received_status}`);

    // Validate Shipment Date (Allow a small difference if necessary)
   /*  expect(apiResponse.shipment_date).to.equal(dbResponse.shipment_date, `Shipment Date Matched: ${dbResponse.shipment_date}`); */

    // Validate Shipment ID
    expect(apiResponse.shipment_id).to.equal(dbResponse.shipment_id, `Shipment ID Matched: ${dbResponse.shipment_id}`);

    // Validate Type of Goods
    expect(apiResponse.type_of_goods).to.equal(dbResponse.type_of_goods, `Type of Goods Matched: ${dbResponse.type_of_goods}`);

    // Validate Updated At (Allow for a small time difference if necessary)
   /*  expect(apiResponse.updatedAt).to.equal(dbResponse.updatedAt, `Updated At Matched: ${dbResponse.updatedAt}`); */

              
                };


                const validateShipmentDetails = (apiShipmentDetailsArray, dbResults, sortKey='shipment_id') => {
                    const sortedApiOrders = sortByFieldDesc(apiShipmentDetailsArray, sortKey);
                    const sortedDbResults = sortByFieldDesc(dbResults, sortKey);
                    // Loop through each order from the DB and API response and compare fields
                    sortedDbResults.forEach((dbResponse, index) => {
                        const apiResponse = sortedApiOrders[index];
                
                       // Validate UOM
    expect(apiResponse.UOM).to.equal(dbResponse.UOM, `UOM Matched: ${dbResponse.UOM}`);

    // Validate Created At (Allow for a small time difference if necessary)
   /*  expect(apiResponse.createdAt).to.equal(dbResponse.createdAt, `Created At Matched: ${dbResponse.createdAt}`); */

    // Validate Description
    expect(apiResponse.description).to.equal(dbResponse.description, `Description Matched: ${dbResponse.description}`);

    // Validate Image URL
    expect(apiResponse.image).to.equal(dbResponse.image, `Image URL Matched: ${dbResponse.image}`);

    // Validate Invoice URL
    expect(apiResponse.invoice).to.equal(dbResponse.invoice, `Invoice URL Matched: ${dbResponse.invoice}`);

    // Validate Order ID
    expect(apiResponse.order_id).to.equal(dbResponse.order_id, `Order ID Matched: ${dbResponse.order_id}`);

    // Validate Quantity
    expect(apiResponse.quantity).to.equal(dbResponse.quantity, `Quantity Matched: ${dbResponse.quantity}`);

    // Validate Received Quantity
    expect(apiResponse.received_quantity).to.equal(dbResponse.received_quantity, `Received Quantity Matched: ${dbResponse.received_quantity}`);

    // Validate Received Status
    expect(apiResponse.received_status).to.equal(dbResponse.received_status, `Received Status Matched: ${dbResponse.received_status}`);

    // Validate Shipment Date (Allow a small difference if necessary)
   /*  expect(apiResponse.shipment_date).to.equal(dbResponse.shipment_date, `Shipment Date Matched: ${dbResponse.shipment_date}`); */

    // Validate Shipment ID
    expect(apiResponse.shipment_id).to.equal(dbResponse.shipment_id, `Shipment ID Matched: ${dbResponse.shipment_id}`);

    // Validate Type of Goods
    expect(apiResponse.type_of_goods).to.equal(dbResponse.type_of_goods, `Type of Goods Matched: ${dbResponse.type_of_goods}`);

    // Validate Updated At (Allow for a small time difference if necessary)
   /*  expect(apiResponse.updatedAt).to.equal(dbResponse.updatedAt, `Updated At Matched: ${dbResponse.updatedAt}`); */
                    });
                };
        
                

                const verifySampleReportByIdDetails = (apiSReportDetailsArray, dbResults, sortKey='id') => {
                    const sortedApiOrders = sortByFieldDesc(apiSReportDetailsArray, sortKey);
                    const sortedDbResults = sortByFieldDesc(dbResults, sortKey);
                    // Loop through each order from the DB and API response and compare fields
                    sortedDbResults.forEach((dbResponse, index) => {
                        const apiResponse = sortedApiOrders[index];
                
                        expect(apiResponse.UOM).to.equal(dbResponse.UOM, `UOM Matched: ${dbResponse.UOM}`);

                       /*  // Validate Created At
                        expect(apiResponse.createdAt).to.equal(dbResponse.createdAt, `Created At Matched: ${dbResponse.createdAt}`); */
                    
                        // Validate First Sample Disposition
                        expect(apiResponse.first_sample_disposition).to.equal(dbResponse.first_sample_disposition, `First Sample Disposition Matched: ${dbResponse.first_sample_disposition}`);
                    
                        // Validate First Sample Inspection Report
                        expect(apiResponse.first_sample_inspection_report).to.equal(dbResponse.first_sample_inspection_report, `First Sample Inspection Report Matched: ${dbResponse.first_sample_inspection_report}`);
                    
                        // Validate First Sample Quantity
                        expect(apiResponse.first_sample_quantity).to.equal(dbResponse.first_sample_quantity, `First Sample Quantity Matched: ${dbResponse.first_sample_quantity}`);
                    
                        // Validate First Sample Remarks
                        expect(apiResponse.first_sample_remarks).to.equal(dbResponse.first_sample_remarks, `First Sample Remarks Matched: ${dbResponse.first_sample_remarks}`);
                    
                        // Validate ID
                        expect(apiResponse.id).to.equal(dbResponse.id, `ID Matched: ${dbResponse.id}`);
                    
                        // Validate Inspection Date Time
                       /*  expect(apiResponse.inspection_date_time).to.equal(dbResponse.inspection_date_time, `Inspection Date Time Matched: ${dbResponse.inspection_date_time}`); */
                    
                        // Validate Order ID
                        expect(apiResponse.order_id).to.equal(dbResponse.order_id, `Order ID Matched: ${dbResponse.order_id}`);
                    
                        // Validate Part Name
                        expect(apiResponse.part_name).to.equal(dbResponse.part_name, `Part Name Matched: ${dbResponse.part_name}`);
                    
                        // Validate Part Number
                        expect(apiResponse.part_number).to.equal(dbResponse.part_number, `Part Number Matched: ${dbResponse.part_number}`);
                    
                        // Validate Updated At
                       /*  expect(apiResponse.updatedAt).to.equal(dbResponse.updatedAt, `Updated At Matched: ${dbResponse.updatedAt}`); */
                    
                    });
                };

                const verifyFinalReportByIdDetails = (apiSReportDetailsArray, dbResults, sortKey='id') => {
                    const sortedApiOrders = sortByFieldDesc(apiSReportDetailsArray, sortKey);
                    const sortedDbResults = sortByFieldDesc(dbResults, sortKey);
                    // Loop through each order from the DB and API response and compare fields
                    sortedDbResults.forEach((dbResponse, index) => {
                        const apiResponse = sortedApiOrders[index];
                
                        expect(apiResponse.UOM).to.equal(dbResponse.UOM, `UOM Matched: ${dbResponse.UOM}`);

                       /*  // Validate Created At
                        expect(apiResponse.createdAt).to.equal(dbResponse.createdAt, `Created At Matched: ${dbResponse.createdAt}`); */
                    
                        // Validate Final Product Disposition
                        expect(apiResponse.final_product_disposition).to.equal(dbResponse.final_product_disposition, `Final Product Disposition Matched: ${dbResponse.final_product_disposition}`);
                    
                        // Validate Final  Inspection Report
                        expect(apiResponse.final_inspection_report).to.equal(dbResponse.final_inspection_report, `Final  Inspection Report Matched: ${dbResponse.final_inspection_report}`);
                    
                        // Validate Final Approved Quantity
                        expect(apiResponse.final_product_approved_quantity).to.equal(dbResponse.final_product_approved_quantity, `Final Approved Quantity Matched: ${dbResponse.final_product_approved_quantity}`);
                    
                        // Validate Final Completion Remarks
                        expect(apiResponse.final_completion_remarks).to.equal(dbResponse.final_completion_remarks, `Final Completion Remarks Matched: ${dbResponse.final_completion_remarks}`);
                    
                        // Validate Final Report ID
                        expect(apiResponse.id).to.equal(dbResponse.id, `Final Report ID Matched: ${dbResponse.id}`);
                    
                        // Validate Completion Date Time
                       /*  expect(apiResponse.final_completion_date_time).to.equal(dbResponse.final_completion_date_time, `Inspection Date Time Matched: ${dbResponse.final_completion_date_time}`); */
                    
                       // Validate Final Goods Pickup Date Time
                       /*  expect(apiResponse.final_goods_planned_pickup_date_time).to.equal(dbResponse.final_goods_planned_pickup_date_time, `Inspection Date Time Matched: ${dbResponse.final_goods_planned_pickup_date_time}`); */
                    
                        // Validate Order ID
                        expect(apiResponse.order_id).to.equal(dbResponse.order_id, `Final Report Order ID Matched: ${dbResponse.order_id}`);
                    
                        // Validate Part Name
                        expect(apiResponse.part_name).to.equal(dbResponse.part_name, `Part Name Matched: ${dbResponse.part_name}`);
                    
                        // Validate Part Number
                        expect(apiResponse.part_number).to.equal(dbResponse.part_number, `Part Number Matched: ${dbResponse.part_number}`);
                    
                        // Validate Updated At
                       /*  expect(apiResponse.updatedAt).to.equal(dbResponse.updatedAt, `Updated At Matched: ${dbResponse.updatedAt}`); */
                    
                    });
                };
                

                const validateMachineDetails = (apiMachineDetailsArray, dbResults, sortKey = 'id') => {
                    // Sort API and DB results by the specified key (e.g., 'id')
                    const sortedApiMachines = sortByFieldDesc(apiMachineDetailsArray, sortKey);
                    const sortedDbMachines = sortByFieldDesc(dbResults, sortKey);
                  
                    // Loop through each machine from the DB and API response and compare fields
                    sortedDbMachines.forEach((dbMachine, index) => {
                      const apiMachine = sortedApiMachines[index];
                  
                     // Check if the id matches
expect(apiMachine.id).to.equal(dbMachine.id, `Machine IDs should match. API: ${apiMachine.id}, DB: ${dbMachine.id}`);

// Compare simple fields
expect(apiMachine.Category).to.equal(dbMachine.Category, `Same Values in Category. API: ${apiMachine.Category}, DB: ${dbMachine.Category}`);
expect(apiMachine.Machine_Type).to.equal(dbMachine.Machine_Type, `Same Values in Machine_Type. API: ${apiMachine.Machine_Type}, DB: ${dbMachine.Machine_Type}`);
expect(apiMachine.Brand).to.equal(dbMachine.Brand, `Same Values in Brand. API: ${apiMachine.Brand}, DB: ${dbMachine.Brand}`);
expect(apiMachine.Model).to.equal(dbMachine.Model, `Same Values in Model. API: ${apiMachine.Model}, DB: ${dbMachine.Model}`);
expect(apiMachine.Year_of_Purchase).to.equal(dbMachine.Year_of_Purchase, `Same Values in Year_of_Purchase. API: ${apiMachine.Year_of_Purchase}, DB: ${dbMachine.Year_of_Purchase}`);
expect(apiMachine.Machine_Hour_Rate).to.equal(dbMachine.Machine_Hour_Rate, `Same Values in Machine_Hour_Rate. API: ${apiMachine.Machine_Hour_Rate}, DB: ${dbMachine.Machine_Hour_Rate}`);
expect(apiMachine.Machine_Name).to.equal(dbMachine.Machine_Name, `Same Values in Machine_Name. API: ${apiMachine.Machine_Name}, DB: ${dbMachine.Machine_Name}`);
expect(apiMachine.Comments).to.equal(dbMachine.Comments, `Same Values in Comments. API: ${apiMachine.Comments}, DB: ${dbMachine.Comments}`);
expect(apiMachine.Identical).to.equal(dbMachine.Identical, `Same Values in Identical. API: ${apiMachine.Identical}, DB: ${dbMachine.Identical}`);
expect(apiMachine.Machine_Photo).to.equal(dbMachine.Machine_Photo, `Same Values in Machine_Photo. API: ${apiMachine.Machine_Photo}, DB: ${dbMachine.Machine_Photo}`);
expect(apiMachine.Score).to.equal(dbMachine.Score, `Same Values in Score. API: ${apiMachine.Score}, DB: ${dbMachine.Score}`);
expect(apiMachine.CompanyId).to.equal(dbMachine.CompanyId, `Same Values in CompanyId. API: ${apiMachine.CompanyId}, DB: ${dbMachine.CompanyId}`);

// Validate Variable Fields :get all the keys from variable fields
Object.keys(apiMachine.Variable_fields).forEach((key) => {
  expect(apiMachine.Variable_fields[key]).to.equal(dbMachine.Variable_fields[key], `Same Values in Variable Field: ${key}. API: ${apiMachine.Variable_fields[key]}, DB: ${dbMachine.Variable_fields[key]}`);
});
                      });
                    }
                    
// Export the function so it can be used in test files
module.exports = { validateOrderDetails ,verifyQuoteByIdDetails,verifyAllQuoteDetails,validateMachineDetails,
    verifyShipmentByIdDetails,validateShipmentDetails,verifySampleReportByIdDetails,verifyFinalReportByIdDetails};
