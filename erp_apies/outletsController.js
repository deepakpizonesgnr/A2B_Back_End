const axios = require('axios')
const errors = require('../error/error')
const { headerBody,apiERPEndPoint,contentBody} = require('../header/api_header')
const db = require('../config/db');

exports.outlets = async (req, res) => {
const apiURL = process.env.ERP_URL+ apiERPEndPoint().getOutlets;

    try {
const Body = contentBody('getOutlets');
const header =headerBody()
        const response = await axios.post( apiURL ,Body, {  headers: header } );
        const data = response?.data;
       const dropTableQuery = 'DROP TABLE IF EXISTS outlets;'
       await db.promise().query(dropTableQuery)
     if (response?.data) {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS outlets (
            CountryCode VARCHAR(50),
            CountryName VARCHAR(100),
            Region VARCHAR(50),
            ShopCode VARCHAR(50),
            ShopName VARCHAR(100),
            Add1 VARCHAR(255),
            Add2 VARCHAR(255),
            Add3 VARCHAR(255),
            Pincode VARCHAR(20),
            ContactNo VARCHAR(20),
            StateName VARCHAR(100),
            GstNo VARCHAR(50),
            Latitude DECIMAL(10, 8),
            Longitude DECIMAL(11, 8),
            Costcenter VARCHAR(50)
        );
    `;
    await db.promise().query(createTableQuery);
    const insertQuery = `
    INSERT INTO outlets (
        CountryCode, CountryName, Region, ShopCode, ShopName, Add1, Add2, Add3, 
        Pincode, ContactNo, StateName, GstNo, Latitude, Longitude, Costcenter
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`
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

            res.status(500).json({ error: 'Failed to call the external API', errorex :error.message });

    }
 
};



