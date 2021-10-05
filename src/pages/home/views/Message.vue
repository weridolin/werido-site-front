<!--
 * @Description: 
 * @email: 359066432@qq.com
 * @Author: lhj
 * @software: vscode
 * @Date: 2021-10-02 16:28:06
 * @platform: windows 10
 * @LastEditors: lhj
 * @LastEditTime: 2021-10-05 15:50:33
-->
<template>
  <div class="messa">
    <add-message @submit="getMessList" :list="list"></add-message>
    <div class="mess-bg">
      <!--            <add-link></add-link>-->

<!--      List传给message-list组件-->
      <message-list :list="list" @submit="getMessList"></message-list>
      <p class="next">
        <span v-loading="loading" element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="#f8f8f8" @click="next">
          <i class="next-icon" :class="current_page==last_page?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          {{ current_page == last_page ? '没有更多了！快去留言吧！^o^' : '点击查看更多' }}
      </span>
      </p>
    </div>
  </div>
</template>
<script>
import AddMessage from '../components/AddMessage'
import AddLink from '../components/AddLink'
import MessageList from '../components/MessageList'

export default {
  name: 'Message',
  components: {
    AddLink,
    AddMessage,
    MessageList,
  },
  data() {
    return {
      list: [],
      current_page: 1,
      last_page: 1,
      loading: false,
      count :0
    }
  },
  methods: {
    getMessList() {
      var that = this;
      this.loading = true
      that.$get('/api/v1/home/comments?' + 'page=' + that.current_page)
          .then(function (res) {
            console.log("get site comments list",res) 
            that.list = that.list.concat(res.results)
            that.last_page = res.last_page
            // that.current_page = res.current_page
            that.loading = false
            that.count = res.count
            console.log("last page",that.last_page,"current_page",that.current_page)
          })
          .catch(function (error) {
            that.loading = false
          })
    },
    next() {
      if (this.current_page < this.last_page) {
        this.current_page++
        this.getMessList()
      }
    }
  },
  created() {
    this.getMessList()
  },
}
</script>
<style lang="stylus" scoped>
.messa
  background-color #f8f8f8
  padding-bottom: 15px

  .next
    text-align center
    color: var(--main-5)
    transition all .3s

    &:hover
      color: var(--main-6)

    span
      cursor pointer

      .next-icon
        animation: next .6s linear infinite alternate;

@keyframes next {
  0% {
    transform translateY(3px)
  }
  100% {
    transform translateY(0px)
  }
}
</style>
