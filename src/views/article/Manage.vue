<template>
  <div class="fade-in container shadow">
    <div class="field-list">
      <div class="title">
        分区
        <svg
          t="1644325369743"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11972"
          @click="add_field"
        >
          <path
            d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
            p-id="11973"
          ></path>
        </svg>
      </div>
      <div
        class="field"
        v-for="(item, index) in field_name_list"
        :key="item.id"
        :class="actived_field_id == item.id ? 'actived' : ''"
        @click="changeField(item, index)"
      >
        <svg
          t="1644330364507"
          class="icon"
          viewBox="0 0 1194 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8019"
        >
          <path
            d="M1145.560315 245.47721H0V81.825737a81.825737 81.825737 0 0 1 81.825737-81.825737h286.390078l163.651474 163.651474H1063.734578a81.825737 81.825737 0 0 1 81.825737 81.825736z"
            p-id="8020"
          ></path>
          <path
            d="M0 327.302947m81.825737 0l981.908841 0q81.825737 0 81.825737 81.825737l0 490.95442q0 81.825737-81.825737 81.825737l-981.908841 0q-81.825737 0-81.825737-81.825737l0-490.95442q0-81.825737 81.825737-81.825737Z"
            p-id="8021"
          ></path>
        </svg>
        {{ item.field }}
      </div>
    </div>
    <div class="block-line">
      <div
        class="actived-line"
        :style="`transform:translateY(${2.8 + 2.8 * active_field_index}em)`"
      ></div>
    </div>
    <div class="article-list">文章列表</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import ManageList from "@/components/article/list.manage.vue";
@Options({
  components: {
    ManageList,
  },
  async created() {
    //
  },
  data() {
    return {
      field_name_list: [
        {
          id: "1",
          field: "前端",
        },
        {
          id: "2",
          field: "前端1",
        },
        {
          id: "3",
          field: "前端1",
        },
        {
          id: "4",
          field: "前端1",
        },
        {
          id: "5",
          field: "前端1",
        },
        {
          id: "6",
          field: "前端1",
        },
        {
          id: "7",
          field: "前端1",
        },
        {
          id: "8",
          field: "前端1",
        },
      ],
      actived_field: "",
      actived_field_id: "1",
      active_field_index: 0,
    };
  },
  methods: {
    // ...mapActions("user", ["requestUserInfo"]),
    async add_field() {
      console.log("增加新的分区");
    },
    async changeField(item: any, index: number) {
      console.log("选中的item:", item);
      console.log("选中的index:", index, typeof index);
      this.actived_field_id = item.id;
      this.actived_field = item.field;
      this.active_field_index = index;
    },
  },
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
.container {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80vw;
  min-height: 80vh;
  border-radius: 4px;
  .field-list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      // margin-top: 1em;
      color: white;
      background-image: linear-gradient(#666666, #333333);
      font-size: 1.2em;
      height: 2em;
      line-height: 2em;
      width: 100%;
      position: relative;
      text-align: center;
      // margin-bottom: 0.3em;
      .icon {
        width: 1.2em;
        // position: absolute;
        // right: 3em;
        // top: 0.35em;
        position: relative;
        top: 0.25em;
        fill: whitesmoke;
        &:hover {
          fill: #dad6d6;
          cursor: pointer;
        }
      }
    }
    .field {
      font-size: 1.2em;
      width: 100%;
      height: 2em;
      line-height: 2em;
      position: relative;
      margin-top: 0.8em;
      left: 1.3em;
      &:hover {
        cursor: pointer;
        color: #666666;
      }
      .icon {
        width: 1.3em;
        fill: #707070;
        position: relative;
        left: -0.5em;
        top: 0.2em;
        transition: all 0.2s;
      }
    }
    .field.actived {
      // border-top: 1px solid #5a585835;
      // border-bottom: 1px solid #5a585835;
      // border-right: 3px solid #ffa800;
      .icon {
        fill:#ffa800;
      }
    }
  }
  .article-list {
    flex-grow: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .block-line {
    display: inline-block;
    width: 1px;
    border-left: 1px solid #99999935;
    position: relative;
    font-size: 1.2em;

    .actived-line {
      display: inline-block;
      width: 1px;
      height: 2em;
      border-left: 3px solid #ffa800;
      position: absolute;
      transition: all ease-out 0.25s;
      left: -3px;
    }
  }
}
</style>
