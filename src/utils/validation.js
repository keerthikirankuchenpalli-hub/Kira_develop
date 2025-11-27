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

    // 1. Required name fields
    if (!FirstName || !LastName) {
        throw new Error("Name fields cannot be empty");
    }

    // 2. First name length validation
    if (FirstName.length < 4 || FirstName.length > 30) {
        throw new Error("FirstName must be between 4 and 30 characters");
    }

    // 3. Email required + valid
    if (!Email) {
        throw new Error("Email is required");
    }
    if (!validator.isEmail(Email)) {
        throw new Error("Email is not valid: " + Email);
    }

    // 4. Password required + strong
    if (!Password) {
        throw new Error("Password is required");
    }
    if (!validator.isStrongPassword(Password)) {
        throw new Error("Password is not strong enough");
    }

    // You can add optional validations for age, gender, skills, etc.
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
   const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field)
);

return isEditAllowed;
}



module.exports = { validateSignUpData, validateEditProfileData };