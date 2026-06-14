import mongoose from "mongoose";


const profilSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name connot exceed 50 characters"]
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, "Useraname must be at least 3 characters"],
        maxlength: [20, "Username connot exceed 20 characters"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: [10, "Password must be at least 8 characters"],
        select: false
    },
    avatar: {
        public_id: String,
        url: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    bio: {
        type: String,
        maxlength: [500, "Bio connot exceed 500 characters"],
        default: ""
    },
    headline: {
        type: String
    },
    socialLinks: {
        inkedin: String,
        github: String,
        twitter: String,
        youtube: String,
        portfolio: String,
    },
    learningGoals: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    accoundStatus: {
        type: String,
        emun: ["active", "blocked", "suspended"],
        default: "active"
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }

    ],
    teachingCourse: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    wishlist:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ],
    refreshToken: {
        type: String,
        default: null,
        select: false
    },
    lastLogin: {
        type: Date
    },
}, { timestamps: true })

export const Profile = mongoose.model("Profile", profilSchema);