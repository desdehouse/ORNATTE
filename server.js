
const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle order submission
app.post('/send-order', (req, res) => {
  console.log("Received order:", req.body);
  res.status(200).send({ message: 'Order received successfully!' });
});

// Fallback route for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
