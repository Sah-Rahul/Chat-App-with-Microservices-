import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase.config";

dotenv.config();

connectDB();

import "./models/index.model";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
