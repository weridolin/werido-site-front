<template>
<div     
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"  
    class="zone2"
  >

    <el-upload
      class="upload"
      :multiple ="false"
      :auto-upload="false"
      :drag="true"
      :on-change="upChange"
      enctype="multipart/form-data"
      :file-list="fileList"  
      :action="uploadUrl"
      :show-file-list ="false"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
      <div class="el-upload__text" id="selectFile" >请先选择文件</div>
      <div class="el-upload__tip" slot="tip">由于服务器网速的原因,不建议上传太大文件🤣</div>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile" id="uploadButton" class="uploadButton">上传到服务器</el-button>
    <el-button style="margin-left: 10px;" size="small"  @click="drawer = true" type="primary" id="downButton" class="downButton">下载文件</el-button>

    <div class="down-code" id="down-code">
      <el-input
        placeholder="下载授权码"
        v-model="down_code"
        class="down_code"
        id="down_code"
        >
        <i slot="suffix" class="el-icon-document-copy" id="downCode"  @click="copyDownCode"></i>
      </el-input>
    </div>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="percent" id="uploadProgress" class="uploadProgress"></el-progress>

    <el-drawer
      title="文件下载"
      :visible.sync="drawer"
      :direction="direction"
      @open="openDrawer">
        <div class="demo-drawer__content">
          <el-form :model="downForm">
            <el-form-item label="文件下载码" :label-width="formLabelWidth">
              <el-input v-model="downForm.down_code" autocomplete="off" @input="getFileInfoByDownCode"></el-input>
            </el-form-item>
            <el-form-item label="已上传文件" :label-width="formLabelWidth">
              <el-tag size="small" class="downFile" closable></el-tag>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="closeDrawer">取 消</el-button>
            <el-button type="primary" @click="downFile" >确 定</el-button>
          </div>
        </div>
    </el-drawer>



</div>

</template>


<style scoped>

@import url(https://fonts.googleapis.com/css?family=Exo+2:400,700,500,300);
body {
  background: #2f6792;
  font-family: "Exo 2";
}

#selectFile {
  margin-top:1rem;
}
.upload{
  margin-top:2rem;
  margin-bottom: 2rem;
}

.down-code{
  margin-top:1rem;
  margin-bottom: 2rem;
  vertical-align:middle;
  margin-left:auto; margin-right:auto;
  width:30%
}
.zone2  {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  text-align:center;
  width:80%;
  height:60%;  
  /* border:5px dashed white; */

  /* z-index: -999;
  filter: alpha(opacity=50);  
  -moz-opacity: 0.5;  
  -ms-opacity: 0.5;  
  -webkit-opacity: 0.5;  
  -o-opacity: 0.5;   */
  /* opacity: 0.5; */
  position: absolute;
  background: url('~@/assets/card-bg1.jpg') ;
  background-size: 100% 100%;

}

