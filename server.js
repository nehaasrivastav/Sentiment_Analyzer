const express = require('express');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize Sentiment analyzer
const sentiment = new Sentiment();

// Route for analyzing comments
app.post('/analyze-comment', (req, res) => {
  const { comment } = req.body;

  // Perform sentiment analysis on the comment
  const result = sentiment.analyze(comment);

  // Determine if the comment is negative
  if (result.score < 0) {
    // Respond with a success message
    res.status(200).send('Negative comment detected. Alert sent on console');
    // Add code here to trigger notification/alert
    console.log('Negative comment detected:', comment);
  } else {
    // Respond with a success message
    res.status(200).send('No negative sentiment detected.');
  }
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});