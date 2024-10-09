const axios = require('axios')
const errors = require('../../error/error')
const { headerBody,apiERPEndPoint,contentBody} = require('../../helpers/api_header')
const db = require('../../config/db');
const transformData = require('../services/menu.service')

exports.syncOfOutlet = async (req, res) => {
    const reqBody = req.body
    if(reqBody?.Region && reqBody?.ShopCode){
    try {
        const apiURL = process.env.ERP_URL+ apiERPEndPoint().getMenuOfOutlet;
        const Body = contentBody('getMenuBody')
        const header =headerBody()
        Body.Region =reqBody?.Region
        Body.ShopCode =reqBody?.ShopCode
        const response = await axios.post( apiURL,  Body, {  headers: header  } );
    if(response?.data){
        const updateresponce =  await transformData.transformData(response.data)
        res.status(200).json({data:updateresponce,statusText:response.statusText});
    }
       
       
     }  
    
    catch (error) {
        res.status(500).json({ error: error.message });
        
            res.status(500).json({ error: errors[500] });

    }
}else{
    res.status(404).json({ error: errors[404]})
   
}
};






