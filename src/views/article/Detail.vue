<template>
  <div class="out-container" v-if="article">
    <div class="slide-in container shadow">
      <svg
        t="1644671796536"
        :class="`backtop-icon ${showBackTopIcon ? 'show' : 'hide'}`"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3019"
        @click="backtop()"
      >
        <path
          d="M698.8 337.6H325.2c-18.4 0-33.5-14.4-33.5-32s15.1-32 33.5-32h373.7c18.4 0 33.5 14.4 33.5 32-0.1 17.6-15.1 32-33.6 32z"
          p-id="3020"
        ></path>
        <path
          d="M508.4 547.8l1.8-1.8-1.8 1.8zM508.2 545.8l2.2 2.2c-0.7-0.8-1.4-1.5-2.2-2.2zM511.1 508.7l1.8 1.8-1.8-1.8z"
          p-id="3021"
        ></path>
        <path
          d="M510.9 510.7l2.2-2.2c-0.8 0.7-1.5 1.4-2.2 2.2z"
          p-id="3022"
        ></path>
        <path
          d="M544 472.4v246c0 17.6-14.4 32-32 32s-32-14.4-32-32v-246c0-17.6 14.4-32 32-32s32 14.4 32 32z"
          p-id="3023"
        ></path>
        <path
          d="M511.9 379c-8.3 0-15.8 3.1-21.5 8.3l-2.2 2.2-21.5 21.5L311 566.7c-12.4 12.4-12.4 32.8 0 45.3 12.4 12.4 32.8 12.4 45.3 0L512 456.2l155.8 155.7c12.4 12.4 32.8 12.4 45.3 0 12.4-12.4 12.4-32.8-0.1-45.2L557.3 411l-21.8-21.8-1.8-1.8c-5.7-5.3-13.4-8.5-21.8-8.4z"
          p-id="3024"
        ></path>
      </svg>
      <svg
        t="1644667623063"
        :class="`toc-icon ${useToc ? 'active' : ''}`"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2032"
        @click="setToc"
      >
        <path
          d="M149.333333 704c35.413333 0 64 29.013333 64 64s-29.013333 64-64 64S85.333333 802.986667 85.333333 768s28.586667-64 64-64zM896 725.333333a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334zM149.333333 448c35.413333 0 64 28.586667 64 64s-28.586667 64-64 64S85.333333 547.413333 85.333333 512s28.586667-64 64-64zM896 469.333333a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334zM149.333333 192C184.746667 192 213.333333 220.586667 213.333333 256s-28.586667 64-64 64S85.333333 291.413333 85.333333 256s28.586667-64 64-64zM896 213.333333a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 1 1 0-85.333334z"
          p-id="2033"
        ></path>
      </svg>
      <div :class="`toc ${useToc ? '' : 'close '}`">
        <div class="title">{{ toc_title }}</div>
        <div
          class="anchor"
          v-for="(anchor, index) in titles"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor)"
          :key="index"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </div>
      <div class="block-line"></div>
      <div class="preview">
        <v-md-preview :text="article.content" ref="preview" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { get_article_visiable, get_article_any } from "@/api/article.api";
import { mapState } from "vuex";
@Options({
  components: {},
  data() {
    return {
      article: null,
      articleId: "",
      titles: [],
      useToc: true,
      toc_title: "目录导航",
      showBackTopIcon: false,
    };
  },
  computed: {
    ...mapState("user", ["isLogin"]),
    get_article() {
      if (this.isLogin) {
        return get_article_any;
      } else {
        return get_article_visiable;
      }
    },
  },
  async created() {
    //
    console.log("loginstate:", this.isLogin);
    this.articleId = this.$route.params.articleId;
    if (this.articleId && typeof +this.articleId == "number") {
      this.article = await this.get_article({
        articleId: this.articleId,
      });
      this.article.content =
        this.article.content +
        this.article.content +
        this.article.content +
        this.article.content +
        this.article.content;
    }
    setTimeout(() => {
      const anchors =
        this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
      console.log("anchors:", anchors);
      const titles = Array.from(anchors).filter(
        (title: any) => !!title.innerText.trim()
      );

      if (!titles.length) {
        this.titles = [];
        return;
      }

      const hTags = Array.from(
        new Set(titles.map((title: any) => title.tagName))
      ).sort();

      this.titles = titles.map((el: any) => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
    }, 0);
  },
  mounted() {
    window.onscroll = () => {
      if (window.scrollY > 200) {
        this.showBackTopIcon = true;
      } else {
        this.showBackTopIcon = false;
      }
    };
  },
  methods: {
    // ...mapActions("user", ["requestUserInfo"]),
    handleAnchorClick(anchor: any) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      );

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
    setToc() {
      if (this.useToc == false) {
        // 开启toc
        let _titles = [...this.titles];
        this.toc_title = "";
        this.titles = [];
        setTimeout(() => {
          this.titles = [..._titles];
          this.toc_title = "目录导航";
        }, 200);
      }
      this.useToc = this.useToc ? false : true;
    },
    backtop() {
      console.log("backtop");
      window.scrollTo(0, 0);
    },
  },
})
export default class ArticleDetail extends Vue {}
</script>

<style lang="less" scoped>
.out-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.container {
  width: 85%;
  // height: 80vh;
  display: flex;
  flex-direction: row;
  position: relative;
  .toc-icon {
    width: 1.3em;
    fill: #707070;
    position: absolute;
    left: -4%;
    top: 1vh;
    border-radius: 50%;
    padding: 5px;
    transition: all ease-out 0.2s;
    // top: 1vh;
    &:hover {
      cursor: pointer;
    }
    &.active {
      // fill: red;
      background-color: #7c7a7a50;
    }
  }
  .backtop-icon {
    width: 2.3em;
    position: fixed;
    left: 2.3%;
    bottom: 7%;
    border-radius: 50%;
    padding: 5px;
    // top: 1vh;
    transition: all ease-out 0.25s;
    &.hide {
      fill: #f4f5f7;
    }
    &.show {
      fill: #707070;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .toc {
    background: white;
    padding-right: 1.4vw;
    padding-left: 0.6vw;
    transition: all 0.25s;
    width: 20vw;
    user-select: none;
    .title {
      width: 99%;
      // text-align: center;
      font-size: 1.4em;
      font-weight: bold;
      border-bottom: 1px solid #99999960;
      line-height: 2em;
      height: 2em;
    }
    .anchor {
    }
    &.close {
      width: 0;
      overflow: hidden;
      padding: 0;
      position: relative;
      .title {
        display: none;
      }
      .anchor {
        display: none;
      }
    }
  }
  .block-line {
    display: inline-block;
    width: 1px;
    border-left: 1px solid #99999935;
    position: relative;
    font-size: 1.2em;
  }
  .preview {
  }
}
</style>