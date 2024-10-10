

function queryForTableCreate(table){

 return  `CREATE TABLE IF NOT EXISTS outlets (
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
`

}
function queryForTableInsert(table){

  return  `
  INSERT INTO outlets (
      CountryCode, CountryName, Region, ShopCode, ShopName, Add1, Add2, Add3, 
      Pincode, ContactNo, StateName, GstNo, Latitude, Longitude, Costcenter
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`}

    



module.exports = {
  queryForTableCreate,queryForTableInsert
};
