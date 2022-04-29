<template>
<el-container   
    v-loading="state.loading"
    :element-loading-text="state.loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"  >>
    <el-aside> 
        <el-form :model="downForm">
        <el-form-item label="文件下载码" :label-width="formLabelWidth">
            <el-input v-model="downForm.down_code" autocomplete="off" @input="getFileInfoByDownCode"></el-input>
        </el-form-item>
        <el-form-item label="已上传文件" :label-width="formLabelWidth">
            <el-tag size="small" class="downFile" closable></el-tag>
        </el-form-item>
        <el-form-item label="过期时间" :label-width="formLabelWidth">
            <div class="expire-time"> </div>
        </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
        <el-button type="primary" @click="downFile" >下载</el-button>
        </div>

    </el-aside>
    <el-container>
    <el-header>
        <div>
        <el-alert
            :closable="false"
            title="注意:📢📢📢📢📢📢📢📢📢📢📢📢"
            type="success"
            center
            description="只需在下面按自己的需求选择字段和类型,选择对应的生成的数据的条数,后台生成后会返回一个下载码,即可下载对应的数据,默认为CSV格式">
        </el-alert>
        </div>
    </el-header>
    <el-main>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.items"
                :label="'字段' + index"
                :key="index"
                :prop="'items.' + index + '.alias'"
            >   
                <!--  form item  -->
                <el-row :gutter="10">
                    <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="18">
                        <div class="field-type">
                            <el-row :gutter="10">
                                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                                    <el-select v-model="domain.alias" placeholder="请选择是与否" @change="selectItem(domain)">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.alias"
                                            :label="item.alias"
                                            :value="item.alias"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                                    <el-form-item label="字段名称" style=" text-align: left">
                                        <el-input v-model="domain.name">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col 
                                    v-for="condition in domain.condition"
                                    :key ="condition.alias"
                                    :prop="condition.alias"
                                    :label="condition.alias"
                                    :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                                    <el-form-item
                                        class="condition-input" 
                                        :label="condition.alias"
                                        style=" text-align: left"
                                    >   
                                        <!-- input 输入框 -->
                                        <el-input v-model="condition.value" v-if="condition.front_type=='input'" ></el-input>
                                        <!-- 0/1 下拉框选择 -->
                                        <el-select v-model="condition.value" placeholder="请选择是与否" v-if="condition.front_type=='bool'" >
                                            <el-option
                                                v-for="(item,index) in ['true','false']"
                                                :key="index"
                                                :label="item"
                                                :value="index"
                                            >
                                            </el-option>
                                        </el-select>    
                                        <!-- 枚举下拉选择框 -->
                                        <el-select v-model="condition.value" placeholder="请选择字段类型" v-if="condition.front_type=='select'" >
                                            <el-option
                                                v-for="item in condition.select_options"
                                                :key="item"
                                                :label="item"
                                                :value="item"
                                            >
                                            </el-option>
                                        </el-select>                                            
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                        
                    
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                        <div class="grid-content bg-purple-light">
                            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-main>
    <el-footer>
        <!-- <el-input v-model="dataCount" ></el-input> -->
        <el-divider></el-divider>
        <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            生成的数据条数：
            <el-input v-model="dataCount" style="width:10%;margin-right:10px"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="initInfo">生成数据</el-button>
            <!-- <el-button type="primary">下载数据<i class="el-icon-upload el-icon--right"></i></el-button> -->
            <el-button @click="addDomain">新增</el-button>
        
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <span style="text-align:right;">生成数据进度➡️➡️</span>
            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="progress_percent" status="success" class="progress"></el-progress>
            </el-col>
        </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">全部重置</el-button> -->
    </el-footer>
  </el-container>
</el-container>
</template>
<style >

