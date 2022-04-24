<template>
<el-container>
  <el-aside >
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
                    <!-- <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="4">
                        <div class="grid-content bg-purple">
                            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                        </div>
                    </el-col> -->
                    <!-- <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="4"><div class="grid-content bg-purple-light"></div></el-col> -->
                </el-row>
            </el-form-item>
        </el-form>
    </el-main>
    <el-footer>
        <!-- <el-input v-model="dataCount" ></el-input> -->
        <el-divider></el-divider>
        <el-row>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="8">
            生成的数据条数：
            <el-input v-model="dataCount" style="width:10%;margin-right:10px"></el-input>
            <el-button type="primary" icon="el-icon-search">生成数据</el-button>
            <el-button type="primary">下载数据<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-button @click="addDomain">新增</el-button>
        
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="16">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div style="text-align:center;">生成数据进度>>></div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="20">
                <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success" class="progress"></el-progress>
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
    margin-top: 20px;

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
            dataCount:0, //生成数据条数
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
                            "condition":[]
                },
                {
                    "type":"IP4",
                    "alias":"IP4",
                    "condition":[]
                },
                {
                    "type":"IP6",
                    "alias":"IP6",
                    "condition":[]
                },
                {
                    "type":"address",
                    "alias":"地址",
                    "condition":[]
                },
                {
                    "type":"age",
                    "alias":"年龄",
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
                    "condition":[],
                    "alias":"性别"
                },
                {   
                    "type":"phone",
                    "alias":"电话",
                    "condition":[
                        {
                            "front_type":"select",
                            "select_options":[111,222,333,444,555,666,777,888,999],
                            "type":"region",
                            "value":null,
                            "alias":"区号"
                        }
                    ]
                },
                {
                    "type":"telephone",
                    "alias":"手机电话号码",
                    "condition":[]
                },
                {
                    "location":"location",
                    "alias":"所在地",
                    "condition":[{
                            "front_type":"select",
                            "select_options":[1,2,3,4,5,6,7],
                            "type":"options",
                            "value":null,
                            "alias":"枚举值"
                        
                    }]
                },
                {   
                    "type":"pay",
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
            }

    }
    },
    methods: {
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
                    condition:[
                        
                    ]
                });
        },
        selectItem(domain){
            let condition = this.getConditionByAlias(domain)
            domain.condition = this.deepClone(condition);            
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
        getFileInfoByDownCode(){

        },
        downFile(){

        }
        
    },
    watch:{
        "dynamicValidateForm.items"(){
            console.log(">>>>>>>>>>>>>>>>> changeeeeeeee")
        }
    }
}
</script>