const axios = require('axios')
const { headerBody,contentBody } = require('../../helpers/api_header');

async function orderPlace (){
    const headers = headerBody(); // Assuming this returns the necessary headers
    try {
        const response = await axios.post(
            'https://staging.aabsweets.com:9001/api/itemavailabilitycheckV2',
            contentBody('res'), // Assuming this generates the request body
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IlJlc3RTZWxmT3JkVXNyR0tleSIsImlhdCI6MTU3NzI0OTk4Nn0.V4nqfD51NhIKvQpcbIShBOxQFwiMgJEk3Z9Fim3WkmY'

                },
            }
        );

        console.log(response.data); // Log the response data
        return response.data; // Return the response data to the caller
    } catch (error) {
        console.error('Error during API call:', error.message);
        throw error; // Rethrow the error if you want the caller to handle it
    }
}

module.exports = { orderPlace };