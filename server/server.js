const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/mongodb')

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json());
app.use(cors())
connectDB()

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/image',require('./routes/imageRoute'))

app.listen(PORT, () => {
    console.log('Server running on PORT : ' + PORT)
})