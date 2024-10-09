const axios = require('axios')
const errors = require('../../error/error')
const { headerBody,apiERPEndPoint,contentBody} = require('../../helpers/api_header')
const db = require('../../config/db');
const {queryForTableCreate, queryForTableInsert} = require('../helpers/query')


 async function getAllOutlets(req, res){
    const apiURL = process.env.ERP_URL+ apiERPEndPoint().getOutlets;
    
        try {
    const Body = contentBody('getOutlets');
    const header =headerBody()
            const response = await axios.post( apiURL ,Body, {  headers: header } );
            const data = response?.data;
           const dropTableQuery = 'DROP TABLE IF EXISTS outlets;'
           await db.promise().query(dropTableQuery)
         if (response?.data) {
          const createTableQuery = queryForTableCreate()
           await db.promise().query(createTableQuery);
        const insertQuery = queryForTableInsert()
    for (const item of data) {
        // const items =    await getAllMenu(item)
        await db.promise().query(insertQuery, [
            item.CountryCode,
            item.CountryName,
            item.Region,
            item.ShopCode,
            item.ShopName,
            item.Add1,
            item.Add2,
            item.add3,
            item.Pincode,
            item.ContactNo,
            item.StateName,
            item.GstNo,
            item.Latitude,
            item.longitude,
            item.Costcenter
        ]);
    }
           res.status(200).json({data:response.data,statusText:response.statusText});
         } 
          
        } catch (error) {
    
                res.status(500).json({ error: errors[500] });
    
        }
    };

module.exports = {
 getAllOutlets
};
