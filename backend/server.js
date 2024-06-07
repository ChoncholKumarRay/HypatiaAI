const express = require('express');
const cors = require('cors');

const app = express();
const port = 5002;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
  
app.use(express.json()); // Parse JSON bodies

// Route handling POST request
app.post('/generate-image', (req, res) => {
  const { inputText, selectedOptions } = req.body;

  // Log inputText to server terminal
  console.log("Received inputText:", inputText);

  // Example response
  res.json({ message: 'Image generated successfully', inputText, selectedOptions });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
