const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, sendSuccess } = require("../utils/helper");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "This email is already in use!");

  const newUser = new User({ name, email, password });
  await newUser.save();

  // Generate 6 digits OTP
  let OTP = generateOTP();

  // Store OTP inside DB
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  // Send OTP to user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
  });

  sendSuccess(res, "Please verify your email. OTP has been sent to your email");
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) {
    return sendError(res, "Invalid user");
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, "User not found", 404);
  }

  if (user.isVerified) {
    return sendError(res, "User is already verified");
  }

  const token = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!token) {
    return sendError(res, "Token not found", 404);
  }

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) {
    return sendError(res, "Please submit a valid OTP");
  }

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  // Send OTP to user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: `
      
      <h1>Your email has been successfully verified. Welcome to our app</h1>
    `,
  });

  sendSuccess(res, "Your email has been verified");
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found", 404);

  if (user.isVerified) return sendError(res, "This email is already verified");

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken) return sendError(res, "Your OTP is still valid");

  // Generate 6 digits OTP
  let OTP = generateOTP();

  // Store OTP inside DB
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  // Send OTP to user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email verification",
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
  });

  sendSuccess(
    res,
    "New verification token has been sent to your email address"
  );
};
