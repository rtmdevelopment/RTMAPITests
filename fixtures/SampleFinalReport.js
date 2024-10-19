const createFirstSampleReportPayload ={
    "orderid": 1,
    "inspection_date_time": "2024-08-24 13:00:00",
    "part_name" : "newdb",
    "part_number" : "newdb12345",
    "first_sample_quantity": 1,
    "uom": "pieces",
    "first_sample_disposition": "pending_approval",
    "first_sample_inspection_report" : "https://b2url/newdb.pdf"
}



const updateFirstSampleReportPayload ={
    
        "orderid": 1,
        "first_sample_id" : 1,
        "first_sample_disposition": "approved",
        "first_sample_remarks" : "looking_good"
    }

    const createFinalReportPayload ={

        
            "orderid": 1,
            "completion_date_time": "2024-09-01 11:00:00",
            "part_name" : "test",
            "part_number" : "xyz12",
            "order_ok_quantity": 250,
            "uom": "pieces",
            "final_product_disposition": "pending_approval",
            "prod_lot_inspection_report" : "https://b2url/rawinvoice.pdf",
            "order_completion_remarks": "order_quantity_completed"
        
    }

    const updateFinalReportPayload ={
        "orderid": 1,
        "final_report_id" : 1,
        "final_report_disposition": "approved",
        "final_report_remarks" : "very_satisfied",
        "final_approved_quantity" : 250,
        "final_completion_date_time" : "2024-09-02 08:00:00",
        "final_goods_planned_pickup_datetime" : "2024-09-06 09:00:00"
    }

module.exports =
{
    createFirstSampleReportPayload,
    updateFirstSampleReportPayload,
    createFinalReportPayload,
    updateFinalReportPayload

}