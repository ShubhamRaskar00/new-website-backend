// --- START OF FILE controller/contact.js ---

const express = require("express");
// Corrected: Use express.Router()
const router = express.Router(); // Use express.Router()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");

// send date to admin
router.post(
  "/sendmail",
  catchAsyncErrors(async (req, res, next) => {
    // Add basic input validation
    const { name, email, phoneNumber, message } = req.body;
    if (!name || !email || !message) {
      // phoneNumber might be optional
      return next(
        new ErrorHandler("Please provide name, email, and message", 400)
      );
    }
    // Consider adding email format validation here if needed

    try {
      // Construct the message content securely
      // Use environment variable for the recipient email for better configuration
      const recipientEmail =
        process.env.ADMIN_EMAIL || "shubhamraskar69@gmail.com"; // Use env var or fallback
      const emailSubject = `New Contact Form Submission from ${name}`;
      const emailBody = `You received a new message from your website contact form:\n
Name: ${name}\n
Email: ${email}\n
Phone Number: ${phoneNumber || "Not provided"}\n
Message:\n${message}
      `;

      await sendMail({
        // Use the configured recipient email
        email: recipientEmail,
        subject: emailSubject,
        message: emailBody, // Renamed variable for clarity
      });

      res.status(200).json({
        // Use 200 OK for successful processing, 201 is for resource creation
        success: true,
        message: "Message sent successfully!", // More user-friendly message
      });
    } catch (error) {
      // FIX: Access error.message directly
      // Also log the original error for debugging on the server
      console.error("Error sending email:", error);
      // Pass the actual error message, or a generic one if message is missing
      return next(
        new ErrorHandler(
          error.message || "Failed to send email due to an internal error",
          500
        )
      );
    }
  })
);

module.exports = router;
// --- END OF FILE controller/contact.js ---
