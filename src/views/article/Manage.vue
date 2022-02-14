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
          @click="create_dialog_visible = true"
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
        :class="actived_field.id == item.id ? 'actived' : ''"
        @click="selectField(index)"
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
        <div class="count">{{ item.count }}</div>
        <div
          class="edit-btn"
          @click.stop="
            edit_dialog_visible = true;
            edit_field = item;
          "
        >
          修改
        </div>
      </div>
    </div>
    <div class="block-line">
      <div
        class="actived-line"
        :style="`transform:translateY(${2.8 + 2.8 * active_index}em)`"
      ></div>
    </div>
    <div class="article-list">
      <div class="title">文章列表</div>
      <div
        class="article slide-in"
        v-for="article in article_list"
        :key="article.id"
      >
        <div class="content-area">
          <div class="article_title">{{ article.title }}</div>
          <div class="article_time">
            {{ "时间：" + new Date(article.time).toLocaleString() }}
          </div>
          <div class="article_description">
            {{ "摘要：" + article.description }}
          </div>
          <div class="article_tags">
            <div class="tag" v-for="tag in article.tags" :key="tag">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="operation-area">
          <div class="input-row">
            <el-checkbox
              class="checkbox"
              v-model="article.isVisiable"
              label="显示在主页"
              @change="update_article_visiable(article)"
            ></el-checkbox>
          </div>
          <div class="btn-row">
            <el-button type="text" @click="gotoDetail(article.id)"
              >查看</el-button
            >
            <el-button type="text" @click="gotoEdit(article.id)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定要删除?"
              @confirm="commit_delete_article(article.id)"
              confirmButtonText="是"
              cancelButtonText="否"
            >
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
      <el-pagination
        background
        style="margin-bottom: 10px"
        layout="prev, pager, next"
        :total="article_total"
        v-model:page-size="article_page_size"
        v-model:current-page="article_page"
      >
      </el-pagination>
    </div>
  </div>
  <el-dialog
    v-model="create_dialog_visible"
    title="新分区"
    width="30%"
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
        <el-button @click="create_dialog_visible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="edit_dialog_visible"
    title="分区信息"
    width="30%"
    :show-close="false"
    center
  >
    <div class="input-container">
      <div class="input-row">
        <span style="min-width: 3vw">分区名：</span>
        <el-input
          class="input field"
          v-model="edit_field.field"
          placeholder="请输入"
        />
      </div>
      <div class="input-row">
        <span style="min-width: 3vw">排序：</span>
        <el-input
          class="input order"
          v-model="edit_field.order"
          placeholder="请输入"
          type="number"
        />
        <el-checkbox
          class="checkbox"
          v-model="edit_field.isVisiable"
          label="显示在主页"
        ></el-checkbox>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="commit_edit_field()">提交</el-button>
        <el-button @click="edit_dialog_visible = false">取消</el-button>
        <el-popconfirm
          title="确定要删除?分区下所有文章都会被删除！"
          @confirm="commit_delete_field()"
          confirmButtonText="是"
          cancelButtonText="否"
        >
          <template #reference>
            <el-button>删除</el-button>
          </template>
        </el-popconfirm>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  get_all_field_list,
  create_field,
  edit_field,
  get_all_article_list,
  edit_article,
} from "@/api/article.api";
import { mapActions, mapState } from "vuex";
import { ElMessage } from "element-plus";
@Options({
  components: {},
  async created() {
    // 获取分区列表
    this.field_name_list = await get_all_field_list();
    // 设置默认选中分区为第一
    if (this.field_name_list.length > 0) {
      await this.selectField(0);
    }
    document.title = "文章管理 | Leoyi的个人博客";
  },
  data() {
    return {
      field_name_list: [],
      actived_field: {},
      edit_field: {},
      active_index: null,
      create_dialog_visible: false,
      edit_dialog_visible: false,
      new_field: {
        field: "",
        order: 0,
        isVisiable: false,
      },
      article_list: [],
      // 文章列表分页设置
      article_total: 0, // 文章总量
      article_page: 1, // 当前页面
      article_page_size: 5, // 页面大小
    };
  },
  computed: {
    ...mapState("user", ["userId"]),
  },
  watch: {
    async article_page(newPage, curPage) {
      // 请求文章列表
      const res = await get_all_article_list({
        userId: this.userId,
        fieldId: this.actived_field.id,
        offset: (this.article_page - 1) * this.article_page_size,
        num: this.article_page_size,
      });
      this.article_list = res.list;
      this.article_total = res.total;
    },
  },
  methods: {
    // ...mapActions("user", ["requestUserInfo"]),
    sort_field() {
      // 按order升序
      this.field_name_list.sort((a: any, b: any) => a.order - b.order);
      // 更改当前选中的tag的index以移动侧标
      this.active_index = this.field_name_list.findIndex((field: any) => {
        return field.id == this.actived_field.id;
      });
    },
    async commit_new_field() {
      if (!this.new_field.field || this.new_field.field == "") {
        ElMessage.error("分区名不能为空");
        return;
      }
      const id = (await create_field(this.new_field)) + "";
      // 选中新添加的分区
      this.field_name_list = await get_all_field_list();
      let field_index = this.field_name_list.findIndex((field: any) => {
        return field.id == id;
      });
      this.selectField(field_index);
      this.new_field = {};
      this.create_dialog_visible = false;
      ElMessage.success("创建分区成功");
    },

    async commit_edit_field() {
      if (!this.edit_field.field || this.edit_field.field == "") {
        ElMessage.error("分区名不能为空");
        return;
      }
      await edit_field(this.edit_field);
      ElMessage.success("修改分区成功");
      this.edit_field = {};
      this.edit_dialog_visible = false;
      this.sort_field();
    },
    async commit_delete_field() {
      await edit_field({
        ...this.edit_field,
        isDeleted: true,
      });
      this.field_name_list = await get_all_field_list();
      if (this.actived_field.id == this.edit_field.id) {
        // 如果删除的是当前选中的分区,则选中第一个分区
        this.active_index = 0;
        this.actived_field = this.field_name_list[0];
      }
      ElMessage.success("删除分区成功");
      this.edit_field = {};
      this.edit_dialog_visible = false;
    },
    async commit_delete_article(articleId: number) {
      const res = await edit_article({
        id: articleId,
        isDeleted: true,
      });
      if (res) {
        ElMessage.success("删除文章成功");
        // 更新分区列表
         this.field_name_list = await get_all_field_list();
        // 更新文章列表
        const res = await get_all_article_list({
          userId: this.userId,
          fieldId: this.actived_field.id,
          offset: 0,
          num: this.article_page_size,
        });
        this.article_list = res.list;
        this.article_total = res.total;
      }
    },
    async selectField(index: number) {
      if (this.active_index == index) {
        return;
      }
      this.active_index = index;
      this.actived_field = this.field_name_list[index];
      this.article_page = 1;
      this.article_page_size = 5;
      // 请求文章列表
      const res = await get_all_article_list({
        userId: this.userId,
        fieldId: this.actived_field.id,
        offset: 0,
        num: this.article_page_size,
      });
      this.article_list = res.list;
      this.article_total = res.total;
    },
    // 更新文章可见状态
    async update_article_visiable(article: any) {
      console.log("触发change");
      const res = await edit_article({
        id: article.id,
        isVisiable: article.isVisiable,
      });
      if (res) {
        ElMessage.success("修改已保存");
      }
    },

    // 打开页面
    gotoDetail(articleId: number) {
      // console.log(this.$router)
      window.open(window.location.origin + `/article/${articleId}`, "_blank");
    },
    gotoEdit(articleId: number) {
      // console.log(this.$router)
      window.open(
        window.location.origin + `/article/edit/${articleId}`,
        "_blank"
      );
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
    width: 11vw;
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
        .count {
          display: none;
        }
        .edit-btn {
          display: inline-block;
        }
      }
      .icon {
        width: 1.3em;
        fill: #707070;
        position: relative;
        left: -0.5em;
        top: 0.2em;
        transition: all 0.2s;
      }
      .count {
        display: inline-block;
        position: absolute;
        left: 66%;
        top: 0em;
        text-align: center;
        min-width: 40px;
        font-size: 0.6em;
        color: #333333;
      }
      .edit-btn {
        display: none;
        position: absolute;
        left: 66%;
        top: 0em;
        text-align: center;
        min-width: 40px;
        font-size: 0.6em;
        color: #333333;
        &:hover {
          color: #ffa800;
        }
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
    flex-grow: 1;
    // width: 69vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    // display: none;
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
      margin-bottom: 10px;
      overflow: hidden;
      // display: none;
      border: none;
    }
    .article {
      margin-bottom: 10px;
      border-top: 1px solid #99999950;
      &:nth-child(2) {
        border: none;
      }
      border-radius: 0.4em;
      padding: 0.7em;
      width: 90%;
      // max-height:20%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .content-area {
        flex-grow: 4;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .article_title {
          font-size: 1.2em;
          // font-weight: bold;
          margin-bottom: 5px;
        }
        .article_description {
          font-size: 0.8em;
          color: #707070;
          margin-bottom: 5px;
          max-width: 80%;
        }
        .article_time {
          font-size: 0.8em;
          color: #707070;
          margin-bottom: 5px;
        }
        .article_tags {
          .tag {
            color: #707070;
            border: 1px solid #70707090;
            border-radius: 2px;
            display: inline-block;
            // margin-left: 5px;
            margin-right: 5px;
            font-size: 0.8em;
            margin-top: 5px;
            padding-left: 0.2em;
            padding-right: 0.2em;
            padding-top: 0.1em;
            padding-bottom: 0.1em;
          }
        }
      }
      .operation-area {
        flex-grow: 1;
        min-width: 10vw;
      }
    }
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
