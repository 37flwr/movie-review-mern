const nodemailer = require("nodemailer");
// Generate 6 digits OTP
exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6831398ae0f3ce",
      pass: "3b3dbfd3b979e9",
    },
  });
