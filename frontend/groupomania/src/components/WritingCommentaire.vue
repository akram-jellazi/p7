<template>
    <div class="writingComm">
        <form>
            <textarea v-model="text"  class="" name="message" id="message" placeholder="Exprimez vous"/>
            <button v-on:click="createCommentaires" type="submit" >Publier</button>
        </form>

        <span>{{messError}}</span>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'writingComm',
        components: {
        },
        
        props: ['postId'],
        
        data() {
            return {
                text: '',
                messError: ''
            }
        },
        methods: {
            // créer commentaire
            createCommentaires() {
                axios.post('http://localhost:3000/api/commentaires', { 
                    postId : this.postId,
                    text: this.text
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                console.log('postId',this.postId)       //CONSOLE LOG  // 
                console.log('text',this.text)            //CONSOLE LOG   //     
                // .then(() => {window.location.reload()})

                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }
</script>
<style scoped lang="scss">
    .writingComm
    {
        margin: 3%;
        margin-top: 5%;
        form
        {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: solid 3px #D1515A;
            border-radius: 20px;
            padding: 3%;
            width: 93%;
            textarea
            {
                width: 98%;
                height: 150px;
            }
            img
            {
                width: 100%;
            }
            button
            {
                border-radius: 30px;
                box-shadow: 0px 3px 5px #091F43;
                width: 50%;
                font-size: 1.5em;
                color: #D1515A;
                margin-top: 3%;
                margin-left: 25%;
            }
        }
    }
</style>