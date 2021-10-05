<template>
    <div class="channel">
        <el-alert
          v-if="connect.ok"
          show-icon
          title="插件加载成功"
          type="success">
        </el-alert>
        <el-alert
          v-else
          title="插件加载失败"
          show-icon
          type="error">
        </el-alert>
        <div class="article">
        <div class="title">
          {{article.title}}
        </div>
          <p class="content">
            <my-marked :dompurify="false" :markedOptions="{breaks:true}" :tocNav="false"  :initialValue="article.content"></my-marked>
          </p>
        </div>
        <div class="info">
          <a :href="'https://www.yunmobai.cn/blog/'+article.id">发布成功并查看文章</a>
          <router-link to="/home/articles/add">再写一篇</router-link>
        </div>
        <el-checkbox-group style="margin:10px 0" v-model="checkboxGroup1" fill="#5eead1">
            <el-checkbox-button
                v-for="(item,index) of channels"
                :key="item.name"
                :label="index"
                @change="change(index)"
                >
                {{ item.nameZh }}
                <el-button icon="el-icon-setting" circle style="padding:0px" @click="sett(index)"></el-button>
                </el-checkbox-button>
        </el-checkbox-group>
        <el-drawer
            :title="channels[setting].nameZh+'配置'"
            :visible.sync="drawer"
            size="50%"
            direction="rtl"
            >
            <hr />
            <el-scrollbar style="height:100%">
                <csdn v-show="channels[setting].name=='csdn'" :drawer="drawer" name="csdn"></csdn>
                <jian-shu v-show="channels[setting].name=='jianshu'" :drawer="drawer" name="jianshu"></jian-shu>
            </el-scrollbar>
        </el-drawer>
        <div style="display: flex;justify-content: center;">
            <el-button @click="$router.go(-1)">返回</el-button>
            <el-button @click="submit">文章扩散</el-button>
        </div>
         
    </div>
