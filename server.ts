import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import db from "./db.js";
import localAI from "./local_ai.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "bolke-secret-key-123";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "mock_key", {
  apiVersion: "2025-01-27.acacia" as any,
});

// Configure multer for audio uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware for Auth
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- SUBDOMAIN MIDDLEWARE ---
  app.use((req: any, res, next) => {
    const host = req.headers.host || "";
    const mainDomain = process.env.MAIN_DOMAIN || "localhost:3000";
    
    if (host !== mainDomain && host.endsWith(mainDomain)) {
      const subdomain = host.replace(`.${mainDomain}`, "");
      req.subdomain = subdomain;
    }
    next();
  });

  // --- AUTH ROUTES ---

  app.post("/api/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
      const result = stmt.run(name, email, hashedPassword);
      
      const token = jwt.sign({ id: result.lastInsertRowid, email, name }, JWT_SECRET);
      res.json({ token, user: { id: result.lastInsertRowid, name, email, plan: 'free' } });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(400).json({ message: "Email already exists" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    const user: any = db.prepare("SELECT id, name, email, plan FROM users WHERE id = ?").get(req.user.id);
    res.json(user);
  });

  // --- SHOP ROUTES ---

  app.post("/api/generate-site", authenticateToken, upload.single('audio'), async (req: any, res: Response) => {
    try {
      const audioFile = req.file;
      if (!audioFile) return res.status(400).json({ message: "No audio uploaded" });

      // 1. Transcription (Local Whisper)
      const transcription = await localAI.transcribeAudio(audioFile.buffer);

      // 2. Extraction (Local Ollama/Llama3)
      const shopData = await localAI.extractShopData(transcription);

      const slug = (shopData.name || "my-shop").toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).substring(7);
      
      const stmt = db.prepare("INSERT INTO shops (user_id, name, slug, category, location, description, whatsapp_number, config_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      stmt.run(req.user.id, shopData.name, slug, shopData.category, shopData.location, shopData.description, shopData.whatsapp_number, JSON.stringify(shopData));

      res.json({ success: true, slug, details: shopData, url: `http://${slug}.${process.env.MAIN_DOMAIN || 'localhost:3000'}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "AI processing failed" });
    }
  });

  app.get("/api/shops", authenticateToken, (req: any, res) => {
    const shops = db.prepare("SELECT * FROM shops WHERE user_id = ?").all(req.user.id);
    res.json(shops);
  });

  app.get("/api/shops/:id", authenticateToken, (req: any, res: Response) => {
    const shop = db.prepare("SELECT * FROM shops WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  });

  // --- PUBLIC SHOP API ---
  app.get("/api/public/shop/:slug", (req, res) => {
    try {
      const shop: any = db.prepare("SELECT * FROM shops WHERE slug = ?").get(req.params.slug);
      if (!shop) return res.status(404).json({ message: "Shop not found" });
      
      const products = db.prepare("SELECT * FROM products WHERE shop_id = ?").all(shop.id);
      res.json({ shop, products });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/shops/:id", authenticateToken, (req: any, res: Response) => {
    const { name, category, location, description, whatsapp_number } = req.body;
    try {
      db.prepare("UPDATE shops SET name = ?, category = ?, location = ?, description = ?, whatsapp_number = ? WHERE id = ? AND user_id = ?")
        .run(name, category, location, description, whatsapp_number, req.params.id, req.user.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Update failed" });
    }
  });

  app.delete("/api/shops/:id", authenticateToken, (req: any, res: Response) => {
    try {
      db.prepare("DELETE FROM shops WHERE id = ? AND user_id = ?").run(req.params.id, req.user.id);
      db.prepare("DELETE FROM products WHERE shop_id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Delete failed" });
    }
  });

  app.put("/api/shops/:id/theme", authenticateToken, (req: any, res: Response) => {
    const { config_json } = req.body;
    try {
      db.prepare("UPDATE shops SET config_json = ? WHERE id = ? AND user_id = ?")
        .run(JSON.stringify(config_json), req.params.id, req.user.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Theme update failed" });
    }
  });

  app.get("/api/shops/:id/products", authenticateToken, (req: any, res) => {
    const products = db.prepare("SELECT * FROM products WHERE shop_id = ?").all(req.params.id);
    res.json(products);
  });

  app.post("/api/shops/:id/products", authenticateToken, (req: any, res) => {
    const { name, price, description, image_url, category } = req.body;
    try {
      const result = db.prepare("INSERT INTO products (shop_id, name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?, ?)")
        .run(req.params.id, name, price, description, image_url, category);
      res.json({ id: result.lastInsertRowid, name, price, description, image_url, category });
    } catch (error) {
      res.status(500).json({ message: "Failed to add product" });
    }
  });

  app.put("/api/products/:id", authenticateToken, (req: any, res: Response) => {
    const { name, price, description, image_url, category } = req.body;
    try {
      db.prepare("UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ? WHERE id = ?")
        .run(name, price, description, image_url, category, req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Update failed" });
    }
  });

  app.delete("/api/products/:id", authenticateToken, (req: any, res: Response) => {
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Delete failed" });
    }
  });

  // --- FORM-BASED GENERATION ---

  app.post("/api/generate-site-form", authenticateToken, async (req: any, res) => {
    const { name, category, location, description, whatsapp_number, language } = req.body;
    
    try {
      const slug = (name || "my-shop").toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).substring(7);
      
      const stmt = db.prepare("INSERT INTO shops (user_id, name, slug, category, location, description, whatsapp_number, config_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      stmt.run(req.user.id, name, slug, category, location, description, whatsapp_number, JSON.stringify({ name, category, location, description, language }));

      res.json({ success: true, slug, url: `http://${slug}.${process.env.MAIN_DOMAIN || 'localhost:3000'}` });
    } catch (error) {
      res.status(500).json({ message: "Generation failed" });
    }
  });

  // --- PAYMENT ROUTES ---

  app.post("/api/payments/create-checkout", authenticateToken, async (req: any, res) => {
    const { plan } = req.body; // 'dukan' or 'brand'
    const prices: any = {
      'dukan': 19900, // INR 199.00
      'brand': 69900  // INR 699.00
    };

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'inr',
            product_data: { name: `BolKe ${plan.toUpperCase()} Plan` },
            unit_amount: prices[plan],
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.APP_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}/pricing`,
        metadata: { userId: req.user.id, plan }
      });

      res.json({ id: session.id, url: session.url });
    } catch (error) {
      res.status(500).json({ message: "Payment initiation failed" });
    }
  });

  // Mock Webhook for local testing (or real one)
  app.post("/api/payments/webhook", async (req, res) => {
    // In a real app, verify stripe signature
    const event = req.body;
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { userId, plan } = session.metadata;
      db.prepare("UPDATE users SET plan = ? WHERE id = ?").run(plan, userId);
    }
    res.json({ received: true });
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BolKe Server running on http://localhost:${PORT}`);
  });
}

startServer();
