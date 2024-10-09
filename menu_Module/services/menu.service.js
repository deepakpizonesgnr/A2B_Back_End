const {queryForTableCreate,queryForTableInsert,deleteQuery} = require('../helpers/query')
const db = require('../../config/db')
const updateData = async (menuData) => {
    const allMenuData = menuData
    const Brcode = allMenuData?.[0]?.Brcode
if(!Brcode){
    return ''
}
try {
const createTableQuery = queryForTableCreate()
    await db.promise().query(createTableQuery);
    const insertQuery = queryForTableInsert()

    // Delete records with class 12
    const deleteQuery = deleteQuery()
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

const transformData = async(inputData)=> {
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


module.exports = {transformData,updateData}