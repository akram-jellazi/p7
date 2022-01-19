const jwt = require("jsonwebtoken");
const db = require('../models/index');

// POST
// Créer un commentaire
Commentaires.createCommentaire = (req, res, next) => {
 
    const commentaire = db.Commentaire.build({
        text: req.body.text,
        postId: req.params.postId,
        userId: res.locals.userId
    })
    commentaire.save()
        .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error: 'Création du Commentaire échoué' })
        });
}

//GET
// Voir les commentaires
Commentaires.getAllCommentaires = (req, res, next) => {
    db.Commentaire.findAll({
        order: [['updatedAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'lastName', 'firstName', 'avatar' ],
            as: "User"
        }]
    })
    .then(commentaireFound => {
            res.status(200).json(commentaireFound);
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ error: 'Recherche du commentaire échoué' });
    });
}

//DELETE
// Supprimer un commentaire
Commentaires.deleteCommentaire = (req, res, next) => {
    console.log('ici')
    db.Commentaire.findOne({
        attributes: ['id'],
        where: { id: req.params.commentaireId }
    })
    .then(commentaireFound => {
        if(commentaireFound) {
            db.Commentaire.destroy({
                where: { id: req.params.commentaireId }
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

module.exports = Commentaires;