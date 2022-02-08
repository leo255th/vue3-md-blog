
<template>
  <div class="list">
    <div class="field shadow">前端</div>
    <div class="article shadow" >
      <div class="title"></div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Options, Vue } from "vue-class-component";
@Options({
  props: { 
    fieldName:String,
    articleList:[],
  },
  methods: {},
})
export default class ManageList extends Vue {}
</script>

<style lang="less" scoped>
.list{
  display: flex;
  width: 80vw;
  flex-direction: column;
  
  .field{
    background-color: #333333;
    background-image: linear-gradient(#666666,#333333 );
    color:white;
    // font-weight: bold;
    // font-weight: 200;
    width: 6vw;
    height: 1.5em;
    line-height: 1.5em;
    font-size: 1.2em;
    text-align: center;
    border-radius: 0em;
    .article{
      
    }
  }
}
</style>