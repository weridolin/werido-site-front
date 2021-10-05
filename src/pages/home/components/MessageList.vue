<template>
  <div class="container mess-list">
    <h1 class="mess-title">
      <i class="el-icon-ice-cream-round"></i>
    </h1>
    <div class="mess-group">
      <div class = "mess-content">
      <el-row>
        <el-col :md="12" :sm="24">
          <MessCardBlog
            class="MessListLeft"
            @submit="getMess"
            :list="MessListLeft"
            :car="left"
          ></MessCardBlog>
        </el-col>
        <el-col v-if="!isShow" :md="12" :sm="24">
          <MessCardBlog
            class="MessListRight"
            @submit="getMess"
            :list="MessListRight"
            :car="right"
          ></MessCardBlog>
        </el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import MessCardBlog from "./../components/MessCardBlog";
export default {
  name: "MessageList",
  props: {
    list: Array,
  },
  components: {
    MessCardBlog,
  },
  computed: {
    MessListLeft() {
      if (this.isShow) {
        return this.list;
      }
      console.log(this.list);
      return this.list.filter(function (item) {
        return item.id % 2 != 0;
      });
    },
    MessListRight() {
      if (!this.isShow) {
        return this.list.filter(function (item) {
          return item.id % 2 == 0;
        });
      }
    },
  },
  data() {
    return {
      isShow: document.body.clientWidth <= 992 ? true : false,
      left: {
        pattern: true, //留言模式
        left: true, //left模式
      },
      right: {
        pattern: true, //留言模式
        left: false, //left模式
      },
    };
  },
  methods: {
    getMess() {
      this.$emit("submit");
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.mess-list {
  &:hover {
    .mess-title {
      color: #5adcce;
    }
  }

  .mess-title {
    margin: 0;
    font-size: 25px;
    color: #ccc;
  }

  .mess-group {
    position: relative;
    padding: 10px 0;
    background: #eaf1f51f;
    background-image :url('~@/assets/commentBg.jpg');
    // opacity :0.1;


  }
  .mess-group::before{
      z-index:-1;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -4px;
      content: '';
      height: 100%;
      width: 8px;
      // background: #fff;
      // background-image :url("http://pic2.bbzhi.com/huihuabizhi/jianbichengshifengguang/jianbichengshifengguang_65818_9.jpg");
      // opacity :0.1;
      border-radius: 8px;
  }
}

h1:after{
    content: '       ';
    display: block;
    margin: 0.4em auto 0;
    width: 200px;
    height: 2px;
    border-bottom: 11px dashed var(--main-6);
}

@media (max-width: 992px) {
  .mess-group, .mess-item, .mess-info, .mess-loging {
    &:before {
      display: none;
    }
  }

  .mess-group {
    &:after {
      display: none;
    }
  }
}
</style>
