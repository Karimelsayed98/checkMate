const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

console.log(process.env.SENDGRID_API_KEY);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.listen(PORT, () => console.log(`Server is running on ${HOST}:${PORT}`));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://127.0.0.1:5500"],
    methods: ["GET", "POST"],
  })
);

app.post("/feedback", (req, res) => {
  sendFeedbackConfirmation(req.body);
  res.status(201).send();
});

function sendFeedbackConfirmation(email) {
  const mail = {
    to: "email",
    from: "checkMate@gmail.com",
    subject: "Checkmate Feedback",
    html:
      "<p>Thank you for your feedback &#128157;</p> <p>Regards, <br> Farfosheen Team  &#128293;</p>",
  };
  sgMail.send(mail);
}
