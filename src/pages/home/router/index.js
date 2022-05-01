import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Login = () =>
    import ('../views/Login.vue')
const Sign = () =>
    import ('../views/Sign.vue')
const Forget = () =>
    import ('../views/Forget.vue')
const Link = () =>
    import ('../views/Link.vue')
const Message = () =>
    import ('../views/Message.vue')
const GrowthRoute = () =>
    import ('../views/GrowthRoute.vue')

const BlogContent = () =>
    import ('../views/BlogContent.vue')
const Index = () =>
    import ('../views/Index.vue')
const NewHome = () =>
    import ('./../views/NewHome.vue')
const Windmill = () =>
    import ('./../components/Windmill.vue')
const User = () =>
    import ('../views/User/User.vue')
const Drug =()=>
    import ('../views/Drug.vue')
const fileBroker =()=>
    import ('../views/fileBroker.vue')
const dataFaker =()=>
    import ('../views/dataFaker.vue')
const alinLab=()=>
    import ('../views/alinlab.vue')

Vue.use(VueRouter)
const name = "werido"
const nav = {
    navNoQuiet: {
        boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    },
    navQuiet: {
        color: '#fff'
    }
}
const nav1 = {
    navNoQuiet: {
        boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    },
    navQuiet: {
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    }
}
const routes = [{
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '首页-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    },
    {
        // 会匹配所有路径
        path: '*',
        name: 'Windmill',
        component: Windmill,
        meta: {
            title: '哎呀页面不见了-' + name
        }
    },
    {
        path: '/blog',
        name: 'NewHome',
        component: NewHome,
        meta: {
            keepAlive: true, // 需要被缓存
            title: '文章-' + name,
            nav: nav1,
            footer:false,
            header:true
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogContent',
        component: BlogContent,
        meta: {
            nav: nav1,
            footer:false,
            header:true
        }
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login,
    //     meta: {
    //         title: '登录-' + name,
    //         nav: nav1
    //     }
    // },
    // {
    //     path: '/sign',
    //     name: 'Sign',
    //     component: Sign,
    //     meta: {
    //         title: '注册-' + name,
    //         nav: nav1
    //     }
    // }, ,
    // {
    //     path: '/forget',
    //     name: 'Forget',
    //     component: Forget,
    //     meta: {
    //         title: '找回密码-' + name,
    //         nav: nav1
    //     }
    // },

    {
        path: '/link',
        name: 'Link',
        component: Link,
        meta: {
            keepAlive: true, // 需要被缓存
            title: '友情链接-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    },
    {
        path: '/fileBroker',
        name: 'fileBroker',
        component: fileBroker,
        meta: {
            title: '文件慢传',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/alinLab',
        name: 'alinLab',
        component: alinLab,
        meta: {
            title: 'alin-lab',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/dataFaker',
        name: 'dataFaker',
        component: dataFaker,
        meta: {
            title: '数据生成器',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/drug',
        name: 'Drug',
        component: Drug,
        meta: {
            keepAlive: true, // 需要被缓存
            title: '毒',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/message',
        name: 'Message',
        component: Message,
        meta: {
            // keepAlive: true, // 需要被缓存
            title: '留言区-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    },
    {
        path: '/route',
        name: 'GrowthRoute',
        component: GrowthRoute,
        meta: {
            keepAlive: true, // 需要被缓存
            title: '成长路线-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    }, 
    // {
    //     path: '/user/:id',
    //     name: 'User',
    //     component: User,
    //     meta: {
    //         nav: nav1
    //     }
    // }

]
const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // if (to.hash) {
        //     return {
        //         selector: to.hash
        //     }
        // }
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
