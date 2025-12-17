import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

// IN-MEMORY STORAGE
let orders = [];

// SOCKET.IO
let tabs = 0;

io.on("connection", (socket) => {
  tabs++;
  io.emit("tabsCount", tabs);

  socket.on("disconnect", () => {
    tabs--;
    io.emit("tabsCount", tabs);
  });
});

// REST API

// GET orders
app.get("/api/orders", (_, res) => {
  res.json(orders);
});

// CREATE order
app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: Date.now(),
    title: req.body.title || `Приход ${orders.length + 1}`,
    date: req.body.date,
    price: req.body.price ?? null,
    products: [],
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// ADD product to order
app.post("/api/orders/:id/products", (req, res) => {
  const orderId = Number(req.params.id);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  const product = {
    id: crypto.randomUUID(),
    orderId: order.id,
    groupId: order.id,
    orderDate: order.date,
    ...req.body,
  };

  order.products.push(product);
  res.status(201).json(product);
});

// DELETE order
app.delete("/api/orders/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  const deleted = orders[index];
  orders.splice(index, 1);

  res.json(deleted);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  let deleted = false;

  orders = orders.map((order) => {
    const before = order.products.length;

    order.products = order.products.filter((p) => p.id !== productId);

    if (order.products.length !== before) {
      deleted = true;
    }

    return order;
  });

  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ id: productId });
});

// UPDATE product field
app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const { field, value } = req.body;

  let updatedProduct = null;

  orders.forEach((order) => {
    order.products = order.products.map((p) => {
      if (p.id === productId) {
        updatedProduct = { ...p, [field]: value };
        return updatedProduct;
      }
      return p;
    });
  });

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updatedProduct);
});

/* Serve React build */
app.use(express.static(join(__dirname, "../client/dist")));

// Catch-all route для React Router
app.get(/.*/, (_, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

/* Start server */
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
