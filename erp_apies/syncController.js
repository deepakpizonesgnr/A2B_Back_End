const axios = require('axios')
const errors = require('../error/error')
const { headerBody, outletsBody } = require('../header/api_header')
const db = require('../config/db');
const logError = require('../error/log');

exports.syncMenuOfOutlet = async (req, res) => {
    const reqBody = req.body
    if (reqBody?.Region && reqBody?.ShopCode) {
        try {
            const apiURL = process.env.ERP_URL+ apiERPEndPoint().getMenuOfOutlet;
            const Body = contentBody('getMenuBody')
            const header =headerBody()
            headerBodyContent.Region =reqBody?.Region
            headerBodyContent.ShopCode =reqBody?.ShopCode
            const response = await axios.post( apiURL,  Body, {  headers: header  } );
             const updateresponce =   await updateData(response.data)
            res.status(200).json({data:updateresponce,statusText:response.statusText});
        }


        catch (error) {
            res.status(500).json({ error: error.message });
            logError(error)
            console.error('Error calling the external API:', error.message);
            res.status(500).json({ error: 'Failed to call the external API' });
            

        }
    } else {
  
        res.status(404).json({ error: 'ShopCode and Region  is required in header' })
        throw new Error('Please give resion and shopcpoded');
    }
};




const updateData = async (menuData) => {

    const transformedData = transformData(menuData);
    return transformedData
  
};


// const swiggyJSON = {
//     "entity": {
//         "main_categories": [
//             {
//                 "id": "1001",
//                 "name": "Category1",
//                 "description": "Category1",
//                 "order": 1,
//                 "sub_categories": [
//                     {
//                         "id": "2001",
//                         "name": "Subcategory1",
//                         "description": "Subcategory1",
//                         "order": 1
//                     }
//                 ]
//             }
//         ],
//         "items": [
//             {
//                 "id": "3001",
//                 "category_id": "1001",
//                 "sub_category_id": "2001",
//                 "name": "Item2",
//                 "is_veg": true,
//                 "description": null,
//                 "price": 200,
//                 "gst_details": {
//                     "igst": 0.0,
//                     "sgst": 2.5,
//                     "cgst": 2.5,
//                     "inclusive": true,
//                     "gst_liability": "SWIGGY"
//                 },
//                 "packing_charges": 20,
//                 "enable": 1,
//                 "in_stock": 1,
//                 "addon_free_limit": -1,
//                 "addon_limit": -1,
//                 "image_url": null,
//                 "catalog_attributes": {
//                     "spice_level": "NONSPICY",
//                     "sweet_level": "HIGH",
//                     "gravy_property": "GRAVY",
//                     "bone_property": "BONELESS",
//                     "contain_seasonal_ingredients": true,
//                     "accompaniments": ["raita", "salt"],
//                     "quantity":
//                     {
//                         "value": 200,
//                         "unit": "ml"
//                     },
//                     "serves_how_many": 2
//                 },
//                 "variant_groups": [
//                     {
//                         "id": "20-VG3",
//                         "name": "VariantGroup3",
//                         "order": 0,
//                         "variants": [
//                             {
//                                 "id": "20-VG3-V1",
//                                 "name": "variant 3",
//                                 "price": 10,
//                                 "default": true,
//                                 "order": 1,
//                                 "in_stock": 1,
//                                 "is_veg": 1,
//                                 "gst_details": {
//                                     "igst": 0.0,
//                                     "sgst": 2.5,
//                                     "cgst": 2.5,
//                                     "inclusive": true,
//                                     "gst_liability": "SWIGGY"
//                                 },
//                                 "default_dependent_variant_id": "20-VG4-V2",
//                                 "default_dependent_variant_group_id": "20-VG4"
//                             }
//                         ]
//                     },
//                     {
//                         "id": "20-VG4",
//                         "name": "variantgroup 4",
//                         "order": 0,
//                         "variants": [
//                             {
//                                 "id": "20-VG4-V2",
//                                 "name": "variant2",
//                                 "price": 20,
//                                 "default": true,
//                                 "order": 1,
//                                 "in_stock": 1,
//                                 "is_veg": 1,
//                                 "gst_details": null
//                             }
//                         ]
//                     }
//                 ],

//                 "addon_groups": [
//                     {
//                         "id": "20-AG2",
//                         "name": "AddonGroup2 ",
//                         "addon_free_limit": null,
//                         "addon_limit": null,
//                         "addon_min_limit": null,
//                         "order": null,
//                         "addons": [
//                             {
//                                 "id": "20-AG2-A2",
//                                 "name": "Addon 2",
//                                 "price": 30,
//                                 "is_veg": true,
//                                 "in_stock": 1,
//                                 "order": null,
//                                 "is_default": null,
//                                 "gst_details": {
//                                     "igst": 0.0,
//                                     "sgst": 6,
//                                     "cgst": 6,
//                                     "inclusive": true,
//                                     "gst_liability": "VENDOR"
//                                 }
//                             }
//                         ]
//                     }
//                 ],
//                 "item_slots": [
//                     {
//                         "day_of_week": 3,
//                         "open_time": 1400,
//                         "close_time": 1800
//                     }
//                 ],
//                 "pricing_combinations": [
//                     {
//                         "variant_combination": [
//                             {
//                                 "variant_group_id": "20-VG3",
//                                 "variant_id": "20-VG3-V1"
//                             },
//                             {
//                                 "variant_group_id": "20-VG4",
//                                 "variant_id": "20-VG2-V1"
//                             }
//                         ],
//                         "price": 250,
//                         "addon_combination": [
//                             {
//                                 "addon_group_id": "20-AG2",
//                                 "addon_id": "20-AG2-A2"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// }
////////////////////////////////////


// Function to transform input data into the desired format
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
            image_url: item.ItemImage,
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

// Transform the data


// Print the transformed data

