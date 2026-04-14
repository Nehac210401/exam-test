import 'dotenv/config';
import express from 'express';
import '../db/menudb.js';
import '../db/orderdb.js';
import '../db/userdb.js';
import productRoutes from '../routes/productRoutes.js';
import usersRoutes from '../routes/usersRoutes.js';
import orderRoutes from '../routes/orderRoutes.js';

const app = express()
app.use(express.json())

app.use('/api/menu', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3000, () => {
  console.log('☕ Airbean API running on http://localhost:3000')
  //console.log('Admin key:', process.env.ADMIN_API_KEY)
})