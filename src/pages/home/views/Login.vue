<template>
  <div class="login">
    <el-row class="row">
      <el-col :xl="6" :md="8" :sm="12" :xs="22" class="login-con blog-animation">
        <div class="login-img">
          <img src="~@/assets/logo.svg" />
        </div>
        <p class="login-welcome">欢迎登录！</p>
        <el-form :model="formCustom" status-icon :rules="rules" ref="formCustom">
          <el-form-item prop="name">
            <el-input
              prefix-icon="el-icon-user"
              type="text"
              v-model="formCustom.name"
              placeholder="用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="formCustom.password"
              placeholder="密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button v-loading="loading" class="btn" @click="login('formCustom')">登录</el-button>
            <div class="a-tag user">
              <router-link to="/sign">立即注册</router-link>
              <router-link to="/forget">找回密码</router-link>
            </div>
            <el-divider>第三方登录</el-divider>
            <div class="share">
              <span class="iconfont qq" title="使用QQ账号登录" @click="partyLogin('qq')">&#xe651;</span>
              <span class="iconfont gitee" title="使用Gitee登录" @click="partyLogin('gitee')">&#xe686;</span>
              <span class="iconfont github" title="使用GitHub登录" @click="partyLogin('github')">&#xe691;</span>
            </div>
          </div>
          
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      formCustom: {
        type:'name',
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2到 20 个字符",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6到 20 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          if (!that.loading) {
            that.loading = true;
            that.loading = true;
            this.$post("/apis/login", this.formCustom)
              .then(function (response) {
                that.$store.dispatch("setToken", response.data.token);
                that.$store.dispatch("userInfo");
                that.loading = false;
                that.$router.push("/blog");
                that.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
              })
              .catch(function (error) {
                that.loading = false;
              });
          } else {
            that.$message({
              showClose: true,
              message: "正在登录中……",
              type: "success",
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "按照提示正确填写账号和密码",
          });
          return false;
        }
      });
    },
    partyLogin(type){
      let githubUrl = this.$partyLogin+'/login/'+type+'/redirect'
      window.location.href = githubUrl
    }
  },
  created(){
    console.log(this.$partyLogin )
     if (this.$route.query.token){
        this.$store.dispatch("setToken", this.$route.query.token);
        this.$store.dispatch("userInfo");
        this.$router.push("/blog");
        this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/login.styl';

.row 
  min-height: 680px;
  .el-divider__text
    font-size 13px
    color #8c92a4
  .share
    .iconfont
      font-size:23px
      margin:10px
      cursor pointer
      color #ffffff
      border-radius 50%
      padding 7px
      transition all .5s
    .qq
      color rgb(27,193,250)
      border: 2px solid #efefef;
      &:hover
        color #fff
        background-color rgba(27,193,250,.3)
        border: 2px solid rgb(27,193,250);
    .gitee
      color  #fe7300
      border: 2px solid #efefef;
      &:hover
        color #fff
        background-color rgba(254,115,0,.3);
        border: 2px solid  #fe7300;
    .github
      color  #0a0203
      border: 2px solid #efefef;
      &:hover
        color #fff
        background-color rgba(10, 2, 3,.3);
        border: 2px solid  #0a0203;
  

</style>