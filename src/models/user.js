const e = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      enum : ["male", "female", "other"],
      message : `{VALUE} is not supported`,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://randomuser.me/api/portraits/men/1.jpg",
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

userSchema.methods.getJWT = async function () {
const user = this;

  const token = await jwt.sign({ userId: this._id }, "kira@dev$2025",{
    expiresIn: '1h'
  });

  return token;
}

userSchema.methods.validatePassword = async function(enteredPassword) {
    try {
        const isValid = await bcrypt.compare(enteredPassword, this.Password);
        return isValid;
    } catch (err) {
        console.error("Error during password validation:", err);
        return false;
    }
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
