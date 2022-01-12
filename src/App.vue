<template>
  <container class="container">
    <my-header class="my-header">
       <navi-bar></navi-bar>
    </my-header>
    <my-main class="my-main">
      <blog-main><router-view/></blog-main>
    </my-main>
    <my-footer class="my-footer">
      <footer-bar></footer-bar>
    </my-footer>
  </container>
</template>

<script lang='ts'>
import { Options, Vue } from "vue-class-component";
import NaviBar from "@/components/NaviBar.vue";
import FooterBar from "@/components/FooterBar.vue";
@Options({
  components: {
    NaviBar,
    FooterBar,
  },
  created() {
    console.log("进入created");
    // console.log(this.$route.query)
    // window.open(href,'_self')
  },
})
export default class App extends Vue {}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.container{
  display: flex;
  min-height:100vh;
  flex-direction: column;
  justify-content: space-between;
  .my-header{

  }
  .my-main{
    flex-grow: 1;
  }
  .my-footer{

  }
}
</style>
