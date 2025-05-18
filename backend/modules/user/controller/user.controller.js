const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
const secretJWT = process.env.JWT_SECRET;
const pepper = "fcis26";
const saltRounds = 10;
let userID = 0;

const userExists = async (req, res) => { 
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) { 
        return true;
    }
    else {
        return false;
    }
}

const addUser = async (req, res) => {

    const { username,password } = req.body;
    if (await userExists(req, res)) {
        return res.status(409).json({ message: "Username already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password + pepper, saltRounds);
    const user = new User({
        username,
        password : hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne ({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = bcrypt.compareSync(password + pepper, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({user}, secretJWT, { expiresIn: "1h" });
    res.status(200).json({ token, username });
    
}

const authUser = async (req, res) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    await jwt.verify(token, secretJWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        userID = decoded.user._id;
        console.log(userID);
        res.status(200).json({ message: "Authorized" });

    });
}


module.exports = { addUser, loginUser, authUser, userID };