<template>
  <div class="valine_comment v" data-class="v">
    <el-form :model="comment" :rules="rules" ref="comment">
      <div class="vpanel">
        <div class="vwrap">
          <div class="vheader item3" v-if="!isLogin">
            <el-row>
              <el-col :md="8" :xs="8" :sm="8" >
                <el-form-item prop="name">
                  <input
                    placeholder="昵称"
                    v-model="comment.name"
                    class="vnick vinput"
                    type="text"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="8" :xs="8" :sm="8" class="qq">
                <el-form-item prop="qq">
                  <input
                    placeholder="QQ"
                    v-model="comment.qq"
                    class="vmail vinput"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="8" :xs="8" :sm="8" class="email">
                <el-form-item prop="email">
                  <input
                    placeholder="邮箱Q"
                    v-model="comment.email"
                    class="vmail vinput"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="vedit" style="positon: relative">
            <!--            <el-avatar-->
            <!--              slot="reference"-->
            <!--              :size="40"-->
            <!--              style="position:absolute"-->
            <!--              shape="square"-->
            <!--              v-if="isLogin"-->
            <!--              :src="isLogin.avatar_url"-->
            <!--            >-->
            <!--              <img-->
            <!--                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3656238279,115253853&fm=26&gp=0.jpg"-->
            <!--              />-->
            <!--            </el-avatar>-->

            <!--            留言内容-->
            <el-form-item prop="content">
              <el-input
                type="textarea"
                autosize
                :class="{ content: isLogin }"
                v-model="comment.content"
                class="veditor vinput"
                placeholder="留下你宝贵的意见 @~@ 😎"
              ></el-input>
            </el-form-item>

            <div class="vrow">
              <div class="vcol vcol-60 status-bar"></div>
              <div class="vcol vcol-40 vctrl text-right">
                <!--            EMOJI 弹框    #-->
                <el-popover
                  placement="left"
                  width="220"
                  class="vicon vemoji-btn"
                  trigger="hover"
                >
                  <div style="text-align: center; margin: 0">
                    <emoji-list
                      style="width 100%"
                      @emotion="handleEmotion"
                    ></emoji-list>
                  </div>
                  <svg
                    slot="reference"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="16172"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z"
                      p-id="16173"
                    />
                    <path
                      d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z"
                      p-id="16174"
                    />
                    <path
                      d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z"
                      p-id="16175"
                    />
                    <path
                      d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z"
                      p-id="16176"
                    />
                  </svg>
                </el-popover>
                <!--                预览留言-->
                <span class="vicon vpreview-btn" @click="show = !show">
                  <svg
                    slot="reference"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="17688"
                    width="22"
                    height="22"
                    :class="{ isshow: show }"
                  >
                    <path
                      d="M502.390154 935.384615a29.538462 29.538462 0 1 1 0 59.076923H141.430154C79.911385 994.461538 29.538462 946.254769 29.538462 886.153846V137.846154C29.538462 77.745231 79.950769 29.538462 141.390769 29.538462h741.218462c61.44 0 111.852308 48.206769 111.852307 108.307692v300.268308a29.538462 29.538462 0 1 1-59.076923 0V137.846154c0-26.899692-23.355077-49.230769-52.775384-49.230769H141.390769c-29.420308 0-52.775385 22.331077-52.775384 49.230769v748.307692c0 26.899692 23.355077 49.230769 52.775384 49.230769h360.999385z"
                      p-id="17689"
                    />
                    <path
                      d="M196.923077 216.615385m29.538461 0l374.153847 0q29.538462 0 29.538461 29.538461l0 0q0 29.538462-29.538461 29.538462l-374.153847 0q-29.538462 0-29.538461-29.538462l0 0q0-29.538462 29.538461-29.538461Z"
                      p-id="17690"
                    />
                    <path
                      d="M649.846154 846.769231a216.615385 216.615385 0 1 0 0-433.230769 216.615385 216.615385 0 0 0 0 433.230769z m0 59.076923a275.692308 275.692308 0 1 1 0-551.384616 275.692308 275.692308 0 0 1 0 551.384616z"
                      p-id="17691"
                    />
                    <path
                      d="M807.398383 829.479768m20.886847-20.886846l0 0q20.886846-20.886846 41.773692 0l125.321079 125.321079q20.886846 20.886846 0 41.773693l0 0q-20.886846 20.886846-41.773693 0l-125.321078-125.321079q-20.886846-20.886846 0-41.773693Z"
                      p-id="17692"
                    />
                  </svg>
                </span>
              </div>

              <transition name="slide-left">
                <div v-if="show" class="comment-header" id="write">
                  <my-marked
                    :imgView="false"
                    :initialValue="
                      comment.content.replace(
                        /\#[\u4E00-\u9FA5]{1,3}\;/gi,
                        emotion
                      )
                    "
                  ></my-marked>
                </div>
              </transition>
            </div>
          </div>
          <div class="vrow">
            <div class="vcol vcol-30">
              <a
                alt="Markdown is supported"
                href="https://guides.github.com/features/mastering-markdown/"
                class="vicon"
                target="_blank"
              >
                <svg
                  class="markdown"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                  />
                </svg>
              </a>
            </div>
            <div id="write" class="vcol vcol-70 text-right">
              <!--              提示框-->
              <span class="count" :class="{ isCount: countCount > 500 }">
                {{ countCount > 500 ? "已超出" : "还可以输入" }}
                <strong class="count-leng">{{
                  Math.abs(500 - countCount)
                }}</strong
                >字
              </span>
              <!--  确定框  -->
              <el-tooltip
                class="item"
                effect="light"
                content="遵守法律，文明发言"
                placement="top"
              >
                <button
                  type="button"
                  title="Cmd|Ctrl+Enter"
                  @click="post"
                  class="vsubmit vbtn"
                >
                  提交
                </button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import EmojiList from "./EmojiList";
