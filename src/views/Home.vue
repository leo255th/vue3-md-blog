<template>
  <div class="home slide-in">
    <div class="card">这是首页</div>
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
    // ...mapActions("user", ["requestUserInfo"]),
  },
})
export default class Home extends Vue {}
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
