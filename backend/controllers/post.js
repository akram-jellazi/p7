const jwt = require("jsonwebtoken");
const mysql = require('mysql');
 const Posts = require('../models/posts');
const fs = require('fs'); //application pour modifier système de fichiers (pr les images)
const User = require("../models/User");

// POST
//Créé un post
exports.createPost = (req, res, next) => {
    const text = req.body.text;

    console.log(req.body);

            const post = Posts.create({
                text,
                imageURL: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imageURL,
                userId: res.locals.userId
            })
            .then(() => res.status(201).json({ message: 'Post créé !' }, ))
            .catch(error => {
                console.log(error)
                res.status(400).json({ error: 'Création du post échoué' })
            });
};

//GET
// Voir tout les messages
exports.getAllPosts = (req, res, next) => {

    Posts.findAll({        
        order: [[req.query.sortName, req.query.sortBy]] , //ordre date descendant
        include: {
            model: User,
        }
    })
    .then(posts => {        
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ error: 'Aucun post publié :(' });
        }
    })
    .catch(error => {
        console.log(error),
        res.status(500).send({ error: 'Recherche des posts échoué' });
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

    Posts.findOne({
        where: {  id: req.params.id },
    })
    .then(postFound => {
        if(postFound.userId == res.locals.userId || res.locals.isadmin){
            if(postFound) {
                Posts.update(postObject, {
                    where: { id: req.params.id}
                })
                .then(post => res.status(200).json({ message: 'Post modifié' }))
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error: 'Modification du Post a échoué' })
                })
            }
            else {
                res.status(404).json({ error: 'Aucun Post trouvé ' });
            }
        }
        else {
            res.status(403).json({ error: 'Vous n\'avez pas le droit de modifier ce Post' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Modification du post échoué' })
    });
}

//DELETE
// Supprimer un message
exports.deletePost = (req, res, next) => {
    Posts.findOne({
        where: { id: req.params.id }
    })
    .then(post => {
        console.log('post',post)
        console.log('userid',res.locals.userId)
        if(res.locals.userId == post.userId || res.locals.isadmin ){
            if(post) {
                if(post.imageURL != null) {
                    const filename = post.imageURL.split('/images/')[1];

                    fs.unlink(`images/${filename}`, () => {
                        Posts.delete({
                            where: { id: req.params.id }
                        })
                        .then(() => res.status(200).json({ message: 'Message post' }))
                        .catch(() => res.status(500).json({ error: 'Suppression du post échoué 1' }));
                    })
                } else {
                    Posts.delete({
                        where: { id: req.params.id }
                    })
                    .then(() => res.status(200).json({ message: 'Message post' }))
                    .catch(() => res.status(500).json({ error: 'Suppression du post échoué 2' }));
                }
            } else {
                return res.status(404).json({ error: 'Aucun post trouvé '})
            }
        }
        else {
            res.status(403).json({ error: 'Vous n\'avez pas le droit de supprimer ce post' });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: 'Suppression du post échoué 3' })
    });
}