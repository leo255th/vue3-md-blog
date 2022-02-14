<template>
  <div class="slide-in container">
    <div class="input-container">
      <div class="input-left-container">
        <div class="input-inner-container">
          <span style="min-width: 3vw">标题：</span>
          <el-input v-model="title" placeholder="请输入" style="width: 43vw" />
        </div>
        <div class="input-inner-container">
          <span style="min-width: 3vw">分区：</span>

          <el-select
            v-model="field"
            class="m-2"
            placeholder="请选择"
            size="large"
            style="width: 15vw"
          >
            <el-option
              v-for="item in field_name_list"
              :key="item.id"
              :label="item.field"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <span style="min-width: 1vw"></span>
          <span style="min-width: 3vw">标签：</span>

          <el-select
            v-model="tags"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="请输入"
            style="width: 24vw"
            @change="selectTags"
          >
            <el-option
              v-for="(item, index) in tag_name_list"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="input-right-container">
        <div class="input-inner-container">
          <span style="min-width: 3vw; margin-top: 6px">摘要：</span>
          <el-input
            v-model="description"
            :rows="4"
            type="textarea"
            placeholder="请输入"
            style="width: 36vw"
          />
        </div>
        <div class="btn-container">
          <el-checkbox
            class="checkbox"
            v-model="this.isVisiable"
            label="显示在主页"
          ></el-checkbox>

          <el-button
            style="min-width: 5vw; margin: 5px 0px 5px 5px"
            @click="submit()"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <div class="editor-container">
      <v-md-editor v-model="text" height="70vh" @save="save"></v-md-editor>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  get_all_field_list,
  create_article,
  get_tag_list,
} from "../../api/article.api";
import { ref } from "vue";
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
@Options({
  components: {},
  data() {
    return {
      text: "",
      field: "",
      title: "",
      description: "",
      field_name_list: [],
      isVisiable: false,
      tag_name_list: [],
      tags: ref<string[]>([]),
    };
  },
  computed: {
    ...mapState("user", ["userId"]),
  },
  async created() {
    // 获取分区列表和标签列表
    this.field_name_list = await get_all_field_list();
    this.tag_name_list = await get_tag_list();
  },
  methods: {
    // 保存文章
    save(text: string, html: string) {
      console.log("text:", text);
      console.log("html:", html);
    },
    selectTags(val: string[]) {
      console.log(val);
    },
    // 提交文章
    async submit() {
      const res = await create_article({
        userId: this.userId,
        title: this.title,
        description: this.description,
        fieldId: this.field,
        tags: this.tags,
        content: this.text,
        isVisiable: this.isVisiable,
      });
      console.log("articleId:", res);
      ElMessage.success("文章创建成功");
      this.$router.push({
        name: "article_detail",
        params: {
          articleId: res,
        },
      });
    },
    // ...mapActions("user", ["requestUserInfo"]),
  },
})
export default class ArticleAdd extends Vue {}
</script>

<style lang="less" scoped>
.container {
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .editor-container {
    // width: 800px;
    width: 95%;
  }
  .input-container {
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .input-left-container {
      width: 45%;

      .input-inner-container {
        // margin-top: 20px;
        margin-bottom: 20px;

        font-size: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .input-right-container {
      margin-left: 2.3%;
      width: 45%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      .input-inner-container {
        margin-bottom: 20px;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      }
      .btn-container {
        margin-left: 2.3%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>