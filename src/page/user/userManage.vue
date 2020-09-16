<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menu">
            <div class="layui-box-searchber" style="overflow: visible">
            </div>
            <hr>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th style="width: 30px;">ID</th>
                    <th>用户名</th>
                    <th>状态</th>
                    <th>所属用户组</th>
                    <th>创建时间</th>
                    <th>最后登录时间</th>
                    <th>最后登录IP</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id="content">

                <tr v-for="(item,index) in userList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.homeAuthGroupname}}</td>
                    <td>{{item.regtime}}</td>
                    <td>{{item.last_login_time}}</td>
                    <td>{{item.last_login_ip}}</td>
                    <td>

                        <a href="javascript:;"  class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)" v-show="chang('/master/user/edit')">编审</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm" @click="delEvent(item.id,index)" v-show="chang('/master/user/delete')">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="layui-tab-brief" v-show="edit">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container" >
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="username">
                                        <el-input v-model="ruleFormEdit.username" placeholder="请输入用户名"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">审核</label>
                                  <div class="layui-input-inline"  style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormEdit.status">
                                    <el-radio  :label="0"  @click.native.prevent="clickitem(0)">待审</el-radio>
                                    <el-radio  :label="1"  @click.native.prevent="clickitem(1)">同意</el-radio>
                                    <el-radio  :label="-1"  @click.native.prevent="clickitem(-1)">不同意</el-radio>
                                    </el-radio-group>
                                  </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline" style="width:100%!important;">
                                    <el-form-item label="所属权限组" prop="homeAuthGroupid">
                                     
                                        <div v-for="(item,index) in cities" :key="index">
                                            <input type="checkbox" v-model="checkModel" :value="item.id" style="display:block;float:left;margin:13px 10px 0;">
                                            <a href="javascript:;">{{item.title}}</a>
                                        </div>
                                        
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">更新</el-button>
                                            <el-button @click="resetForm('ruleFormEdit')">返回</el-button>
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
        name: 'userManage',
        data(){
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
            return {
                url: this.GLOBAL.baseUrl,
                menu: true,
                edit:false,
                userList:[],
                options:[],
                options1:[],
                optionsList:'',
                ruleFormEdit: {
                    username:'',
                    status:'',
                    id:'',
                    homeAuthGroupid:"",
                },
                rulesEdit: {
                    username: [
                        {validator: username, trigger: 'blur'},
                    ],
                    homeAuthGroupid: [
                        {validator: groupId, trigger: 'blur'},
                    ],
                },
                auth:[],
                cities: [],
                checkModel:[],
            }
        },
        methods: {
            //权限的接口
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
            userEvent(){
                // 用户列表
                var me=this;
                me.$axios.post(me.url+"master/user/list")
                    .then(function (result) {
//                    console.log(result)
                        me.userList=result.data;
                        me.userList.forEach(function(index){
                            if(index.status==-1){
                                index.status='不通过'
                            }
                            if(index.status==0){
                                index.status='待审核'
                            }
                            if(index.status==1){
                                index.status='通过'
                            }
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            resetForm(formName) {
                this.menu=true;
                this.edit=false;
            },
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        var para={
                            username:me.ruleFormEdit.username,
                            status:me.ruleFormEdit.status,
                            id:me.ruleFormEdit.id,
                            homeAuthGroupid:me.checkModel
                        }
                        me.$axios.post(me.url+"master/user/edit",para)
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
                                    me.userEvent();
                                    me.menu=true;
                                    me.edit=false;
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
            editEvent(id){
                this.edit=true;
                this.menu=false;
                var me=this;
//               编辑
                me.$axios.post(me.url+"master/user/get?id="+id)
                    .then(function (result) {
                        me.ruleFormEdit.username = result.data.username;
                        me.ruleFormEdit.status = result.data.status;
                        me.ruleFormEdit.homeAuthGroupid=result.data.homeAuthGroupid;
                        if(result.data.homeAuthGroupid==null){
                            me.checkModel=[];
                        }else{
                            me.checkModel=result.data.homeAuthGroupid;
                        }
                        me.ruleFormEdit.id=result.data.id;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
//
            },
            delEvent(id,index){
                var me=this;
//                删除
                me.$axios.post(me.url+"master/user/delete?id="+id)
                    .then(function (result) {
//                        console.log(result)
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
                            me.userEvent();
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            clickitem(status){
                this.ruleFormEdit.status=status
            },
            checkBox(id){
                console.log(id)
            }
        },
        mounted(){
            var me=this;
            me.userEvent();
            me.authorityEvent();
            //所属权限组
            me.$axios.post(me.url+"master/user/group/usable")
                .then(function (result) {
                    me.options=result.data
                    me.cities=result.data;
                    me.options1=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .layui-form-item {
        margin-bottom:0px;
    }
    .layui-input-inline {
        width: 300px!important;
    }
    .layui-form-item .layui-input-inline{
        width:300px;
    }
    @media screen and (max-width: 450px) {
        .layui-form-label {
            float: left;
            display: block;
            padding:0;
            width: 60px;
            font-weight: 400;
            line-height: 20px;
            text-align: center;
        }
    }

</style>
