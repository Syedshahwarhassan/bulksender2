const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

app.listen(4600, () => console.log("Server is running on port 4600"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// let emaillist = [
//   "contact@digitalsohail.com",
//   "info@aamax.co",
//   "info@avanzasolutions.com",
//   "info@itgenesis.net",
//   "contact@arbisoft.com",
//   "hi@techabout.com",
//   "info@northbaysolutions.com",
//   "sales@ranatechnologies.com",
//   "  info@pixelpk.com",
//   "contact@bittechnologies.com",
// ];
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/send", async (req, res) => {
  const { subject, content, emaillist } = req.body;

  if (!subject || !content || !emaillist || !Array.isArray(emaillist) || emaillist.length === 0) {
      return res.status(400).json({ message: "Please provide subject, content, and a valid email list." });
  }

  const transport = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASS,
      },
  });

  try {
      // Send emails
      const emailPromises = emaillist.map((recipient) => {
          const mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: recipient.trim(),
              subject,
              html: content,
          };
          return transport.sendMail(mailOptions);
      });

      const results = await Promise.allSettled(emailPromises);
      const successes = results.filter((result) => result.status === "fulfilled");
      const failures = results.filter((result) => result.status === "rejected");

      console.log(`${successes.length} emails sent successfully.`);
      console.error(`${failures.length} emails failed to send.`);

      res.status(200).json({
          message: `${successes.length} emails sent successfully.`,
          failed: failures.length,
      });
  } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).json({ message: "An error occurred while sending emails." });
  }
});

