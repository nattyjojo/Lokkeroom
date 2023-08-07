import responses from "../routeResponse.js"
import databaseConnection from "../dataBaseQuerys/dataBaseConnectionTem.js"

const lobbyMessage = (req, res) => {
    const request = req.method
    if(request === "GET"){
        res.json(responses.find(response => response.lobbyMessageData))
    }
    request === "POST"
    databaseConnection.query(''),
    [req.body.api_key],
    (err, result) => {
        if(err){
            console.error(err)
        }else{
            console.log(result)
        }
    }
}
export default lobbyMessage