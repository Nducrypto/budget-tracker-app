import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

import ExpenseUser from "../models/user.js";

// dotenv.config();

// SIGNIN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await ExpenseUser.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "10h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGNUP
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await ExpenseUser.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User alraedy exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await ExpenseUser.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result, id: result._id }, "test", {
      expiresIn: "10h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
