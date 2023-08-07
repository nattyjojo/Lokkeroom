import express from "express";
import bodyParser from 'body-parser';
import routeUrls from './routesUrls.js';
import responses from "./routeResponse.js";
import queryUserName from "./dataBaseQuerys/queryUserName.js";
import insertIntoDataBase from './dataBaseQuerys/insertUser.js';
import bycryptPassword from './middleWares/bcryptPassword.js'
import creatLobbyMiddleware from "./middleWares/lobbyMilddleware/createLobbyMiddleware.js";
import crypto from "crypto";
import lobbyMessage from "./middleWares/lobbymessage.js";
import addUserToLobby from '../routes/middleWares/lobbyMilddleware/addUserToLobby.js'

const router = express.Router();
router.use(bodyParser.json());
// registeration route url
const registerUrl = routeUrls.register;

router.get(registerUrl, (req, res) => {
    res.json(responses.find(response => response.register()))
    
});
router.post(registerUrl, async (req, res) => {
    const userData = req.body
    const userDataLenght = Object.keys(userData).length
    if(userDataLenght < 3 || userDataLenght > 3 ){
        res.json({msg:"invalid data"})
        res.end()
        return
    }
    
    try{
        const queryUser = await queryUserName(userData)
        let  result = await queryUser.rows
        

        // check if user name exist in database
        if(result.length === 0){
            // hash password and insert into database
            const password = await bycryptPassword.hash(userData.password)
            userData.password = password
            // generate apiKey
            const randomKey =  crypto.randomBytes(64).toString('hex')
            userData.randomKey = randomKey
            insertIntoDataBase(userData)
            console.log("inserted")
            res.json({ "keep your Api Key safe": `${randomKey}` })
        }else{
            console.log("username exist")
            res.json({"msg":"User Name not avaliable"})
        }
    }catch (err){
        console.error(err)
    } 
});

const loginUrl = routeUrls.login
router.get(loginUrl, (req, res) => {
    res.json(responses.find(response => response.login))

});
router.post(loginUrl, async (req, res) => {
    const userData = req.body
    try{
        
        const queryUserData = await queryUserName(userData)
        const  queryUserDataResult = await queryUserData.rows
        if(queryUserDataResult.length === 0){
            res.send("User Not Registered")
            res.end()
            console.log("user not registered")
        }else{
            const purePassword = userData.password
            const savedpassword = queryUserDataResult[0].password
            //console.log(savedpassword)
            const password = await bycryptPassword.compare(purePassword, savedpassword)
            console.log(password)
            if(password === true){
                res.send("user ok")
                console.log("can login")
                res.end()

            }else{
                res.send("incorrect data")
                console.log("incorrectPass")
                res.end()
            }
            // const password = await bycryptPassword.hash(queryUser.password)
            //userData.password = password
            // console.log(password)
            // console.log(userData)
            
        }
       
    }catch (err){
        if (err) throw err
    }
});

const lobbyUrl = routeUrls.lobby
router.use(lobbyUrl, creatLobbyMiddleware)

const addUserToLobbyUrl = routeUrls.addUserToLobby
router.use(addUserToLobbyUrl, addUserToLobby)  


const lobbyMessageUrl = routeUrls.lobbyMsg
router.use(lobbyMessageUrl, lobbyMessage)








export default router


