// vérification token dans localStorage
const jwt = require('jsonwebtoken');

export default function auth (to, from, next) {
    const userLocal = localStorage.getItem('userId');     
    const token = localStorage.getItem('token');    
    let userId = ''
    try {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');    
        userId = decodedToken.userId;        
    } catch(error) {
        console.log("Token expiré")
        localStorage.clear();
        next({ name: 'Home' });
    }
    if (userLocal != userId) {      
        localStorage.clear();
        next({ name: 'Home' });        
        return false
    }    
    return next()
}