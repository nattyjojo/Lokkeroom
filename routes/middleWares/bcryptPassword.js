import bcrypt from 'bcrypt'

const bcryptPassword = {

    hash: async function(password){
        try{
             const bcryptHash = await bcrypt.hash(`${password}`, 10)
             return bcryptHash
             
        }catch (err){
         console.error(err)
        } 
    },
    compare: async function(purePassword, savedpassword){
        try{
             const bcryptCompare = await bcrypt.compare(purePassword, savedpassword)
             return bcryptCompare
             
        }catch (err){
         console.error(err)
        } 
    }

}

// const pass = "12345"
// const comparePas = '$2b$10$RBA.GGa/dScJ1WyUy0Xu2u1GMfwmVwflKaT6b78KCN7EN6SxNkFV2'
// async function test(pass, comparePas){
//     const incre =  await bcryptPassword.compare(pass, comparePas)
//     console.log(incre)
// }
// test(pass, comparePas)

 
export default bcryptPassword

