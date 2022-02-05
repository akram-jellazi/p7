<template>
  <div class="home">
       <div class="titre">
            <h1>GroupoSocial par</h1>
            <img src="../assets/images/icon-left-font.png" alt="Logo de Groupomania"/>
        </div>

    <div class="formulaire">
    <!-- S'inscrire -->
        <signupC/>
            <span>Ou </span>
           
    <!-- Se connecter -->

        </div>
        <loginC/>
      
  </div>
</template>

<script>
// @ is an alias to /src
import signupC from '../components/signup.vue'
import loginC from '../components/login.vue'

export default {
  name: 'signup',
  components: {
    signupC,
    loginC
  }
}
</script>

<style scoped lang="scss">
.home
{        
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .titre
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        h1
        {
            color: #134aa7;
        }
        img
        {
            width: 90%;
            margin-bottom: 5%;
        }
    }
    .formulaire
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    span 
    {
        font-size: 2em;
        padding: 2%;
        color: #134aa7;
    }
    form 
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border: solid 3px #D1515A;
        border-radius: 30px;
        padding: 5%;
        width: 120%;
        h2 
        {
            color: #134aa7;
            font-size: 2em;
            margin-bottom: 5%;
        }
        label
        {
            margin-top: 5%;
        }
        input
        {
            width: 90%;
        }
    }
    @media (min-width: 992px)
    {
        .formulaire
        {
            flex-direction: row;
            align-items: baseline;
        }            
        form 
        {
            width: 300px;
            height: 300px;
        }
        span
        {
            width: 25%;
        }
    }
}
</style>
