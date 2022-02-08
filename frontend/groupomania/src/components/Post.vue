<template>
            
<div>
                    <div class="author" >                        
                        <img v-if="post.avatar" :src="post.User.avatar" :alt="'avatar de' + post.User.lastName + post.User.firstName" class="avatar"/>
                        <i v-if="post.avatar == null || post.User.avatar == ''" class="fa fa-user-astronaut"></i>

                        <span> {{post.nom}} {{post.prenom}} </span>
                    </div>

                    
                    <div v-if="modifId != 'modifSection-' + post.id" class="contenu">
                        <p>{{post.text}}</p>
                        <img :src="post.imageURL" style="max-width: 100%" />
                    </div>
                    <div>
                    <form :postId="post.id" v-if="modifId == 'modifSection-' + post.id" v-on:submit.prevent="modifyPost(post)">
                        <textarea v-model="post.text" class="" name="message" id="message"/>    
                        <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                        <input type="file" @change="onFileSelected" accept="images/*">   <!-- image?-->    
                        <button type="submit">Publier</button>
                    </form>
                    </div> 
                    <!-- Bouttons  -->
                      <div v-if=" modifId != 'modifSection-'" class="author-boutons"  >
                        <button v-if="userId == post.userId" v-on:click="modifPostBouton('modifSection-' + post.id)">Modifier</button>
                        <button v-if="userId == post.userId || status == 1" v-on:click="deletePost(post.id)">Supprimer</button>
                    </div>   
                   
                    <Commentaire :post="post" :commentaires="commentaires" />
                    <writingComm :postId="post.id" />
</div>
</template>



<script>
    import axios from 'axios'
    import Commentaire from '@/components/Commentaires.vue'
    import writingComm from '@/components/WritingCommentaire.vue'
    export default {
        name: 'Post',
        components: {
            Commentaire,
            writingComm, 
        },
        
        props: ['post','commentaire'],
        
        data(){ 
            return {
                userId: localStorage.getItem('userId'),
                status: localStorage.getItem('status'),
                commentaires : [],
                user: {},
                posts: [],
                imageURL: '',
                imagePreview:'',
                 //bouton
                boutonVoir: false,
                filter: 'all',
                replyFormId: '',
                commentSectionId: '',
                likeFormId: '',
                modifId: '',
            }
        },
        // modifier le post
        methods: {
         onFileSelected(event) {
                this.imageURL = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.imageURL);
            }, 
            
            modifyPost(post) {    
                const formData = new FormData();                
                formData.append("userId", this.userId);
                formData.append("text", post.text);
                formData.append("image", this.imageURL);
                formData.append("positId",this.postId);

        fetch(`http://localhost:3000/api/post/`+ this.post.id,
            {
                    method:'PUT',
                    body : formData,
                    headers: {
                        'Authorization': 'bearer '+ localStorage.getItem('token')
                            },}) 
            .then ( res => (res.json()))
            .then (res => {
                this.commentaires = res
            })
        },
        // supprimer post
            deletePost(id) {
                const postId = id;
                axios.delete('http://localhost:3000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur s\'est produite'})
            },
         //bouton
			modifPostBouton(postModifSection){
				
                if (this.modifId == postModifSection) {
                    this.modifId = ''
                } else {
                    this.modifId = postModifSection
                }
            },            
            repondre(replyFormId) {
                this.replyFormId = replyFormId
            },
            applyFilter(filter) {
                this.filter = filter    
            },

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


