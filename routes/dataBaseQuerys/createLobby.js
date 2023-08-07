
import databaseConnection from "./dataBaseConnectionTem.js";

const insertLobby = (data) =>{
    databaseConnection.query('insert into lokkeroom.lobbies(lobby_name, admin_id) Values ($1, $2)',

    [data.lobby_name, data.admin_id],
    (err, result) => {
        if(err){
            console.error(err)
        }
    }
    )
}
export default insertLobby