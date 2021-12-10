<template>
<el-container>
  <el-header height="60px" style="padding:0px;">
    <navi-bar></navi-bar>
  </el-header>
  <el-main>主体部分</el-main>
</el-container>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component"
import NaviBar from "@/components/NaviBar.vue"
@Options({
  components:{
    NaviBar
  }
})
export default class App extends Vue{
  
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
