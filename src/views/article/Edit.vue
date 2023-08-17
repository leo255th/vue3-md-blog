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
          <span style="min-width: 3vw; margin-top: 6px">简介：</span>
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
            class="btn"
            style="min-width: 5vw; margin: 5px 0px 5px 5px"
            @click="submit()"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <div class="editor-container">
      <v-md-editor
        v-model="text"
        height="70vh"
        left-toolbar="image emoji todo-list | customToolbar1 save"
        :disabled-menus="[]"
        :toolbar="toolbar"
        @save="submit()"
        @upload-image="handleUploadImage"
      ></v-md-editor>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  get_all_field_list,
  edit_article,
  get_article_any,
  get_tag_list,
  uploadImages,
} from "../../api/article.api";
import { ref } from "vue";
import { mapState } from "vuex";
import { ElMessage } from "element-plus";
@Options({
  components: {},
  data() {
    return {
      id: null,
      text: "",
      fieldId: null,
      field: null,
      title: "",
      description: "",
      field_name_list: [],
      isVisiable: null,
      tag_name_list: [],
      tags: ref<string[]>([]),
      toolbar: {
        // 自定义工具栏
        customToolbar1: {
          title: "插入预定义结构",
          icon: "v-md-icon-tip",
          menus: [
            {
              name: "menu1",
              text: "静态资源地址前缀",
              action(editor: any) {
                editor.insert(function (selected: any) {
                  const prefix = "[";
                  const suffix = "](http://admin.leoyiblog.cn/files/)";
                  const placeholder = "名称";
                  const content = selected || placeholder;

                  return {
                    text: `${prefix}${content}${suffix}`,
                    selected: content,
                  };
                });
              },
            },
            {
              name: "menu2",
              text: "提示",
              action(editor: any) {
                editor.insert(function (selected: any) {
                  const prefix = "::: tip 提示\n";
                  const suffix = "\n:::";
                  const placeholder = "这是一段提示信息";
                  const content = selected || placeholder;

                  return {
                    text: `${prefix}${content}${suffix}`,
                    selected: content,
                  };
                });
              },
            },
            {
              name: "menu3",
              text: "注意",
              action(editor: any) {
                editor.insert(function (selected: any) {
                  const prefix = "::: warning 注意\n";
                  const suffix = "\n:::";
                  const placeholder = "这是一段警告";
                  const content = selected || placeholder;

                  return {
                    text: `${prefix}${content}${suffix}`,
                    selected: content,
                  };
                });
              },
            },
            {
              name: "menu4",
              text: "警告",
              action(editor: any) {
                editor.insert(function (selected: any) {
                  const prefix = "::: danger 警告\n";
                  const suffix = "\n:::";
                  const placeholder = "这是一个危险警告";
                  const content = selected || placeholder;

                  return {
                    text: `${prefix}${content}${suffix}`,
                    selected: content,
                  };
                });
              },
            },
            {
              name: "menu5",
              text: "详情",
              action(editor: any) {
                editor.insert(function (selected: any) {
                  const prefix = "::: details 详细信息\n";
                  const suffix = "\n:::";
                  const placeholder = "注意：IE / Edge 中不生效";
                  const content = selected || placeholder;

                  return {
                    text: `${prefix}${content}${suffix}`,
                    selected: content,
                  };
                });
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapState("user", ["userId"]),
  },
  async created() {
    document.title = "文章编辑 | Leoyi的个人博客";
    // 获取分区列表和标签列表
    this.field_name_list = await get_all_field_list();
    this.tag_name_list = await get_tag_list();
    // 获取要编辑的文章的详情
    this.id = this.$route.params.articleId;
    const article = await get_article_any({
      articleId: this.id,
    });
    if (article) {
      this.text = article.content;
      this.field = article.field;
      this.fieldId = article.fieldId + "";
      this.title = article.title;
      this.description = article.description;
      this.tags = article.tags;
      this.isVisiable = article.isVisiable;
    }
  },
  methods: {
    // 保存文章
    save(text: string, html: string) {
      // console.log("text:", text);
      // console.log("html:", html);
    },
    selectTags(val: string[]) {
      // console.log(val);
    },
    // 提交文章
    async submit() {
      // console.log(this.field);
      const res = await edit_article({
        id: this.id,
        title: this.title,
        description: this.description,
        fieldId: this.fieldId,
        tags: this.tags,
        content: this.text,
        isVisiable: this.isVisiable,
      });
      // // console.log(res);
      if (res) {
        ElMessage.success("修改保存成功");
      }
    },
    // 上传图片
    async handleUploadImage(event: any, insertImage: any, files: any) {
      const res = await uploadImages(files[0]);
      if (res) {
        insertImage({
          url: `http://admin.leoyiblog.cn${res}`,
          desc: res,
          width: "auto",
          height: "auto",
        });
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