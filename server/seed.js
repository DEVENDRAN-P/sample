import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "users.db");

async function seedDemoUser() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, async (err) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        // Check if demo user exists
        db.get(
          "SELECT id FROM users WHERE username = ?",
          ["demo"],
          async (err, row) => {
            if (err) {
              reject(err);
              return;
            }

            if (row) {
              console.log("✓ Demo user already exists");
              db.close();
              resolve();
              return;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash("demo123", 10);

            // Insert demo user
            db.run(
              "INSERT INTO users (username, email, password, fullName) VALUES (?, ?, ?, ?)",
              ["demo", "demo@example.com", hashedPassword, "Demo User"],
              (err) => {
                db.close();
                if (err) {
                  reject(err);
                } else {
                  console.log("✓ Demo user created successfully!");
                  console.log("  Username: demo");
                  console.log("  Password: demo123");
                  resolve();
                }
              }
            );
          }
        );
      } catch (err) {
        db.close();
        reject(err);
      }
    });
  });
}

seedDemoUser()
  .then(() => {
    console.log("✓ Seeding complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("✗ Seeding failed:", err);
    process.exit(1);
  });
