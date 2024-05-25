require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const UsersRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const app = express();

const PORT = process.env.PORT || 3000;





// connect to database
connectDB(process.env.DATABASE_URL);


app.use(express.json());



app.use('/api', authRoutes);

app.use('/users', UsersRoutes);



app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`))