<template>
    <div v-loading="loading">
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
            label="分类"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.classty}}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="标题"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
            </el-table-column>
             <el-table-column
            label="标签"
            >
            <template slot-scope="scope">
                <el-tag type="success" closable @close="deleteLabel(item.id)"  v-for="item of scope.row.label" :key='item.id'>{{item.label}}</el-tag>
            </template>
            </el-table-column>

             <el-table-column
            label="浏览量"
           >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.click }}</span>
            </template>
            </el-table-column>

             <el-table-column
            label="喜欢量"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.like }}</span>
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
            label="是否下架"
           >
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.deleted_at"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="setDelete(scope.row.id)">
                </el-switch>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">修改</el-button>
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
    name:'ARticleList',
    data(){
        return {
            list:[],
            value: true,
            loading:true,
            page:1,
            current_page:1,
            last_page:1
        }
    },
    methods: {
        handleEdit(index, row) {
        console.log(index, row);
        },
        handleDelete(index, row) {
        console.log(index, row);
        },
        setDelete(id){
            console.log(id)
            let that=this
            that.$post('/apis/admin/article/remove?id='+id)
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
        deleteLabel(item){
            // this.dynamicTags.splice(this.dynamicTags.indexOf(item), 1);
            console.log(item)
        },
        change(page){
            console.log(page)
            this.page=page
            this.getArticleList()
        },
        handleEdit(id){
            this.$router.push({path:'/home/articles/update/'+id})
        },
        getArticleList(){
            let that=this
            that.loading=true
            that.$post('/apis/admin/blog/list?page='+that.page)
            .then(function(res){
                console.log(res)
                that.list=res.data.data
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
        }
    },
    mounted(){
        this.getArticleList()
    }
}
</script>
<style lang="stylus" scoped>

</style>