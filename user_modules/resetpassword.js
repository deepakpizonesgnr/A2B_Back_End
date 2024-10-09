const axios = require('axios')
const errors = require('../error/error')
const { headerBody,contentBody,apiERPEndPoint } = require('../helpers/api_header')
const db = require('../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
exports.forgetPassword = async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // SMTP server
        port: 587, // SMTP port (587 for TLS)
        secure: false, // Use true for 465 port
        auth: {
            user: 'abmiddlewarenoreplay@gmail.com', // Your email address
            pass: 'rhodxrsxhauxjqcn', // Your email password or app-specific password
        },
    });
const { email } = req.body;

// Check if email exists

db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('Email not found');

    // Create reset token
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour
    const expiryDate = new Date(Date.now() + expiry); // Current time + 1 hour
const mysqlDatetime = expiryDate.toISOString().slice(0, 19).replace('T', ' ');

    // Update user with reset token and expiry
    db.query('UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?', [token, mysqlDatetime, email], (err) => {
        if (err) return res.status(500).send('Server error');

        // Send email
        const resetUrl = `http://localhost:3000/api/reset-password/${token}`;
        const mailOptions = {
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).send('Error sending email');
            res.send('Email sent');
        });
    });
});
}
//app.post('/reset-password/:token',
 exports.resetPassword  = async(req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Check token and expiry
    db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?', [token, Date.now()], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('Invalid or expired token');

        // Update password
        const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
        db.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE resetToken = ?', [hashedPassword, token], (err) => {
            if (err) return res.status(500).send('Server error');
            res.send('Password has been reset');
        });
    });
}