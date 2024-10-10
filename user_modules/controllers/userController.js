const User = require('../models/user');
const {validateUser} = require('../helpers/validate')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.registerUser = async (req, res) => {
    const {  password,email } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    try {
        const result = await User.addUser(email, hashedPassword);
        if(result){ res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });}
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {

    try {
     const { error } = validateUser(req.body)
     if(error){
        return res.status(400).json({ errors: error.details.map(err => err.message) });
     }
    const {password,email } = req.body;
    

        const user = await User.findUser(email);
       const interPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (!user || (interPassword !== user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ error: error.message }); 

    }
};


exports.forgetPassword = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // SMTP server
        port: 587, // SMTP port (587 for TLS)
        secure: false, // Use true for 465 port
        auth: {
            user: 'abmiddlewarenoreplay@gmail.com', // Your email address
            pass: 'wkdxidjujehpvosr', // Your email password or app-specific password
        },
    });
const { email } = req.body;

// Check if email exists

db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('Email not found');

    // Create reset token
    const otp = generateOTP()
    const expiry = Date.now() + 3600000; // 1 hour
    const expiryDate = new Date(Date.now() + expiry); // Current time + 1 hour
const mysqlDatetime = expiryDate.toISOString().slice(0, 19).replace('T', ' ');

    // Update user with reset token and expiry
    db.query('UPDATE users SET resetOtp = ?, resetOtpExpiry = ? WHERE email = ?', [otp, mysqlDatetime, email], (err) => {
        if (err) return res.status(500).send('Server error');

        // Send email
        const newOtp = otp ;
        const mailOptions = {
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset your password: ${newOtp}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({otp: newOtp});
            res.status(200).json({message:'The OTP has been sent to your email.'});
        });
    });
});
}
//app.post('/reset-password/:token',
 exports.resetPassword  = async(req, res) => {
  
    const { id, newPassword } = req.body;

    // Check token and expiry
    db.query('SELECT * FROM users WHERE id = ? ', [id], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('user not found');

        // Update password
        const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
        db.query('UPDATE users SET password = ?, resetOtp = NULL, resetOtpExpiry = NULL WHERE id = ?', [hashedPassword, id], (err) => {
            if (err) return res.status(500).send('Server error');
            res.send('Password has been reset');
        });
    });
}

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Return as a string
}

exports.verifiedOtp  = async(req, res) => {
  
    const { otp } = req.body;

    // Check token and expiry
    db.query('SELECT * FROM users WHERE resetOtp = ? AND resetOtpExpiry > ?', [otp, Date.now()], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('Invalid or expired otp');
        const id =results?.id
        if(results.length >0) return res.status(200).json({message:'Verification success ',userId: id})

    });
}