const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();

app.post('/send', (req, res) => {
  try {
      const mailOptions = {
          from: req.body.mail,
          to: process.env.email,
          subject: req.body.contactSubject,
          html: `
          <p>You have a new contact request.<p>
          <h3>Contact Details</h3>
          <ul>
            <li>Name: ${req.body.contactName}</li>
            <li>Email: ${req.body.contactEmail}</li>
            <li>subject: ${req.body.contactSubject}</li>
            <li>Message: ${req.body.contactMessage}</li>
            <ul>
          `
      };

      transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
              res.status(500).send({
                  success: false,
                  message: 'Something went wrong. Please try again later.'
              });
          } else {
              res.send({
                  success: true,
                  message: 'Thanks for contacting me. I will get back to you shortly.'
              });
          }
      });
  }
  catch (error) {
      res.status(500).send({
          success: false,
          message: 'Something went wrong. Please try again later.'
      })
  }
});

app.listen(port, () => {
  console.log('server start on port: ' + port);
});