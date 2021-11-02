<template>

  <div class="screenAll">
    <el-row>
    <div class="screen">
      <!--      el-carousel实现图片轮播效果-->
      <!--      TODO 引入 postitem后出现CSS污染-->
      <el-carousel :interval="3000" height="100vh">
        <el-carousel-item v-for="item in list" :key="item.id">
          <div class="index">
            <div
              class="index-bg"
              :style="{ 'background-image': ' url(' + item.img_url + ')' }"
            ></div>
            <div class="index-con">
              <!--                   首页增加 -->
              <div class="container" v-if="item.id != 0">
                <div class="bounce reveal-right">
                  <span
                    class="letter"
                    v-for="(item, index) of hello"
                    :key="index"
                    v-html="item"
                    :style="{ animationDelay: 0.5 + index * 0.05 + 's' }"
                  ></span>
                </div>
                <div class="index-btn-group reveal-left">
                  <a
                    href="https://github.com/weridolin"
                    target="_blank"
                    class="index-btn green"
                    >Github</a
                  >
                  <router-link to="/blog" class="index-btn purple">
                    博客</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <!--        下拉框-->
      <span @click="next('#next')" class="screen-next iconfont">
        &#xe623;
      </span>
    </div>
    </el-row>

    <el-row >
    <div class="about a-tag" id="about">
      <div class="top">

        <!--            <p class="title-info  reveal-scale">-->
        <!--                <br>网页设计：借鉴<a href="https://smohan.net/"  target="_blank">水墨寒</a>博客部分设计<br />-->
        <!--            </p>-->
        <h1 class="title reveal-scale"><i class="el-icon-postcard"></i>关于本站</h1>
        <h1 class="title-info ">
          <span class=" ">本站已经平稳运行:</span>
          <span class="blog-time">{{ daysold }}</span
          ><span>天</span> <span class="blog-time">{{ hrsold }}</span
          ><span>时</span> <span class="blog-time">{{ minsold }}</span
          ><span>分</span> <span class="blog-time">{{ seconds }}</span
          ><span>秒</span>
        </h1>
      </div>
    </div>
    </el-row>

    <!-- <el-row>
      <el-col :md="8" :sm="12" v-for="item of imgList" :key="item.wallpaperId">
        <img :src="item.wallpaperImg[0].uri" />
      </el-col>
    </el-row> -->
  </div>

</template>
<script>
import scrollReveal from "scrollreveal";
// import PostItem from "./../components/PostItem";
import PostItemCardGroup from "./../components/PostItemCardGroup.vue";

