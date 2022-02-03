<template>
  <div class="home">
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    min-width: 80%;
    // min-height: 600px;
  }
}
</style>
