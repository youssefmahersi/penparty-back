import express from "express";

const app = express();

import mongoose from "mongoose";
import bodyParserer from "body-parser";
import authRoutes from "./routes/auth.js";
import actRoutes from "./routes/activity.js";

//dotenv config
import 'dotenv/config'

app.use(bodyParserer.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use("/auth",authRoutes);
app.use(actRoutes);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@penetration.jiv1x.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`).then(res => {
    console.log("Database connected successfuly!");
    app.listen(process.env.PORT,()=> console.log("Server running on port :",process.env.PORT));
}).catch(err => {
    console.log(err)
});