</template>
<script>
import Csdn from './blog/Csdn'
import MyMarked from '@/pages/home/components/MyMarked'
import JianShu from './blog/JianShu'
export default {
  name: "Channels",
  components:{
      Csdn,
      JianShu,
      MyMarked
  },
  props:{
        title:{
          type:String,
          default:''
      },
      content:{
          type:String,
          default:''
      },
      tags:{
          type:String,
          default:''
      },
  },
  data() {
    return {
        CHROME_ID:'okekafehmillkoepgamjddgljlfgdenm',
        connect:[],
        article:{},
        setting:0,
        drawer:false,
        checkboxGroup1:[],
        channels: [
        {
          id: null,
          name: "segmentfault",
          nameZh: "SegmentFault",
          logo: "http://jeff.spring4all.com/FlCADwkmaaq65DbOyht4P-polLeA",
          url: "https://segmentfault.com",
          draft: 0,
          type: 2,
        },
        {
          id: null,
          name: "csdn",
          nameZh: "CSDN",
          logo: "http://jeff.spring4all.com/FoQhLJUwGR1tJPxkJL488fYw7qut",
          url: "https://blog.csdn.net",
          draft: 0,
          type: 2,
        },
        {
          id: null,
          name: "juejin",
          nameZh: "掘金",
          logo: "http://jeff.spring4all.com/Fsxf9IhVs1oacRv84oXJOBCZBjYR",
          url: "https://juejin.im",
          draft: 0,
          type: 2,
        },
        {
          id: null,
          name: "cnblogs",
          nameZh: "博客园",
          logo: "http://jeff.spring4all.com/FkGLBKIzgAYW7j7K47uCefg-g0lY",
          url: "https://www.cnblogs.com",
          draft: 0,
          type: 2,
        },
        {
          id: null,
          name: "jianshu",
          nameZh: "简书",
          logo: "http://jeff.spring4all.com/FvnKt62tFvOXudjUNMtLKRJfa3__",
          url: "https://jianshu.com",
          draft: 0,
          type: 1,
        },
        {
          id: null,
          name: "zhihu",
          nameZh: "知乎",
          logo: "http://jeff.spring4all.com/FitF7RONSixcMXeotzDj67J_c94k",
          url: "https://www.zhihu.com",
          draft: 0,
          type: 1,
        },
        {
          id: null,
          name: "toutiao",
          nameZh: "今日头条",
          logo: "http://jeff.spring4all.com/Fh_UEuFYkDAzjYsNLHHUsAqFIojy",
          url: "https://www.toutiao.com",
          draft: 0,
          type: 1,
        },
      ],
    };
  },
  methods: {
      sett(index){
          this.drawer=!this.drawer
          this.setting=index
      },
      submit(){
        const articles=this.$store.state.articles.articles
        const article=this.$store.state.articles.article
        const checks=this.$store.state.articles.checks
        const that=this
        let mess={}
        Object.keys(articles).forEach(function(key){
          console.log(key)
          const index=checks.indexOf(key)
          if(index>=0){
            const check=articles[key].article.check
            if(check){
              articles[key].article.content=articles[key].article.myurl+articles[key].article.content
            }
            const arg={
                article:articles[key].article,
                config:articles[key].config,
                cookie:localStorage.getItem(key)
            }
            console.log(arg)
            // mess['csdn']="www.baidu.com"
            // that.update(mess)
            chrome.runtime.sendMessage(CHROME_ID, {
                func: "ChannelService."+key+".articlePublish",
                args: arg,
                js: localStorage.getItem('24'),
            }, (function(t) {
                console.log(t)
              if(t.ok){
                mess[key]=t.data
                that.$message({
                  message: key+'发表成功',
                });
                if(checks[checks.length-1]==key){
                  console.log(mess)
                  that.update(mess)
                }
              }else{
                that.$notify({
                  title: key+'发布失败',
                  message: t.message
                });
              }
              }))
          }
        })
      },
      update(mess){
        let that=this 
        console.log('多端发布')
        that
        .$post("/apis/admin/article/channels", {
          id:that.article.id,
          channels:JSON.stringify(mess)
        })
        .then(function (res) {
           that.$message({
                  message: res.message,
            });
            that.$router.go(-2)
          console.log(res);
        })
        .catch(function (error) {});
      },
      change(index){
            this.last
            let check=this.checkboxGroup1.indexOf(index) 
            const that=this
            console.log(check)
            if(check>=0){
                console.log(that.channels[index].name)
                chrome.runtime.sendMessage(CHROME_ID, {
                    func: 'ChannelService.'+that.channels[index].name+'.verifyCookie',
                    args: {},
                    js: localStorage.getItem('24'),
                }, (function(t) {
                    if(!t.data){
                        that.$message({
                            message: '请确保登录，后在进行绑定',
                            type: "warning",
                        });
                        localStorage.removeItem(that.channels[index].name)
                        that.checkboxGroup1.pop()
                    }else{
                        //  that.drawer=!that.drawer
                        that.$store.commit('setCheck',that.channels[index].name)
                        that.setting=index
                        that.drawer=true
                        // that.drawer=false
                    }
                }))
                chrome.runtime.sendMessage(CHROME_ID, {
                    func: "CookieService.getCookie",
                    args: that.channels[index].url,
                    js: localStorage.getItem('24'),
                }, (function(t) {
                    localStorage.setItem(that.channels[index].name,t)
                }))
            }else{
                localStorage.removeItem(that.channels[index].name)
                that.$store.commit('setCheck',that.channels[index].name)
                that.setting=0
            }
            
      }
  },
  created() {
    this.article=this.$store.state.articles.article
    const that=this
    chrome.runtime.sendMessage(CHROME_ID, {
        func: "ChromeService.testConnect",
        args: {},
        js: localStorage.getItem('24')
    }, (function(t) {
        that.connect=t
       console.log(t)
    }
    ))
  },
};
</script>
<style lang="stylus" scoped>
.channel>>>
  .el-drawer__body
    overflow hidden
  /deep/:focus
    outline: 0;
.channel
    margin 20px 50px
    display: flex;
    flex-direction: column
    .article
      margin: 20px 0;
      background-color: #f5f6f7;
      padding: 8px;
      .title
        font-size: 18px;
        color: #474747;
        margin-bottom: 8px;
        padding-bottom: 0;
      .content
        font-size: 14px;
        color: #999;
        margin: 8px 0;
        margin-top: 15px;
        max-height 170px
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
    .info
      overflow hidden
      a
        float right
        margin-left: 16px;
        color: #a0e2d6;
        text-decoration: underline;
        cursor: pointer;

</style>