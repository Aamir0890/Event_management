const express=require("express");
const connectDB = require("./src/config");
const { default: mongoose } = require("mongoose");
const UserRoutes=require('./src/routes/UserRoutes')
const EventRoutes=require('./src/routes/EventRoutes')
const app=express();
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api',UserRoutes)
app.use('/api',EventRoutes)

connectDB()

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${process.env.PORT}`);
});
