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
        
        

// Export the function so it can be used in test files
module.exports = { validateOrderDetails ,verifyQuoteByIdDetails,verifyAllQuoteDetails,verifyShipmentByIdDetails,validateShipmentDetails};
