const express = require('express');
const cors = require('cors');
const emergencyRoutes = require('./api/emergency');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/emergency', emergencyRoutes);

app.listen(PORT, () => {
  console.log(`Project Lifeline server running on http://localhost:${PORT}`);
});
