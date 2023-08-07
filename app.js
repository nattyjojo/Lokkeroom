import express from 'express';
import json from 'express';
import router from './routes/routers.js'

const app = express()
app.use(json())


app.use('', router)

app.listen(14000, (err)=>{
    if(err) return err;
    console.log('listening')
})