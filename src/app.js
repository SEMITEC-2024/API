const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const con = require('./controllers/account-controller')
const accountRoutes = require('./routes/account-routes')
const cors = require('cors')

app.use(cors({origin: "*"}))
app.use(express.json());

app.use(accountRoutes);

app.listen(port, () => {
    console.log(process.env)
    console.log(`Running on port ${port}`)
})