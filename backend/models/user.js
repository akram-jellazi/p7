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
    db.query(query, function (error, results, fields) {
        if (error) throw error;
        return results;
      });
}
User.find = user => {
    const INSERT = [Object.keys(user), Object.values(user)]
    const query = db.format('SELECT email,nom,prenom FROM utilisateur WHERE ??=?',INSERT)
    db.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results)
        return results[0];
      });
}



module.exports = User;


