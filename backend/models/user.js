// const mongoose = require('mongoose');
// const mongooseErrors = require('mongoose-errors')
// // on restreint les utilisateurs a utilisés la même adresse email
// const uniqueValidator = require('mongoose-unique-validator'); 

// const userSchema = mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// userSchema.plugin(uniqueValidator);
// userSchema.plugin(mongooseErrors);

// // schéma modele
// module.exports = mongoose.model('User', userSchema);

const db = require('../cfg/mysql')
class User {
    constructor(user){
        this.email = user.email;
        this.prenom = user.prenom;
        this.nom = user.nom;
        this.password = user.password;
    }
}

User.create = user => {
    const INSERT = [Object.keys(user), Object.values(user)]
    const query = db.format('INSERT INTO utilisateur (??) VALUES (?)',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results) ;
    });
})
};
User.findOne = user => {
    const INSERT = [Object.keys(user), Object.values(user)]
    const query = db.format('SELECT email,nom,prenom,password FROM utilisateur WHERE ??=?',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
    });
})
}

//PUT
// Se Modifier
exports.modifyUserProfile = async (req, res, next) => {

    let userObject = {
        ...req.body
    };

    // Password
    if (userObject.password) {
        console.log("password change for user " + userId)
        userObject.password = await bcrypt.hash(userObject.password, 10)
    }
    
    //Avatar        
    if (req.file) {
        console.log("avatar change for user " + userId)
        userObject.avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(userObject);
    

    const INSERT = [userObject,res.locals.userId]
    const query = db.format('UPDATE utilisateur SET ? WHERE id = ? ',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
        });
    })
}

// DELETE
// Suppression de l'user
exports.deleteAccount = (req, res, next) => {
    
    const INSERT = [res.locals.userId]
    const query = db.format('DELETE utilisateur WHERE id = ? ',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
        });
    })
}


module.exports = User;


