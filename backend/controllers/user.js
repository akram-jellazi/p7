const jwt = require('jsonwebtoken');//application token
const bcrypt = require('bcrypt'); //application bcrypt
const mysql = require('mysql');

 const User = require('../models/user');


// inscription
exports.signup = async (req, res, next) => {

        console.log(req.body)
            bcrypt.hash(req.body.password, 10) //« haché » le mot de passe + 10(tour d'algorithme)
                .then(hash => {
                    const user = new User({ //nouveau user + mdp crypté
                    email: req.body.email,
                    password: hash,
                    nom: req.body.nom,
                    prenom: req.body.prenom
                    });
                User.create(user) // enregistré dans la base de données 
                res.status(201).json({ message: 'Utilisateur créé' })
                })
            };
      
// connection
exports.login = (req, res, next) => {
    let user = User.findOne({ email: req.body.email }) 
    .then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        bcrypt.compare(req.body.password, user.password) // compare le mdp envoyé avec la requête , avec le hash enregistré dans le document user
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }

                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(//nouveau token
                        { userId: user.id,          
                          status : user.status }, //contient ID encodées dans le token
                        'RANDOM_TOKEN_SECRET',// encoder avec la clef "RANDOM_TOKEN_SECRET"
                        { expiresIn: '24h' }//durée de validité
                    )
                });
            })
    }) 
    
// Afficher le profil
  };
  exports.getProfil = (req, res, next) => {
    let user = User.findOne({ id: res.locals.userId }) 
    .then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({user})
 
    }) 
};
// Supprimé le profil
exports.deleteProfil = (req, res, next) => {
    let user = User.deleteAccount({ id: res.locals.userId }) 
    .then(user => {
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({user})
 
    }) 
};