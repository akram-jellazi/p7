<template>
    <header>
        <!-- Header pour mobil -->
        <div class="mobil">
            <div class="top">
                <div class="nav">
                    <router-link to="/profil"><i class="fas fa-user-tie"></i></router-link>
                    <img v-on:click="actualiser" src="../assets/images/icon-left-font.png" alt="Logo de Groupomania"/>
                </div>
                <select v-model="filter" v-on:change="selectFilter">
                    <option value="all">Voir tous les messages</option>
                    <option value="new">Voir les messages non lu</option>
                    <option value="image">Voir les images</option>
                    <option value="text">Voir les textes</option>
                </select>
            </div>

            <button v-on:click="togglewWriteElement"><i class="fas fa-edit"></i></button>

        </div>

        <!-- Header pour pc -->
        <div class="pc">
            <router-link to="/profil" class="profil">Mon profil</router-link>
            <button v-on:click="togglewWriteElement">Ecrire un message</button>
            <select v-model="filter" v-on:change="selectFilter">
                <option value="all">Voir tous les messages</option>
                <option value="new">Voir les messages non lu</option>
                <option value="image">Voir les images</option>
                <option value="text">Voir les textes</option>
            </select>
            <img v-on:click="actualiser" src="../assets/images/icon-left-font.png" alt="Logo de Groupomania"/>
        </div>

        <Writing v-if="showWriteElement" />
  </header>
</template>

<script>
    import Writing from '/components/writing.vue'
    export default {
        name: 'Header',
        components: {
            Writing,
        },
        data(){
            return {
                showWriteElement: false,
                filter: 'all'
            }
        },
        methods: {
            //filtres
            selectFilter: function() {
                this.$emit('selectFilter', this.filter)
            },
            //écrire
            togglewWriteElement: function() {
                this.showWriteElement = !this.showWriteElement
            },
            //logo
            actualiser: function() {
                window.location.reload()
            },
        }
    }
</script>

<style scoped lang="scss">
header
{
    .top
    {
        margin: 3%;
        .nav
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5%;
            .fa-user-tie
            {
                font-size: 3em;
                color: #091F43;
            }
            img
            {
                width: 60%;
            }
        }
        select
        {
            font-size: 1.3em;
            position: absolute;
            right: 3%;
        }
    }
    .fa-edit
    {
        position: fixed;
        bottom: 5%;
        right: 5%;
        background-color: #091F43;
        padding: 4%;
        border-radius: 100%;
        box-shadow: rgb(129, 129, 129) 2px 2px 3px;
        color: white;
        font-size: 1.5em;
    }
    button
    {
        box-shadow: none;
    }
}    
@media (min-width: 992px)
    {
        header
        {
            border-radius: 30px;
            box-shadow: 0px 6px 5px #091F43;
            width: 100%;
            .pc
            {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0%;
                white-space: nowrap;
                margin-left: 5%;
                margin-right: 5%;
                margin-top: 1%;
                padding-bottom: 1%;
                .profil, button, select
                {
                    font-size: 1.5em;
                    margin: 0;
                    padding: 0;
                    color: #D1515A;
                    font-weight: bold;
                }
                img
                {
                    width: 20%;
                    margin-left: 5%;
                }
            }
        }
    }
</style>