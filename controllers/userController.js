const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { headerBody,contentBody } = require('../header/api_header');
const { orderPlace } = require('../erp_apies/erp_orderPlace');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const result = await User.addUser(username, hashedPassword);
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    // const response = orderPlace()
    // console.log(response)

    try {

        // Call the external API
        // const response = await axios.post('https://staging.aabsweets.com:9001/api/itemavailabilitycheckV2', contentBody(), {
        //     headers : headerBody()
        // });

        // Send the response from the external API back to the client
        
    
    ////////////////////////////////////////////
    const { username, password } = req.body;

    
        const user = await User.findUser(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.json(response.data);
        res.json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    
            // Handle errors
            console.error('Error calling the external API:', error.message);
            res.status(500).json({ error: 'Failed to call the external API' });

    }
};
