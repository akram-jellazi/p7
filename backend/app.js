// Communication avec le  serveur
const express = require('express'); // importation d'express
const app = express(); // création de l'app
app.use(express.json()); // acces au corp de la requête
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
  extended : true
}))

// // Connection a mongoDB
// mongoose.connect('mongodb+srv://chougoulat:jougoulat123@cluster0.viwjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));


  // autoriser les utilisateurs , ERROR CORS (Cross origin ressource sharing) systeme de sécurité qui par defaut bloque les appels http entre serv différents
  // du coup on doit utilisé des headers pour communiqué avec elle 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const sauceRoutes = require('./routes/sauces'); // importation des routes des sauces
app.use('/api/sauces', sauceRoutes);

const path = require('path'); // acceder au path(chemin) de notre serveur
app.use('/images', express.static(path.join(__dirname, 'images'))); 
// (on lui a pas indiquer comment répondre aux error alors elle renvoie une error 404)
// indique a Express qu'il faut rendre la ressource "image" statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images

const userRoutes = require('./routes/user'); // importation des routes des users
app.use('/api/auth', userRoutes);


module.exports = app;