const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },

    LastName: {
      type: String,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid: " + value);
        }
      },
    },

    Password: {
      type: String,
      required: true,
        validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough: " + value);
        }
      },

    },

    age: {
      type: Number,
      min: 18,
      max: 65,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://www.vecteezy.com/vector-art/45944199-male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is a default about of user!",
    },

    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("Skills count exceeds the limit");
        }
      },
    },
  },

  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
