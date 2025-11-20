import express from "express";
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(express.static("public"));
app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "hotmail", // works for Outlook/Live/Hotmail
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});