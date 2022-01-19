const jwt = require("jsonwebtoken");
const db = require('../models/index');
const fs = require('fs');

// POST
//Créé un post
exports.createPost = (req, res, next) => {
    const text = req.body.text;
    const imageURL = req.body.imageURL;


            const post = db.Post.create({
                text: req.body.text,
                imageURL: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imageURL,
                userId: res.locals.userId
            })
            .then(() => res.status(201).json({ message: 'Message créé !' }, ))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Création du message échoué' })
            });
};

//GET
// Voir tout les message
exports.getAllPosts = (req, res, next) => {

    db.Post.findAll({        
        order: [['createdAt', "DESC"]] , //ordre date descendant
        include: [
            {
                model: db.User,
                attributes: [ 'lastName', 'firstName', 'avatar' ],
                as: 'User'
            },
            { 
                model:db.Like, 
                as:'Likes', 
                where: { 
                    userId: res.locals.userId                    
                },
                required: false
            }
        ]
    })
    .then(postFound => {        
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message publié :(' });
        }
    })
    .catch(error => {
        console.log(error),
        res.status(500).send({ error: 'Recherche des messages échoué' });
    });
}
//PUT
// Modifier un message
exports.modifyPost = (req, res, next) => {
    
    let postObject = {
        ...req.body
    }    
    if (req.file)
    {
        postObject.imageURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    console.log(postObject)

    db.Post.findOne({
        where: {  id: req.params.postId },
    })
    .then(postFound => {
        if(postFound.userId == res.locals.userId){
            if(postFound) {
                db.Post.update(postObject, {
                    where: { id: req.params.postId}
                })
                .then(post => res.status(200).json({ message: 'Message modifié' }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Modification du message échoué' })
                })
            }
            else {
                res.status(404).json({ error: 'Aucun message trouvé :(' });
            }
        }
        else {
            res.status(403).json({ error: 'Vous n\'avez pas le droit de modifier ce message' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Modification du message échoué' })
    });
}

//DELETE
// Supprimer un message
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(post => {
        if(req.body.userId == post.userId || req.body.statut == 'admin'){
            if(post) {
                if(post.imageURL != null) {
                    const filename = post.imageURL.split('/images/')[1];

                    fs.unlink(`images/${filename}`, () => {
                        db.Post.destroy({
                            where: { id: req.params.postId }
                        })
                        .then(() => res.status(200).json({ message: 'Message supprimé' }))
                        .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
                    })
                } else {
                    db.Post.destroy({
                        where: { id: req.params.postId }
                    })
                    .then(() => res.status(200).json({ message: 'Message supprimé' }))
                    .catch(() => res.status(500).json({ error: 'Suppression du message échoué' }));
                }
            } else {
                return res.status(404).json({ error: 'Aucun message trouvé :('})
            }
        }
        else {
            res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce message' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Suppression du message échoué' })
    });
}