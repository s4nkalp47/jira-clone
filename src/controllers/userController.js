import User from "../models/User.js";

export const registerUser = async(req, res, next) => {
    try{
        const {name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    }
    catch(error){
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};