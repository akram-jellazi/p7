  <template>
  <form @submit.prevent="login" class="login">
    <h2 class="login-titre">Se connecter</h2>
    <label for="mail" class="login-email">Courriel</label>
    <input
      type="email"
      v-model="loginemail"
      id="loginemail"
      name="mail"
      placeholder="votre_email@groupomania.com"
    />
    <label for="password" class="login-mdp">Mot de passe</label>
    <input
      type="password"
      autocomplete="current-password"
      v-model="loginmdp"
      id="loginmdp"
      name="password"
      placeholder="**********"
    />
    <button class="login-bouton">Connexion</button>
  </form>
</template>   

  <script>

  import router from '../router';

export default {
  name: "loginC",

  data() {
            return {
                //connection
                loginemail: '',
                loginmdp: '',
            }
  },
   methods: {
            //Se connecter
            login() {

console.log('test', this.loginemail, this.loginmdp);

                fetch('http://localhost:3000/api/auth/login', {
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
                      },
                body: JSON.stringify({
                    email: this.loginemail,
                    password: this.loginmdp,
              })
                })
                .then(res => res.json())
                .then(response => {

                    console.log(response);

                    localStorage.setItem('token', response.token);
                    localStorage.setItem('userId', response.userId);
                   /* localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('firstName', response.data.firstName);
                    localStorage.setItem('avatar', response.data.avatar);*/
                    
                    router.push('/wall')
                })
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            }
            }
};

</script>
  