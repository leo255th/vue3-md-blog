<template>
  <div class="fade-in">
      <v-md-editor v-model="text" height="400px" @save='save'></v-md-editor>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
  data(){
    return {
      text:''
    }
  },
  async created() {
    // 
  },
  methods: {
    // 保存文章
    save(text:string,html:string){
      console.log('text:',text);
      console.log('html:',html);
    },
    // ...mapActions("user", ["requestUserInfo"]),
  },
})
export default class ArticleAdd extends Vue {}
</script>

<style lang="less" scoped>

</style>