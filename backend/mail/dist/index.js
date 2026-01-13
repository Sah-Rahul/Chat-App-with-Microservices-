import express from "express";
import dotenv from "dotenv";
import { startOtpConsumer } from "./consumer.js";
dotenv.config();
startOtpConsumer();
const app = express();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map