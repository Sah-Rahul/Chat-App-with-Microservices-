import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import chatRouter from "./routes/chat.routes.js";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1/chat", chatRouter);
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map