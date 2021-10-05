### Vue 个人博客前端

### 项目演示

网站首页：[https://www.yunmobai.cn/](https://www.yunmobai.cn/)  

网站前端源码：https://gitee.com/baymaxsjj/by-vue-blog  



网站后端源码：https://gitee.com/baymaxsjj/by-laravel-blog

<table>
  <tbody>
   <tr>
      <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/2020103109302977.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
      <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/20201031093613940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
        <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/20201031093203324.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
    </tr>
    <tr>
      <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/20201031092813332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
      <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/20201031092919842.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
        <td align="center" valign="middle">
          <img src="https://img-blog.csdnimg.cn/2020103109332370.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTI5NDYwNw==,size_16,color_FFFFFF,t_70#pic_center" >
      </td>
    </tr>

  </tbody>
</table>

### 项目介绍
Vue版本：2.6.12，Laravel版本：7.0
1.Vue 多页面配置，一个项目包括前后端，

2.采用Element UI编写前后台

3.完成模块：

前台：首页介绍，文章展示，标签展示，分类展示，文章解析，生成目录，运行demo,模块显示，留言评论，友情链接，登录，注册，找回密码，第三方登录（QQ,GITEE,GITHUB），

后台：发表文章（模块管理，多平台发布，提交百度收录），文章列表，用户管理，友情链接，项目管理，成长路线，留言管理，网站公告，首页轮播，音乐管理，

4.项目配置：前后台分开打包，按需加载，动态路由，gizp压缩，去除生产环境的console.log，反向代理，cdn引入，服务器自动拉取代码打包编译脚本

## 安装依赖

```
npm install
```

### 运行项目

```
npm run serve
```

### 打包

```
npm run build
```

### vue cli配置参考

See [Configuration Reference](https://cli.vuejs.org/config/).

### 前后台分开打包

在package.json中配置

```json
 "scripts": {
        "serve_home": "vue-cli-service serve --home",
        "build_home": "vue-cli-service build --home",
        "serve_admin": "vue-cli-service serve --admin",
        "build_admin": "vue-cli-service build --admin "
    },
```

在vue.config.js配置

```js
//开发生产环境判断：true为生产环境
const IS_PROD = process.env.NODE_ENV === 'production';
//获取在package.json 编译或运行获取自定义的配置名称
let appName = process.argv.slice(0)[3].replace('--', '');
//编译输出名称
let outputPath = appName === 'home' ? 'home' : 'admin'
```

### 多页面配置，

```js
	// 由于部分插件，导致ie下空白
    transpileDependencies: ['vue-savedata', 'vue-baberrage'],
	//运行目录：开发环境：都在根目录。生产环境，前台在根目录，后台在子目录下运行
    publicPath: IS_PROD ? outputPath == 'home' ? '/' : '../' + outputPath + '/' : '/',
	// 输出目录，
    outputDir: '../' + outputPath,
	//多页面配置
    pages: {
		//此处因为要前后台分开打包，所以要注释
        // about: {
        //     entry: 'src/pages/admin/main.js',
        //     template: 'public/admin.html',
        //     filename: 'admin.html',
        //     chunks: ['chunk-vendors', 'chunk-common', 'about'],
        //     title: 'BAYMAX后台管理'
        // },
        index: {
            entry: 'src/pages/' + appName + '/main.js',
            template: `public/${appName}.html`,
            filename: 'index.html',
            chunks: ["chunk-vendors", "chunk-common", "index", 'runtime~index'],
            title: appName === 'home' ? '云墨白的博客-Start with Hello World' : 'BAYMAX后台管理'
        }
    },
```



### 反向代理配置

由于项目使用到第三方的接口需要反向代理

```js
  devServer: {
        sockHost: "localhost",
        disableHostCheck: true,
        port: 8080, // 端口号
        host: "0.0.0.0",
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            //后台接口
            "/apis": {
                // target: "http://127.0.0.1:80/api/v1", // 需要请求的地址
                target: process.env.VUE_APP_API_URL, // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/apis": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },
             //音乐接口
            "/music": {
                target: "https://music.liuzhijin.cn", // 需要请求的地址
                // target: process.env.VUE_APP_URL,   // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/music": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },
             //每日英语接口
            "/english": {
                target: "http://sentence.iciba.com", // 需要请求的地址
                // target: process.env.VUE_APP_URL,   // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/english": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            },
            "/loimg": {
                target: "https://pc-store.lenovomm.cn/wallpapercontent/wallpaper/classify/tag_wallpapers", // 需要请求的地址
                // target: process.env.VUE_APP_URL,   // 需要请求的地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/loimg": "" // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
                }
            }
        }
    },
```



### nginx配置

```bash
location /apis {        
      proxy_pass 自己后端域名;
    }
    location /vendor/sitemap/styles/xml.xsl {        
      proxy_pass https://api.yunmobai.cn/vendor/sitemap/styles/xml.xsl;
    }
    location /music {
      proxy_pass https://music.liuzhijin.cn/;
    }
    location /english {
      proxy_pass http://sentence.iciba.com/;
    }
```



### 自动化脚本

```sh
echo 同步远程仓库
git pull
echo 编译主页
npm run build_home
echo 删除源文件
rm -r ../js ../css ../img ../fonts
echo 拷贝主页
cp -rf ../home/. ../
echo 删除编译文件
rm -r ../home ../admin.html
echo 完成
```
