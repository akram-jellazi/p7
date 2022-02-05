<template>
  <div >
        <writing />
        <Wall />
        <writingComm />
        
  </div>
</template>

<script>
// @ is an alias to /src
import Wall from '@/components/wall.vue'
import writing from '@/components/writing.vue'
import writingComm from '@/components/WritingCommentaire.vue'

export default {
  name: 'WallPage',
  components: {
    Wall,
    writing,
    writingComm
  }
}
</script>
