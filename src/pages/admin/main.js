import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/utils/httpmanager'

import {
    Pagination,
    Input,
    InputNumber,
    Button,
    Table,
    TableColumn,
    Tag,
    Form,
    FormItem,
    Icon,
    Menu,
    CheckboxGroup,
    CheckboxButton,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Row,
    Col,
    Upload,
    Container,
    Header,
    Aside,
    DatePicker,
    Main,
    Footer,
    Image,
    Avatar,
    Popover,
    Loading,
    Link,
    Alert,
    Scrollbar,
    Radio,
    Divider,
    Drawer,
    Message,
    Dialog,
    Select,
    Option,
    Switch,
    scrollbar,
    Notification
} from 'element-ui';
Vue.use(Pagination);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Link);
Vue.use(Alert);
Vue.use(Scrollbar);
Vue.use(Radio);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(scrollbar);
Vue.use(Container);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Avatar);
Vue.use(Popover);
Vue.use(Loading.directive);
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// Vue.use(ElementUI);
Vue.prototype.$get = http.get;
Vue.prototype.$post = http.post;
Vue.config.productionTip = false
http.defaults.baseURL = process.env.VUE_APP_URL;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')