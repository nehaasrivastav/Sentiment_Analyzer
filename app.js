// app.js

const express = require('express');
const fetch = require('node-fetch');
const { analyzeSentiment } = require('./sentimentAnalysis');
const { facebookAccessToken } = require('./config');

const app = express();
const port = 3000;

// Fetch recent posts from Facebook profile
async function fetchPosts() {
    try {
        const response = await fetch(`https://graph.facebook.com/v19.0/234763263061777/feed?fields=id,comments&access_token=${facebookAccessToken}`);
        const data = await response.json();
        console.log(data)
        return data.data;
        
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// Process comments for sentiment analysis
function processComments(comments) {
    comments.forEach(comment => {
        const sentiment = analyzeSentiment(comment.message);
        if (sentiment < 0) {
            // Notify user about negative comment
            console.log(`Negative comment detected: ${comment.message}`);
        }
    });
}

// Route to fetch recent posts and process comments
app.get('/posts', async (req, res) => {
    const posts = await fetchPosts();
    posts.forEach(post => {
        if (post.comments && post.comments.data) {
            processComments(post.comments.data);
        }
    });
    res.send('Posts fetched and processed.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
