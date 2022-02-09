<template>
  <div class="slide-in container shadow">
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
        :class="
          (actived_field_id == item.id ? 'actived' : '') +
          ' ' +
          (item.isload ? 'loaded' : 'unloaded')
        "
        @click="changeField(item, index)"
        :style="`transform:translateY(${2 + 2.8 * index}em);`"
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
    <div class="article-list">
      <div class="field-meta"></div>
      <div class="article">文章1</div>
      <div class="article">文章2</div>
      <div class="article">文章3</div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="新分区"
    width="30%"
    :before-close="handleClose"
    :show-close="false"
    center
  >
    <div class="input-container">
      <div class="input-row">
        <span style="min-width: 3vw">分区名：</span>
        <el-input
          class="input field"
          v-model="new_field.field"
          placeholder="请输入"
        />
      </div>
      <div class="input-row">
        <span style="min-width: 3vw">排序：</span>
        <el-input
          class="input order"
          v-model="new_field.order"
          placeholder="请输入"
          type="number"
        />
        <el-checkbox
          class="checkbox"
          v-model="new_field.isVisiable"
          label="显示在主页"
        ></el-checkbox>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="commit_new_field()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { get_field_list, create_field, edit_field } from "@/api/article.api";
import { mapActions } from "vuex";
@Options({
  components: {},
  async created() {
    // 获取分区列表
    this.field_name_list = await get_field_list();
    // 设置默认选中分区为第一个
    this.active_field_index = 0;
    this.actived_field_id = this.field_name_list[this.active_field_index].id;
    this.actived_field = this.field_name_list[this.active_field_index].field;
  },
  data() {
    return {
      field_name_list: [],
      actived_field: "",
      actived_field_id: "1",
      active_field_index: 0,
      dialogVisible: false,
      new_field: {
        field: "",
        order: 0,
        isVisiable: false,
      },
    };
  },
  methods: {
    // ...mapActions("user", ["requestUserInfo"]),
    async add_field() {
      console.log("增加新的分区");
      this.dialogVisible = true;
    },
    async add_field_test() {
      const len = this.field_name_list.length + 1;
      this.field_name_list.push({
        id: len + "",
        field: "前端" + len,
        isload: false,
        order: -1,
      });
      this.sort_field();
    },
    sort_field() {
      // 按order升序
      this.field_name_list.sort((a: any, b: any) => a.order - b.order);
      // 更改当前选中的tag的index
      this.active_field_index = this.field_name_list.findIndex((field: any) => {
        return field.id == this.actived_field_id;
      });
    },
    async commit_new_field() {
      const id = (await create_field(this.new_field)) + "";
      // 选中新添加的分区
      this.field_name_list = await get_field_list();
      this.active_field_index = this.field_name_list.findIndex((field: any) => {
        console.log("field:", field);
        console.log("id:", id);
        return field.id == id;
      });
      let _field = this.field_name_list.find((field: any) => field.id == id);
      console.log("this.active_field_index:", this.active_field_index);
      console.log("_field:", _field);
      this.changeField(_field, this.active_field_index);
      this.dialogVisible = false;
    },
    async handleClose() {
      //
    },
    async changeField(item: any, index: number) {
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
    position: relative;
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
      position: absolute;
      margin-top: 0.8em;
      transition: all 0.2s;
      left: 1.3em;
      .loaded {
        transform: translateX(0em);
      }
      .unloaded {
        transform: translateX(0.3em);
      }
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
        fill: #ffa800;
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
// dialog body部分的样式
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  .input-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    .input.order {
      max-width: 10vw;
    }
    .checkbox {
      min-width: 5vw;
      margin-left: 2vw;
    }
  }
}
</style>
