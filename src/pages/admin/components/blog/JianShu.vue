<template>
    <div class="csdn">
        <el-form :model="config" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="name">
                 <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
             </el-form-item>
             <el-form-item label="个人分类" prop="name">
                  <el-select v-model="config.notebook_id" placeholder="请选择">
                    <el-option
                        v-for="item in myCategory"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
             </el-form-item>
             <el-form-item label="自定义内容" prop="name">
                 <el-input v-model="article.myurl" placeholder="请输入文章标签,多个标签逗号分隔">
                    <el-switch
                        slot="append"
                        v-model="article.check"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        >
                    </el-switch>
                 </el-input>
             </el-form-item>
        </el-form>
        <mavon-editor
        style="height: 100vh"
        ref="md"
        :ishljs="true"
        v-model="article.content"
      />
    </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
export default {
    name:'JianShu',
     props:{
      name:{
          type:String,
          default:''
      },
      drawer:{
          type:Boolean,
          default:false
      }
    },
    components:{
        mavonEditor
    },
    data(){
        return {
            myCategory:[],
            article:{
                title:'',
                content:'',
                check:true,
                myurl:'',
            },
            config:{
                notebook_id:''
            }
        }
    },
    watch:{
        drawer(old){
            if(!old){
                this.$store.dispatch('setArticle',{
                    name:this.name,
                    article:this.article,
                    config:this.config
                })
                console.log(old)
            }
        }
    },
    created(){
        const that=this
        chrome.runtime.sendMessage(CHROME_ID, {
            func: "ChannelService."+this.name+".getConfig",
            args:{},
            js: localStorage.getItem('24'),
        }, (function(t) {
            console.log(t)
            that.myCategory=t.data.notebooks
            that.config.notebook_id= that.myCategory[0].id
            const old=that.$store.state.articles.article
            that.article.title=old.title
            that.article.content=old.content
            that.article.myurl=`> [个人博客原文地址(支持代码预览)](https://www.yunmobai.com/blog/${old.id})`
            that.$store.dispatch('setArticle',{
                name:that.name,
                article:that.article,
                config:that.config
            })
        }))
    }
}
</script>
<style lang="stylus" scoped>
.csdn
    margin:10px 30px
    background-color:#f7f8fa
    padding 10px 3px
</style>