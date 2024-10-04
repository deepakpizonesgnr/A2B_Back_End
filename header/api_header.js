

function headerBody() {
    return {
        'Content-Type': 'application/json',
        'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IlJlc3RTZWxmT3JkVXNyR0tleSIsImlhdCI6MTU3NzI0OTk4Nn0.V4nqfD51NhIKvQpcbIShBOxQFwiMgJEk3Z9Fim3WkmY'
    };
}
function contentBody() {
    return {
        "MySId": "z4f!c83%634f.g#9g",
        "ShopCode": "12345",
        "ItemDetails": "908|10|0|Without sugar~907|10|0|NIL"
    };
}
function outletsBody() {
    return {
        "MySId": "z4f!c83%634f.g#9g",
       "Region": "BLR"
    };
}

module.exports = { headerBody,contentBody,outletsBody };
