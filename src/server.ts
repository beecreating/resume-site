import express from "express";
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(express.static("public"));
app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
