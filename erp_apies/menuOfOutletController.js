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
    
       await updateData(response.data)

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




const updateData = async (menuData) => {
    const transformedData = transformData(menuData);
    console.log(transformedData);
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

// Call the function to update data
function transformData(inputData) {
    const mainCategories = {};
    const items = [];

    inputData.forEach(item => {
        // Extracting category details
        const mainCategoryId = item.MainCategoryId;
        const categoryId = item.CategoryId;

        // Check if the main category already exists
        if (!mainCategories[mainCategoryId]) {
            mainCategories[mainCategoryId] = {
                id: mainCategoryId,
                name: item.MainCategoryName,
                description: item.MainCategoryName,
                order: item.MainCategorySortOrder,
                sub_categories: []
            };
        }

        // Check if the sub-category already exists
        let subCategory = mainCategories[mainCategoryId].sub_categories.find(sc => sc.id === categoryId);
        if (!subCategory) {
            subCategory = {
                id: categoryId,
                name: item.CategoryName,
                description: item.CategoryName,
                order: item.CategorySortOrder
            };
            mainCategories[mainCategoryId].sub_categories.push(subCategory);
        }

        // Creating item details
        const newItem = {
            id: item.Icode.toString(),
            category_id: mainCategoryId,
            sub_category_id: categoryId,
            name: item.Iname,
            is_veg: item.OptionSaleYN === "Y", // Assuming "Y" means vegetarian
            description: item.WebItmDescription || null,
            price: item.RateWithoutTax,
            gst_details: {
                igst: item.GST,
                sgst: item.GST / 2,
                cgst: item.GST / 2,
                inclusive: true,
                gst_liability: "SWIGGY"
            },
            packing_charges: 0, // Set packing charges if applicable
            enable: item.LiveStatus === "Enabled" ? 1 : 0,
            in_stock: 1,
            addon_free_limit: -1,
            addon_limit: -1,
            catalog_attributes: {
                spice_level: "MEDIUM", // Placeholder; customize as needed
                sweet_level: "HIGH", // Placeholder; customize as needed
                gravy_property: "NONE", // Placeholder; customize as needed
                bone_property: "NONE", // Placeholder; customize as needed
                contain_seasonal_ingredients: false,
                accompaniments: [],
                quantity: {
                    value: item.IndWeight || 1, // Assuming 1 as a default
                    unit: item.Uom || "NOS"
                },
                serves_how_many: 1 // Placeholder; customize as needed
            },
            variant_groups: [],
            addon_groups: [],
            item_slots: [],
            pricing_combinations: []
        };

        items.push(newItem);
    });

    return {
        entity: {
            main_categories: Object.values(mainCategories),
            items: items
        }
    };
}