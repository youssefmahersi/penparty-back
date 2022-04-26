import express from "express";

const app = express();

import mongoose from "mongoose";
import bodyParserer from "body-parser";
import authRoutes from "./routes/auth.js";
import actRoutes from "./routes/activity.js";
import contactRoute from "./routes/contact.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
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
app.use(express.static(path.join(__dirname, 'front')));
app.use("/api/auth",authRoutes);
app.use("/api",actRoutes);
app.use("/api",contactRoute);
app.get('/*', function (req, res) {
  res.sendFile(path.join(dirname, 'front', 'index.html'));
});

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