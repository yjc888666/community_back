<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menu">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent()" v-show="chang('/master/set')">
                <i class="layui-icon"></i> 添加管理员
            </a>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th style="width: 30px;">ID</th>
                    <th>用户名</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>最后登录时间</th>
                    <th>最后登录IP</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id="content">
                  <tr v-for="(item,index) in manageList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.create_time}}</td>
                    <td>{{item.last_login_time}}</td>
                    <td>{{item.last_login_ip}}</td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm"  @click="editEvent(item.id)" v-show="chang('/master/edit')">编辑</a>
                        <!--<a href="javascript:;"  class="elementdel layui-btn layui-btn-danger layui-btn-sm" @click="delEvent(item.id,index)">删除</a>-->
                        <a href="javascript:;"  class="elementdel layui-btn layui-btn-danger layui-btn-sm" @click="delEvent(item.id,index)" v-show="chang('/master/delete')">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="layui-tab-brief" v-show="add">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="ruleForm2.username" placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password" v-model="ruleForm2.password" placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item ">
                                <div class="layui-input-inline">
                                    <el-form-item label="确认密码" prop="passwordCheck">
                                        <el-input type="password" v-model="ruleForm2.passwordCheck" placeholder="请再次输入密码"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleForm2.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">启用</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">禁用</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="所属权限组" prop="group_id">
                                        <el-select v-model="ruleForm2.group_id" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>

                        <div class="btable-paged">
                            <div class="layui-main">
                                <div class="formbtngroup">
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
                                        <el-button @click="resetForm('ruleForm2')">返回</el-button>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="layui-tab-brief" v-show="edit">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="ruleForm1.username" placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="密码" prop="password">
                                        <el-input type="password" v-model="ruleForm1.password" placeholder="（选填）输入密码"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item ">
                                <div class="layui-input-inline">
                                    <el-form-item label="确认密码" prop="passwordCheck">
                                        <el-input type="password" v-model="ruleForm1.passwordCheck" placeholder="（选填）再次输入密码"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item " style="margin-bottom:15px;">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleForm1.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">启用</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">禁用</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="所属权限组" prop="group_id">
                                        <el-select v-model="ruleForm1.group_id" placeholder="请选择">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>

                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitForm1('ruleForm1')">更新</el-button>
                                            <el-button @click="resetForm('ruleForm1')">返回</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'adminHt',
        data(){
//            添加
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.passwordCheck !== '') {
                        this.$refs.ruleForm2.validateField('passwordCheck');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) =>
            {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var username = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                callback();
            };
            var groupId = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择权限组'));
                }
                callback();
            };
//        编辑
            var pass = (rule, value, callback) => {
                if (value === '') {
                    callback()
                } else {
                    if (this.ruleForm1.passwordCheck !== '') {
                        this.$refs.ruleForm1.validateField('passwordCheck');
                    }
                    callback();
                }
            };
            var pass2 = (rule, value, callback) =>
            {
                if (value === '') {
                    callback()
                } else if (value !== this.ruleForm1.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var user = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                callback();
            };
            var group = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择权限组'));
                }
                callback();
            };
                return {
                    url: this.GLOBAL.baseUrl,
                    menu:true,
                    add:false,
                    edit:false,
                    manageList: [],
                    options:[],
                    ruleForm2: {
                        username:'',
                        password: '',
                        passwordCheck: '',
                        group_id:"",
                        status:'1'
                    },
                    rules2: {
                        username: [
                            {validator: username, trigger: 'blur'},
                        ],
                        password: [
                            {validator: validatePass, trigger: 'blur'}
                        ],
                        passwordCheck: [
                            {validator: validatePass2, trigger: 'blur'}
                        ],
                        group_id: [
                            {validator: groupId, trigger: 'blur'},
                        ],
                    },
                    ruleForm1: {
                        username:'',
                        password: '',
                        passwordCheck: '',
                        group_id:"",
                        status:'',
                        id:''
                    },
                    rules1: {
                        username: [
                            {validator: user, trigger: 'blur'},
                        ],
                        password: [
                            {validator: pass, trigger: 'blur'}
                        ],
                        passwordCheck: [
                            {validator: pass2, trigger: 'blur'}
                        ],
                        group_id: [
                            {validator: group, trigger: 'blur'},
                        ],
                    },
//                    权限
                    auth:[]
                }
            },
        methods: {
//           权限的接口
            authorityEvent(){
                var me=this;
                me.$axios.post(me.url+"master/auth")
                    .then(function (result) {
                        me.auth=result.data;
//                        console.log(result.data)
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
            listMenu(){
                //后台管理员的列表
                var me=this;
                me.$axios.post(me.url+"master/list")
                    .then(function (result) {
                        me.manageList=result.data;
                        me.manageList.forEach(function(index){
                            if(index.status==1){
                                index.status='启用'
                            }
                            if(index.status==0){
                                index.status='禁用'
                            }

                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            编辑完提交
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/edit", me.ruleForm1)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '编辑成功',
                                        type: 'success'
                                    })
                                    me.listMenu();
                                    me.menu=true;
                                    me.add=false;
                                    me.edit=false;
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
//          添加完提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                    // 添加数据
                        me.$axios.post(me.url+"master/set", me.ruleForm2)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    })
                                    me.listMenu();
                                    me.menu=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.ruleForm2={
                                        username:'',
                                        password: '',
                                        passwordCheck: '',
                                        group_id:"",
                                        status:1
                                    }
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
//                        console.log('error submit!!');
                return false;
            }
            });
            },
            resetForm(formName) {
                this.menu=true;
                this.add=false;
                this.edit=false;
            },
            addEvent(){
                this.menu=false;
                this.add=true;
                this.edit=false;
            },
            editEvent(id){
                var me=this;
                me.edit=true;
                me.add=false;
                me.menu=false;
//               编辑
                me.$axios.post(me.url+"master/get?uid="+id)
                    .then(function (result) {
                        me.ruleForm1.username = result.data.username
                        me.ruleForm1.status = result.data.status
                        me.ruleForm1.group_id=result.data.group_id
                        me.ruleForm1.id=result.data.id
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
//
            },
            delEvent(id,index){
                var me=this;
//                删除
                me.$axios.post(me.url+"master/delete?uid="+id)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })

                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            me.manageList.splice(index,1);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            clickitem(status){
                this.ruleForm2.status=status
                this.ruleForm1.status=status
            },
            qxzEvent(){
                //所属权限组
            var me=this;
            me.$axios.post(me.url+"master/admin/group/usable")
                .then(function (result) {
                    me.options=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        mounted(){
            var me=this;
            me.ruleForm2.status=1
            me.listMenu();
            me.authorityEvent();
            me.qxzEvent();
        }
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .layui-form-item .layui-input-inline {
        width: auto!important;
    }
    .layui-form-item {
        margin-bottom:0px;
    }
    @media screen and (max-width: 450px) {
       .el-radio-group {
           margin-top: 10px;
       }
    }
</style>
