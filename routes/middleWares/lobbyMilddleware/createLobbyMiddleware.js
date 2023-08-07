import responses from "../../routeResponse.js";
import databaseConnection from "../../dataBaseQuerys/dataBaseConnectionTem.js";
import insertLobby from "../../dataBaseQuerys/createLobby.js";


const creatLobbyMiddleware = (req, res) => {
    if(req.method === "GET"){

        res.json(responses.find(response => response.creatLobby))
        res.end()

    }else{
        req.method === "POST"
        const creatLobbyData = req.body
        const creatLobbyDataLength = Object.values(creatLobbyData).length
        if(creatLobbyDataLength < 2 || creatLobbyDataLength > 2){
            res.json({msg: "Incorrect Data"})
            res.end()
            return
        }
        databaseConnection.query('select username, id  from lokkeroom.users where api_key = $1;',
        [creatLobbyData.api_key], 
        (err, result) => {
            if(err){
                console.error(err)
                res.json({msg: "incomplete data"})
                res.end()
            }else{
                let data = result.rows[0]
                if(data.length === 0){
                    res.json({msg: "invalid api key"})
                }
                //lobby_name admin_id
                const lobbyData = {lobby_name: `${req.body.name}`, admin_id: `${data.id}`}
                console.log(lobbyData)
                insertLobby(lobbyData)
                res.json({msg: "lobby created"})
                res.end()
            }
        })
    }
    
}

export default creatLobbyMiddleware

