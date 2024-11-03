const shipmenPayload = {
    "orderid": 24,
    "goods_status": "goods_in_transit",
    "shipment_datetime" : "2024-10-22 09:00:00",
    "invoice": "https://b2url/tools.pdf",
    "shipment_details": [
        {
            "typeofgoods": "raw_material",
            "quantity": 25,
            "description": "testAPICypress",
            "uom": "pieces",
            "image": "https://b2url/rawinvoice.pdf"
        }/* ,
        {
            "typeofgoods": "invoice",
            "invoice": "https://f005.backblazeb2.com/file/rtmfiles/file-sample_150kB.pdf"
        } */
    ]
}

const shipUpdatePayload = {
    "orderid": 63,
    "shipment_details": [
        {
            "typeofgoods": "raw_material",
            "shipmentid": 73,
            "received_status": "received_in_full",
            "received_quantity": 24
            
        },
        
    ]
}
  
module.exports = {
    shipmenPayload,
    shipUpdatePayload
  };