import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDb } from "./db.js";
import { authMiddleware } from "./auth.js";
import authRoutes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database and start server
(async () => {
  try {
    await initDb();
    console.log("✓ Database initialized");

    // Routes
    app.use("/api/auth", authRoutes);

    // Protected route example
    app.get("/api/protected", authMiddleware, (req, res) => {
      res.json({ message: "This is a protected route", user: req.user });
    });

    // Health check
    app.get("/api/health", (req, res) => {
      res.json({ status: "Server is running" });
    });

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
