const registerMachinePayload ={
    "machines": [
        {
            "category": "Cutting",
            "Model": "Test API Cypress",
            "machineType": "Band Saw",
            "brand": "brand cloud",
            "yearOfPurchase": "2023",
            "machineHourRate": "6",
            "comments": "Cutting Cypress my company",
            "identical": "yes",
            "variable_fields": {
                "tablesize_in_mm": "6",
                "noOfTSlots": "3",
                "swivelOfTable": "2",
                "standardArborSize": "3",
                "spindleTravel": "2",
                "longitudinalTravel": "1",
                "verticalTravel": "5",
                "crossTravel": "2",
                "quillSpindleDia_in_mm": "2",
                "typeOfFeed": "manual",
                "ppk_machine_hour_rate": "3"
            },
           
            "Machine_Photo": "/images/data.png"
        }
    ]
}


const saveQuotePayload= {"plannedstartdatetime" : "2024-11-22 13:00:00",
"plannedenddatetime": "2024-11-27 15:00:00",
"machineid": 5119,
"quantity" : 25,
"orderprocesssheet": "/rtmbuckets/quote/5001/process.pdf",
"orderspec": "/rtmbuckets/quote/5001/process.pdf",
"orderdrawing": "/rtmbuckets/quote/5001/process.pdf",
"orderprogramsheet": "/rtmbuckets/quote/5001/process.pdf",
"otherattachments": "/rtmbuckets/quote/5001/process.pdf"
}



const updateQuotePayload = {
    "quoteid": 2119,
    "plannedstartdatetime" : "2024-11-22 13:00:00",
"plannedenddatetime": "2024-11-27 15:00:00",
    "machineid": 5220,
    "quotestatus" : "accepted",
    "orderprocesssheet": "/rtmbuckets/quote/5001/process.pdf",
    "orderspec": "/rtmbuckets/quote/5001/process.pdf",
    "orderdrawing": "/rtmbuckets/quote/5001/process.pdf",
    "orderprogramsheet": "/rtmbuckets/quote/5001/process.pdf",
    "otherattachments": "/rtmbuckets/quote/5001/process.pdf",
    "hirerCompanyId":1040,
    "quantity": 25
}

const serachMachine= {
    category : "Cutting",
    machineType : "Band Saw",
}


module.exports = {
    saveQuotePayload,
    updateQuotePayload,
    registerMachinePayload,
    serachMachine
  };