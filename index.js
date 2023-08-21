// import express
const express=require('express')
require('dotenv').config()
const server=express()
// import cors for connecting view and backend
const cors=require('cors')
// import routing
const rout=require('./router/routing')
server.use(cors())
server.use(express.json())
require('./db/dbconnection')

server.use(rout)

// port creation
const port=3001|| process.env.port

server.listen(port,()=>{
    console.log(`------ server  is running ${port} this port-------`);
})