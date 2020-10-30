const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'axelbukasaportfolio@gmail.com', // your email address to send email from
    pass: 'Hb58Asji@umuziacademy' // your gmail account password
  }
});

module.exports = transporter;