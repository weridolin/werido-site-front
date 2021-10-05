<template>
  <div class="message barrages-drop">
    <div style="width: 100%; overflow: hidden">
      <!--          将浏览以弹幕形式弹出-->
      <vue-baberrage
        style="width: 100%; height: 100%"
        :isShow="barrageIsShow"
        :barrageList="messList"
        :maxWordCount="30"
        :loop="barrageLoop"
      >
      </vue-baberrage>
    </div>
    <div class="mess-body container">
      <h1 class="mess-title blog-animation">
        <i class="el-icon-chat-line-square"></i>畅所欲言！
      </h1>
      <new-comment class="blog-animation comment"></new-comment>
    </div>
    <span @click="next('#next')" class="screen-next iconfont"> &#xe623; </span>
  </div>
</template>
<script>
import NewComment from "./NewComment";
import { vueBaberrage, MESSAGE_TYPE } from "vue-baberrage";
export default {
  name: "AddMessage",
  components: {
    NewComment,
    vueBaberrage,
  },
  props: {
    list: Array,
  },
  data() {
    return {
      messSub: false,
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: true,
      messList: [],
      style: ["green", "red", "blue", "green", "yellow"],
      FormData: {
        message: "",
        article_id: 0,
      },
    };
  },
 watch: {
    list() {
      let length = this.list.length;
      if (length <= 20) {
        let i = 0;
        if (this.list.length > 10) {
          i = Math.floor((this.list.length - 1) / 10) * 10;
        }
        for (i; i < length; i++) {
          this.messList.push({
            id: this.list[i].id,
            avatar: this.list[i].user
              ? this.list[i].user.avatar_url
              : "http://api.btstu.cn/sjtx/api.php?lx=c1&format=images",
            // TODO 显示emotion
            msg: this.list[i].body,
            // msg: this.list[i].body.replace(
            //   /\#[\u4E00-\u9FA5]{1,3}\;/gi,
            //   this.emotion
            // ),
            time: Math.ceil(Math.random() * 5 + 4),
            barrageStyle: this.style[Math.ceil(Math.random() * 4)],
          });
        }
      }
    },
  },  
  methods: {
    next(target) {
      let toElement = document.querySelector(target);
      toElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
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
    submit(comment) {
      this.FormData.message = comment.content;
      this.FormData.ip = comment.ip;
      this.FormData.address = comment.address;
      if (comment.name) {
        this.FormData.tourist = comment.name;
      }
      if (comment.qq) {
        this.FormData.qq = comment.qq;
      }
      // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      let that = this;
      this.$post("/apis/message/" + comment.type, this.FormData)
        .then(function (res) {
          that.$emit("submit");
          that.$message({
            showClose: true,
            message: res.message,
            type: "success",
          });
        })
        .catch(function (error) {});
    },
  },

};
</script>
<style lang="stylus">
@import '~@/assets/style/home.styl';

.message {
  height: 100vh;
  min-height: 500px;
  position: relative;
  padding: 50px 10px;
  box-sizing: border-box;
  background: url('~@/assets/message-bg1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .mess-body {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      .mess-title {
        color: #5adcce;
      }
    }

    .mess-title {
      margin: 30px;
      font-size: 60px;
      color: #fff;
    }
 
    .blog-animation {
      margin: 10px;
    }

    .comment {
      background: rgba(255, 255, 255, 0.2);
      transition: all 0.5s;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

@media (max-width: 850px) {
  .message {
    .mess-title {
      font-size: 35px !important;
    }
  }
}
</style>


.barrages-drop >>> {
  .baberrage-item {
    padding: 0;
    padding-right: 20px;

    .normal {
      background-color: transparent;
    }
  }
}

.barrages-drop >>> {
  .blue {
    border-radius: 100px;
    background: rgba(230, 255, 117, 0.7);
    color: #fff;
  }

  .green {
    border-radius: 100px;
    background: rgba(117, 255, 204, 0.7);
    color: #fff;
  }

  .red {
    border-radius: 100px;
    background: rgba(230, 143, 187, 0.7);
    color: #fff;
  }

  .yellow {
    border-radius: 100px;
    background: rgba(223, 200, 149, 0.7);
    color: #fff;
  }
}
</style>