#downCode{
  vertical-align:middle;
  margin: auto;
  text-align:center;
}
.uploadProgress {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.downButton {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.uploadButton {
  margin-top: 2rem;
  margin-bottom: 2rem;
}


</style>

<script>
import SparkMD5 from 'spark-md5'

export default {
  name: "fileBroker",
  data(){
    return {
      remainChunks: [], // 剩余切片
      isStop : false, // 暂停上传控制
      percent :0 ,// 上传百分比
      uploadedChunkSize:0, // 已完成上传的切片数
      chunkSize:10*1024*1024 ,// 切片大小
      file_key:null, //后台生成的文件 key
      fileName:"",//文件名称
      chunkCount:0,//切片数量
      fileList:[],//文件列表
      uploadUrl:"/api/v1/fileBroker",
      isStop:false, //是否停止状态
      down_code:null,//下载授权码
      drawer: false,
      downForm:{
        down_code: '',
        down_fileName:""
      },
      formLabelWidth:"120px",
      direction:"rtl",
      loading:false, //加载
      loadingText:"文件分析中"

    }
  },
  methods:{
    openDrawer(){
      if (this.down_code!=null){
        this.downForm.down_code = this.down_code
        this.getFileInfoByDownCode()
      } 
    },
    closeDrawer(){
      this.drawer = false
    },

    cancelForm(){
      console.log(">>> close drawer")
    },
    copyDownCode(){
        // 创建一个虚拟的input来实现
        let newInput = document.createElement("input");
        // 讲存储的数据赋值给input的value值
        newInput.value = this.down_code;
        // appendChild() 方法向节点添加最后一个子节点。
        document.body.appendChild(newInput);
        // 选中input元素中的文本
        newInput.select();
        document.execCommand("Copy");   // 执行复制操
        newInput.remove() 
        this.$message({
          message: '复制成功',
          type: 'success'
        });
    },
    async upChange(file, fileList){
      this.loading = true
      document.querySelector("#selectFile").textContent= file.name
        if (fileList.length >0) {
            this.fileList = [fileList[fileList.length - 1]]
        }
      const chunkInfo = await this.cutBlob(file)
      this.remainChunks = chunkInfo.chunkArr
      this.fileInfo = chunkInfo.fileInfo
      this.percent = 0
      this.loading = false
    },  

    cutBlob(file) {
        const chunkArr = [] // 所有切片缓存数组
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // 切割Api不同浏览器分割处理
        const spark = new SparkMD5.ArrayBuffer() // 文件hash处理
        const chunkNums = Math.ceil(file.size / this.chunkSize) // 切片总数
        this.fileName = file.name
        this.chunkCount = chunkNums
        console.log(">>> 文件大小",file.size,"切割后的文件数目",chunkNums)

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file.raw)
            reader.addEventListener('loadend', () => {
                const content = reader.result
                spark.append(content)
                const hash = spark.end()
                let startIndex = ''
                let endIndex = ''
                let contentItem = ''
            // 文件切割
                for(let i = 0; i < chunkNums; i++) {
                  startIndex = i * this.chunkSize
                  endIndex = startIndex + this.chunkSize
                  endIndex > file.size && (endIndex = file.size)
                  contentItem = blobSlice.call(file.raw, startIndex, endIndex)
                  chunkArr.push({
                  index: i,
                  hash,
                  total: chunkNums,
                  name: file.name,
                  size: file.size,
                  chunk: contentItem
                    }
                  )
                }
                console.log("load end",chunkArr)
            resolve({
                chunkArr,
                fileInfo: {
                    hash,
                    total: chunkNums,
                    name: file.name,
                    size: file.size
              }
            })
            })
            reader.addEventListener('error', function _error(err) {
              reject(err)
            })
          }
        )
    },
    uploadFile() {
      this.percent = 0
      this.uploadedChunkSize = 0
      this.fileUploadSetup()
      // this.sendRequest(6,this.uploadedCallback)
    },

    sendRequest(max=6,callback) {
      console.log(">>>> 开始上传文件",this.file_key)
      let fetchArr = []
      let toFetch = () => {
        if (this.isStop) {
          return Promise.reject('暂停上传')
        }
        if (!this.remainChunks.length) {
          console.log(">>>> 没有待上传的数据")
          return Promise.resolve()
        }

        const chunkItem = this.remainChunks.shift() //弹出数组第一项
        const it = this.sendChunk(chunkItem)
        it.then(() => {
          // 上传完成后会调用并从任务队列里面移除
          fetchArr.splice(fetchArr.indexOf(it), 1)
          }, err => {
            this.isStop = true
            this.remainChunks.unshift(chunkItem) //将 chunkItem 添加到列表头并返回长度
            Promise.reject(err)
            }
          )
        // 将该分片上传添加到任务列表里面
        fetchArr.push(it)
        let p = Promise.resolve()
        if (fetchArr.length >= max) {
          p = Promise.race(fetchArr)
        }
        return p.then(() => toFetch())
      }
      toFetch().then(() => {
        Promise.all(fetchArr).then(() => {
          callback()
        })
      }, err => {
        console.log(err)
      })
    },

    uploadedCallback(){
      // 上传完成后回调
      let that = this
      this.loadingText="上传完成文件合并中"
      this.loading=true
      console.log(">>> 上传完成,准备获取下载授权码")
      const data = {
        "file_key":that.file_key,
      }  
      this.$post("/api/v1/fileBroker/downCode",data)
        .then(function (res) {
          // 注意这里的this不是指向Vue对象，this指向的是windows，和全局变量一样。
          that.down_code = res.code
          console.log(res,"GET down load code");
          that.loadingText="分析文件中"
          that.loading=false
        })
        .catch(function (error) {
          console.log(">>> GET down load code error",error)
        });

    },

    sendChunk(item) {
      console.log(">>>>>",item.chunk.name)
      const formdata = new FormData()
      formdata.append("file", item.chunk)
      formdata.append("key", this.file_key)
      formdata.append("chunk_num", item.index)
      formdata.append("md5", item.hash)
      formdata.append("file_name", item.name)


      return this.$http({
        url: "/api/v1/fileBroker",
        method: "put",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const { loaded, total } = event
          this.uploadedChunkSize += loaded < total ? 0 : +loaded
          this.uploadedChunkSize > item.size && (this.uploadedChunkSize = item.size)
          this.percent = (this.uploadedChunkSize / item.size).toFixed(2) * 1000 / 10
        }
      })
    },

    async fileUploadSetup(){
      let that = this
      const data = {
        "file_name":this.fileName,
        "chunk_count":this.chunkCount
      }  
      await this.$post("/api/v1/fileBroker",data)
        .then(function (res) {
          console.log(res,"GET FILE UPLOAD INFO");
          that.file_key = res.key
          that.sendRequest(6,that.uploadedCallback)
        })
        .catch(function (error) {
          console.log(">>>",error)
        });
    },

    getFileInfoByDownCode(){
      if(this.downForm.down_code.length==5){
        let that = this
        this.$get("/api/v1/fileBroker/search/"+this.downForm.down_code)
          .then(function (res) {
            console.log(res,"GET FILE INFO BY DOWN CODE",res.data.length,res.data[0]);
            if (res.data.length == 1){
                console.log(document.querySelector(".downFile"))
                document.querySelector(".downFile").textContent = res.data[0].file_name
                that.downForm.down_fileName = res.data[0].file_name
              }
            
          })
          .catch(function (error) {
            console.log(">>>",error)
          });
      }
    },

    downFile(){
      let that = this
      const downCode = this.downForm.down_code
      console.log(">>>>>> begin to down load file",downCode)
      this.$get(`/api/v1/fileBroker?down_code=${downCode}`,{responseType: 'blob'}).then((blobContent)=>{        
        let a = document.createElement('a')
        a.download =  that.downForm.down_fileName
        a.style.display = 'none'
        let url = URL.createObjectURL(blobContent)
        a.href = url
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(url) // 销毁
        document.body.removeChild(a)
      })
    }
  },
  props:{
  },
  created(){
  }
};
</script>