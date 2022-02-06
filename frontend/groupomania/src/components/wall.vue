<template>
  <div>

    <div v-for="post in Posts" :key="post.id">
      <Post :post="post"  />
    </div>
  </div>
</template>
<script>
import Post from '@/components/Post.vue'
export default {
    components: {
    Post
  },
  props: ['postId'],
  data() {
    return {
      Posts: [],
    };
  },
  mounted : function () {
      fetch('http://localhost:3000/api/post?sortName=CreatedAt&sortBy=DESC',
     {
              method:'GET',
              headers: {
                  'Authorization': 'bearer '+ localStorage.getItem('token')
                      },}) 
      .then ( res => (res.json()))
      .then (res => {
        this.Posts = res
      })
  }
};
</script>
