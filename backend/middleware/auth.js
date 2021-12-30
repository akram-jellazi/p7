const jwt =require('jsonwebtoken'); //decryptage token

module.exports = (req,res,next) => {
try {
const token = req.headers.authorization.split(' ')[1]; // récupération
const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décodage
const userId = decodedToken.userId; // vérification
if(req.body.userId && req.body.userId !== userId) {
    throw 'User ID non valable!';
} else {
    next();
}
} catch (error) {
    res.status(401).json({error: error | 'Requête non authentitfiée !'});
}
};