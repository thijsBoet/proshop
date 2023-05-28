import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // connect to MongoDb
connectDB();
const port = process.env.PORT || 5000;
const app = express();

// MiddlewareZ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());
app.get('/', (req, res) => {
	res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
			.inverse.green,
	);
});
