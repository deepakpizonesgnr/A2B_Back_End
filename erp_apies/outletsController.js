const axios = require('axios')
const errors = require('../error/error')
const { headerBody, outletsBody} = require('../header/api_header')
const db = require('../config/db');

exports.outlets = async (req, res) => {


    try {
        const response = await axios.post(
            'https://staging.aabsweets.com:9001/api/listofonlineorderoutlets',
            outletsBody(),
            {
                headers: headerBody()
            }
        );
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
res.status(200).json(response);
     } else{
        res.status(500).json({error:'data not found'});
     } 
     

    } catch (error) {

            console.error('Error calling the external API:', error.message);
            res.status(500).json({ error: 'Failed to call the external API', errorex :error.message });

    }
 
};

// async function getAllMenu(data) {
//     const body = {
//         "RequestType": "ListOfMenuItems",
//         "MySId": "z4f!c83%634f.g#9g",
//         "Region": data?.Region,
//         "Maincat": "AAB SWEETS",
//         "Subcat": "ALL",
//         "ShopCode": data.ShopCode,
//         "ExtPlatForm": "ONDC"
//     }

//     try {
//         const response = await axios.post(
//             'https://staging.aabsweets.com:9001/api/Listofitemsforonlineorders',
//             body, // Ensure this function returns the correct request body
//             {
//                 headers: headerBody()
//             }
//         );


//         if (response.data) {
//             const data = response.data
//             const createTableQuery = `
//    CREATE TABLE IF NOT EXISTS allmenuoutlets (
//   StatusResponse VARCHAR(20),
//   ExtPlatform VARCHAR(20),
//   State VARCHAR(20),
//   Region VARCHAR(10),
//   Brcode INT,
//   Branch VARCHAR(50),
//   MainCategorySortOrder INT,
//   MainCategoryId VARCHAR(10),
//   MainCategoryName VARCHAR(50),
//   CategorySortOrder INT,
//   CategoryId VARCHAR(10),
//   CategoryName VARCHAR(50),
//   Icode INT,
//   Iname VARCHAR(50),
//   Uom VARCHAR(10),
//   RateWithoutTax DECIMAL(10, 2),
//   GST DECIMAL(5, 2),
//   OptionSaleYN CHAR(1),
//   LiveStatus VARCHAR(10),
//   Included_platforms VARCHAR(10),
//   WebItmDescription TEXT,
//   Recommended VARCHAR(20),
//   OptionGroupName VARCHAR(20),
//   IndWeight DECIMAL(10, 2),
//   CountryCode VARCHAR(10),
//   CountryName VARCHAR(50)
//        ); `;
//             await db.promise().query(createTableQuery);
//             const insertQuery = `
//         INSERT INTO allmenuoutlets (
//     StatusResponse, ExtPlatform, State, Region, Brcode, Branch, MainCategorySortOrder,
//     MainCategoryId, MainCategoryName, CategorySortOrder, CategoryId, CategoryName,
//     Icode, Iname, Uom, RateWithoutTax, GST, OptionSaleYN, LiveStatus,
//     Included_platforms, WebItmDescription, Recommended, OptionGroupName, 
//     IndWeight, CountryCode, CountryName
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
//   `;
//             for (const item of data) {
//                 const items = [
//                     item.StatusResponse,
//                     item.ExtPlatform,
//                     item.State,
//                     item.Region,
//                     item.Brcode,
//                     item.Branch,
//                     item.MainCategorySortOrder,
//                     item.MainCategoryId,
//                     item.MainCategoryName,
//                     item.CategorySortOrder,
//                     item.CategoryId,
//                     item.CategoryName,
//                     item.Icode,
//                     item.Iname,
//                     item.Uom,
//                     item.RateWithoutTax,
//                     item.GST,
//                     item.OptionSaleYN,
//                     item.LiveStatus,
//                     item.Included_platforms,
//                     item.WebItmDescription,
//                     item.Recommended,
//                     item.OptionGroupName,
//                     item.IndWeight,
//                     item.CountryCode,
//                     item.CountryName
//                 ]
//                 db.promise().query(insertQuery, items, (err, results) => {
//                     if (err) {
//                         console.error('Error inserting data:', err);
//                     } else {
//                         console.log('Data inserted successfully:', results);
//                     }
//                 })

//             }
//         }

//         return ''
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

