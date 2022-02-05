const multer = require('multer'); // permet de gerer les fichiers entrants

const MIME_TYPES = { // dictionnaire MIME_TYPES
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif' : 'gif'
};
// storage indique à multer où enregistrer les infos  
// fonction destination indique a multer où enregistrer ds le dossier image
// fct filename indique a multer d'utiliser nom d'origine , remplacer les espaces par des underscores et d'ajouter un timestamp Date.now()comme nom de fichier, ensuite utilise dictionnaire MIME_TYPES pr resoudre l'extension de fichier approprié.
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'images')
    },
    filename: (req,file,callback) =>{
        
        const name = file.originalname.split('').join('_') 
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');