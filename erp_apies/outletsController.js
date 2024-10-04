const axios = require('axios')
const errors = require('../error/error')
const {headerBody,outletsBody} = require('../header/api_header')
const db = require('../config/db');

exports.outlets = async (req, res) => {


    try {
        const response = await axios.post(
            'https://staging.aabsweets.com:9001/api/listofonlineorderoutlets',
            outletsBody(), // Assuming this generates the request body
            {
                headers:headerBody()
            }
        );
        const data = response.data;
       const dropTableQuery = 'DROP TABLE IF EXISTS outlets;'
     if(response.data) {
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

     }  
    //  const data1 = await getAllMenu('item')
     res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    
            // Handle errors
            console.error('Error calling the external API:', error.message);
            res.status(500).json({ error: 'Failed to call the external API' });

    }
 
};
// async function getAllMenu(data) {
//     try {
//         const response = await axios.post(
//             'https://staging.aabsweets.com:9001/api/Listofitemsforonlineorders',
//             outletsBody(), // Ensure this function returns the correct request body
//             {
//                 headers: {
//                     "RequestType": "ListOfMenuItems",
//                     "MySId": "z4f!c83%634f.g#9g",
//                     "Region": "BLR",
//                     "Maincat": "AAB SWEETS",
//                     "Subcat": "ALL",
//                     "ShopCode": "36",
//                     "ExtPlatForm": "ONDC"
//                 }
//             }
//         );

//         console.log(response.data); // Log the response data
//         return response.data;
//     } catch (error) {
//         // Log the error message for debugging
//         console.error("Error fetching menu:", error.message);

//         // If the error has a response, log that too
//         if (error.response) {
//             console.error("Response data:", error.response.data);
//             console.error("Response status:", error.response.status);
//             console.error("Response headers:", error.response.headers);
//         }
//         return null; // Return null or handle the error as needed
//     }
// }