.progress{
    margin-top: 18px;

}
.condition-input .el-form-item__label{
    width: 80px !important;
    text-align: right !important;
}
.condition-input .el-form-item__content{
    margin-left: 80px !important;
}

  .el-header{
    background-color:#f0f9eb;
    /* color: #333; */
    /* text-align: center; */
    /* line-height: 60px; */
  }
  .el-footer {
    /* background-color: #B3C0D1;
    color: #333; */
    /* text-align: center; */
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<script>
export default {
    name: "dataFaker",
    data() {
        return {
            formLabelWidth:"120px",
            downForm:{
                down_code:""
            },
            dataCount:100, //生成数据条数
            dynamicValidateForm: {
                items: [{
                    id:"",
                    alias:"",
                    type:"",
                    name:"",
                    condition:[
                        
                    ]
                }],
            },
            // 下拉选择框
            options:[
                {
                    "type":"int",
                    "alias":"整形",
                    "name":"整形字段1",
                    "generator":"IntGenerator",
                    "condition":[
                        {   
                            "front_type":"input",
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        }, 
                        {
                            "front_type":"input",
                            "type":"max",
                            "value":null,
                            "alias":"最大值"
                        },
                        {
                            "front_type":"bool",
                            "type":"only_positive",
                            "value":null,
                            "alias":"只为正值"
                        },
                        {
                            "front_type":"bool",
                            "type":"only_negative",
                            "value":null,
                            "alias":"只为负值"
                        }]
                },
                {
                    "type":"mail",
                    "alias":"邮箱",
                    "name":"邮箱字段1",
                    "generator":"MailGenerator",
                            "condition":[]
                },
                {
                    "type":"IP4",
                    "alias":"IP4",
                    "name":"IP4字段1",
                    "generator":"IP4Generator",
                    "condition":[]
                },
                {
                    "type":"IP6",
                    "alias":"IP6",
                    "name":"IP6字段1",
                    "generator":"IP6Generator",
                    "condition":[]
                },
                {
                    "type":"address",
                    "alias":"地址",
                    "name":"地址字段1",
                    "generator":"AddressGenerator",
                    "condition":[]
                },
                {
                    "type":"age",
                    "alias":"年龄",
                    "generator":"AgeGenerator",
                    "condition":[
                        {
                            "front_type":"input",
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        }, 
                        {
                            "front_type":"input",
                            "type":"max",
                            "value":null,
                            "alias":"最大值"
                        }
                    ] 
                },
                {
                    "type":"gender",
                    "name":"性别字段1",
                    "generator":"GenderGenerator",
                    "condition":[],
                    "alias":"性别"
                },
                {   
                    "type":"phone",
                    "alias":"电话",
                    "name":"电话字段1",
                    "generator":"PhoneNumberGenerator",
                    "condition":[
                        {
                            "front_type":"select",
                            "select_options":[],
                            "type":"region",
                            "value":null,
                            "alias":"区号"
                        }
                    ]
                },
                {
                    "type":"telephone",
                    "name":"手机电话字段1",
                    "generator":"TelePhoneGenerator",
                    "alias":"手机电话号码",
                    "condition":[]
                },
                {
                    "location":"location",
                    "name":"所在地字段1",
                    "generator":"LocationGenerator",
                    "alias":"所在地",
                    "condition":[{
                            "front_type":"select",
                            "select_options":[],
                            "type":"options",
                            "value":null,
                            "alias":"枚举值"
                        
                    }]
                },
                {   
                    "type":"pay",
                    "name":"金额字段1",
                    "generator":"PayGenerator",
                    "alias":"金额",
                    "condition":[
                        {
                            "front_type":"input",
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        },
                        {
                            "front_type":"input",
                            "type":"max",
                            "value":null,
                            "alias":"最大值"
                        },
                        {
                            "front_type":"input",
                            "type":"precision",
                            "value":null,
                            "alias":"精度"
                        }
                    ]
                }
            ],
            temp:{ //用于存放暂时选择的字段类型
                type:null,
                // condition:null,
            },
            key:"Test", //POST请求后得到的KEY
            ws_conn:null,
            progress_percent:0,
            state:{
                loading:false,
                loadingText:"正在获取文件下载码",
                is_generating:false //是否正在生成数据
            }
    }
    },
    created(){
        if(window.screen.availWidth<768){
        //移动端
            this.$message({
                message: '检测到当年使用的设备为移动端.由于没有时间和精力去做样式适配,可能会影响体验,请在PC端使用!',
                type: 'error'
            });
        return
        }else{

        }
        // this.initInfo()

    },
    methods: {
        build_conn(){
            let that = this
            this.ws_conn = new WebSocket(`ws://127.0.0.1:8000/ws/dataFaker/${this.key}`)
            this.ws_conn.onmessage = function(event) {
                console.log("get message from ws server >>>",event.data);
                that.handleWsData(event.data)
            }
            this.ws_conn.onopen = function(event) {
                console.log("ws successfully connect to server")
                const payload = {
                    "type":1,
                    "record_key":that.key
                }
                console.log(">>> ws send message",payload)
                that.ws_conn.send(JSON.stringify(payload))
            }
            this.ws_conn.onerror = function(event){
                that.state.is_generating=false
                console.log("ws on error",event)
                console.log("an error raise an in ws")
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                alert('submit!');
                } else {
                console.log('error submit!!');
                return false;
                }
        });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.items.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.items.splice(index, 1)
            }
        },
        addDomain() {
            this.dynamicValidateForm.items.push({
                    id:"",
                    alias:"",
                    type:"",
                    name:"",
                    generator:"",
                    condition:[
                        
                    ]
                });
        },
        selectItem(domain){
            let condition = this.getConditionByAlias(domain)
            domain.condition = this.deepClone(condition);  
            domain.generator = this.getGeneratorByAlias(domain)
            console.log(">>>>>>>>>select item,generate and add condition",this.dynamicValidateForm)
        },
        deepClone(obj){ 
            //深拷贝
            let objClone =  Array.isArray(obj) ? [] : {};
            if (obj && typeof obj === 'object') {
            for(let key in obj){
                if (obj[key] && typeof obj[key] === 'object'){
                    objClone[key] = this.deepClone(obj[key]);
                }else{
                    objClone[key] = obj[key]
                }
            }
            }
            return objClone;
        },
        getConditionByAlias(domain){
            let res =[]
            this.options.forEach(element => {
                if (element.alias==domain.alias){
                    console.log(">>get condition",element.condition)
                    // domain.condition = domain.condition.concat(element.condition)
                    res = element.condition
                }
            });
            return res
        },
        getGeneratorByAlias(domain){
            let res = null
            this.options.forEach(element => {
                if (element.alias==domain.alias){
                    console.log(">>get generator",element.generator)
                    // domain.condition = domain.condition.concat(element.condition)
                    res = element.generator
                }
            });
            return res
        },
        getFileInfoByDownCode(){
            if(this.downForm.down_code.length==6){
                let that = this
                this.$get("/api/v1/dataFaker/search/"+this.downForm.down_code)
                    .then(function (res) {
                    console.log(res,"GET FAKER FILE INFO BY DOWN CODE",res);
                    if (res.data.length == 1){
                        // console.log(document.querySelector(".downFile"))
                        document.querySelector(".downFile").textContent = `${res.data[0].record_key}.csv`
                        document.querySelector(".expire-time").textContent = that.compute(res.data[0].timedelta)+ "  后过期"
                        // that.downForm.down_fileName = `res.data[0].file_name`
                        }
                    })
                    .catch(function (error) {
                    console.log(">>>",error)
                    });
                } else{
                document.querySelector(".downFile").textContent = ""
                document.querySelector(".expire-time").textContent=""
                // this.downForm.down_fileName = ""
                }
        },
        initInfo(){
            if (this.state.is_generating){
                this.$message({
                message: '当前有数据生在生成,请耐心等待其生成完成!',
                type: 'error'
                });
                return
            }
            let that = this
            const data = {
                "fields":this.dynamicValidateForm.items,
                "count":this.dataCount
            }  
            this.$post("/api/v1/dataFaker",data)
            .then(function (res) {
                //  {
                // "key": "879baf8bbdee4f06adbc7c3cbb9581c9",
                // "is_exist": false
                // }
                console.log(res,"GET FILE UPLOAD INFO");
                if (res.is_exist){
                    console.log(">>> is already exist!" ,res)
                }else{
                    that.key = res.key    
                    that.build_conn() 
                    that.startGenerateFakeData()
                }
            })
            .catch(function (error) {
                console.log(">>> init data faker info error",error)
            });
        },
        startGenerateFakeData(){
            const payload = {
                "type":1,
                "record_key":this.key
            }
            console.log(">>> ws send message",payload)
            this.ws_conn.send(JSON.stringify(payload))
        },
        downFile(){
            if( this.downForm.down_code==""||this.downForm.down_code==null || this.downForm.down_code.length!=6){
            this.$message({
                message: '授权码非法',
                type: 'error'
            });
            return
            }
            let that = this
            const downCode = this.downForm.down_code
            const el = document.createElement('a');
            el.style.display = 'none';
            el.setAttribute('target', '_blank');
        /**
             * download的属性是HTML5新增的属性
             * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
             * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
             * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
             */  
            that.downForm.down_fileName && el.setAttribute('download', that.downForm.down_fileName);
            el.href =`${process.env.VUE_APP_API_URL}/api/v1/dataFaker?download_code=${downCode}`;
            console.log(el);
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
        },
        handleWsData(data){
                // start = 1
                // stop = 2
                // progress = 3
                // finish = 4
                // error = 5
            const _data = JSON.parse(data)
            switch (_data.type) {
                case 3:
                    { 
                        this.progress_percent = _data.data.progress
                        this.state.is_generating = true
                        break
                    };
                case 4:
                    {   
                        this.state.is_generating = false
                        this.downForm.down_code = _data.download_code
                        this.getFileInfoByDownCode()
                        break
                    };
                default:
                    break;
            }
        },
        compute(timestamps){
            var secondTime = parseInt(timestamps);// 秒
            var minuteTime = 0;// 分
            var hourTime = 0;// 小时
            if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
                //获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                //获取秒数，秒数取佘，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                //如果分钟大于60，将分钟转换成小时
                if(minuteTime > 60) {
                    //获取小时，获取分钟除以60，得到整数小时
                    hourTime = parseInt(minuteTime / 60);
                    //获取小时后取佘的分，获取分钟除以60取佘的分
                    minuteTime = parseInt(minuteTime % 60);
                }
            }
            var time = "" + parseInt(secondTime) + "秒";
            if(minuteTime > 0) {
            time = "" + parseInt(minuteTime) + "分" + time;
            }
            if(hourTime > 0) {
            time = "" + parseInt(hourTime) + "小时" + time;
            }
            return time;
        },
        
    },
    watch:{
        
    }
}
</script>