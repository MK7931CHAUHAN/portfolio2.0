// server.js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- AI Resume Download ---
app.get("/api/generate-resume", (req, res) => {
  const filePath = path.join(__dirname, "AI_Resume.pdf"); // static PDF, replace with dynamic AI generation
  res.download(filePath, "AI_Resume.pdf", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to download resume");
    }
  });
});

// --- Contact Form Email ---
app.post("/api/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Configure your email transporter (example with Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // your email
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
