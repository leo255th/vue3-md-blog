<template>
<div class="navibar">
  <div class="mylogo">
    Leoyi-blog
  </div>
</div>
</template>
<script lang='ts'>
import { Options, Vue } from 'vue-class-component';
@Options({
  props:{
    
  }
})
export default class NaviBar extends Vue{

}
</script>
<style lang="scss" scoped>
div.navibar{
  display: flex;
  height: 60px;
  background-image: linear-gradient(to right bottom, #333333, #333366);
}
@import url(https://fonts.googleapis.com/css?family=Press+Start+2P);
@import url(https://fonts.googleapis.com/css?family=Lobster+Two:700italic);
/* line 6, ../sass/logo.scss */
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/* line 10, ../sass/logo.scss */
.atari {
  font-family: "press start 2p";
  font-size: 10px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0.1em 0 #000;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, rgba(0, 0, 0, 0.3)), color-stop(50%, rgba(0, 0, 0, 0.3)), color-stop(50%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0)));
  background-image: -moz-linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
  background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
  background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%);
  background-repeat: repeat;
  background-size: 20px 10px;
}

/* line 24, ../sass/logo.scss */
.mylogo {
  padding-left: 30px;
  font-family: lobster two;
  color: white;
  text-shadow: 0 8px 0 #1c1c1c;
  font-size: 40px;
}

</style>