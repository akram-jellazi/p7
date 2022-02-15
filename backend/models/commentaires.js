const db = require('../cfg/mysql')

class Commentaires {
    constructor(commentaires){
        this.id = posts.id;
        this.userid = posts.userid;
        this.text = posts.text;
    }
}

Commentaires.create = commentaires => {
    const INSERT = [Object.keys(commentaires), Object.values(commentaires)]
    const query = db.format('INSERT INTO commentaires (??) VALUES (?)',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results) ;
    });
})
};
Commentaires.findOne = payload => {     // Payload est un objet qui contien les paramètres
    const query = db.format('SELECT id,userId,text FROM commentaires WHERE id=?',[payload.where.id])
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
    });
})
}
Commentaires.findAllbypost = payload => {
    const { order, include } = payload;
    const sortFieldName = order[0][0];
    const sortDirection = order[0][1];

    const query = db.format(`SELECT * FROM commentaires WHERE postId=? ORDER BY ?? ${sortDirection === "ASC" ?  "ASC"  :  'DESC'}`, [payload.where.postId,sortFieldName] )
    console.log('query',query)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, commentaires, fields) {
            if (error) throw error;
            
            const promises = commentaires.map(commentaire => {
                const userId = commentaire.userId;

                return include.model.findOne({ id: userId })})

            Promise
                .all(promises)
                .then(users => {
                    const  results = commentaires.map((commentaire, index) => {
                        const user = users[index];

                        if (!user) {
                            throw new Error(`User with userId ${commentaire.userId} is not found `)
                        }

                        return {...commentaire, nom: user.nom, prenom: user.prenom, avatar: user.avatar }
                    });
                    resolve(results)
                })
    });
})}


// DELETE
// Suppression 
Commentaires.delete = payload => {
    
    const query = db.format('DELETE FROM commentaires WHERE id = ? ',[payload.where.id])
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
        });
    })
}
module.exports = Commentaires;