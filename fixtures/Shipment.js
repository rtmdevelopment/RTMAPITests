const shipment = {
    "orderid": 24,
    "goods_status": "goods_in_transit",
    "shipment_datetime" : "2024-09-22 09:00:00",
    "invoice": "https://b2url/tools.pdf",
    "shipment_details": [
        {
            "typeofgoods": "raw_material",
            "quantity": 1,
            "description": "test",
            "uom": "pieces",
            "image": "https://b2url/rawinvoice.pdf"
        },
        {
            "typeofgoods": "gauge",
            "quantity": 1,
            "description": "test",
            "uom": "pieces",
            "image": "https://b2url/rawinvoice.pdf"
            
        }
    ]
}
  
  export default shipment;