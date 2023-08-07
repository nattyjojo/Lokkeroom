import responses from "../../routeResponse.js";

const addUserToLobby = (req, res) =>{
    const request = req.method;
    if(request === "GET"){
        res.json(responses.find(response => response.addUserToLoby))
        res.end()
    }

}
export default addUserToLobby