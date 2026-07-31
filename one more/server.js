const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio credentials (replace with your real values)
const accountSid = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Your Twilio Account SID
const authToken = "abcd1234efgh5678ijkl9012";        // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { user_name, user_email, user_number, message } = req.body;

  client.messages.create({
    body: `New Contact Form:\nName: ${user_name}\nEmail: ${user_email}\nNumber: ${user_number}\nMessage: ${message}`,
    from: "+1234567890", // Your Twilio phone number
    to: "+918106413016"  // Surya's number
  }).then(() => res.send("SMS Sent!"))
    .catch(err => res.send(err));
});

app.listen(3000, () => console.log("Server running on port 3000"));
