import app from "./app";
import dotenv from "dotenv"
import { connectDB } from "./config/dataBase.config"; 
dotenv.config()

const PORT = process.env.PORT || 5000;

connectDB() 

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
