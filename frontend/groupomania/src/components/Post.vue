<template>
<div>
                    <div class="author" >                        
                        <img v-if="post.avatar" :src="post.User.avatar" :alt="'avatar de' + post.User.lastName + post.User.firstName" class="avatar"/>
                        <i v-if="post.avatar == null || post.User.avatar == ''" class="fa fa-user-astronaut"></i>

                        <span> {{post.nom}} {{post.prenom}} </span>
                    </div>

                    <div  class="contenu">
                        <p>{{post.text}}</p>
                        <img :src="post.imageURL" style="max-width: 100%" />
                    </div>
                    <div v-if="post.userId == userId">DEUX BOUTTONS; UPDATE et DELETE </div>
                    <!-- <div v-for="commentaire in commentaires" :key="commentaire.id" > </div> -->
                    <!-- <Commentaire/> -->
                    <Commentaire :post="post" :commentaires="commentaires" />
                    <writingComm :post="postId" />
</div>
</template>



<script>
    // import axios from 'axios'
    import Commentaire from '@/components/Commentaires.vue'
    import writingComm from '@/components/WritingCommentaire.vue'
    export default {
        name: 'Post',
        components: {
            Commentaire,
            writingComm
        },
        
        props: ['post','postId','commentaire'],
        
        data(){ 
            return {
                userId: localStorage.getItem('userId'),
                commentaires : [],
            }
        },
        methods: {

        },
         mounted : function () {
              
      fetch(`http://localhost:3000/api/commentaires?postId= ${this.post.id} &sortName=CreatedAt`,
     {
              method:'GET',
              headers: {
                  'Authorization': 'bearer '+ localStorage.getItem('token')
                      },}) 
      .then ( res => (res.json()))
      .then (res => {
        this.commentaires = res
      })
  }
    }
</script>
