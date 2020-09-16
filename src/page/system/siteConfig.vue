<template>
    <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
            <li v-for="(item,index) in list" @click="tab(index)" :class="{'layui-this':index==num}" :key="index">
                {{item.tab}}
            </li>
        </ul>

        <form class="layui-form form-container layui-tab-content">

            <div class="layui-tab-item layui-show" v-if="num==0">
                <el-form :model="ruleFormSeo"  :rules="rulesSeo" ref="ruleFormSeo" label-width="100px" class="demoBtn-ruleForm">
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="网站标题" prop="title">
                                <el-input v-model="ruleFormSeo.title" placeholder="请输入网站标题"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item" style="padding-bottom:15px;padding-top:5px;">
                        <label class="layui-form-label">网站Logo</label>
                        <div class="layui-input-inline">
                            <el-upload
                                class="upload-demo"
                                action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                :http-request="handlePost"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="beforeAvatarUpload">
                                <el-button size="small" type="primary"><i class="layui-icon"></i>上传首页 Logo</el-button>
                                <img v-if="imageUrlCms" :src="imageUrlCms" class="avatar">
                            </el-upload>
                        </div>
                        <div class="layui-input-inline">
                            <el-upload
                                class="upload-demo"
                                action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                :http-request="handlePost1"
                                :on-success="handleAvatarSuccess2"
                                :before-upload="beforeAvatarUpload">
                                <el-button size="small" type="primary"><i class="layui-icon"></i>上传个人中心 Logo</el-button>
                                <img v-if="imageUrlBbs" :src="imageUrlBbs" class="avatar">
                            </el-upload>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <el-form-item label="SEO标题" prop="seotitle">
                            <el-input v-model="ruleFormSeo.seotitle" placeholder="请输入SEO标题"></el-input>
                        </el-form-item>
                    </div>
                    <div class="layui-form-item">
                        <el-form-item label="SEO关键字" prop="seokeywords">
                            <el-input v-model="ruleFormSeo.seokeywords" placeholder="请输入SEO关键字"></el-input>
                        </el-form-item>
                    </div>
                    <div class="layui-form-item">
                        <el-form-item label="SEO说明" prop="seoillustrate">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 4}"
                                placeholder="请输入SEO说明"
                                v-model="ruleFormSeo.seoillustrate">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="layui-form-item">
                        <el-form-item label="版权信息" prop="copyright">
                            <el-input v-model="ruleFormSeo.copyright" placeholder="请输入版权信息"></el-input>
                        </el-form-item>
                    </div>
                    <div class="layui-form-item">
                        <el-form-item label="ICP备案号" prop="record">
                            <el-input v-model="ruleFormSeo.record"  placeholder="请输入ICP备案号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="btable-paged" v-show="chang('/master/system/seoset')">
                        <div class="layui-main">
                            <div class="formbtngroup">
                                <el-button type="primary" @click="submitFormSeo('ruleFormSeo')">提交</el-button>
                                <el-button @click="resetForm('ruleFormSeo')">返回</el-button>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>

            <div class="layui-tab-item layui-show" v-if="num==1">

                <el-form :model="ruleFormMail"  :rules="rulesMail" ref="ruleFormMail" label-width="150px" class="demoBtn-ruleForm">
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="SMTP 服务器" prop="server">
                                <el-input  v-model="ruleFormMail.server" placeholder="SMTP 服务器"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="SMTP服务器的端口号" prop="port">
                                <el-input v-model="ruleFormMail.port" placeholder="SMTP服务器的端口号" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="SMTP服务器用户名" prop="username">
                                <el-input v-model="ruleFormMail.username" placeholder="SMTP服务器用户名"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="SMTP服务器密码" prop="password">
                                <el-input  type="password" v-model="ruleFormMail.password" placeholder="SMTP服务器密码"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="站长邮箱" prop="mail">
                                <el-input  v-model="ruleFormMail.mail" placeholder="SMTP 服务器"></el-input>
                            </el-form-item>
                        </div>
                        <input type="button"  value="发送测试邮件" class="layui-btn layui-btn" @click="sendEmail" v-show="chang('/master/system/mailsend')">
                    </div>
                    <div class="btable-paged" v-show="chang('/master/system/mailset')">
                        <div class="layui-main">
                            <div class="formbtngroup">
                                <el-button type="primary" @click="submitFormMail('ruleFormMail')">提交</el-button>
                                <el-button @click="resetForm('ruleFormMail')">返回</el-button>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="layui-tab-item layui-show" v-if="num==2">
                <el-form :model="ruleFormEdit"  :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demoBtn-ruleForm">
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="添加文章" prop="articleadd">
                                <el-input v-model="ruleFormEdit.articleadd" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="删除文章" prop="articledelete">
                                <el-input v-model="ruleFormEdit.articledelete" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="回帖" prop="commentadd">
                                <el-input v-model="ruleFormEdit.commentadd" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="发帖" prop="forumadd">
                                <el-input v-model="ruleFormEdit.forumadd" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="删帖" prop="forumdelete">
                                <el-input v-model="ruleFormEdit.forumdelete" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="新年签到奖励" prop="newYearReward">
                                <el-input v-model="ruleFormEdit.newYearReward" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="登录" prop="login">
                                <el-input v-model="ruleFormEdit.login" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="注册" prop="reg">
                                <el-input v-model="ruleFormEdit.reg" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-inline">
                            <el-form-item label="邮箱验证" prop="yzemail">
                                <el-input v-model="ruleFormEdit.yzemail" placeholder="请填写整数" type="number"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                 <div class="btable-paged" v-show="chang('/master/usersign/set')">
                    <div class="layui-main">
                        <div class="formbtngroup">
                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">提交</el-button>
                            <el-button @click="resetForm('ruleFormEdit')">返回</el-button>
                        </div>
                    </div>
                  </div>
                </el-form>
            </div>


        </form>


    </div>
