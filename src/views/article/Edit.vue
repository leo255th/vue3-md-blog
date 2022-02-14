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
            v-model="fieldId"
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
              v-for="item in tag_name_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
          <el-tooltip
            class="box-item"
            effect="dark"
            content="存储为草稿"
            placement="top-start"
          >
            <el-button style="min-width: 7vw; margin: 5px 0px 5px 5px"
              >暂存</el-button
            >
          </el-tooltip>

          <el-button
            style="min-width: 7vw; margin: 5px 0px 5px 5px"
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
  edit_article,
  get_article_any,
} from "../../api/article.api";
import { ref } from "vue";
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
@Options({
  components: {},
  data() {
    return {
      id:null,
      text: "",
      fieldId: null,
      field:null,
      title: "",
      description: "",
      field_name_list: [],
      tag_name_list: [],
      tags: ref<string[]>([]),
    };
  },
  computed: {
    ...mapState("user", ["userId"]),
  },
  async created() {
    // 获取分区列表
    this.field_name_list = await get_all_field_list();
    // 获取要编辑的文章的详情
    this.id=this.$route.params.articleId
    const article = await get_article_any({
      articleId: this.id,
    });
    if (article) {
      this.text = article.content;
      this.field=article.field;
      this.fieldId=article.fieldId+"";
      this.title=article.title;
      this.description=article.title;
      this.tags=article.tags;
    }
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
      console.log(this.field);
      const res = await edit_article({
        id: this.id,
        title: this.title,
        description: this.description,
        fieldId: this.fieldId,
        tags: this.tags,
        content: this.text,
      });
      // console.log(res);
      if(res){
      ElMessage.success("修改保存成功");
      }
    },
    // ...mapActions("user", ["requestUserInfo"]),
  },
})
export default class ArticleEdit extends Vue {}
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
    justify-content: space-between;

    .input-left-container {
      flex-grow: 1;
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
      flex-grow: 1;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>