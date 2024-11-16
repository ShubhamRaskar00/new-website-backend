const express = require("express");
const router = express();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");

// send date to admin
router.post(
  "/sendmail",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, phoneNumber, message } = req.body;
      await sendMail({
        email: "shubhamraskar69@gmail.com",
        subject: "Mail form your site",
        message: `Hey ${process.env.SMPT_MAIL},
        You got mail from ${name} this ${email} address and ${phoneNumber}, ${message}.
        `,
      })
      res.status(201).json({
        success: true,
        message: "Successfully send message"
      })
    }
    catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  })
);

module.exports = router;
