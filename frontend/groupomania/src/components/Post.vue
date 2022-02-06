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
                    </div> -->
                     <div v-if="post.userId == userId">
                        <button>UPDATE </button>
                        <button>DELETE </button>
                    </div>

                    <!-- test -->
                    <!-- <div v-if="modifId != 'modifSection-' + post.id" class="contenu">
                        <p>{{post.text}}</p>
                        <img :src="post.imageURL" style="max-width: 100%" />
                    </div>
                    <div>
                    <form :postId="post.id" v-if="modifId == 'modifSection-' + post.id" v-on:submit.prevent="modifyPost(post)">
                        <textarea v-model="post.text" class="" name="message" id="message"/>    
                        <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                        <input type="file" @change="onFileSelected" accept="image/*">       
                        <button type="submit">Publier</button>
                    </form>
                    </div> -->
                    <!-- Bouttons  -->
                      <!-- <div class="author-boutons">
                        <button v-if="userId == post.userId" v-on:click="modifPostBouton('modifSection-' + post.id)">Modifier</button>
                        <button v-if="userId == post.userId || statut == 'admin'" v-on:click="deletePost(post.id)">Supprimer</button>
                    </div>    -->
                    <!--test -->
                    <Commentaire :post="post" :commentaires="commentaires" />
                    <writingComm :commentaire="post.id" />
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
        
        props: ['post','commentaire'],
        
        data(){ 
            return {
                userId: localStorage.getItem('userId'),
                commentaires : [],
            }
        },
        methods: {
            // Modifier un Post
//              onFileSelected(event) {
//                 this.imageURL = event.target.files[0];
//                 this.imagePreview = URL.createObjectURL(this.imageURL);
//             }, 
            
//             modifPost(post) {    
//                 const formData = new FormData();                
//                 formData.append("userId", this.userId);
//                 formData.append("text", post.text);
//                 formData.append("image", this.imageURL);

//             },
//             modifyPost() {
              
//       fetch(`http://localhost:3000/api/post/`,{
//           postId : this.postId,
//           text : this.text
//       },
//      {
//               method:'PUT',
//               headers: {
//                   'Authorization': 'bearer '+ localStorage.getItem('token')
//                       },}) 
//       .then ( res => (res.json()))
//       .then (res => {
//         this.commentaires = res
//       })
//   }
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
