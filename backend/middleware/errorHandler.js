const logger = require('../utils/logger');

/**
 * Error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Server error', err);
  
  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // More detailed response in development mode
  const response = {
    success: false,
    error: message,
  };
  
  // Add stack trace in development environment
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  
  res.status(statusCode).json(response);
};

/**
 * 404 Not Found middleware
 */
const notFoundHandler = (req, res) => {
  logger.request(req, '404 Not Found');
  
  res.status(404).json({
    success: false,
    error: 'Resource not found'
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
}; 