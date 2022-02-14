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
    const query = db.format('SELECT id, email,nom,prenom,password,status, createdAt, updatedAt FROM utilisateur WHERE ??=?',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
    });
})
}



// DELETE
// Suppression de l'user
User.deleteAccount = id => {
    
    const INSERT = [id]
    const query = db.format('DELETE FROM utilisateur WHERE id = ? ',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve('suppression ok') ;
        });
    })
}


module.exports = User;


