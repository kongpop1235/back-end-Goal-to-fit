const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routerUrls = require('./routes/route');
const cors = require('cors');
// const bodyParser = require('body-parser');

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, ()=> console.log("Database connected"))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())
app.use('/api', routerUrls)
app.listen(4000, () => console.log("server is up and runing"))