const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const con = require('./controllers/account-controller')
const accountRoutes = require('./routes/account-routes')
const lessonRoutes = require('./routes/lesson-routes')
const auth = require('./middleware/auth')
const cors = require('cors')
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};
app.use(cors(corsOptions))
app.use(express.json());
app.use('/teacher/*', auth.teacherGroupsAuth)
app.use('/student/*', auth.studentAuth)
app.use(accountRoutes);
app.use(lessonRoutes);

app.listen(port, () => {
    console.log(process.env)
    console.log(`Running on port ${port}`)
})