import express from "express";
import { connection } from "./connection.js";
import product from "./routes/product.js";
import user from "./routes/user.js";

import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Connect to the database
connection.then(() => {
  console.log("DB Connected");
}).catch((e) => {
  console.log("Error:", e);
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/product", product);
app.use("/user", user);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  

