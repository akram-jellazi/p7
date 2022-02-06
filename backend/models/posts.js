const db = require('../cfg/mysql')

class Posts {
    constructor(Posts){
        this.id = posts.id;
        this.userid = posts.userid;
        this.text = posts.text;
        this.imageURL = posts.imageURL;
    }
}

Posts.create = posts => {
    const INSERT = [Object.keys(posts), Object.values(posts)]
    const query = db.format('INSERT INTO posts (??) VALUES (?)',INSERT)
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results) ;
    });
})
};
Posts.findOne = payload => {
    const query = db.format('SELECT id,userId,text,imageURL FROM posts WHERE id=?',[payload.where.id])
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
    });
})
}
Posts.findAll = payload => {
    const { order, include } = payload;
    const sortFieldName = "posts."+order[0][0];
    const sortDirection =order[0][1];

    const query = db.format(`SELECT posts.id as id,userId,text,imageURL,posts.createdAt,posts.updatedAt,nom,prenom FROM posts INNER JOIN utilisateur ON utilisateur.id=posts.userId ORDER BY ?? ${sortDirection === "ASC" ?  "ASC"  :  'DESC'}`, [sortFieldName] )

    console.log('query => ', query);

    return new Promise((resolve,reject)=> {
        db.query(query, function (error, posts, fields) {
            if (error) throw error;
            resolve(posts) ;

    });
})
}
Posts.update = (postObject,payload) => {
    const query = postObject.imageURL ? 
            db.format('UPDATE posts SET text = ?, imageURL = ? WHERE id=?', [postObject.text, postObject.imageURL, payload.where.id] ) : 
            db.format('UPDATE posts SET text = ? WHERE id=?', [postObject.text, payload.where.id] )

    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
    });
})
}
// DELETE
// Suppression de l'user
Posts.delete = payload => {
    
    const query = db.format('DELETE FROM posts WHERE id = ? ',[payload.where.id])
    return new Promise((resolve,reject)=> {
        db.query(query, function (error, results, fields) {
            if (error) throw error;
            resolve(results[0]) ;
        });
    })
}



module.exports = Posts;