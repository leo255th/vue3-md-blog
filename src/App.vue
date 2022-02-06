<template>
  <container class="app-container">
    <div class="my-header">
      <navi-bar></navi-bar>
    </div>
    <div class="my-main">
      <router-view />
    </div>
    <div class="my-footer">
      <footer-bar></footer-bar>
    </div>
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
// 淡入动画
// 需要添加动画的元素需加上"fade-in"class
.fade-in{
  animation: fade-in 0.25s ease-out 1;
}
@keyframes fade-in {
  0%{
    transform: translatex(10px);
  }
  100%{
    transform: translatex(0px);

  }
  
}
</style>
