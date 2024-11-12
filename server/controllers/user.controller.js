import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const generateToken = (_id) => {
    const jwt_key = process.env.JWT_SECRET_KEY

    return jwt.sign({_id}, jwt_key, {expiresIn: "4d"})
}

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json("User with email already exists!")
        }

        if(!name || !email || !password) {
            return res.status(400).json("All fields are required!")
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json("Invalid email!")
        }

        if(!validator.isStrongPassword(password)) {
            return res.status(400).json("Password must be a strong password!")
        }

        user = new User({name, email, password})

        await user.save()

        const token = generateToken(user._id)

        res
            .status(200)
            .json({id: user._id, name, email, token, message: "Registered successfully"})
    } catch (error) {
        console.log(`Error from register user: ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json("Invalid email or password")
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            return res.status(400).json("Invalid password")
        }

        const token = generateToken(user._id)

        res.status(200).json({_id: user._id, name: user.name, email, token, message: "Login successful"})
    } catch (error) {
        console.log(`Error from login user: ${error.message}`)
        res.status(500).json(error.message)
    }
}

export const findUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
