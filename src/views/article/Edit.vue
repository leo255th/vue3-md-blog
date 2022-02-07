<template>
  <div class="fade-in">新文章</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
  async created() {
    //
  },
  methods: {
    // ...mapActions("user", ["requestUserInfo"]),
  },
})
export default class ArticleAdd extends Vue {}
</script>

<style lang="less" scoped>

</style>