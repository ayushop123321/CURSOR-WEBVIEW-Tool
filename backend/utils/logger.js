const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file paths
const errorLogPath = path.join(logsDir, 'error.log');
const accessLogPath = path.join(logsDir, 'access.log');

/**
 * Simple logger for the MCP Tool backend
 */
const logger = {
  /**
   * Log info message
   * @param {string} message - The message to log
   */
  info: (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[INFO] ${timestamp}: ${message}\n`;
    
    console.log(`[INFO] ${message}`);
    
    fs.appendFile(accessLogPath, logEntry, (err) => {
      if (err) console.error('Failed to write to access log:', err);
    });
  },
  
  /**
   * Log error message
   * @param {string} message - The error message
   * @param {Error} [error] - Optional error object
   */
  error: (message, error) => {
    const timestamp = new Date().toISOString();
    let logEntry = `[ERROR] ${timestamp}: ${message}\n`;
    
    if (error) {
      logEntry += `${error.stack || error}\n`;
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
    }
    
    fs.appendFile(errorLogPath, logEntry, (err) => {
      if (err) console.error('Failed to write to error log:', err);
    });
  },
  
  /**
   * Log API request
   * @param {Object} req - Express request object
   * @param {string} actionType - Type of action being performed
   */
  request: (req, actionType) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.get('User-Agent');
    
    const logEntry = `[REQUEST] ${timestamp}: ${actionType} - ${method} ${url} from ${ip} - ${userAgent}\n`;
    
    console.log(`[REQUEST] ${actionType} - ${method} ${url}`);
    
    fs.appendFile(accessLogPath, logEntry, (err) => {
      if (err) console.error('Failed to write to access log:', err);
    });
  }
};

module.exports = logger; 