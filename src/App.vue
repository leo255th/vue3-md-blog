<template>
  <container class="app-container">
    <my-header class="my-header">
      <navi-bar></navi-bar>
    </my-header>
    <my-main class="my-main">
      <blog-main><router-view /></blog-main>
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
})
export default class App extends Vue {}
</script>
<style lang="less" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.app-container {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  // background-color: #cacaca;
  .my-header {
    min-width: 100%;
  }
  .my-main {
    flex-grow: 1;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .my-footer {
    min-width: 100%;
  }
}
</style>
