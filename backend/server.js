import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import connectDB from './config/db.js';

dotenv.config(); // connect to MongoDb
connectDB();
const port = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(port, () => { 
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${port}`.inverse.green)
});