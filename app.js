// app.js
const express = require('express');
const app = express();
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use separate route handlers
app.use('/users', userRoutes);
app.use('/file', fileRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