</template>
<script>
    export default {
        name: 'siteConfig',
        data(){
            var title = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入网站标题'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                num:0,
                list:[
                    {tab:"SEO配置",show:true,data:[]},
                    {tab:"邮箱配置",show:false,data:[]},
                    {tab:"积分规则",show:false,data:[]}
                ],
                imageUrlCms: '',
                imageUrlBbs:"",
                ruleFormSeo:{
                    title:"",
                    pageLogo:"",
                    userLogo:"",
                    seotitle:"",
                    seokeywords:"",
                    seoillustrate:"",
                    copyright:"",
                    record:""
                },
                rulesSeo: {
                    title: [
                        { validator:title,trigger: 'change'},
                    ],
                },
                ruleFormMail: {
                    server:"",
                    port:"",
                    username:"",
                    password:"",
                    mail:""
                },
                rulesMail: {
                    mail:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                },
                ruleFormEdit: {
                    articleadd:"",
                    articledelete:"",
                    commentadd:"",
                    forumadd:"",
                    forumdelete:"",
                    newYearReward:"",
                    login:"",
                    reg:"",
                    yzemail:""
                },
                rulesEdit: {

                },
                //权限
                auth:[]
            }
        },
        methods:{
            // 权限的接口
            authorityEvent(){
                var me=this;
                me.$axios.post(me.url+"master/auth")
                    .then(function (result) {
                        me.auth=result.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            chang(name){
                var type=false;
                this.auth.forEach(function(i,v){
                    if(i==name){
                        type=true;
                    }
                });

                return type;
            },
            sendEmail(){
                var me=this;
                if(me.ruleFormMail.username==''||me.ruleFormMail.password==''||me.ruleFormMail.mail==''){
                    me.$message.error("请填写完整信息")
                } else{
                    var para={
                        username:me.ruleFormMail.username,
                        password:me.ruleFormMail.password,
                        mail:me.ruleFormMail.mail
                    }
                    me.$axios.post(me.url+"master/system/mailsend",para)
                        .then(function (result) {
                            if(result.data.result==true){
                                me.$message.success('邮件发送成功');
                            }
                            if(result.data.result==false){
                                me.$message.error(result.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            },
            seoEvent(){
                var me=this;
                me.$axios.post(me.url+"master/system/seoget")
                    .then(function (result) {
                        me.imageUrlCms=me.url+""+result.data.pageLogo;
                        me.imageUrlBbs=me.url+""+result.data.userLogo;
                        me.ruleFormSeo.pageLogo=result.data.pageLogo;
                        me.ruleFormSeo.userLogo=result.data.userLogo;
                        me.ruleFormSeo.title=result.data.title
                        me.ruleFormSeo.seotitle=result.data.seotitle
                        me.ruleFormSeo.seokeywords=result.data.seokeywords
                        me.ruleFormSeo.seoillustrate=result.data.seoillustrate
                        me.ruleFormSeo.copyright=result.data.copyright
                        me.ruleFormSeo.record=result.data.record
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            handlePost(f) {
                var me = this;
                let fd = new FormData()
                fd.append('file', f.file)
                me.$axios.post(me.url + "/master/file/uploadimg", fd)
                    .then(function (result) {
                        if (result.data.result == true) {
                            me.$message({
                                message: '上传成功',
                                type: 'success'
                            })
                            me.imageUrlCms=me.url+""+result.data.pojo;
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
            handlePost1(f) {
                var me = this;
                let fd = new FormData()
                fd.append('file', f.file)
                me.$axios.post(me.url + "/master/file/uploadimg", fd)
                    .then(function (result) {
                        if (result.data.result == true) {
                            me.$message({
                                message: '上传成功',
                                type: 'success'
                            })
                            me.imageUrlBbs=me.url+""+result.data.pojo;
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
//           上传头像
            handleAvatarSuccess1(res, file) {
                this.ruleFormSeo.pageLogo=res.pojo
                console.log(this.ruleFormSeo.pageLogo)
                this.imageUrlCms = URL.createObjectURL(file.raw);
                this.$message.success('上传头像成功');
            },
            handleAvatarSuccess2(res, file) {
                this.ruleFormSeo.userLogo=res.pojo
                console.log(this.ruleFormSeo.userLogo)
                this.imageUrlBbs = URL.createObjectURL(file.raw);
                this.$message.success('上传头像成功');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG  && !isGif ) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG || isPNG  || isGif  && isLt2M;
            },
            tab:function(index){
                this.num=index;
                var me=this;
                if(this.num==0){
//                    seo配置
                    this.seoEvent()
                }
                if(this.num==1){
//                    邮箱配置
                    me.$axios.post(me.url+"master/system/mailget")
                        .then(function (result) {
                            me.ruleFormMail.server=result.data.server
                            me.ruleFormMail.port=result.data.port
                            me.ruleFormMail.username=result.data.username
                            me.ruleFormMail.password=result.data.password
                            me.ruleFormMail.mail=result.data.mail
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                if(this.num==2){
//                    积分配置
                    me.$axios.post(me.url+"master/usersign/get")
                        .then(function (result) {
                            me.ruleFormEdit.articleadd=result.data.articleadd
                            me.ruleFormEdit.articledelete=result.data.articledelete
                            me.ruleFormEdit.commentadd=result.data.commentadd
                            me.ruleFormEdit.forumadd=result.data.forumadd
                            me.ruleFormEdit.forumdelete=result.data.forumdelete
                            me.ruleFormEdit.newYearReward=result.data.newYearReward
                            me.ruleFormEdit.login=result.data.login
                            me.ruleFormEdit.reg=result.data.reg
                            me.ruleFormEdit.yzemail=result.data.yzemail
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/usersign/set",me.ruleFormEdit)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
                        return false;
            }
            });
            },
            submitFormSeo(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/system/seoset",me.ruleFormSeo)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
                        return false;
            }
            });
            },
            submitFormMail(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/system/mailset",me.ruleFormMail)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
                        return false;
            }
            });
            },
            resetForm(formName) {
                this.$router.push('/');
            },
        },
        mounted(){
            this.authorityEvent();
            this.seoEvent()
        }
        }
</script>
<style >
    .el-textarea__inner{
      border-radius: 0px
    }
   .el-upload img{
     width: 140px;
     height:100px!important;
   }
   .el-upload-list{
      display:none;
   }
    .layui-form-item .layui-input-inline {
        width: auto!important;
      }
    .layui-form-item{
        margin-bottom: 0px!important;
    }
    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
        content: '';
        color: #f56c6c;
        margin-right: 4px;
    }
   .layui-tab-title{
      line-height:40px;
   }
    .el-form-item {
        margin-bottom: 15px;
    }
    .upload-demo{
        width:140px;
        margin-right:50px;
    }
    .el-button--small, .el-button--small.is-round {
        margin-bottom: 15px;
    }
</style>

