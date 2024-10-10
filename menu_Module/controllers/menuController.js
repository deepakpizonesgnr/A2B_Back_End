const axios = require('axios')
const errors = require('../../error/error')
const { headerBody,apiERPEndPoint,contentBody} = require('../../helpers/api_header')
const db = require('../../config/db');
const service = require('../services/menu.service')

exports.menuOfOutlet = async (req, res) => {
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
        await service.updateData(response.data)
    }
       
        res.json(response.data);
     }  
    
    catch (error) {
        res.status(500).json({ error: error.message });
        
            res.status(500).json({ error: errors[500] });

    }
}else{
    res.status(404).json({ error: errors[404]})
   
}
};

exports.syncOfOutlet = async (req, res) => {
    const reqBody = req.body
    if(reqBody?.Region && reqBody?.ShopCode && reqBody?.restaurantId){
    try {
        const swiggyURL = process.env.SWIGGY_URL
        const apiURL = process.env.ERP_URL+ apiERPEndPoint().getMenuOfOutlet;
        const rId = reqBody?.restaurantId
        const Body = contentBody('getMenuBody')
        const header =headerBody()
        Body.Region =reqBody?.Region
        Body.ShopCode =reqBody?.ShopCode
        const response = await axios.post( apiURL,  Body, {  headers: header  } );
    if(response?.data){
        const updateresponce =  await service.transformData(response.data)
        const swiggyHeader = {
            'Authorization Key':'',
            'token-id':'',
            'Content-Type': 'application/json',
        }
        const swiggy = await axios.post(swiggyURL+`${rId}`+'/full-menu',updateresponce,{headers: swiggyHeader})
        if(!swiggy?.statusCode !=200){ res.status(200).json({statusText: swiggy.data});}
        else{
            res.send(swiggy);
        }
       
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






