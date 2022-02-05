<template>
  <div >
        <writing />
        <Wall />
        
  </div>
</template>

<script>
// @ is an alias to /src
import Wall from '@/components/wall.vue'
import writing from '@/components/writing.vue'


export default {
  name: 'WallPage',
  components: {
    Wall,
    writing
  }
}
</script>
