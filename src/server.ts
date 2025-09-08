import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/items.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Shopping List API is running',
    timestamp: new Date().toISOString()
  });
});


app.use('/items', itemRoutes);


app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404
  });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`🚀 Shopping List API is running on port ${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    /health          - Health check`);
  console.log(`   GET    /items           - Get all items`);
  console.log(`   GET    /items/:id       - Get single item`);
  console.log(`   POST   /items           - Create new item`);
  console.log(`   PUT    /items/:id       - Update item`);
  console.log(`   DELETE /items/:id       - Delete item`);
  console.log(`\n💡 Test with Postman or curl!`);
});

export default app;