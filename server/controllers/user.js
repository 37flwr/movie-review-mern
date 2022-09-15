const jwt = require("jsonwebtoken");

const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");

const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const {
  sendError,
  sendSuccess,
  generateRandomByte,
} = require("../utils/helper");

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

  res
    .status(201)
    .send({ user: newUser._id, name: newUser.name, email: newUser.email });
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

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Email is missing!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });

  if (alreadyHasToken)
    return sendError(res, "Only after one hour you can request another token");

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });

  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  // Send OTP to user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset password link",
    html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change password</a>
    `,
  });

  sendSuccess(res, "Link sent to your email");
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);

  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  // Send OTP to user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password reset successfully",
    html: `
      <h1>Password reset successfully</h1>
      <p>Now you can use new password</p>
    `,
  });

  sendSuccess(res, "Password successfully changed");
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch");

  const { name, _id } = user;

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ user: { id: _id, name, email, token: jwtToken } });
};
