const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    // Define schema fields
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true }, // Ensure emails are unique
    password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
    // Use the JWT private key from environment variables
    const token = jwt.sign({ _id: this._id, email: this.email, firstName: this.firstName, lastName: this.lastName }, process.env.JWT_PRIVATE_KEY, { expiresIn: "7d" });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = { User, validate };
