echo 编译主页
###
 # @Description: 
 # @email: 359066432@qq.com
 # @Author: lhj
 # @software: vscode
 # @Date: 2021-05-16 18:05:44
 # @platform: windows 10
 # @LastEditors: lhj
 # @LastEditTime: 2021-10-05 21:00:27
### 
npm run build_home
echo 更新DOCKERFILE
docker build -t vueblog . 
echo 运行docker
# docker run -p 8888:80 -d --name vueBlog vueblog

# docker run -p 8080:80 -d -v F:/PYTHON_CODE/myblogs/werido-blog-front/nginx:/etc/nginx/conf.d/ --name myblog vueblog