import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is misssing",
                success: false
            });
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            })
        }

        const file = req.file;
        let profilePhotoUrl = "";

        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "image",
                access_mode: "public",
            });
            profilePhotoUrl = cloudResponse.secure_url;

            console.log("Uploaded file:", file.originalname);
        } else {
            return res.status(400).json({
                message: "Profile photo is required.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: newUser
        });
    } catch (error) {
        console.log("Register Controller Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is misssing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or passsword.",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or passsword.",
                success: false
            })
        };
        //check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const sanitizedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, saneSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user: sanitizedUser,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out succesfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills);
        const file = req.file;

        const userId = req.user.userId; //middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        //cloudinary


        if (skills) {
            let parsedSkills = skills;
            if (typeof skills === 'string') {
                try {
                    parsedSkills = JSON.parse(skills);
                } catch (e) {
                    parsedSkills = [skills];
                }
            }
            user.profile.skills = Array.isArray(parsedSkills) ? parsedSkills : [parsedSkills];
        }



        //updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        //resume here

        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "auto",
                    access_mode: "public",
                });

                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
                user.markModified("profile");
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid file upload. Please try again.",
                });
            }
        }



        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile updated succesfully.",
            user,
            success: true
        })
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
        });
    }
}