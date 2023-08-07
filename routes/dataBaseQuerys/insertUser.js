import insertUser from './dataBaseConnectionTem.js'




const insertIntoDataBase = async (data) => {
    
    insertUser.query('INSERT INTO lokkeroom.users(username, email, password, api_key) values($1, $2, $3, $4)',
    [data.username, data.email, data.password, data.randomKey],
     (err, result) => {
        if(err){

            console.error(err)
        }else{
            console.log("done")
        }
        


    })
    
}

export default insertIntoDataBase