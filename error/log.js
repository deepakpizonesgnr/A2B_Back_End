const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'log.txt');

function logError(error) {
    const errorMessage = `${new Date().toISOString()} - ${error.message}\n`;
    fs.appendFile(logFilePath, errorMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
        }
    });
}

module.exports = logError;