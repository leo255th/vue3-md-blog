<template>
  <div class="slide-in container shadow only-prewview">
    <svg
      t="1644667623063"
      :class="`icon ${useToc ? 'active' : ''}`"
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
      <div class="title">目录导航</div>
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
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { get_article_visiable, get_article_any } from "@/api/article.api";
import { mapState } from "vuex";
@Options({
  components: {},
  data() {
    return {
      article: {},
      articleId: "",
      titles: [],
      useToc: true,
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
    setToc(){
      if(this.useToc==false){
        // 开启toc
        let _titles=[...this.titles];
        this.titles=[];
        setTimeout(()=>{
          this.titles=[..._titles]
        },200)
      }
      this.useToc=this.useToc?false:true;
    }
  },
})
export default class ArticleDetail extends Vue {}
</script>

<style lang="less" scoped>
.container {
  width: 90%;
  // height: 80vh;
  display: flex;
  flex-direction: row;
  position: relative;
  .icon {
    width: 1.3em;
    fill: #707070;
    position: absolute;
    left: -2vw;
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
  .toc {
    background: white;
    padding-right: 1.4vw;
    padding-left: 0.6vw;
    transition: all 0.25s;
    width: 20vw;
    user-select:none;
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