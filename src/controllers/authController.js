import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import errorHandler from "../middlewares/errorMiddleware.js";

export const register = async(req, res, next) => {
    try{
        if (!req.body) {
            return res.status(400).json({ message: "Request body missing" });
        }
        const {name,email,password} = req.body;
        const userExists = await User.findOne({ email });
        
        if(userExists){
            return res.status(400).json({ message: "User already exits"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const { password: _, ...safeUser } = user._doc;

        res.status(201).json({
            token: generateToken(user._id),
            user : safeUser
        });
    }
    catch(error){
        next(error);
    }
};

export const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { password: _, ...safeUser } = user._doc;

        res.json({
            token: generateToken(user._id),
            user: safeUser
        });
    }
    catch(error){
        next(error);
    }
};
