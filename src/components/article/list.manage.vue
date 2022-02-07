
<template>
  <div class="list">
    <div class="title">标题</div>
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
}
</style>