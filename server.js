const express= require('express');
const app= express();
const mongoose= require('mongoose');
require('dotenv').config();
const router = require('./routes/userRoute');

app.get('/', (req,res)=>{
    res.send('Jai Shree Ram')
})

app.use(express.json());

const port= process.env.PORT
const url= process.env.Mongo_URL

mongoose.connect(url)
    .then(()=>{
        console.log('Mongodb connected');
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})

app.use('/api/user', router)