import dragVerify from "./dragVerify";
import MyMarked from "./MyMarked";

export default {
  name: "NewComment",
  props: {
    cont: {
      // 初始化内容
      type: String,
      default: "",
    },
  },
  components: {
    EmojiList,
    dragVerify,
    MyMarked,
  },
  data() {
    return {
      count: 0,
      comment: {
        name: "",
        content: "",
        type: "",
        is_Valid: true,
        ip: window._DEFAULT_CITY.ip,
        address:
          // window._DEFAULT_CITY.nation +
          // "-" +
          window._DEFAULT_CITY.province + "-" + window._DEFAULT_CITY.city,
        email: "",
      },
      show: false,
      // isLogin:this.$store.state.user.user,
      rules: {
        content: [
          {
            required: true,
            message: "还没填内容呢！^ω^",
            trigger: "blur,change",
          },
          { min: 1, max: 500, message: "内容3到500个字符", trigger: "blur" },
        ],
        name: [
          {
            required: true,
            message: "请留下名称！^ω^",
            trigger: "blur,change",
          },
          { min: 3, max: 10, message: "名称3到10 个字符", trigger: "blur" },
        ],
        qq: [
          {
            required: false,
            message: "请留下您的qq！^ω^",
            trigger: "blur,change",
          },
          { min: 3, max: 11, message: "qq号3到10 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.user;
    },
    isToken() {
      return this.$store.state.user.token.length > 0;
    },
    countCount() {
      return this.comment.content.length;
    },
  },
  methods: {
    handleEmotion(i) {
      this.comment.content += i;
    },
    post() {
      this.comment.is_valid = true;
      this.comment.type = "siteComment";
      this.url = "/api/v1/home/comments";
      console.log(this.comment);
      this.$post(this.url, this.comment)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$router.go(0);
    },
    summit(formName) {
      if (this.count <= 5) {
        this.count++;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.comment.is_Valid = true;
            this.comment.type = "siteComment";
            this.comment.type = this.isToken ? "add" : "tourist";
            this.$emit("submit", this.comment);
            this.comment.content = "";
          } else {
            if (!this.isLogin.user) {
              this.isUser = true;
            }
          }
        });
      } else {
      }
    },

    // 将匹配结果替换表情图片
    passcallback() {
      this.ispass = true;
    },
    emotion(res) {
      let word = res.replace(/\#|\;/gi, "");
      const list = [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极",
      ];
      let index = list.indexOf(word);
      return `![](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif)`;
    },
  },
  mounted() {},
};
</script>
<style lang="stylus" scoped>
.v>>>.el-textarea__inner {
  border: transparent;
  background: transparent;
  padding: 0;
  min-height: 48px !important;
  font-size: 14px;
  font-weight: bold;
  color: var(--main-6);
  // color
}

.slide-left-enter-active {
  transition: all 0.7s ease;
}

.slide-left-leave-active {
  transition: all 0.7s ease;
}

.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-100%);
}

.isshow {
  background-color: var(--main-3);
}

