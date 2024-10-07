const axios = require('axios')
const errors = require('../error/error')
const { headerBody, outletsBody} = require('../header/api_header')
const db = require('../config/db');

exports.menuOfOutlet = async (req, res) => {
    const reqBody = req.body
    if(reqBody?.Region && reqBody?.ShopCode){

   
const requestBody =  {
    "RequestType": "ListOfMenuItems",
                      "MySId": "z4f!c83%634f.g#9g",
                      "Region": req?.body?.Region,
                      "Maincat": "AAB SWEETS",
                      "Subcat": "ALL",
                      "ShopCode": req?.body?.ShopCode,
                      "ExtPlatForm": "ONDC"
  }

    try {
        const response = await axios.post(
            'https://staging.aabsweets.com:9001/api/Listofitemsforonlineorders',
            requestBody, // Assuming this generates the request body
            {
                headers: headerBody()
            }
        );

        res.json(response.data);
     }  
    

    catch (error) {
        res.status(500).json({ error: error.message });
    
            // Handle errors
            console.error('Error calling the external API:', error.message);
            res.status(500).json({ error: 'Failed to call the external API' });

    }
}else{
    
    res.status(404).json({ error: 'Please give resion and shopcpoded'})
}
};