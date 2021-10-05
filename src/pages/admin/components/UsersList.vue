<template>
    <div  v-loading="loading">
        <el-table v-if="list"
            :data="list"
            style="width: 100%">
            <el-table-column
            label="ID"
           >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="用户名"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name}}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="email"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.email }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="手机号"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
            </el-table-column>
             <el-table-column
            label="个人介绍"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.intro }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="创建日期"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="冻结用户"
           >
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.deleted_at"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="setDelete(scope.row.id)">
                    <span>{{typeof(scope.row.deleted_at)=='string' ? true:false}}</span>
                </el-switch>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="list"
            background
            layout="prev, pager, next"
            :page-size="last_page"
            :page-count="last_page"
            :current-page="current_page"
            @current-change="change"
            style="display: flex;justify-content: center;margin-bottom:10px"
            >
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:'UsersList',
    data(){
        return {
            list:[],
            loading:true,
            page:1,
            current_page:1,
            last_page:100
        }
    },
    methods: {
        setDelete(id){
            console.log(id)
            let that=this
            that.$post('/apis/admin/user/remove?id='+id)
            .then(function(res){
                console.log(res)
                that.$message({
                        message:res.message,
                        type: 'success'
                });
            })
            .catch(function(error){

            })
            
        },
        change(page){
            console.log(page)
            this.page=page
            this.getArticleList()
        },
        getArticleList(){
            let that=this
            that.loading=true
            that.$post('/apis/admin/user/list?page='+that.page)
            .then(function(res){
                console.log(res)
                that.list=res.data.data
                that.setListForm()
                that.loading=false
                that.last_page=res.data.last_page
                that.current_page=res.data.current_page
                that.$message({
                        message:'获取成功',
                        type: 'success'
                });
            })
            .catch(function(error){

            })
        },
        // 格式化list deleted_at数据 
        setListForm(){
            this.list.forEach(element => {
                if(typeof(element.deleted_at)=='string'){
                    element.deleted_at=0
                }else{
                    element.deleted_at=1
                }
            });
        }
    },
    mounted(){
        this.getArticleList()
    }
}
</script>
<style lang="stylus" scoped>

</style>