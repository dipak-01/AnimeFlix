const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/proxy', async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).send('URL parameter is required');
  }
  
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        // Forward some headers from the client request
        'User-Agent': req.headers['user-agent'],
        'Referer': url,
        'Origin': new URL(url).origin
      }
    });
    
    // Set appropriate headers for streaming
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': response.headers['content-type']
    });
    
    // Forward the response from the target server
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Error fetching from upstream server');
  }
});

module.exports = router;
