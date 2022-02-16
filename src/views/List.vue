<template>
  <div class="list-container slide-in shadow">
    文章列表
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
@Options({
  components: {},
  async created() {
    //
  },
  methods: {
  },
})
export default class List extends Vue {}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .card {
    min-width: 80%;
    // min-height: 600px;
  }
}
</style>
