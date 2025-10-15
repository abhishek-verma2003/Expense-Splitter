import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email,  password } = req.body;
    if (!name || !email ||  !password ) {
      return res.status(400).json({
        message: "Someting is Missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exist",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//----Login----
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({
        message: "Incomplete Credentials",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }


    const tokenData = {
      userId: user._id,
    };
    
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res
      .status(200)
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
        token
            });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: "lax",  // ✅ works in localhost
      secure: false ,    // ✅ false for http://localhost
      path: '/'     // ✅ add this
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//----Logout----
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};