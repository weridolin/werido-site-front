(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-29995c19"],{"0b94":function(t,e,s){"use strict";var i=s("ef53");s.n(i).a},"3d77":function(t,e,s){"use strict";var i=s("8af0");s.n(i).a},4293:function(t,e,s){"use strict";var i=s("cd18");s.n(i).a},5667:function(t,e,s){"use strict";var i=s("7388");s.n(i).a},7388:function(t,e,s){},"8af0":function(t,e,s){},"993f":function(t,e,s){"use strict";s("c975"),s("ac1f"),s("5319"),s("a9e3");var i={name:"ly-emotion",mounted:function(){var t=this,e=this.$el.innerHTML,s=["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"].indexOf(e),i='<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'.concat(s,'.gif">');this.$nextTick((function(){t.$el.innerHTML=i}))}},n=(s("3d77"),s("2877")),a=Object(n.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"ly-emotion"},[this._t("default")],2)}),[],!1,null,"3bffd59e",null).exports,r={name:"EmojiList",props:{height:{type:Number,default:200}},data:function(){return{list:[["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴"],["睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过"]["傲慢"],["饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂"],["疑问","嘘","晕","折磨","衰","骷髅","敲打","再见"],["擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠"],["鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀"],["西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰"],["凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀"],["足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强"],["弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你"],["NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈"],["磕头","回头","跳绳","挥手","激动","街舞","左太极","右太极"]]}},methods:{clickHandler:function(t){var e="#".concat(t,";");this.$emit("emotion",e)}},components:{Emotion:a}},o=(s("dcdc"),Object(n.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"emotion-box",style:{height:t.height+"px"}},[s("el-scrollbar",{staticStyle:{width:"100%",height:"100%"}},t._l(t.list,(function(e,i){return s("div",{key:i,staticClass:"emotion-box-line"},t._l(e,(function(e,i){return s("emotion",{key:i,staticClass:"emotion-item",nativeOn:{click:function(s){return t.clickHandler(e)}}},[t._v(t._s(e))])})),1)})),0)],1)])}),[],!1,null,"1faf5678",null).exports),l={name:"dragVerify",props:{isPassing:{type:Boolean,default:!1},width:{type:Number,default:250},height:{type:Number,default:40},text:{type:String,default:"swiping to the right side"},successText:{type:String,default:"success"},background:{type:String,default:"#eee"},progressBarBg:{type:String,default:"#76c61d"},completedBg:{type:String,default:"#76c61d"},circle:{type:Boolean,default:!1},radius:{type:String,default:"4px"},handlerIcon:{type:String},successIcon:{type:String},handlerBg:{type:String,default:"#fff"},textSize:{type:String,default:"14px"},textColor:{type:String,default:"#333"}},mounted:function(){var t=this.$refs.dragVerify;t.style.setProperty("--textColor",this.textColor),t.style.setProperty("--width",Math.floor(this.width/2)+"px"),t.style.setProperty("--pwidth",-Math.floor(this.width/2)+"px"),this.$slots},computed:{handlerStyle:function(){return{left:"0px",width:this.height+"px",height:this.height+"px",background:this.handlerBg}},message:function(){return this.isPassing?this.successText:this.text},dragVerifyStyle:function(){return{width:this.width+"px",height:this.height+"px",lineHeight:this.height+"px",background:this.background,borderRadius:this.circle?this.height/2+"px":this.radius}},progressBarStyle:function(){return{background:this.progressBarBg,height:this.height+"px",borderRadius:this.circle?this.height/2+"px 0 0 "+this.height/2+"px":this.radius}},textStyle:function(){return{height:this.height+"px",width:this.width+"px",fontSize:this.textSize}}},data:function(){return{isMoving:!1,x:0,isOk:!1}},methods:{dragStart:function(t){if(!this.isPassing){this.isMoving=!0;var e=this.$refs.handler;this.x=(t.pageX||t.touches[0].pageX)-parseInt(e.style.left.replace("px",""),10)}this.$emit("handlerMove")},dragMoving:function(t){if(this.isMoving&&!this.isPassing){var e=(t.pageX||t.touches[0].pageX)-this.x,s=this.$refs.handler;e>0&&e<=this.width-this.height?(s.style.left=e+"px",this.$refs.progressBar.style.width=e+this.height/2+"px"):e>this.width-this.height&&(s.style.left=this.width-this.height+"px",this.$refs.progressBar.style.width=this.width-this.height/2+"px",this.passVerify())}},dragFinish:function(t){if(this.isMoving&&!this.isPassing){if((t.pageX||t.changedTouches[0].pageX)-this.x<this.width-this.height){this.isOk=!0;var e=this;setTimeout((function(){e.$refs.handler.style.left="0",e.$refs.progressBar.style.width="0",e.isOk=!1}),500)}else this.$refs.handler.style.left=this.width-this.height+"px",this.$refs.progressBar.style.width=this.width-this.height/2+"px",this.passVerify();this.isMoving=!1}},passVerify:function(){this.$emit("update:isPassing",!0),this.isMoving=!1,this.$refs.handler.children[0].className=this.successIcon,this.$refs.progressBar.style.background=this.completedBg,this.$refs.message.style["-webkit-text-fill-color"]="unset",this.$refs.message.style.animation="slidetounlock2 3s infinite",this.$refs.message.style.color="#fff",this.$emit("passcallback")},reset:function(){var t=this.$options.data();for(var e in t)t.hasOwnProperty(e)&&this.$set(this,e,t[e]);var s=this.$refs.handler,i=this.$refs.message;s.style.left="0",this.$refs.progressBar.style.width="0",s.children[0].className=this.handlerIcon,i.style["-webkit-text-fill-color"]="transparent",i.style.animation="slidetounlock 3s infinite",i.style.color=this.background}}},c=(s("5667"),s("0b94"),Object(n.a)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"dragVerify",staticClass:"drag_verify",style:t.dragVerifyStyle,on:{mousemove:t.dragMoving,mouseup:t.dragFinish,mouseleave:t.dragFinish,touchmove:t.dragMoving,touchend:t.dragFinish}},[s("div",{ref:"progressBar",staticClass:"dv_progress_bar",class:{goFirst2:t.isOk},style:t.progressBarStyle}),s("div",{ref:"message",staticClass:"dv_text",style:t.textStyle},[t.$slots.textBefore?t._t("textBefore"):t._e(),t._v(" "+t._s(t.message)+" "),t.$slots.textAfter?t._t("textAfter"):t._e()],2),s("div",{ref:"handler",staticClass:"dv_handler dv_handler_bg",class:{goFirst:t.isOk},style:t.handlerStyle,on:{mousedown:t.dragStart,touchstart:t.dragStart}},[s("i",{class:t.handlerIcon})])])}),[],!1,null,"79dc78e3",null).exports),h=s("3898"),d={name:"NewComment",props:{cont:{type:String,default:""}},components:{EmojiList:o,dragVerify:c,MyMarked:h.a},data:function(){return{count:0,comment:{name:"",content:"",type:"",is_Valid:!0,ip:window._DEFAULT_CITY.ip,address:window._DEFAULT_CITY.province+"-"+window._DEFAULT_CITY.city,email:""},show:!1,rules:{content:[{required:!0,message:"还没填内容呢！^ω^",trigger:"blur,change"},{min:1,max:500,message:"内容3到500个字符",trigger:"blur"}],name:[{required:!0,message:"请留下名称！^ω^",trigger:"blur,change"},{min:3,max:10,message:"名称3到10 个字符",trigger:"blur"}],qq:[{required:!1,message:"请留下您的qq！^ω^",trigger:"blur,change"},{min:3,max:11,message:"qq号3到10 个字符",trigger:"blur"}]}}},computed:{isLogin:function(){return this.$store.state.user.user},isToken:function(){return this.$store.state.user.token.length>0},countCount:function(){return this.comment.content.length}},methods:{handleEmotion:function(t){this.comment.content+=t},post:function(){this.comment.is_valid=!0,this.comment.type="siteComment",this.url="/api/v1/home/comments",this.comment,this.$post(this.url,this.comment).then((function(t){})).catch((function(t){})),this.$router.go(0)},summit:function(t){var e=this;this.count<=5&&(this.count++,this.$refs[t].validate((function(t){t?(e.comment.is_Valid=!0,e.comment.type="siteComment",e.comment.type=e.isToken?"add":"tourist",e.$emit("submit",e.comment),e.comment.content=""):e.isLogin.user||(e.isUser=!0)})))},passcallback:function(){this.ispass=!0},emotion:function(t){var e=t.replace(/\#|\;/gi,""),s=["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"].indexOf(e);return"![](https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/".concat(s,".gif)")}},mounted:function(){}},m=(s("4293"),Object(n.a)(d,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"valine_comment v",attrs:{"data-class":"v"}},[s("el-form",{ref:"comment",attrs:{model:t.comment,rules:t.rules}},[s("div",{staticClass:"vpanel"},[s("div",{staticClass:"vwrap"},[t.isLogin?t._e():s("div",{staticClass:"vheader item3"},[s("el-row",[s("el-col",{attrs:{md:8,xs:8,sm:8}},[s("el-form-item",{attrs:{prop:"name"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.comment.name,expression:"comment.name"}],staticClass:"vnick vinput",attrs:{placeholder:"昵称",type:"text"},domProps:{value:t.comment.name},on:{input:function(e){e.target.composing||t.$set(t.comment,"name",e.target.value)}}})])],1),s("el-col",{staticClass:"qq",attrs:{md:8,xs:8,sm:8}},[s("el-form-item",{attrs:{prop:"qq"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.comment.qq,expression:"comment.qq"}],staticClass:"vmail vinput",attrs:{placeholder:"QQ"},domProps:{value:t.comment.qq},on:{input:function(e){e.target.composing||t.$set(t.comment,"qq",e.target.value)}}})])],1),s("el-col",{staticClass:"email",attrs:{md:8,xs:8,sm:8}},[s("el-form-item",{attrs:{prop:"email"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.comment.email,expression:"comment.email"}],staticClass:"vmail vinput",attrs:{placeholder:"邮箱Q"},domProps:{value:t.comment.email},on:{input:function(e){e.target.composing||t.$set(t.comment,"email",e.target.value)}}})])],1)],1)],1),s("div",{staticClass:"vedit",staticStyle:{positon:"relative"}},[s("el-form-item",{attrs:{prop:"content"}},[s("el-input",{staticClass:"veditor vinput",class:{content:t.isLogin},attrs:{type:"textarea",autosize:"",placeholder:"留下你宝贵的意见 @~@ 😎"},model:{value:t.comment.content,callback:function(e){t.$set(t.comment,"content",e)},expression:"comment.content"}})],1),s("div",{staticClass:"vrow"},[s("div",{staticClass:"vcol vcol-60 status-bar"}),s("div",{staticClass:"vcol vcol-40 vctrl text-right"},[s("el-popover",{staticClass:"vicon vemoji-btn",attrs:{placement:"left",width:"220",trigger:"hover"}},[s("div",{staticStyle:{"text-align":"center",margin:"0"}},[s("emoji-list",{staticStyle:{},on:{emotion:t.handleEmotion}})],1),s("svg",{attrs:{slot:"reference",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"16172",width:"22",height:"22"},slot:"reference"},[s("path",{attrs:{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z","p-id":"16173"}}),s("path",{attrs:{d:"M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z","p-id":"16174"}}),s("path",{attrs:{d:"M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z","p-id":"16175"}}),s("path",{attrs:{d:"M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z","p-id":"16176"}})])]),s("span",{staticClass:"vicon vpreview-btn",on:{click:function(e){t.show=!t.show}}},[s("svg",{class:{isshow:t.show},attrs:{slot:"reference",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"17688",width:"22",height:"22"},slot:"reference"},[s("path",{attrs:{d:"M502.390154 935.384615a29.538462 29.538462 0 1 1 0 59.076923H141.430154C79.911385 994.461538 29.538462 946.254769 29.538462 886.153846V137.846154C29.538462 77.745231 79.950769 29.538462 141.390769 29.538462h741.218462c61.44 0 111.852308 48.206769 111.852307 108.307692v300.268308a29.538462 29.538462 0 1 1-59.076923 0V137.846154c0-26.899692-23.355077-49.230769-52.775384-49.230769H141.390769c-29.420308 0-52.775385 22.331077-52.775384 49.230769v748.307692c0 26.899692 23.355077 49.230769 52.775384 49.230769h360.999385z","p-id":"17689"}}),s("path",{attrs:{d:"M196.923077 216.615385m29.538461 0l374.153847 0q29.538462 0 29.538461 29.538461l0 0q0 29.538462-29.538461 29.538462l-374.153847 0q-29.538462 0-29.538461-29.538462l0 0q0-29.538462 29.538461-29.538461Z","p-id":"17690"}}),s("path",{attrs:{d:"M649.846154 846.769231a216.615385 216.615385 0 1 0 0-433.230769 216.615385 216.615385 0 0 0 0 433.230769z m0 59.076923a275.692308 275.692308 0 1 1 0-551.384616 275.692308 275.692308 0 0 1 0 551.384616z","p-id":"17691"}}),s("path",{attrs:{d:"M807.398383 829.479768m20.886847-20.886846l0 0q20.886846-20.886846 41.773692 0l125.321079 125.321079q20.886846 20.886846 0 41.773693l0 0q-20.886846 20.886846-41.773693 0l-125.321078-125.321079q-20.886846-20.886846 0-41.773693Z","p-id":"17692"}})])])],1),s("transition",{attrs:{name:"slide-left"}},[t.show?s("div",{staticClass:"comment-header",attrs:{id:"write"}},[s("my-marked",{attrs:{imgView:!1,initialValue:t.comment.content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi,t.emotion)}})],1):t._e()])],1)],1),s("div",{staticClass:"vrow"},[s("div",{staticClass:"vcol vcol-30"},[s("a",{staticClass:"vicon",attrs:{alt:"Markdown is supported",href:"https://guides.github.com/features/mastering-markdown/",target:"_blank"}},[s("svg",{staticClass:"markdown",attrs:{viewBox:"0 0 16 16",version:"1.1",width:"16",height:"16","aria-hidden":"true"}},[s("path",{attrs:{"fill-rule":"evenodd",d:"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"}})])])]),s("div",{staticClass:"vcol vcol-70 text-right",attrs:{id:"write"}},[s("span",{staticClass:"count",class:{isCount:t.countCount>500}},[t._v(" "+t._s(t.countCount>500?"已超出":"还可以输入")+" "),s("strong",{staticClass:"count-leng"},[t._v(t._s(Math.abs(500-t.countCount)))]),t._v("字 ")]),s("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"遵守法律，文明发言",placement:"top"}},[s("button",{staticClass:"vsubmit vbtn",attrs:{type:"button",title:"Cmd|Ctrl+Enter"},on:{click:t.post}},[t._v(" 提交 ")])])],1)])])])])],1)}),[],!1,null,"5b6a21e2",null));e.a=m.exports},bece:function(t,e,s){},cd18:function(t,e,s){},dcdc:function(t,e,s){"use strict";var i=s("bece");s.n(i).a},ef53:function(t,e,s){}}]);