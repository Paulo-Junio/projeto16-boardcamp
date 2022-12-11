import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import categoriesRoutes from "./routes/categoriesRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use(categoriesRoutes);

const port = process.env.PORT || 400;

app.listen(port || 4000, console.log(`Serve is running in port ${port}`))