// .vpanel{
// background: url(https://p.pstatp.com/origin/1372100011fb653db9634);
// background-repeat: no-repeat;
// background-position:center;
// // background-size: cover;

// }
.v[data-class=v] {
  font-size: 16px;
  text-align: left;
  border-radius: 4px;
}

.v[data-class=v] .vbtn:active, .v[data-class=v] .vbtn:hover {
  color: #3090e4;
  border-color: #3090e4;
}

.content {
  padding-left: 50px !important;
}

.v[data-class=v] .vbtn {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  text-align: center;
  color: #555;
  border: 1px solid #ededed;
  border-radius: 0.3em;
  display: inline-block;
  background: transparent;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.5em 1.25em;
  font-size: 0.875em;
  line-height: 1.42857143;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

.v[data-class=v] * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.75;
}

.count {
  text-align: right;
  color: #B5B5B5;
  padding: 0 8px;
}

.isCount {
  color: var(--main-5);

  .count-leng {
    color: var(--main-5);
  }
}

.count-leng {
  text-align: right;
  color: #B5B5B5;
  font-family: georgia;
  font-size: 24px;
  padding: 0 2px;
  font-weight: bold;
}

.v[data-class=v] .status-bar, .v[data-class=v] .veditor, .v[data-class=v] .vinput, .v[data-class=v] p, .v[data-class=v] pre code {
  color: #555;
}

.v[data-class=v] .vsys, .v[data-class=v] .vtime {
  color: #b3b3b3;
}

.v[data-class=v] .text-right {
  text-align: right;
}

.v[data-class=v] .text-center {
  text-align: center;
}

.v[data-class=v] a {
  position: relative;
  cursor: pointer;
  color: #1abc9c;
  text-decoration: none;
  display: inline-block;
}

.v[data-class=v] a:hover {
  color: #d7191a;
}

.v[data-class=v] .vinput {
  resize: none;
  outline: none;
  padding: 10px 5px;
  max-width: 100%;
  font-size: 0.775em;
}

.v[data-class=v] input[type=checkbox], .v[data-class=v] input[type=radio] {
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
}

.v[data-class=v] .vicon {
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  fill: #555;
  vertical-align: middle;
}

.v[data-class=v] .vicon+.vicon {
  margin-left: 10px;
}

.v[data-class=v] .vicon.actived {
  fill: #66b1ff;
}

.v[data-class=v] .vrow {
  padding: 10px 0;
}

.v[data-class=v] .vrow .vcol {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}

.v[data-class=v] .vrow .vcol.vcol-20 {
  width: 20%;
}

.v[data-class=v] .vrow .vcol.vcol-30 {
  width: 30%;
}

.v[data-class=v] .vrow .vcol.vcol-40 {
  width: 40%;
}

.v[data-class=v] .vrow .vcol.vcol-50 {
  width: 50%;
}

.v[data-class=v] .vrow .vcol.vcol-60 {
  width: 60%;
}

.v[data-class=v] .vrow .vcol.vcol-70 {
  width: 70%;
}

.v[data-class=v] .vrow .vcol.vcol-80 {
  width: 80%;
}

.v[data-class=v] .vrow .vcol.vctrl {
  font-size: 12px;
}

.v[data-class=v] .veditor {
  width: 100%;
  min-height: 5em;
  font-size: 0.875em;
  background: transparent;
  resize: vertical;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

.v[data-class=v] .vinput {
  border: none;
  resize: none;
  outline: none;
  padding: 0 5px;
  max-width: 100%;
  font-size: 0.775em;
}

.v[data-class=v] .vwrap {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  padding: 10px;
}

.v[data-class=v] .vwrap input {
  background: transparent;
}

.v[data-class=v] .vwrap .cancel-reply-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.v[data-class=v] .vwrap .vpreview {
  padding: 7px;
  -webkit-box-shadow: 0 0 1px #f0f0f0;
  box-shadow: 0 0 1px #f0f0f0;
}

.v[data-class=v] .vwrap .vheader .vinput {
  width: 33.33%;
  border-bottom: 1px dashed #dedede;
}

.v[data-class=v] .vwrap .vheader.item2 .vinput {
  width: 50%;
}

.v[data-class=v] .vwrap .vheader.item1 .vinput {
  width: 100%;
}

.v[data-class=v] .vwrap .vheader .vinput:focus {
  border-bottom-color: #eb5055;
}

.v[data-class=v] .vwrap .vheader.item2 .vinput, .v[data-class=v] .vwrap .vheader .vinput {
  width: 100%;
}
</style>
