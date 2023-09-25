const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    const {email, name, password} = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({ error: err.message });
            }
            const user = new UserModel({ name, email, password: hash });
            await user.save();
            res.json({ msg: "User has been registered", "user_added": req.body });
        });
    } catch (error) {
        console.log("error:", error.message);
    }
});

userRoute.post("/login", async (req, res) => {
    const {email, password} = req.body;
    let user = await UserModel.findOne({email});
    try {
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, user: user.name }, "RNP");
                    res.json({ msg: "Logged In!!", token: token });
                } else {
                    res.json({ error: "Wrong Credentials" });
                }
            })
        }
    } catch (error) {
        console.log("error:", error.message);
    }
})

module.exports = {userRoute};