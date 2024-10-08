const axios = require('axios')
const errors = require('../../error/error')
const { headerBody, outletsBody } = require('../../helpers/api_header')
const db = require('../../config/db');

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
            res.status(500).json({ error: errors[500] });
          
        }
    } else {
  
        res.status(404).json({ error: errors[404] })
    }
};

const updateData = async (menuData) => {

    const transformedData = transformData(menuData);
    return transformedData

};



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

