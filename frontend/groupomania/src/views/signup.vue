<template>
  <div class="home">
       <div class="titre">
            <h1>GroupoSocial par</h1>
            <img src="../assets/images/icon-left-font.png" alt="Logo de Groupomania"/>
        </div>

    <div class="formulaire">
    <!-- S'inscrire -->
            <form @submit.prevent="signup" class="signup">
                <h2 class="signup-titre">S'inscrire</h2>
                <label for="lastName" class="signup-nom">Prénom</label>
                <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Nom">
                <label for="firstName" class="signup-prenom">Nom</label>
                <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Prenom">
                <label for="mail" class="signup-email">Courriel</label>
                <input type="email" v-model="signupemail" id="signupemail" name="mail" placeholder="votre_email@groupomania.com">
                <label for="password" class="signup-mdp">Mot de passe</label>
                <input type="password" autocomplete="current-password" v-model="signupmdp" id="signupmdp" name="password" placeholder="**********">
                <button class="signup-bouton">Inscription</button>
            </form>
            <span>Ou </span>
           
    <!-- Se connecter -->
            <form @submit.prevent="login" class="login">
                <h2 class="login-titre">Se connecter</h2>
                <label for="mail" class="login-email">Courriel</label>
                <input type="email" v-model="loginemail" id="loginemail" name="mail" placeholder="votre_email@groupomania.com">
                <label for="password" class="login-mdp">Mot de passe</label>
                <input type="password" autocomplete="current-password" v-model="loginmdp" id="loginmdp" name="password" placeholder="**********">
                <button class="login-bouton">Connexion</button>
            </form>
        </div>

      <signupC/>
  </div>
</template>

<script>
// @ is an alias to /src
import signupC from '@/components/signup.vue'

export default {
  name: 'signup',
  components: {
    signupC
  }
}
</script>

// <style scoped lang="scss">
// .home
// {        
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     .titre
//     {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         align-items: center;
//         h1
//         {
//             color: #134aa7;
//         }
//         img
//         {
//             width: 90%;
//             margin-bottom: 5%;
//         }
//     }
//     .formulaire
//     {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         align-items: center;
//     }
//     span 
//     {
//         font-size: 2em;
//         padding: 2%;
//         color: #134aa7;
//     }
//     form 
//     {
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         align-items: center;
//         border: solid 3px #D1515A;
//         border-radius: 30px;
//         padding: 5%;
//         width: 120%;
//         h2 
//         {
//             color: #134aa7;
//             font-size: 2em;
//             margin-bottom: 5%;
//         }
//         label
//         {
//             margin-top: 5%;
//         }
//         input
//         {
//             width: 90%;
//         }
//     }
//     @media (min-width: 992px)
//     {
//         .formulaire
//         {
//             flex-direction: row;
//             align-items: baseline;
//         }            
//         form 
//         {
//             width: 300px;
//             height: 300px;
//         }
//         span
//         {
//             width: 25%;
//         }
//     }
// }
// </style>
