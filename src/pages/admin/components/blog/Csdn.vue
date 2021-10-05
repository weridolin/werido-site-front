<template>
    <div class="csdn">
        <el-form :model="config" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章类型" prop="name">
                <el-radio v-model="config.type" label="original">原创</el-radio>
            </el-form-item>
             <el-form-item label="发布形式" prop="name">
                <el-radio v-model="config.csdnReadTypeRadios" label="public">公开</el-radio>
                <el-radio v-model="config.csdnReadTypeRadios" label="private">私密</el-radio>
                <el-radio v-model="config.csdnReadTypeRadios" label="needfans">粉丝可见</el-radio>
                <el-radio v-model="config.csdnReadTypeRadios" label="needvip">VIP可见</el-radio>
            </el-form-item>
             <el-form-item label="文章标题" prop="name">
                 <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
             </el-form-item>
             <el-form-item label="个人分类" prop="name">
                  <el-select v-model="config.category" placeholder="请选择">
                    <el-option
                        v-for="item in myCategory"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
             </el-form-item>
             <el-form-item label="文章标签" prop="name">
                 <el-input v-model="config.tags" placeholder="请输入文章标签,多个标签逗号分隔"></el-input>
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
    name:'Csdn',
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
                category: "前端",
                csdnReadTypeRadios: "public",
                original_plan: false,
                tags:'',
                txbTag: "",
                type: "original",
            }
        }
    },
    watch:{
        drawer(old){
            if(!old){
                this.$store.dispatch('setArticle',{
                    name:'csdn',
                    article:this.article,
                    config:this.config
                })
                console.log(old)
            }
            let china
        }
    },
    created(){
        console.log('csdn开始运行')
        const that=this
        chrome.runtime.sendMessage(CHROME_ID, {
            func: "ChannelService.csdn.getConfig",
            args:{},
            js: localStorage.getItem('24'),
        }, (function(t) {
            that.myCategory=t.data.myCategory
            that.config.category= t.data.myCategory[0].value
            const old=that.$store.state.articles.article
            that.article.title=old.title
            that.article.content=old.content
            that.article.myurl=`> [个人博客原文地址(支持代码预览)](https://www.yunmobai.com/blog/${old.id})\r`
            that.config.tags=old.tags
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
    padding 10px
</style>