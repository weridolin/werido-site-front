(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-263c0ac3"],{"21d4":function(e,s,t){"use strict";t.r(s);var a={name:"Message",components:{MessCard:t("764a").a},data:function(){return{list:[],loading:!1,car:{pattern:!0,left:!0},current_page:1,last_page:1}},methods:{getMessList:function(e){this.current_page=e||1,this.loading=!0;var s=this;s.$get("/apis/message/list?id=-1&page="+s.current_page).then((function(e){s.list=e.data.data,s.last_page=e.data.last_page,s.current_page=e.data.current_page,s.loading=!1})).catch((function(e){s.loading=!1}))}},created:function(){this.getMessList()}},r=(t("a54c"),t("2877")),i=Object(r.a)(a,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"mess"},[e.list.length>0?t("mess-card",{attrs:{list:e.list,car:e.car},on:{submit:e.getMessList}}):t("img",{staticClass:"empty",attrs:{src:"https://iconfont.alicdn.com/s/59c83208-cad4-4477-951e-a2e36ee13b72.svg"}}),e.list.length>0?t("el-pagination",{staticStyle:{width:"100%",display:"flex","justify-content":"center","margin-bottom":"10px","flex-wrap":"wrap"},attrs:{background:!0,layout:"prev, pager, next","page-count":e.last_page,"current-page":e.current_page},on:{"current-change":e.getMessList}}):e._e()],1)}),[],!1,null,"3e286592",null);s.default=i.exports},"528e":function(e,s,t){},"764a":function(e,s,t){"use strict";t("99af"),t("c975"),t("ac1f"),t("5319"),t("1276");var a=t("993f"),r=t("3898"),i={name:"MessCard",props:{car:{pattern:Boolean,left:Boolean},list:{}},components:{NewComment:a.a,MyMarked:r.a},data:function(){return{open:!1,flicker:0,pattern:"mess",id:0,reply_id:0,url:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3656238279,115253853&fm=26&gp=0.jpg",boo:!1,FormData:{mess_id:"",reply:""}}},computed:{userInfo:function(){return this.$store.state.user.user}},methods:{roll:function(e){this.flicker=e,e="#reply"+e,document.querySelector(e).scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})},formatReply:function(e){var s=e.split("-");return s[0]+'<span style="margin: 0 2px;">•</span>'+s[1]},emotion:function(e){var s=e.replace(/\#|\;/gi,""),t=["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"].indexOf(s);return"![](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/".concat(t,".gif)")},reply:function(e){this.reply_id=0,this.id==e&&"mess"==this.pattern?this.id=0:(this.id=e,this.pattern="mess")},replyMess:function(e,s,t){this.reply_id==e?(this.reply_id=0,this.mess_reply_id=0):(this.pattern="reply",this.id=s,this.reply_id=e,name,this.mess_reply_id=t)},submit:function(e){this.reply_id?this.FormData.mess_reply_id=this.reply_id:delete this.FormData.mess_reply_id,this.FormData.reply=e.content,this.FormData.mess_id=this.id,this.FormData.ip=e.ip,this.FormData.address=e.address;var s=this;this.$post("/apis/user/reply/add",this.FormData).then((function(e){s.$emit("submit"),s.$message({showClose:!0,message:e.message,type:"success"})})).catch((function(e){}))},dele:function(e,s){var t=this;this.$post("/apis/user/"+s+"/remove",{id:e}).then((function(e){t.$emit("submit"),t.$message({showClose:!0,message:e.message,type:"success"})})).catch((function(e){}))},setColor:function(){var e=parseInt(256*Math.random()),s=parseInt(256*Math.random()),t=parseInt(256*Math.random());return"rgba(".concat(e,",").concat(s,",").concat(t,",0.3)")},getDateDiff:function(e){var s=(new Date).getTime(),t=s/1e3-e;if(!(t<0)){var a=t/2592e3,r=t/604800,i=t/86400,n=t/3600,o=t/60;return a>=1?parseInt(a)+"月前":r>=1?parseInt(r)+"周前":i>=1?parseInt(i)+"天前":n>=1?parseInt(n)+"小时前":o>=1?parseInt(o)+"分钟前":"刚刚"}}}},n=(t("fc94"),t("2877")),o=Object(n.a)(i,(function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("ul",{staticStyle:{padding:"0"}},e._l(e.list,(function(s,a){return t("li",{key:s.id,staticClass:"mess-item",class:e.car.left?"mess-item-left":"mess-item-right",style:{"animation-duration":(a+1)%10*100+200+"ms"}},[t("div",{staticClass:"mess-info",class:e.car.left?"mess-info-left":"mess-info-right"},[e.userInfo.id==s.user_id&&e.userInfo.id>0||1==e.userInfo.is_admin?t("el-popconfirm",{attrs:{title:"这条留言确认删除吗？"},on:{onConfirm:function(t){return e.dele(s.id,"message")}}},[t("a",{staticClass:"dele-mess el-icon-delete",attrs:{slot:"reference",href:"javascript:;"},slot:"reference"})]):e._e(),t("div",{staticClass:"mess-header",class:{"mess-header-dis":!e.car.pattern}},[t("div",{staticClass:"header-left a-tag"},[t("div"),t("el-avatar",{staticClass:"user-img",attrs:{shape:"square",src:s.user?s.user.avatar_url:s.qq?"http://q1.qlogo.cn/g?b=qq&nk="+s.qq+"&s=100":""}},[t("div",{style:"background-image: linear-gradient(270deg,"+e.setColor()+","+e.setColor()+")"},[e._v(" "+e._s(s.user?s.user.username:s.tourist)+" ")])]),e.car.pattern?t("div",{staticClass:"header-right"},[t("a",{staticClass:"el-icon-chat-line-round mess-name",attrs:{href:"javascript:;"}},[e._v(" "+e._s(s.user?s.user.username:s.tourist)+" ")]),t("span",{directives:[{name:"show",rawName:"v-show",value:null!=s.user&&1==s.user.is_admin,expression:"item.user!=null&&item.user.is_admin==1"}],staticClass:"bolg-admin el-icon-sunny"},[e._v("博主 ")]),t("p",{staticClass:"time"},[e._v(e._s(e.getDateDiff(s.createdTimestamps))),s.address?t("span",[e._v("—"),t("span",{domProps:{innerHTML:e._s(e.formatReply(s.address))}})]):e._e()])]):e._e(),e.car.pattern?t("a",{staticClass:"header-reply",attrs:{href:"javascript:;"},on:{click:function(t){return e.reply(s.id)}}},[e._v(" "+e._s(s.id==e.id&&"mess"==e.pattern?"取消":"回复")+" ")]):e._e()],1)]),t("div",{staticClass:"mess-body"},[t("my-marked",{attrs:{initialValue:s.body.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi,e.emotion),copyCode:!1,imgView:!1}})],1),t("transition",{attrs:{name:"down"}},[s.id==e.id&&"mess"==e.pattern?t("div",{staticClass:"mess-add"},[e.car.pattern?t("new-comment",{on:{submit:e.submit}}):e._e()],1):e._e()]),t("div",{directives:[{name:"show",rawName:"v-show",value:s.replays,expression:"item.replays"}],staticClass:"mess-footer"},e._l(s.replays,(function(a){return t("div",{key:"reply"+a.id,staticClass:"mess-info mess-reply",class:e.flicker==a.id?"flicker":"",attrs:{id:"reply"+a.id}},[e.userInfo.id==a.user.id&&e.userInfo.id>0||1==e.userInfo.is_admin?t("el-popconfirm",{attrs:{title:"这条留言确认删除吗？"},on:{onConfirm:function(s){return e.dele(a.user.id,"reply")}}},[t("a",{staticClass:"dele-reply el-icon-delete",attrs:{slot:"reference",href:"javascript:;"},slot:"reference"})]):e._e(),t("div",{staticClass:"mess-header"},[t("div",{staticClass:"header-left a-tag"},[t("el-avatar",{staticClass:"user-img",attrs:{src:a.user.avatar_url,shape:"square"}},[t("div",{style:"background-image: linear-gradient(270deg,"+e.setColor()+","+e.setColor()+")"},[e._v(e._s(a.name)+" ")])]),t("div",{staticClass:"header-right"},[t("a",{staticClass:"el-icon-sugar mess-name",attrs:{href:"javascript:;"}},[e._v(e._s(a.name)+" ")]),e._v(" 回复 "),t("a",{staticClass:"el-icon-sugar mess-name",attrs:{href:"javascript:;"}},[e._v(e._s(a.reply_to_name))]),t("span",{directives:[{name:"show",rawName:"v-show",value:null!=a.user&&1==a.user.is_admin,expression:"reply.user!=null&&reply.user.is_admin==1"}],staticClass:"bolg-admin el-icon-sunny"},[e._v("博主")]),t("p",[e._v(e._s(e.getDateDiff(a.createdTimestamps))),a.address?t("span",[e._v("—"),t("span",{domProps:{innerHTML:e._s(a.address)}})]):e._e()])]),e.car.pattern?t("a",{staticClass:"header-reply-mess",attrs:{href:"javascript:;"},on:{click:function(t){return e.replyMess(a.user.id,s.id)}}},[e._v(" "+e._s((a.user.id,a.user.id,"回复"))+" ")]):e._e()],1)])],1)})),0)],1)])})),0)}),[],!1,null,"274e8ca2",null);s.a=o.exports},a54c:function(e,s,t){"use strict";var a=t("528e");t.n(a).a},ebbc:function(e,s,t){},fc94:function(e,s,t){"use strict";var a=t("ebbc");t.n(a).a}}]);