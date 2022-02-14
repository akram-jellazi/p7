<template>
  <div id="app">
    <div id="nav">
      <router-link to="/Wall">Wall</router-link> |
      <router-link to="/Profil">Profil</router-link>
      <router-link to="/signup">  Login/Signup</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* Responsive */
    @media (min-width: 992px)
    {
        .mobil
        {
            display: none;
        }
    }
    @media (max-width: 992px)
    {
        .pc
        {
            display: none;
        }
    }

                .button {
                    border-radius: 30px;
    box-shadow: 0px 3px 5px #091f43;
    padding: 0 0.5rem 0 0.5rem;
    font-size: 1rem;
    color: #D1515A;
    
            }

                        .publish {
                    border-radius: 30px;
    box-shadow: 0px 3px 5px #091f43;
    width: 50%;
    font-size: 1.5em;
    color: #D1515A;
    margin-top: 3%;
    margin-left: 25%;
            }

                    .form
        {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: solid 3px #D1515A;
            border-radius: 20px;
            padding: 3%;
            width: 93%;

            textarea {
                width: 98%;
                height: 150px;
                margin-bottom: 1rem;
            }
            img
            {
                width: 100%;
            }
            button
            {
                font-size: 1.5em;
                margin-left: 25%;
            }

        }
</style>
