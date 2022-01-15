import express from 'express'
import cors from 'cors'
import inventory from './api/inventory.route.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/inventory", inventory)
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app;