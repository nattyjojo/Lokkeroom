import dotenv from 'dotenv';
import pkg from 'pg';
const {Client} = pkg;
dotenv.config()

console.log(process.env.database)
const databaseConnection =  new Client({
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
})

databaseConnection.connect((err) => {
    if(err){
        console.log(err)
        // databaseConnection.end()
    }else{
        console.log('connected to database')
    }
})

export default databaseConnection