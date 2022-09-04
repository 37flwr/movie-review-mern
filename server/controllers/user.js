const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(401).json({ error: "This email is already in use!" });

  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generate 6 digits OTP
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  console.log(OTP);

  // Store OTP inside DB
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  // Send OTP to user
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6831398ae0f3ce",
      pass: "3b3dbfd3b979e9",
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    message: "Please verify your email. OTP has been sent to your email",
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(401).json({ error: "Invalid user" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "User is already verified" });
  }

  const token = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) {
    res.status(400).json({ error: "Please submit a valid OTP" });
  }

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  // Send OTP to user
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6831398ae0f3ce",
      pass: "3b3dbfd3b979e9",
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: `
      
      <h1>Your email has been successfully verified. Welcome to our app</h1>
    `,
  });

  res.status(200).json({ message: "Your email has been verified" });
};
