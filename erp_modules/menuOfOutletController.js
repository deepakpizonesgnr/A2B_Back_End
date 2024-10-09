const axios = require('axios')
const errors = require('../error/error')
const { headerBody,apiERPEndPoint,contentBody} = require('../helpers/api_header')
const db = require('../config/db');

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
        await updateData(response.data)
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




const updateData = async (menuData) => {
        const allMenuData = menuData
        const Brcode = allMenuData?.[0]?.Brcode
    if(!Brcode){
        return ''
    }
    try {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS allmenuoutlets (
   StatusResponse VARCHAR(20),
   ExtPlatform VARCHAR(20),
   State VARCHAR(20),
   Region VARCHAR(10),
   Brcode INT,
   Branch VARCHAR(50),
   MainCategorySortOrder INT,
   MainCategoryId VARCHAR(10),
   MainCategoryName VARCHAR(50),
   CategorySortOrder INT,
   CategoryId VARCHAR(10),
   CategoryName VARCHAR(50),
   Icode INT,
   Iname VARCHAR(50),
   Uom VARCHAR(10),
   RateWithoutTax DECIMAL(10, 2),
   GST DECIMAL(5, 2),
   OptionSaleYN CHAR(1),
   LiveStatus VARCHAR(10),
   Included_platforms VARCHAR(10),
   WebItmDescription TEXT,
   Recommended VARCHAR(20),
   OptionGroupName VARCHAR(20),
   IndWeight DECIMAL(10, 2),
   CountryCode VARCHAR(10),
   CountryName VARCHAR(50)
        ); `;
             await db.promise().query(createTableQuery);

             const insertQuery = `
             INSERT INTO allmenuoutlets (
         StatusResponse, ExtPlatform, State, Region, Brcode, Branch, MainCategorySortOrder,
         MainCategoryId, MainCategoryName, CategorySortOrder, CategoryId, CategoryName,
         Icode, Iname, Uom, RateWithoutTax, GST, OptionSaleYN, LiveStatus,
         Included_platforms, WebItmDescription, Recommended, OptionGroupName, 
         IndWeight, CountryCode, CountryName
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
       `;




    
        // Delete records with class 12
        const deleteQuery = 'DELETE FROM allmenuoutlets WHERE Brcode = ?';
        await db.promise().execute(deleteQuery, [Brcode]);
        console.log('Deleted records with class Brcode.');
   
        for (const item of allMenuData) {
            const items = [
                item.StatusResponse,
                item.ExtPlatform,
                item.State,
                item.Region,
                item.Brcode,
                item.Branch,
                item.MainCategorySortOrder,
                item.MainCategoryId,
                item.MainCategoryName,
                item.CategorySortOrder,
                item.CategoryId,
                item.CategoryName,
                item.Icode,
                item.Iname,
                item.Uom,
                item.RateWithoutTax,
                item.GST,
                item.OptionSaleYN,
                item.LiveStatus,
                item.Included_platforms,
                item.WebItmDescription,
                item.Recommended,
                item.OptionGroupName,
                item.IndWeight,
                item.CountryCode,
                item.CountryName
            ]
            db.promise().query(insertQuery, items, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                } else {
                    console.log('Data inserted successfully:', results);
                }
            })

        }
    } catch (error) {
        console.error('Error updating data:', error);
    } 
    
};

