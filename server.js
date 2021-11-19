require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const SocketServer = require('./SocketServer')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/postRoute'))
app.use('/api', require('./routes/commentRoute'))
app.use('/api', require('./routes/notifyRoute'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    
}, err => {
    if(err) throw err
    console.log('Connected to MongoDB...');
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
    console.log(`Server is runnig to port ${PORT}...`);
})