// 1. vue对象的生命周期
//   1). 初始化显示（只执行一次）
//     * beforeCreate()
//     * created()
//     * beforeMount()
//     * mounted()
//   2). 更新状态（可执行多次）
//     * beforeUpdate()
//     * updated()
//   3). 销毁vue实例: vm.$destory()（只执行一次）
//     * beforeDestory()
//     * destoryed()
export default {
  name: "Index",
  components: { PostItemCardGroup },
  data() {
    return {
      imgList: [],
      list: [
        {
          id: "1",
          title: "werido",
          info:
            "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
          link: "www.baidu.com",
          img_url: require("@/assets/bg1.jpg"),
        },
        {
          id: "2",
          title: "werido",
          info:
            "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
          link: "www.baidu.com",
          img_url: require("@/assets/bg2.jpg"),
        },
        {
          id: "3",
          title: "werido",
          info:
            "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
          link: "www.baidu.com",
          img_url: require("@/assets/bg3.jpg"),
        },
      ],
      daysold: "0",
      hrsold: "0",
      minsold: "0",
      seconds: "0",
      scrollReveal: scrollReveal(),
      welcome:
        "H,e,l,l,o,!&nbsp;&nbsp;,W,e,l,c,o,m,e&nbsp;&nbsp;,t,o&nbsp;&nbsp;,b,l,o,g.",
      divider_img_url: require("@/assets/divider-bg.jpg"),
      posts: [
        // {
        //   id:1,
        //   img_url:require('@/assets/static/img/blog-post-2.jpg'),
        //   title:"test1",
        //   category:"python",
        //   created:"2021-1-10 15:26",
        //   update:"update",
        //   summary:"summary"
        // },
      ],
    };
  },
  computed: {
    hello() {
      return this.welcome.split(",");
    },
  },
  created() {
    // this.getArticlesList();
  },
  methods: {
    next(target) {
      let toElement = document.querySelector(target);
      toElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },
    getImg() {
      // let that=this
      //    that.$get('/loimg?skip=0&limit=30&tagId=4&refresh=true&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcyI6IndpbjEwIiwiY2giOiI1LjUuMC4wODAzIiwibXQiOiJMZW5vdm8gWGlhb1hpbiBDaGFvNzAwMC0xNEFSUiIsIm9zQml0IjoiNjQiLCJzbiI6IjAwYTY1MzlmOTVkYTBlNGI1ZDMyMzRlOGM3MjVmOWE4OWRmOTgzNGE1YmEwODFiMjc1NGI5Y2VlYTVlMDk0NjkiLCJleHAiOjE2MDEwODE0MDAsInV1aWQiOiJCMEZDMzZDRi03OTQxLTIwMTgtMTAyMy0wMTUxNTIwMDAwMDAiLCJtYWMiOiJiMGZjMzZjZjc5NDEifQ.Ss1YHhNdec1jxgKmIy4FlNo8YRDHXFwWD_liqLYeUTc')
      //    .then(function (response) {
      //        that.imgList=response.data.wallpapers
      //        console.log(response.data.wallpapers)
      //    })
      //    .catch(function (error) {
      //        // console.log(error.data);
      //    });
    },
  },
  mounted() {
    // this.getShow()
    this.getImg();
    setTimeout(() => {
      console.log(this.scrollReveal);
      this.scrollReveal.reveal(".reveal-scale", {
        // 动画的时长
        duration: 1000,
        // 延迟时间
        delay: 200,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        // origin: 'top',
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: true,
        // 滚动的距离，单位可以用%，rem等
        // distance: '200px',
        // 其他可用的动画效果
        opacity: 1,
        easing: "linear",
        scale: 0.8,
      });
      this.scrollReveal.reveal(".reveal-top", {
        // 动画的时长
        duration: 500,
        // 延迟时间
        delay: 200,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: "bottom",
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: true,
        // 滚动的距离，单位可以用%，rem等
        distance: "50px",
        // 其他可用的动画效果
        opacity: 0.001,
        easing: "linear",
      });
      this.scrollReveal.reveal(".reveal-top-two", {
        // 动画的时长
        duration: 500,
        // 延迟时间
        delay: 800,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: "bottom",
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: true,
        // 滚动的距离，单位可以用%，rem等
        distance: "50px",
        // 其他可用的动画效果
        opacity: 0.001,
        easing: "linear",
      });
      this.scrollReveal.reveal(".reveal-left", {
        // 动画的时长
        duration: 1000,
        // 延迟时间
        delay: 200,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: "left",
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: true,
        // 滚动的距离，单位可以用%，rem等
        distance: "200px",
        // 其他可用的动画效果
        opacity: 1,
        easing: "linear",
      });
      this.scrollReveal.reveal(".reveal-right", {
        // 动画的时长
        duration: 1000,
        // 延迟时间
        delay: 200,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: "right",
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: true,
        // 滚动的距离，单位可以用%，rem等
        distance: "200px",
        // 其他可用的动画效果
        opacity:1,
        easing: "linear",
      });
    }, 1000);
    
    setInterval(() => {
      let birthDay = new Date("2021-5-16");
      let today = new Date();
      let timeold = today.getTime() - birthDay.getTime();
      let sectimeold = timeold / 1000;
      let secondsold = Math.floor(sectimeold);
      let msPerDay = 24 * 60 * 60 * 1000;
      let e_daysold = timeold / msPerDay;
      this.daysold =
        Math.floor(e_daysold) < 10
          ? "0" + Math.floor(e_daysold)
          : Math.floor(e_daysold);
      let e_hrsold = (this.daysold - e_daysold) * -24;
      this.hrsold =
        Math.floor(e_hrsold) < 10
          ? "0" + Math.floor(e_hrsold)
          : Math.floor(e_hrsold);
      let e_minsold = (this.hrsold - e_hrsold) * -60;
      this.minsold =
        Math.floor((this.hrsold - e_hrsold) * -60) < 10
          ? "0" + Math.floor((this.hrsold - e_hrsold) * -60)
          : Math.floor((this.hrsold - e_hrsold) * -60);
      this.seconds =
        Math.floor((this.minsold - e_minsold) * -60) < 10
          ? "0" + Math.floor((this.minsold - e_minsold) * -60)
          : Math.floor((this.minsold - e_minsold) * -60);
    }, 1000);
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.el-row {
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.screenAll{
  overflow-x: hidden ;
  background-color: rgb(255,255,255);
  background: url('~@/assets/about/aboutmebg.jpg');
}

.screen{
  // background-color: #efefee;
}

.aboutMe{
  // height: 100vh;
  // min-height: 500px;
  position: relative;
  padding: 50px 10px;
  box-sizing: border-box;
  background: url('~@/assets/about/aboutmebg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;}

.last-post{
    margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  font-size : 2rem;
}

.blog-banner{
  margin:50px;
  border:0;
  padding:0;
  background-color: #efefee;
  
}

.Post-Item{
    margin:50px;
    border:0;
    padding:0;
    background-color:rgba(255,255,255,0.05)
    // position: relative;
    // padding: 10px 0;
    // // background: #eaf1f51f;
    // background-image :url('~@/assets/index_bg1.jpg');

}

.container{
  margin:50px;
  border:0;
  padding:0;
  // background-color :rgba(255,255,255,1)
}
.index {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 500px;

  .index-bg {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
    // background:$color url(https://open.saintic.com/api/bingPic/)
    background-color: #51cacc;
    // background:$color url(https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN)
    // background-image  url(https://p.pstatp.com/origin/1380400004c099042f2b9)
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    transition: all 0.8s;
    z-index: -1;
    display: block;
    visibility: visible;
    -webkit-mask-image: url('~@/assets/circle.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
    animation: circle 1.2s ease-in;
  }

  .index-con {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .show-title {
      font-size: 30px;
      ellipsis();
      padding: 0 20px;
      text-shadow: rgba(99, 88, 88, 0.878) 20px 10px 5px;
    }

    .show-info {
      text-align: center;
      font: 1.5rem 'Montserrat', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      text-align: justify;
      font-weight: 700;
      background-image: linear-gradient(360deg, rgb(246, 227, 177), rgb(225, 107, 145), rgb(246, 227, 177));
      background-clip: text;
      -webkit-text-fill-color: transparent;
      box-decoration-break: clone;
    }

    .index-btn-group {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      .index-btn {
        display: block;
        width: 180px;
        text-align: center;
        margin: 20px;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: bold;
        padding: 12px 50px;
        border-radius: 50px;
        color: white;
        position: relative;

        &:before {
          content: '';
          display: block;
          background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
          background-size: 210% 100%;
          background-position: right bottom;
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          border-radius: 50px;
          transition: all 1s;
          -webkit-transition: all 1s;
        }
      }

      .green {
        background-image: linear-gradient(to right, rgba(255, 222, 233, 0.5), rgba(181, 255, 252, 0.5));
        box-shadow: 0 4px 15px 0 rgba(255, 222, 233, 0.75);
      }

      .purple {
        background-image: linear-gradient(to right, rgba(133, 255, 189, 0.5), rgba(255, 251, 125, 0.5));
        box-shadow: 0 4px 15px 0 rgba(133, 255, 189, 0.75);
      }

      .purple:hover:before {
        background-position: left bottom;
      }

      .green:hover:before {
        background-position: left bottom;
      }
    }
  }
}

.framing {
  width: 100%;
  height: 340 px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  // background:#fff url(https://p.pstatp.com/origin/137a30000ce993dd1a536)
  // background: url(https://p.pstatp.com/origin/13749000105c852dceb70)
  background: #fff url('~@/assets/divider-bg.jpg');
  background-attachment: fixed;
  // background-size 100% 100%
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  // &:hover
  // p,h1
  // color: #5adcce;
}

.about {
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 1;
  // background: url(https://p.pstatp.com/origin/137de000057fb24b9d104)
  // background:#fff url(https://p.pstatp.com/origin/137e2000059e662f0dd6e)
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: #fff url('https://p.pstatp.com/origin/1373e0001435e411dd94b'); // p.pstatp.com/origin/1373e0001435e411dd94b)
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(10px);
  }
  .reveal-right{
    // position: relative;
    // left: -180px;
    // top: 20px;
    // transform:translateX(-50%);
    margin:auto;
    text-align: center;
  }

  .blog-time {
    font-weight: bold;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px dashed #ccc;
  }
}

.title {
  margin: 10px 0;
  text-align: center;
  font-size: 35px;
  color: #666;
  transition: all 0.4s;
  text-shadow: 1px 1px 0 hsla(0, 0%, 100%, 0.5);
  // backdrop-filter: blur(2px);
}

.title-info {
  font-size: 22px;
  color: #959c8d;
  letter-spacing: 2px;
  text-align: center;
  // margin-left :200px
}

@media (max-width: 700px) {
  .title {
    color: var(--main-6);
  }

  .title-info {
    font-size: 14px;
    letter-spacing: 1px;
  }

  .about {
    p {
      font-size: 12px;
    }
  }

  .framing {
    .container {
      transform: scale(0.8);
    }
  }

  .about {
    .top {
      .title {
        // transform: scale(0.8);
      }
    }
  }
}

@keyframes circle {
  0% {
    opacity: 0;
    -webkit-mask-size: 30%;
  }

  40% {
    opacity: 0.6;
    -webkit-mask-size: 60%;
  }

  100% {
    opacity: 1;
    -webkit-mask-size: 300%;
  }
}
</style>
<style lang="stylus" scoped>
.bounce {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font: normal bold 6rem 'Product Sans', sans-serif;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px #fff;
  letter-spacing: 0.04em;
  font-weight: bold;
}

.letter {
  animation: bounce 4s linear infinite alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  margin-top: 0.5em;
  text-shadow: 0 210px 6px #fff;
  font: normal 500 1.5rem 'Varela Round', sans-serif;
}

@media (max-width: 767px) {
  .index-btn {
    transform: scale(0.8);
  }

  .bounce {
    transform: scale(0.8);
  }

  .letter {
    // text-shadow: 0 305px 6px #fff
    text-shadow: 0 405px 6px #fff;
  }
}

@keyframes bounce {
  0% {
    transform: matrix(0, 0, 0, 0, 0, 0);
  }

  1.66667% {
    transform: matrix(0.19514, 0, 0, 0.19514, 0, -3.8179);
  }

  3.33333% {
    transform: matrix(0.48061, 0, 0, 0.48061, 0, -16.89184);
  }

  5% {
    transform: matrix(0.78868, 0, 0, 0.78868, 0, -35.82897);
  }

  6.66667% {
    transform: matrix(1.06298, 0, 0, 1.06298, 0, -54.24398);
  }

  8.33333% {
    transform: matrix(1.26541, 0, 0, 1.26541, 0, -67.42532);
  }

  10% {
    transform: matrix(1.37835, 0, 0, 1.37835, 0, -73.79667);
  }

  11.6667% {
    transform: matrix(1.40302, 0, 0, 1.40302, 0, -74.15221);
  }

  13.3333% {
    opacity: 1;
    transform: matrix(1.35507, 0, 0, 1.35507, 0, -70.32855);
  }

  15% {
    transform: matrix(1.25874, 0, 0, 1.25874, 0, -64.25506);
  }

  16.6667% {
    transform: matrix(1.14088, 0, 0, 1.14088, 0, -57.53621);
  }

  18.3333% {
    transform: matrix(1.02595, 0, 0, 1.02595, 0, -51.35907);
  }

  20% {
    transform: matrix(0.93241, 0, 0, 0.93241, 0, -46.51039);
  }

  21.6667% {
    transform: matrix(0.87106, 0, 0, 0.87106, 0, -43.40452);
  }

  23.3333% {
    transform: matrix(0.84491, 0, 0, 0.84491, 0, -42.11433);
  }

  25% {
    transform: matrix(0.85043, 0, 0, 0.85043, 0, -42.42524);
  }

  26.6667% {
    transform: matrix(0.87962, 0, 0, 0.87962, 0, -43.92027);
  }

  28.3333% {
    transform: matrix(0.92232, 0, 0, 0.92232, 0, -46.08478);
  }

  30% {
    transform: matrix(0.96839, 0, 0, 0.96839, 0, -48.40959);
  }

  31.6667% {
    transform: matrix(1.00942, 0, 0, 1.00942, 0, -50.47334);
  }

  33.3333% {
    transform: matrix(1.0397, 0, 0, 1.0397, 0, -51.99258);
  }

  35% {
    transform: matrix(1.05659, 0, 0, 1.05659, 0, -52.83794);
  }

  36.6667% {
    transform: matrix(1.06028, 0, 0, 1.06028, 0, -53.02083);
  }

  38.3333% {
    transform: matrix(1.05311, 0, 0, 1.05311, 0, -52.65993);
  }

  40% {
    transform: matrix(1.0387, 0, 0, 1.0387, 0, -51.93743);
  }

  41.6667% {
    transform: matrix(1.02107, 0, 0, 1.02107, 0, -51.05459);
  }

  43.3333% {
    transform: matrix(1.00388, 0, 0, 1.00388, 0, -50.19419);
  }

  45% {
    transform: matrix(0.98989, 0, 0, 0.98989, 0, -49.4943);
  }

  46.6667% {
    transform: matrix(0.98072, 0, 0, 0.98072, 0, -49.03539);
  }

  48.3333% {
    transform: matrix(0.9768, 0, 0, 0.9768, 0, -48.83983);
  }

  50% {
    transform: matrix(0.97763, 0, 0, 0.97763, 0, -48.88146);
  }

  51.6667% {
    transform: matrix(0.98199, 0, 0, 0.98199, 0, -49.09973);
  }

  53.3333% {
    transform: matrix(0.98838, 0, 0, 0.98838, 0, -49.41905);
  }

  55% {
    transform: matrix(0.99527, 0, 0, 0.99527, 0, -49.76363);
  }

  56.6667% {
    transform: matrix(1.00141, 0, 0, 1.00141, 0, -50.07044);
  }

  58.3333% {
    transform: matrix(1.00594, 0, 0, 1.00594, 0, -50.29687);
  }

  60% {
    transform: matrix(1.00846, 0, 0, 1.00846, 0, -50.4232);
  }

  61.6667% {
    transform: matrix(1.00902, 0, 0, 1.00902, 0, -50.4508);
  }

  63.3333% {
    transform: matrix(1.00794, 0, 0, 1.00794, 0, -50.39716);
  }

  65% {
    transform: matrix(1.00579, 0, 0, 1.00579, 0, -50.28941);
  }

  66.6667% {
    transform: matrix(1.00315, 0, 0, 1.00315, 0, -50.15758);
  }

  68.3333% {
    transform: matrix(1.00058, 0, 0, 1.00058, 0, -50.02902);
  }

  70% {
    transform: matrix(0.99849, 0, 0, 0.99849, 0, -49.9244);
  }

  71.6667% {
    transform: matrix(0.99712, 0, 0, 0.99712, 0, -49.85578);
  }

  73.3333% {
    transform: matrix(0.99653, 0, 0, 0.99653, 0, -49.82653);
  }

  75% {
    transform: matrix(0.99665, 0, 0, 0.99665, 0, -49.8327);
  }

  76.6667% {
    transform: matrix(0.99731, 0, 0, 0.99731, 0, -49.86535);
  }

  78.3333% {
    transform: matrix(0.99826, 0, 0, 0.99826, 0, -49.91311);
  }

  80% {
    transform: matrix(0.99929, 0, 0, 0.99929, 0, -49.96465);
  }

  81.6667% {
    transform: matrix(1.00021, 0, 0, 1.00021, 0, -50.01054);
  }

  83.3333% {
    transform: matrix(1.00089, 0, 0, 1.00089, 0, -50.0444);
  }

  85% {
    transform: matrix(1.00127, 0, 0, 1.00127, 0, -50.0633);
  }

  86.6667% {
    transform: matrix(1.00135, 0, 0, 1.00135, 0, -50.06743);
  }

  88.3333% {
    transform: matrix(1.00119, 0, 0, 1.00119, 0, -50.0594);
  }

  90% {
    transform: matrix(1.00087, 0, 0, 1.00087, 0, -50.04329);
  }

  91.6667% {
    transform: matrix(1.00047, 0, 0, 1.00047, 0, -50.02357);
  }

  93.3333% {
    transform: matrix(1.00009, 0, 0, 1.00009, 0, -50.00434);
  }

  95% {
    transform: matrix(0.99977, 0, 0, 0.99977, 0, -49.98869);
  }

  96.6667% {
    transform: matrix(0.99957, 0, 0, 0.99957, 0, -49.97843);
  }

  98.3333% {
    transform: matrix(0.99948, 0, 0, 0.99948, 0, -49.97405);
  }

  100% {
    opacity: 1;
    transform: matrix(1, 0, 0, 1, 0, -50);
  }
}
</style>
