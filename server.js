const express = require('express');
const app = express()
const http = require('http').Server(app);
const path = require("path")
const io = require('socket.io')(http)
const httpPort = 80
app.use(express.static(path.join(__dirname, 'public')))
io.on('connection',(socket)=>{
    console.log('An user is connected!')
})
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'))
})
http.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})