const express = require('express')
const userRoute = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { User } = require('../model/userr.model')
userRoute.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const NewUserRegisteration = new User({ firstname, lastname, email, password: hash })
            await NewUserRegisteration.save()
            res.status(200).send({ "msg": "Account has been created successfully" })
        })

    } catch (error) {
        res.status(400).send({ "msg": error })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    try {
        const Logindata = await User.findOne({ email })
        if (!Logindata) {
            res.status(404).send("User not found")
            console.log("here");
            return
        }
        console.log('not', Logindata);
        bcrypt.compare(password, Logindata.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ userId: Logindata._id }, process.env.SecretKey)
                res.status(200).send({ "Token": token, userName: Logindata.firstname + " " + Logindata.lastname })
            } else {
                res.status(404).send('Wrong Credential')
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

})
module.exports = {
    userRoute
}