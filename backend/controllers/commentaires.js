const jwt = require("jsonwebtoken");
const mysql = require('mysql');
const db = require("../cfg/mysql");

const Commentaires = require('../models/commentaires');
const User = require('../models/User');

// POST
// Créer un commentaire
exports.createCommentaires = (req, res, next) => {
    console.log("req",req.body.postId)
    const commentaires = Commentaires.create({
        text: req.body.text,
        postId: req.body.postId,
        userId: res.locals.userId
    })
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Création du Commentaire échoué' })
        });
}

//GET
// Voir les commentaires
exports.findAllbypost = (req, res, next) => {
    console.log('req.params',req.params)
    Commentaires.findAllbypost({
        
        order: [['updatedAt', "ASC"]],
        where: { postId: req.query.postId },
        include: {
            model: User,
          //  attributes: [ 'lastName', 'firstName', 'avatar' ],
          //  as: "User"
        }
    })
    .then(commentaireFound => {
            res.status(200).json(commentaireFound);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ error: 'Recherche du commentaire échoué' });
    });
}

//GET
// Voir les commentaires
// exports.getAllCommentaires = (req, res, next) => {
//     Commentaires.findAll({
//         order: [['updatedAt', "ASC"]],
//         where: { postId: req.params.postId },
//         include: {
//             model: User,
//           //  attributes: [ 'lastName', 'firstName', 'avatar' ],
//           //  as: "User"
//         }
//     })
//     .then(commentaireFound => {
//             res.status(200).json(commentaireFound);
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(500).send({ error: 'Recherche du commentaire échoué' });
//     });
// }

//DELETE
// Supprimer un commentaire
exports.deleteCommentaires = (req, res, next) => {
    Commentaires.findOne({
        where: { id: req.params.id }
    })
    .then(commentaireFound => {
        if(commentaireFound) {
            Commentaires.delete({
                where: { id: req.params.id }
            })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Suppression du commentaire échoué' })
            });

        } else {
            return res.status(404).json({ error: 'Aucun commentaire publié :('})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Suppression du commentaire échoué' })
    });
}
