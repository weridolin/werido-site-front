<template>
<el-container>
  <el-aside >Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
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
                                    <el-select v-model="domain.alias" placeholder="请选择字段类型" @change="selectItem">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.alias"
                                            :label="item.alias"
                                            :value="item.alias"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col 
                                    
                                    v-for="condition in getConditionByAlias(domain.alias)"
                                    :key ="condition.alias"
                                    :prop="condition.alias"
                                    :label="condition.alias"
                                    :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                                    <el-form-item
                                        class="condition-input" 
                                        :label="condition.alias"
                                        style=" text-align: left"
                                        
                                    >

                                    <el-input 
                                        v-model="condition.value" >
                                    </el-input>
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
            <!-- </el-form-item> -->

            <!-- <el-form-item> -->
                <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增域名</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
    </el-main>
    <el-footer>
        <el-button type="primary" icon="el-icon-search">生成数据</el-button>
        <el-button type="primary">下载数据<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button @click="addDomain">新增</el-button>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">全部重置</el-button>
    </el-footer>
  </el-container>
</el-container>
</template>
<style >

.condition-input .el-form-item__label{
    width: 80px !important;
    text-align: right !important;
}
.condition-input .el-form-item__content{
    margin-left: 80px !important;
}

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
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
            dynamicValidateForm: {
                items: [{
                    id:"",
                    alias:"",
                    type:"",
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
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        }, 
                        {
                            "type":"max",
                            "value":null,
                            "alias":"最大值"
                        },
                        {
                            "type":"only_positive",
                            "value":null,
                            "alias":"只为正值"
                        },
                        {
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
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        }, 
                        {
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
                            "type":"min",
                            "value":null,
                            "alias":"最小值"
                        },
                        {
                            "type":"max",
                            "value":null,
                            "alias":"最大值"
                        },
                        {
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
                    condition:[
                        
                    ]
                });
        },
        selectItem(type){
            console.log(">>>>>>>>>select item",type,this.dynamicValidateForm)
        },
        getConditionByAlias(alias){
            let res =[]
            this.options.forEach(element => {
                if (element.alias==alias){
                    console.log(">>get condition",element.condition)
                    res = element.condition
                }
            });
            return res
        }
        
    },
    watch:{
    }
}
</script>