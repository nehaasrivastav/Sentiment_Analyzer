const express = require('express');
const sentimentAnalysis = require('./sentimentAnalysis');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/analyze', async (req, res) => {
  try {
    const sentiments = await sentimentAnalysis();
    
    // Modify sentiments to include color based on sentiment score
    sentiments.forEach(sentiment => {
      if (sentiment.sentiment > 0.2) {
        sentiment.color = 'rgb(97, 193, 97)';
      } else if (sentiment.sentiment < -0.2) {
        sentiment.color = 'red';
      } else {
        sentiment.color = 'yellow'; // default color
      }
    });
    
    res.json(sentiments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while analyzing sentiments.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
