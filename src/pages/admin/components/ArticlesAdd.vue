<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <div class="article-title">
        <el-form-item label="文章封面" class="article-img">
          <el-upload
            class="avatar-uploader"
            :action="
              'http://127.0.0.1:8000/api/v1/admin/pictures/add?type=' + imgType
            "
            list-type="picture-card"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <img height="60" v-if="form.img" :src="form.img" class="avatar" />
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-col :sm="13" :xs="24">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
      </div>

      <el-form-item label="文章介绍" prop="desc">
        <el-col :sm="13" :xs="24">
          <el-input v-model="form.desc" type="textarea" autosize></el-input>
        </el-col>
      </el-form-item>
      <el-row>
        <el-col :sm="7" :xs="24">
          <el-form-item label="文章类别" prop="classty">
            <el-input v-model="form.classty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="7" :xs="24">
          <el-form-item label="文章标签" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :sm="6" :xs="24">
          <el-form-item label="创建日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6" :xs="24">
          <el-form-item label="图床">
            <el-select v-model="imgType" placeholder="请选择">
              <el-option
                v-for="item in imgService"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6" :xs="24">
          <el-form-item label="浏览量">
            <el-input-number
              v-model="form.click"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :sm="6" :xs="24">
          <el-form-item label="点击量">
            <el-input-number
              v-model="form.like"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="首页显示">
            <el-switch
              v-model="form.is_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="标题显示">
            <el-switch
              v-model="form.head_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="分享显示">
            <el-switch
              v-model="form.share_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="版权显示">
            <el-switch
              v-model="form.copyright_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="留言显示">
            <el-switch
              v-model="form.message_show"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :sm="4" :xs="12">
          <el-form-item label="提交收录">
            <el-switch
              v-model="form.seo"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <channels :title="form.title" :content="form.content" :tags="form.label"></channels> -->
      <div style="display: flex; justify-content: center; margin-bottom: 10px">
        <el-button style="width: 50%" @click="onSubmit('form')">发布</el-button>
      </div>
      <mavon-editor
        style="height: 100vh"
        ref="md"
        @imgAdd="$imgAdd"
        :ishljs="true"
        v-model="form.content"
      />
    </el-form>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import Channels from "./Channels";
import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticlesAdd",
  components: {
    mavonEditor,
    Channels
  },
  data() {
    return {
      type: "add",
      imgType: "toutiao",
      checkboxGroup1: [],
      imgService: [
        {
          name: "头条",
          value: "toutiao",
        },
        {
          name: "百度",
          value: "baidu",
        },
        {
          name: "哔哩哔哩",
          value: "bilibili",
        },
        {
          name: "新浪",
          value: "sina",
        },
        {
          name: "搜狐",
          value: "souhu",
        },
        {
          name: "腾讯",
          value: "tencent",
        },
        {
          name: "网易",
          value: "wangyi",
        },
        {
          name: "悟空",
          value: "wukong",
        },
        {
          name: "小米",
          value: "xiaomi",
        },
        {
          name: "中关村",
          value: "zol",
        },
      ],
      form: {
        title: "",
        desc: "",
        content: "",
        img: "",
        label: "",
        classty: "",
        click: "",
        like: "",
        is_show: 1,
        head_show: 1,
        share_show: 1,
        copyright_show: 1,
        message_show: 1,
        seo: 1,
      },
      rules: {
        title: [{ required: false, message: "标题不可为空", trigger: "blur" }],
        desc: [{ required: false, message: "介绍不可为空", trigger: "blur" }],
        classty: [
          { required: false, message: "类型不可为空", trigger: "blur" },
        ],
        label: [{ required: false, message: "标签不可为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      var that = this;
      console.log("开始");
      formdata.append("file", $file);
      this.$post(
        "/apis/admin/pictures/add?type=" + that.imgType,
        formdata
      ).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(url.data.path);
        this.$refs.md.$img2Url(pos, url.data.path);
      });
    },
    onSubmit(formName) {
      // 为表单绑定验证功能
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          that.submit();
        }
      });
    },
    submit() {
      //
      let that = this;
      that
        .$post("/apis/admin/article/" + that.type, that.form)
        .then(function (res) {
          console.log(res);
          that.$store.commit('article',{
            id:res.data.id,
            title:that.form.title,
            content:that.form.content,
            tags:that.form.label
          })
          that.$router.push('/home/articles/diffusion')
          that.$message({
            message: res.data.message,
            type: "success",
          });
          
        })
        .catch(function (error) {});
    },
    getArticle() {
      let that = this;
      let id = that.$route.params.id;
      that
        .$post("/apis/blog/content?id=" + id)
        .then(function (res) {
          that.form.title = res.data.title;
          that.form.desc = res.data.desc;
          that.form.content = res.data.content;
          that.form.classty = res.data.classty;
          that.form.img = res.data.img;
          that.form.label = res.data.label.toString();
          that.form.click = res.data.click;
          that.form.like = res.data.like;
          that.form.is_show = res.data.is_show;
          that.form.head_show = res.data.head_show;
          that.form.share_show = res.data.share_show;
          that.form.copyright_show = res.data.copyright_show;
          that.form.message_show = res.data.message_show;
        })
        .catch(function (error) {});
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.img = res.data.path;
    },
    beforeAvatarUpload(file) {
      const arr = [
        "image/jpeg",
        "image/gif",
        "image/jpg",
        "image/png",
        "image/x-png",
        "image/pjpeg",
      ];
      const isJPG = arr.indexOf(file.type) >= 0;
      console.log(isJPG);
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传头像格式不正确格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    let id = this.$route.params.id;
    this.form.id = id;
    if (id) {
      this.getArticle();
      this.type = "update";
      this.form.seo = 0;
    }
  },
};
</script>
<style lang="stylus" scoped>
// .article-img >>>.el-upload--picture-card
// width:102px
// height:102px
// line-height:102px
@media (min-width: 1010px) {
  .article-title {
    position: relative;

    .article-img {
      position: absolute;
      top: 0;
      right: 150px;
    }

    .avatar {
      position: absolute;
      top: 0;
      left: 160px;
      height: 148px;
      max-width: 148px;
      border-radius: 5px;
      display: block;
    }
  }
}
</style>