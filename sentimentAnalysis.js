const fetch = require('node-fetch');
const sentimentAnalysis = require('sentiment-analysis');

async function getSentiments() {
  const id = '234763263061777';
  const token = 'EAAKX5EsnDkMBOZBF1CMkf098EUOVqaSS3aIWUlV935MjxOGl44YkOkgQUWOdwACpIZBW9yu7ASVfuG9DGDwzDIsQMLiZABjahO7qzX6n1E8EBDO5cJeD4MpeZCxKJzlHJrxTFMy5s3FY5uwzjNY1CZBXjz40fyzifGZBOD3keOhP2PaBZCyKQN41ePxY1TSzaZCElFHtcgHzBFCp8EF9VZBZAFePUZD';
  const url = `https://graph.facebook.com/v19.0/${id}/feed?fields=id,comments&access_token=${token}`;

  const response = await fetch(url);
  const data = await response.json();

  const sentiments = [];
  data.data.forEach(post => {
    post.comments.data.forEach(comment => {
      const sentiment = sentimentAnalysis(comment.message);
      sentiments.push({ message: comment.message, sentiment });
    });
  });
  return sentiments;
}

module.exports = getSentiments;
