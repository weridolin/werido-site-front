import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// axios
import http from '@/utils/httpindex'
import axios from 'axios'
// 阿里巴巴字体图标
import '@/assets/iconfont/iconfont.css'

//引入nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
import VueDOMPurifyHTML from 'vue-dompurify-html'
import Vuetify from "vuetify"
import vuetify from "@/plugins/vuetify"
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'

Vue.prototype.$echarts = echarts
import {
    Pagination,
    Input,
    Autocomplete,
    Button,
    Form,
    FormItem,
    Divider,
    Icon,
    Row,
    Col,
    Tabs,
    TabPane,
    Image,
    Avatar,
    Popover,
    Loading,
    Message,
    Backtop,
    Carousel,
    CarouselItem,
    scrollbar,
    Popconfirm,
    Notification,
    Dialog,
    Tooltip,
    Slider,
    Tag,
    Timeline,
    TimelineItem,
    Card,
    Upload,
    Progress,
    Drawer,
    Select,
    Container,
    Main,
    Footer,
    Header,
    Aside,
    Option,
    Alert
} from 'element-ui';
Vue.use(Alert)
Vue.use(Option)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Header)
Vue.use(Container)
Vue.use(Select)
Vue.use(Drawer)
Vue.use(Progress)
Vue.use(Upload);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Card);
Vue.use(Notification);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(scrollbar);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(Slider);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Image);
Vue.use(Tooltip);
Vue.use(Avatar);
Vue.use(Popover);
Vue.use(Backtop);
Vue.use(Dialog);
Vue.use(Popconfirm);
Vue.use(Loading.directive);
Vue.use(VueParticles)


// 不想污染全局作用域。这种情况下，你可以通过在 原型 上定义它们使其在每个Vue实例中可用。
// Vue.prototype.$http = axios;
// $http 就在所有Vue实例中可用了，甚至在实例被创建之前就可以用。
// 比如：new Vue({
//     beforeCreate: function() {
//         console.log(this.$http)
//     }
//      });
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(VueDOMPurifyHTML)
    //在main.js定义自定义指令 这里是一个全局指令
    // 指令钩子函数会被传入以下参数：
    // el：指令所绑定的元素，可以用来直接操作 DOM。
    // binding：一个对象，包含以下 property：
    //     name：指令名，不包括 v- 前缀。
    //     value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    //     oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    //     expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    //     arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    //     modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    // vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
    //这里应该是对一些内容进行高亮
Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
Vue.prototype.$get = http.get;
Vue.prototype.$post = http.post;
Vue.prototype.$http = http;
Vue.prototype.$axios = axios;

//process 其实是veu.config.js配置过的变量的储存，就是上下文
Vue.prototype.$partyLogin = process.env.VUE_APP_API_URL;
http.defaults.baseURL = process.env.VUE_APP_URL;

Vue.config.productionTip = false
    // 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

//    to：进入到哪个路由去
//     from：从哪个路由离开
//     next：路由的控制参数，常用的有next(true)和next(false)
router.beforeEach((to, from, next) => {
    console.info("now path:",from ,"to path:",to,to.meta)
    NProgress.start()
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
    const route = document.getElementsByClassName('route-content')[0]
    if (route) {
        route.classList.remove('route-filter')
    }
})

router.afterEach(() => {
        NProgress.done()
    })

//创建一个VUE实例 其中h是createElement的一个别名 APP对应引入的APP.VUE
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
