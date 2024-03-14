// sentimentAnalysis.js

const { SentimentAnalyzer, PorterStemmer } = require('natural');

// Initialize sentiment analyzer
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

// Function to analyze sentiment of a given message
function analyzeSentiment(message) {
    const result = analyzer.getSentiment(message);
    return result;
}

module.exports = { analyzeSentiment };
