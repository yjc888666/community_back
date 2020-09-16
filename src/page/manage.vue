<template>
    <div style="height:100%;overflow: hidden">
        <!--头部-->
        <div class="layui-layout layui-layout-admin" style="border-bottom: solid 5px #1aa094;height:60px;">
            <div class="layui-header header header-demo">
                <div class="layui-main">
                    <div class="admin-login-box">
                        <a class="logo" style="left: 0;">
                            <span style="font-size: 30px;">wswsk</span>
                        </a>
                        <div class="admin-side-toggle" @click="side()">
                            <i class="fa fa-bars" aria-hidden="true" ></i>
                        </div>
                        <div class="admin-side-full" @click="screenfull()">
                            <i class="fa fa-life-bouy" aria-hidden="true"></i>
                        </div>
                    </div>
                    <ul class="layui-nav admin-header-item">
                        <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#fff"
                            text-color="#999"
                            active-text-color="#000">
                            <el-menu-item index="1"><a href="javascript:;" target="_blank">清除缓存</a></el-menu-item>
                            <el-menu-item index="2"><a href="http://ydbbs.yinlingfuwu.com" target="_blank">浏览首页</a></el-menu-item>
                        </el-menu>
                        <el-dropdown @command="handleCommand" menu-align='start'>
                            <img src="../assets/img/default.png">
                            <span>{{name}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="home"  @click="dialogFormVisible = true"> <i class="fa fa-user-circle" aria-hidden="true"></i> 修改密码</el-dropdown-item>
                                <el-dropdown-item command="singout"><i class="fa fa-sign-out" aria-hidden="true"></i> 注销</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </ul>
                    <ul class="layui-nav admin-header-item-mobile">
                        <li class="layui-nav-item">
                            <a class="logi_logout" href="javascript:void(0)" @click="editEvent">
                                <i class="fa fa-sign-out" aria-hidden="true"></i> 注销</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <el-dialog title="信息" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="68px" class="demo-ruleForm">
                <el-form-item label="密码" prop="oldpsd">
                    <el-input type="password"  v-model="ruleForm.oldpsd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpsd">
                    <el-input type="password" v-model="ruleForm.newpsd"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"  >取 消</el-button>
                <el-button type="primary"  @click="submitForm('ruleForm')"  v-show="chang('/bbs/master/repsd')">立即修改</el-button>
            </div>
        </el-dialog>

        <div class="manage_page">

                <div  id="admin-side"  :class="{'layui-bg-black':sideShow,'layui-bg-false':!sideShow,'layui-side':mask}">
                      <el-menu :default-active="defaultActive" style="height: 100%;overflow: auto;" theme="dark" router @select="handleSelectSide">
                        <!--<el-menu-item index="manage" :style="{'background':'#393D49'}"><i class="fa fa-sliders" aria-hidden="true" data-icon="fa-sliders"></i>已装插件</el-menu-item>-->

                          <el-submenu index="1">
                              <template slot="title"><i class="fa fa fa-home" aria-hidden="true" data-icon="fa fa-home"></i>考勤管理<span class="layui-nav-more"></span></template>
                              <!--<el-menu-item index="sign" @click="tagMenu('sign','签到管理')" v-show="chang('/master/sign/list')">签到管理</el-menu-item>-->
                              <el-menu-item index="sign" @click="tagMenu('sign','签到管理')" v-if="chang('/master/sign/list')">签到管理</el-menu-item>
                              <el-menu-item index="attendance" @click="tagMenu('attendance','迟到早退')" v-if="chang('/master/sign/getByKey')">迟到早退</el-menu-item>
                              <el-menu-item index="leave" @click="tagMenu('leave','请假调休')"  v-if="chang('/master/leave/all')">请假调休</el-menu-item>
                              <el-menu-item index="holiday" @click="tagMenu('holiday','加班考勤')" v-if="chang('/master/rest/allRest')">加班考勤</el-menu-item>
                              <el-menu-item index="outwork" @click="tagMenu('outwork','外出考勤')" v-if="chang('/master/outwork/all')">外出考勤</el-menu-item>
                              <el-menu-item index="absenteeism" @click="tagMenu('absenteeism','旷工记录')" v-if="chang('/master/stafAbsenteeism/list')">旷工记录</el-menu-item>
                          </el-submenu>

                         <el-submenu index="2" >
                              <template slot="title"> <i class="fa fa-gears" aria-hidden="true" data-icon="fa-gears"></i>系统配置<span class="layui-nav-more"></span></template>
                              <el-menu-item index="siteConfig" @click="tagMenu('siteConfig','站点配置')" v-if="chang('/master/system/config')">站点配置</el-menu-item>
                          </el-submenu>

                          <el-submenu index="3" >
                              <template slot="title"><i class="fa fa-bars" aria-hidden="true" data-icon="fa-bars"></i>菜单管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="bgMenu" @click="tagMenu('bgMenu','后台菜单')" v-if="chang('/master/controller/list')">后台菜单</el-menu-item>
                          </el-submenu>

                          <el-submenu index="4" >
                              <template slot="title"><i class="fa fa fa-file-text" aria-hidden="true" data-icon="fa fa-file-text"></i>内容管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="shequ" @click="tagMenu('shequ','社区板块')" v-if="chang('/master/fcate/list')">社区板块</el-menu-item>
                              <el-menu-item index="forum" @click="tagMenu('forum','帖子管理')" v-if="chang('/master/forum/list')">帖子管理</el-menu-item>
                              <el-menu-item index="comment" @click="tagMenu('comment','评论管理')" v-if="chang('/master/comment/list')">评论管理</el-menu-item>
                              <el-menu-item index="message" @click="tagMenu('message','消息管理')" v-if="chang('/master/message/list')">消息管理</el-menu-item>
                              <el-menu-item index="activity" @click="tagMenu('activity','活动管理')" v-if="chang('/master/activity/list')">活动管理</el-menu-item>
                              <el-menu-item index="vote" @click="tagMenu('vote','投票管理')" v-if="chang('/master/vote/list')">投票管理</el-menu-item>
                              <!--<el-menu-item index="activity" @click="tagMenu('activity','活动管理')" >活动管理</el-menu-item>-->
                              <!--<el-menu-item index="vote" @click="tagMenu('vote','投票管理')" >投票管理</el-menu-item>-->
                              <!--<el-menu-item index="cms" @click="tagMenu('cms','CMS版块')">CMS版块</el-menu-item>-->
                              <!--<el-menu-item index="article" @click="tagMenu('article','文章管理')">文章管理</el-menu-item>-->
                          </el-submenu>
                          <el-submenu index="5">
                           <template slot="title"><i class="fa fa-users" aria-hidden="true" data-icon="fa-users"></i>用户管理<span class="layui-nav-more"></span></template>
                           <el-menu-item index="adminHt" @click="tagMenu('adminHt','后台管理员')" v-if="chang('/master/list')">后台管理员</el-menu-item>
                           <el-menu-item index="permisGroup" @click="tagMenu('permisGroup','后台权限组')" v-if="chang('/master/admin/group/list')">后台权限组</el-menu-item>
                           <el-menu-item index="adminQt" @click="tagMenu('adminQt','前台权限组')" v-if="chang('/master/user/group/usable')">前台权限组</el-menu-item>
                           <el-menu-item index="userManage" @click="tagMenu('userManage','前台用户管理')" v-if="chang('/master/user/list')">前台用户管理</el-menu-item>
                           <el-menu-item index="memberLevel" @click="tagMenu('memberLevel','会员等级')" v-if="chang('/master/grade/list')">会员等级</el-menu-item>
                         </el-submenu>
                          <el-submenu index="6">
                              <template slot="title"><i class="fa fa-braille" aria-hidden="true" data-icon="fa-braille"></i>记录管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="operation" @click="tagMenu('operation','操作记录')" v-if="chang('/master/log/list')">操作记录</el-menu-item>
                              <el-menu-item index="integral" @click="tagMenu('integral','积分记录')" v-if="chang('/master/usersign/list')">积分记录</el-menu-item>
                          </el-submenu>
                          <el-submenu index="7">
                              <template slot="title"><i class="fa fa-wrench" aria-hidden="true" data-icon="fa-braille"></i>员工管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="information" @click="tagMenu('information','员工信息')" v-if="chang('/master/staffMessage/list')">员工信息</el-menu-item>
                              <!--<el-menu-item index="reimbursement" @click="tagMenu('reimbursement','报销记录')" v-if="chang('/master/reimbursement/all')">报销记录</el-menu-item>-->
                              <el-menu-item index="salary" @click="tagMenu('salary','薪资记录')" v-if="chang('/master/monthlyAssess/getList')">薪资记录</el-menu-item>
                          </el-submenu>
                          <!--<el-submenu index="8">-->
                              <!--<template slot="title"><i class="fa fa-camera-retro" aria-hidden="true" data-icon="fa-braille"></i>分享管理<span class="layui-nav-more"></span></template>-->
                              <!--<el-menu-item index="share" @click="tagMenu('share','请假记录')" v-if="chang('/master/share/list')">分享记录</el-menu-item>-->
                          <!--</el-submenu>-->
                          <el-submenu index="9">
                              <template slot="title"><i class="fa fa-camera-retro" aria-hidden="true" data-icon="fa-braille"></i>项目管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="interfaces" @click="tagMenu('interfaces','接口记录')" v-if="chang('/master/interface/bypage')">接口记录</el-menu-item>
                              <el-menu-item index="module" @click="tagMenu('module','模块记录')" v-if="chang('/master/module/bypage')">模块记录</el-menu-item>
                              <el-menu-item index="projects" @click="tagMenu('projects','项目记录')" v-if="chang('/master/project/bypage')">项目记录</el-menu-item>
                              <el-menu-item index="changeRecord" @click="tagMenu('changeRecord','项目记录')" v-if="chang('/master/record/bypage')">变更记录</el-menu-item>
                          </el-submenu>
                          <el-submenu index="10">
                              <template slot="title"><i class="fa fa-camera-retro" aria-hidden="true" data-icon="fa-braille"></i>附件管理<span class="layui-nav-more"></span></template>
                              <el-menu-item index="list" @click="tagMenu('list','附件列表')" v-if="chang('/master/forum/uppage')">附件列表</el-menu-item>
                              <el-menu-item index="download" @click="tagMenu('download','下载纪录')" v-if="chang('/master/forum/bypage')">下载纪录</el-menu-item>
                              <el-menu-item index="bug" @click="tagMenu('bug','购买纪录')" v-if="chang('/master/forum/buypage')">购买纪录</el-menu-item>
                          </el-submenu>
                          <div style="height:100px;"></div>
                      </el-menu>
                </div>
                <div   id="admin-body" :class="{'layui-body':sideShow,'layui-false':!sideShow}">
                    <div class="layui-tab admin-nav-card layui-tab-brief" lay-filter="admin-tab" style="margin:0px">
                        <ul class="layui-tab-title" :class="{'layui-tab-more':more}">
                            <li :class="{'layui-this':showMenu}" @click="controlEvent">
                                <i class="fa fa-dashboard" aria-hidden="true"></i>
                                <cite>控制面板</cite>
                            </li>
                            <li  v-for="(item, index) in navigation" :class="{'layui-this':index==tab}" v-on:click="tabEvent(index)" :key="index">
                                <router-link :to="item.url" class="taburl"><cite>{{item.name}}</cite></router-link>
                                <i class="layui-icon layui-unselect layui-tab-close"  v-on:click.stop="delEvent(index)">ဆ</i>
                            </li>
                            <span class="layui-unselect layui-tab-bar" v-on:click="more=!more" style="display:none" :class="{'blockStyle':tabmore}"><i lay-stope="tabmore" class="layui-icon"></i></span>
                        </ul>
                        <div class="tpt—index fly-panel fly-panel-user"  v-show="showMenu">
                            <blockquote style="padding: 10px;border-left: 5px solid #009688;" class="layui-elem-quote">欢迎使用wswsk内容社区综合系统 <span style="color:#FF5722;"></span></blockquote>
                            <table width="100%">
                                <tbody>
                                <tr>
                                    <td>确认服务器或虚拟主机开启了伪静态。</td>
                                </tr>
                                </tbody></table>
                            <blockquote style="padding: 10px;border-left: 5px solid #009688;" class="layui-elem-quote">系统信息：</blockquote>
                            <table width="100%">
                                <tbody><tr>
                                    <td width="110px">程序版本</td>
                                    <td>wswsk内容社区综合系统 V2.40</td>
                                </tr>
                                <tr>
                                    <td>服务器类型</td>
                                    <td>Linux</td>
                                </tr>
                                <tr>
                                    <td>服务器解译引擎</td>
                                    <td>nginx/1.9.15</td>
                                </tr>
                                <tr>
                                    <td>服务器语言</td>
                                    <td>zh-CN,zh;q=0.9,en;q=0.8</td>
                                </tr>
                                <tr>
                                    <td>服务器Web端口</td>
                                    <td>80</td>
                                </tr>
                                <tr>
                                    <td>服务器上传文件大小限制</td>
                                    <td>upload_max_files：100M / post_max_size：50M</td>
                                </tr>
                                </tbody></table>
                            <blockquote style="padding: 10px;border-left: 5px solid #009688;" class="layui-elem-quote">开发团队：</blockquote>
                            <table width="100%">
                                <tbody><tr>
                                    <td width="110px">版权所有</td>
                                    <td>亿动华源</td>
                                </tr>
                                <tr>
                                    <td>特别提醒您</td>
                                    <td>本程序均可免费下载使用，但严禁删除、隐藏或更改版权信息，且导致的一切损失由使用者自行承担。</td>
                                </tr>
                                </tbody></table>
                        </div>
                        <div class="layui-tab-content"  v-show="!showMenu">
                            <keep-alive :include="delArr">
                                <router-view></router-view>
                            </keep-alive>
                       </div>
                </div>
              </div>

        </div>

        <div class="site-tree-mobile layui-hide" @click="maskShow" :class="{'site-tree-true':!mask,'site-tree-false':mask}">
            <i class="layui-icon"></i>
        </div>
        <div class="site-mobile-shade" v-show="mask" @click="shadeShow"></div>
    </div>

</template>

<script>
    import screenfull from 'screenfull'
    export default {
        name: 'manage',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newpsd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                name:"",
                url:this.GLOBAL.baseUrl,
                islogin:this.GLOBAL.islogin,
                sideShow:true,
                isFullscreen: false,
                mask:false,
                key:"",
                tab:0,
                activeIndex:'',
                activeIndex2: '',
                dialogFormVisible: false,
                navigation:[],
                navLength:0,
                menu:true,
                showMenu:true,
                tabmore:false,
                more:false,
                x:'',
                y:'',
//              权限
                auth:[],
                newArr:[],
//              keep-alive的缓存问题
                delArr:[],
                ruleForm: {
                    oldpsd:'',
                    newpsd: '',
                    checkPass: ''
                },
                rules: {
                    newpsd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    oldpsd: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
        methods: {
            editEvent(){
                var me=this;
                me.$axios.post(me.url+"master/exit")
                    .then(function (result) {
                        if(result.data.result===false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result===true){
                            me.$message({
                                message: '退出成功',
                                type: 'success'
                            })
                            sessionStorage.clear()
                            me.$router.push('/');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            //权限的接口
            authorityEvent(){
                var me=this;
                $.ajax({
                    url:me.url+"master/auth",
                    type:'POST', //GET
                    async:false,    //或false,是否异步
                    timeout:5000,    //超时时间
                    dataType:'json',    //返回的数据格式：
                    headers:{'Content-Type':'application/json;charset=utf8','token':JSON.parse(sessionStorage.getItem('vuex')).user.sessionid},
                    success:function(data,textStatus,jqXHR){
                        me.auth=data;
                    }
                })
            },
            chang(name){
                var type=false;
                if(this.auth!=null){
                    this.auth.forEach(function(i,v){
                        if(i==name){
                            type=true;
                        }
                    });
                }
                return type;
            },

            controlEvent(){
                this.showMenu=true;
                this.tab=-1
            },
            tagMenu(a,b){
                var me=this;
//                获取li的长度与屏幕缩放的显示与隐藏more
                this.navLength=(this.navigation.length+1)*117+110
                this.showMenu=false;
                for(var i=0;i<this.navigation.length;i++){
                    if(this.navigation[i].name==b){
                        this.y=i
                        this.x=2
                    }
                }
//                点击添加没有相同的时候push;
                if(this.x!=2){
                    this.navigation.push({ url: a, name: b ,meta:{keepAlive: false}})
                    this.tab=this.navigation.length-1;
                }else{
                    this.tab=this.y;
                    this.x=''
                }
                this.navigation.forEach(function(i,v){
                    me.delArr.push(i.url)
                })
            },
            tabEvent(index){
                this.tab=index;
                this.showMenu=false;
            },
            delEvent(index){
                var me=this;
                this.navigation.splice(index,1)
                me.delArr=[];
                me.navigation.forEach(function(i,v){
                    me.delArr.push(i.url)
                })
//                删除最后一个
                if(index==this.navigation.length){
//                   控制面板的url=0的时候
                    if(this.navigation.length!=0){
                        this.tab=this.navigation.length-1
                        var newurl2=this.navigation[this.navigation.length-1].url
                        this.$router.push({path: newurl2});
                    }
                    else{
                        this.showMenu=true;
                    }

                }else{
                    var newurl1=this.navigation[index].url
                    this.tab=index;
                    this.$router.push({path: newurl1});
                }


            },
        async handleCommand(command) {
        if (command == 'home') {
            this.dialogFormVisible=true

        }else if(command == 'singout'){
            var me=this;
            me.$axios.post(me.url+"master/exit")
                .then(function (result) {
                    if(result.data.result===false){
                        me.$message({
                            message: result.data.msg,
                            type: 'error'
                        })
                    }
                    if(result.data.result===true){
                        me.$message({
                            message: '退出成功',
                            type: 'success'
                        })
                        sessionStorage.clear()
                        me.$router.push('/');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                var me=this;
                // 修改密码
                me.$axios.post(me.url+"master/repsd?oldpsd="+this.ruleForm.oldpsd+"&newpsd="+this.ruleForm.newpsd)
                    .then(function (result) {
//                        console.log(result)
                        if(result.data.result===false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result===true){
                            me.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            me.dialogFormVisible=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
//               console.log('error submit!!');
                 return false;
    }
    });
    },
       handleSelectSide(key, keyPath) {
        this.key=key
       },
          handleSelect(key, keyPath) {
           console.log(key, keyPath);
        },
            shadeShow(){
                this.mask=false
            },
//            遮罩
            maskShow(){
              this.mask=!this.mask
            },
//           侧边栏上面的按钮控制
            side(){
                this.sideShow=!this.sideShow
            },
            /**
             * 全屏事件
             */
            screenfull() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'Your browser does not work',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
                this.isFullscreen = true
            },
            /**
             * 是否全屏并按键ESC键的方法
             */
            checkFull() {
                var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
                // to fix : false || undefined == undefined
                if (isFull === undefined) {
                    isFull = false
                }
                return isFull
            }
        },
        created(){
            this.authorityEvent();
            if(sessionStorage.getItem("redirect")=='undefined'){
                 this.showMenu=true;
            }else{
                this.showMenu=false;
                if(sessionStorage.getItem("redirect")=='/sign'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'签到管理')
                }
                if(sessionStorage.getItem("redirect")=='/siteConfig'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'站点配置')
                }
                if(sessionStorage.getItem("redirect")=='/bgMenu'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'后台菜单')
                }
                if(sessionStorage.getItem("redirect")=='/shequ'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'社区版块')
                }
                if(sessionStorage.getItem("redirect")=='/forum'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'帖子管理')
                }
                if(sessionStorage.getItem("redirect")=='/comment'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'评论管理')
                }
                if(sessionStorage.getItem("redirect")=='/message'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'消息管理')
                }
                if(sessionStorage.getItem("redirect")=='/adminHt'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'后台管理员')
                }
                if(sessionStorage.getItem("redirect")=='/permisGroup'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'后台权限组')
                }
                if(sessionStorage.getItem("redirect")=='/adminQt'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'前台权限组')
                }
                if(sessionStorage.getItem("redirect")=='/userManage'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'前台用户管理')
                }
                if(sessionStorage.getItem("redirect")=='/memberLevel'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'会员等级')
                }
                if(sessionStorage.getItem("redirect")=='/operation'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'操作记录')
                }
                if(sessionStorage.getItem("redirect")=='/integral'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'积分记录')
                }
                if(sessionStorage.getItem("redirect")=='/leave'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'请假记录')
                }
                if(sessionStorage.getItem("redirect")=='/share'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'分享记录')
                }
                if(sessionStorage.getItem("redirect")=='/activity'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'活动管理')
                }
                if(sessionStorage.getItem("redirect")=='/vote'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'投票管理')
                }
                if(sessionStorage.getItem("redirect")=='/share'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'分享记录')
                }
                if(sessionStorage.getItem("redirect")=='/information'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'员工信息')
                }
                if(sessionStorage.getItem("redirect")=='/holiday'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'调休记录')
                }
                if(sessionStorage.getItem("redirect")=='/reimbursement'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'报销记录')
                }
                if(sessionStorage.getItem("redirect")=='/absenteeism'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'旷工记录')
                }
                if(sessionStorage.getItem("redirect")=='/salary'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'薪资记录')
                }
                if(sessionStorage.getItem("redirect")=='/interfaces'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'接口记录')
                }
                if(sessionStorage.getItem("redirect")=='/module'){
                    this.tagMenu(sessionStorage.getItem("module"),'模块记录')
                }
                if(sessionStorage.getItem("redirect")=='/projects'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'项目记录')
                }
                if(sessionStorage.getItem("redirect")=='/changeRecord'){
                    this.tagMenu(sessionStorage.getItem("redirect"),'项目记录')
                }
            }
        },
        mounted() {
        $("#admin-side .el-menu .el-submenu").each(function() {
            if($(this).find(".el-menu-item").length==0){
                $(this).css("display","none");
            }
        })
            window.onresize = () => {
                // 全屏下监控是否按键了ESC
                if (!this.checkFull()) {
                    // 全屏下按键esc后要执行的动作
                    this.isFullscreen = false
                }
            }
        this.name=this.$store.state.user.username;
        if(this.name== undefined || this.name ==''){
            this.$router.push({path: '/'});
        }
//       屏幕的宽度
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth-200
                that.screenWidth = window.screenWidth
                if(this.navLength> that.screenWidth){
                    this.tabmore=true;
                }else{
                    this.tabmore=false;
                }

        })()
        }
        }
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';
    .logo span{
        color:@sizeC;
        font-weight:bold;
        line-height:30px;
    }
    .layui-nav * {
        font-size:14px!important;
    }
    .el-submenu__title *{
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
    }
    .el-menu-item *{
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
    }
    .el-menu-item {
        background:#282B33;
        color: rgba(255,255,255,.7)!important;
    }
    .el-menu--dark {
        height:100%!important;
        background-color: #393D49;
    }
    .layui-tab-title{
        margin-top:-5px;
    }
    .layui-tab-title li{
        line-height:40px;
    }
    .manage_page{
        position: relative;
        height: 100%;
    }
    .layui-bg-false{
        width:0px;
        height:0px;
        overflow: hidden;
    }
    .layui-bg-black{
        width:200px;
        height: 0px;
        overflow: hidden;
    }
     .layui-false{
         left:0!important;
     }
    .site-mobile-shade {
        content: '';
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.8);
        z-index: 9999;
    }
    .site-tree-true{
        display: block!important;
    }
    .site-tree-false{
        display: none!important;
    }
    .layui-side {
        overflow:auto;
        left:0px!important;
        height:auto;
        position:fixed;
        top:0;
        z-index: 11111;
    }
    .admin-header-item ul li{
        background:#fff;
        color:#999!important;
    }
    .admin-header-item ul li .el-menu{
        z-index:22222!important;
    }
    .el-menu-item.is-active a {
        color: #000;
    }
    .admin-header-item .el-menu{
        float:left;
    }
    .el-dropdown img{
        width:40px;
        height:40px;
        border-radius:50%;
    }
    .el-dropdown {
        margin-top: 12px;
    }
    .el-dropdown-menu__item {
        text-align: left;
    }
    .layui-bg-black .el-menu .el-menu-item.is-active{
        background:#009688;
        color:#fff!important;
    }
    .el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
        border-bottom: 5px solid #393D49;
    }
    .el-dialog__body {
        padding-right: 50px!important;
    }
    .el-form-item.is-required .el-form-item__label:before {
        content: '*';
        color: #fff!important;
        margin-right: 4px;
    }
    .layui-tab-content{
        min-height: 150px;
        padding: 5px 0px 0px;
        height: 750px;
        overflow: scroll
    }
    @media screen and (min-width: 768px) {
        .layui-bg-black{
            width:200px;
            height:100%;
        }
        .site-tree-true{
            display: none!important;
        }
    }
    @media screen and (max-width: 768px) {
        .layui-tab-content{
            height:500px!important;
        }
    }
    .el-breadcrumb{
        line-height:40px;
    }
    .taburl{
        height: 40px;
        line-height: 40px;
        display: block;
        float: left;
    }
    .layui-this a cite{
        color:#fff;
    }
    .blockStyle{
       display:block!important;
    }
    @media screen and (max-width: 991px){
        .layui-tab{
            overflow: hidden;
        }
    }
    .el-menu {
        border-right: solid 0px #e6e6e6;
        background: #393D49;
    }
    .el-menu.el-menu--horizontal {
         border-bottom: solid 0px #e6e6e6;
    }
</style>
