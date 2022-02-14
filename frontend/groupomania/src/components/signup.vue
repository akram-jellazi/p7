<template>
            <form @submit.prevent="Signup" class="signup"> <!-- submit.prevent empeche de recharge la page --> 
                <h2 class="signup-titre">S'inscrire</h2>
                <label for="nom" class="signup-nom">Prénom</label>
                <input type="text" v-model="nom" id="nom" name="nom" placeholder="Nom">
                <label for="prenom" class="signup-prenom">Nom</label>
                <input type="text" v-model="prenom" id="prenom" name="prenom" placeholder="Prenom">
                <label for="mail" class="signup-email">Courriel</label>
                <input type="email" v-model="signupemail" id="signupemail" name="mail" placeholder="votre_email@groupomania.com">
                <label for="password" class="signup-mdp">Mot de passe</label>
                <input type="password" autocomplete="current-password" v-model="signupmdp" id="signupmdp" name="password" placeholder="**********">
                <button class="signup-bouton">Inscription</button>
            </form>
</template>

<script>
export default {
  name: 'signupC',

        data() {
          return {
            nom: '',
            prenom:'',
            signupemail:'',
            signupmdp:''
          }
        },
        methods:{
          Signup() {
            
            fetch('http://localhost:3000/api/auth/signup', {
              method:'POST',
              headers: {
                  'Content-Type': 'application/json'
                      },
              body: JSON.stringify({
                nom: this.nom,
                prenom: this.prenom,
                email : this.signupemail,
                password: this.signupmdp
              })
            })
            .then(() => {
                window.location.reload() 
            })
          }
        }
  }

</script>