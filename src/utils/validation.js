const validator = require("validator");

const validateSignUpData = (req) => {
    const {
        FirstName,
        LastName,
        Email,
        Password,
        age,
        gender,
        photoUrl,
        about,
        skills
    } = req.body;

    if (!FirstName || !LastName) {
        throw new Error("Name fields cannot be empty");
    }

    if (FirstName.length < 4 || FirstName.length > 30) {
        throw new Error("FirstName must be between 4 and 30 characters");
    }

    if (!Email) {
        throw new Error("Email is required");
    }
    if (!validator.isEmail(Email)) {
        throw new Error("Email is not valid: " + Email);
    }

    if (!Password) {
        throw new Error("Password is required");
    }
    if (!validator.isStrongPassword(Password)) {
        throw new Error("Password is not strong enough");
    }
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Photo URL is not valid: " + photoUrl);
    }
    if (age && (age < 18 || age > 65)) {
        throw new Error("Age must be between 18 and 65");
    }
    if (gender && !["male", "female ", "other"].includes(gender)) {
        throw new Error("Gender data is not valid");        
    }
    if (skills && !Array.isArray(skills)) {
        throw new Error("Skills must be an array");
    }
    if (skills && skills.length > 5) {
        throw new Error("Skills count exceeds the limit");
    }
    if (about && about.length > 500) {          
        throw new Error("About section exceeds maximum length of 500 characters");
    }

};

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "FirstName",
        "LastName",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills"
    ];

    const sentFields = Object.keys(req.body);
    console.log("FIELDS SENT FROM FRONTEND:", sentFields);

    const isEditAllowed = sentFields.every((field) =>
        allowedEditFields.includes(field)
    );

    if (!isEditAllowed) {
        console.log("❌ INVALID FIELD FOUND:", sentFields.filter(f => !allowedEditFields.includes(f)));
    }

    return isEditAllowed;
};




module.exports = { validateSignUpData, validateEditProfileData };