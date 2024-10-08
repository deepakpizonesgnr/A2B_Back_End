

function headerBody() {
    return {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IlJlc3RTZWxmT3JkVXNyR0tleSIsImlhdCI6MTU3NzI0OTk4Nn0.V4nqfD51NhIKvQpcbIShBOxQFwiMgJEk3Z9Fim3WkmY'
    };
}
function contentBody(res) {
    if(res =='getMenuBody'){
         return {
                      "RequestType": "ListOfMenuItems",
                      "MySId": "z4f!c83%634f.g#9g",
                      "Maincat": "AAB SWEETS",
                      "Subcat": "ALL",
                      "ExtPlatForm": "ONDC"
                }
    }
   else if(res=='getOutlets'){
        return {
                 "MySId": "z4f!c83%634f.g#9g",
                 "Region": "ALL"
              };
    }else{
        return 
    }
    
}

function apiERPEndPoint(){
return {
    "getOutlets": 'listofonlineorderoutlets',
    "getMenuOfOutlet":'Listofitemsforonlineorders'
}
}

module.exports = { headerBody,contentBody,apiERPEndPoint };
