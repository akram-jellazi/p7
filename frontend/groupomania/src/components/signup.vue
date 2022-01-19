<template>
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
</template>

<script>
export default {
  name: 'signupC',
    components: {
      signupC
    },

        data() {
          return {
            lastName: '',
            firstName:'',
            signupemail:'',
            signupmdp:''
          }
        },
        methods:{
          Signup() {
            fetch('localhost:3000/api/auth/signup', {
              method:'POST',
              headers: {
                  'Content-Type': 'application/json'
                      },
              body: JSON.stringify({
                firstName: this.firstName,
                lastName: this.lastName,
                email : this.signupemail,
                password: this.signupmdp
              })
            })
            .then(response => {
                localStorage.setItem('token', response.token)
                redirect('wall')
            })
          }
        }
  }

</script>