const express = require('express')
const cors = require('cors')
const { Connection } = require('./config/db')
const { userRoute } = require('./Routes/user.route')
const Movie = require('./model/userr.model')
const { moviesRoute } = require('./Routes/movies.route')
const { wishlistRoute } = require('./Routes/wishlist.route')
const { Auth } = require('./config/auth')
const app = express()
app.use(cors())
app.use(express.json())
require("dotenv").config();
app.use(userRoute)
app.use(moviesRoute)
app.use(Auth,wishlistRoute)
app.get("/", (req, res) => {
    res.send("home")
})

app.listen(process.env.Port, async () => {
    try {
        await Connection
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
})