<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.id">
            <div class="commentaire">
                <div class="author">
                    <span> {{commentaire.userId.nom}} {{commentaire.userId.prenom}} </span>
                </div>

                <div class="contenu">
                    <p>{{commentaire.text}}</p>
                </div>

                <span class="date">Publié le {{ commentaire.createdAt }}</span>

                <div class="author-boutons" v-if="userId == commentaire.userId || statut == 'admin'">
                    <button v-on:click="deleteCommentaires(commentaire.id)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from 'axios'
    export default {
        name: 'Commentaire',
        components: {
        },
        
        props: ['postId', 'commentaires'],
        
        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),
            }
        },
        methods: {
            // supprimer un commentaire
            deleteCommentaires(commentId) {                
                axios.delete('http://localhost:3000/api/commentaires/' + commentId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }
</script>


<style scoped lang="scss">
.commentaire
{
    border: solid 3px #091F43;
    border-radius: 20px;
    margin: 3%;
    padding: 3%;
    .author
    {
        display: flex;
        align-items: center;
        span
        {
            margin-left: 3%;
            color: #D1515A;
            font-weight: bold;
            font-size: 1.5em;
        }
    }
    .contenu
    {
        background: #091f4312;
        border-radius: 20px;
        padding: 3%;
        margin-top: 3%;
    }
    .date
    {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.7em;
    }
}
</style>