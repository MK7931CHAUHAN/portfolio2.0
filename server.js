import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import process from "process";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store submissions in a JSON file (for demo purposes)
// In production, use a proper database
const submissionsFile = path.join(process.cwd(), 'submissions.json');

// Helper function to read submissions
const readSubmissions = () => {
  try {
    if (fs.existsSync(submissionsFile)) {
      const data = fs.readFileSync(submissionsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading submissions:', error);
  }
  return [];
};

// Helper function to write submissions
const writeSubmission = (submission) => {
  try {
    const submissions = readSubmissions();
    submissions.push({
      ...submission,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error writing submission:', error);
  }
};

// Input validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  next();
};

// Test endpoint
app.get("/api/test", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Backend server is working!",
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Server is running",
    port: PORT,
    emailConfigured: !!process.env.EMAIL_USER
  });
});

// Get all submissions (for admin purposes)
app.get("/api/submissions", (req, res) => {
  try {
    const submissions = readSubmissions();
    res.status(200).json({ 
      success: true, 
      data: submissions 
    });
  } catch (error) {
    console.error('Error reading submissions:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve submissions" 
    });
  }
});

// Send email and store data
app.post("/api/send-email", validateContactForm, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email credentials not configured");
    return res.status(500).json({ 
      success: false, 
      message: "Email service not configured." 
    });
  }

  try {
    // Store the submission first
    writeSubmission({ name, email, subject, message });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your contact form and stored in the system.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log("Email sent and data stored successfully");
    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully!" 
    });
  } catch (err) {
    console.error("Email error:", err);
    
    let errorMessage = "Failed to send email. Please try again later.";
    
    if (err.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check email credentials.";
    } else if (err.code === 'ECONNECTION') {
      errorMessage = "Cannot connect to email service.";
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
});