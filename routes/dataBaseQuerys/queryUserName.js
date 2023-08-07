import queryUserNameMiddleWare from "./dataBaseConnectionTem.js" 

const queryUserName = (userData) => {
    return new Promise((resolve, reject) => {
        
        queryUserNameMiddleWare.query('SELECT email, username, password FROM lokkeroom.users where username= $1 AND email= $2;',
        [userData.username, userData.email],
        (err, result) => {
                if(err){
                    console.error(err)
                    reject(err)
                }else{
                    
                    resolve(result)

                }
               
               
            })
        
    })
}
export default queryUserName