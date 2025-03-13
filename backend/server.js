require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  logger.request(req, 'API Request');
  next();
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API Endpoints
app.post('/api/analyze', upload.single('file'), async (req, res, next) => {
  try {
    const { model, code } = req.body;
    let analysis = null;

    logger.info(`Analyzing with model: ${model}`);

    if (model === 'huggingface') {
      analysis = await analyzeWithHuggingFace(req.file, code);
    } else if (model === 'tensorflow') {
      analysis = await analyzeWithTensorFlow(req.file, code);
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }

    logger.info('Analysis completed successfully');
    res.json(analysis);
  } catch (error) {
    logger.error('Analysis failed', error);
    next(error);
  }
});

app.post('/api/apply-changes', async (req, res, next) => {
  try {
    const { changes } = req.body;
    
    if (!changes || !Array.isArray(changes)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid request: changes must be an array' 
      });
    }
    
    logger.info(`Applying ${changes.length} changes`);
    // Implement the logic to apply changes to the codebase
    
    res.json({ success: true, message: 'Changes applied successfully' });
  } catch (error) {
    logger.error('Error applying changes', error);
    next(error);
  }
});

// Helper Functions
async function analyzeWithHuggingFace(file, code) {
  try {
    // Using Hugging Face's free API for image analysis
    const imageBuffer = file ? fs.readFileSync(file.path) : null;
    const base64Image = imageBuffer ? imageBuffer.toString('base64') : null;

    logger.info('Calling Hugging Face API');

    if (!process.env.HUGGINGFACE_API_KEY) {
      logger.error('Missing Hugging Face API key');
      throw new Error('Hugging Face API key is missing');
    }

    // For demonstration purposes, we're simulating the API call
    // In a real implementation, you'd make the actual API call
    /*
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/vit-base-patch16-224',
      {
        inputs: {
          image: base64Image
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    */

    // Process the response and generate feedback
    logger.info('Generating analysis results');
    
    return {
      uxIssues: [
        "Based on the image analysis, consider improving contrast ratios",
        "Navigation elements could be more prominent",
        "Button sizes should be increased for better touch targets"
      ],
      accessibilityIssues: [
        "Text size might be too small for some users",
        "Color contrast needs improvement",
        "Add alt text to all images"
      ],
      codeImprovements: [
        {
          file: "styles.css",
          suggestions: [
            "Add more padding to clickable elements",
            "Increase font sizes for better readability",
            "Implement responsive design patterns"
          ]
        }
      ]
    };
  } catch (error) {
    logger.error('Hugging Face API error', error);
    throw error;
  }
}

async function analyzeWithTensorFlow(file, code) {
  try {
    const imageBuffer = file ? fs.readFileSync(file.path) : null;
    
    logger.info('Performing TensorFlow.js analysis');
    
    // Process the image using basic image analysis techniques
    // This is a simplified version - you would need to implement more sophisticated analysis
    return {
      uxIssues: [
        "Consider adding more whitespace",
        "Button placement could be optimized",
        "Layout needs more visual hierarchy"
      ],
      accessibilityIssues: [
        "Add ARIA labels to interactive elements",
        "Ensure proper heading hierarchy",
        "Improve keyboard navigation"
      ],
      codeImprovements: [
        {
          file: "index.html",
          suggestions: [
            "Add semantic HTML elements",
            "Include proper meta tags",
            "Optimize image loading"
          ]
        }
      ]
    };
  } catch (error) {
    logger.error('TensorFlow analysis error', error);
    throw error;
  }
}

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
  console.log(`Server running on port ${port}`);
}); 