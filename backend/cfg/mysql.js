const mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'GROUPOMANIA'
});
db.connect(error =>{
    if (error) throw(error)
    console.log('sucessfully connected to database')
}) 
module.exports = db