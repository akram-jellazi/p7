const jwt =require('jsonwebtoken'); //decryptage token
require('dotenv').config()          // TOKEN dans le env
module.exports = (req,res,next) => {
try {
const token = req.headers.authorization.split(' ')[1]; // récupération
const decodedToken = jwt.verify(token, process.env.TOKEN); //décodage

console.log(decodedToken);

const userId = decodedToken.userId; // vérification
res.locals.userId = userId;  // Récupération userid
res.locals.isadmin = decodedToken.status;
if(req.body.userId && req.body.userId !== userId) {
    throw 'User ID non valable!';
} else {
    next();
}
} catch (error) {
    res.status(401).json({error: error | 'Requête non authentitfiée !'});
}
};