<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menuShow">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent" v-show="chang('/master/message/set')">
                <i class="layui-icon">&#xe608;</i> 添加系统消息
            </a>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th style="width: 30px;">ID</th>
                    <th>时间</th>
                    <th>发送者</th>
                    <th>发送对象</th>
                    <th>类型</th>
                    <th>内容</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(item,index) in messageList.list" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.tname}}</td>
                    <td>{{item.tyname}}</td>
                    <td>{{item.content}}</td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)" v-show="chang('/master/message/edit')">编辑</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete"  @click="delEvent(item.id)" v-show="chang('/master/message/delete')">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="block page"  style="text-align: right;position: fixed;bottom:20px;right:20px;" v-show="pageShow">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10,20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mytotal">
                </el-pagination>
            </div>
        </div>

        <div class="layui-tab-brief" v-show="addShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">

                            <div class="layui-form-item layui-form-text">
                                <el-form-item label="系统消息" prop="content">
                                    <el-input type="textarea" v-model="ruleFormAdd.content" placeholder="请输入系统消息"></el-input>
                                </el-form-item>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')">添加</el-button>
                                            <el-button @click="resetForm('ruleFormAdd')">返回</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="layui-tab-brief" v-show="editShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demoBtn-ruleForm">

                            <div class="layui-form-item layui-form-text">
                                <el-form-item label="系统消息" prop="content">
                                    <el-input type="textarea" v-model="ruleFormEdit.content" placeholder="请输入系统消息"></el-input>
                                </el-form-item>
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
        name: 'message',
    	data(){
    		return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                editShow:false,
                addShow:false,
                messageList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                ruleFormAdd: {
                    content:'',
                    uid:''
                },
                rulesAdd: {
                },
                ruleFormEdit: {
                    content:'',
                    id:''
                },
                rulesEdit: {
                },
                auth:[]
            }
    		},
        methods:{
            //权限的接口
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

            messageEvent(){
                var me=this;
                me.$axios.post(me.url+"master/message/list?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.messageList=result.data;
                        me.mytotal=result.data.total;
                        if(me.mytotal<10){
                            me.pageShow=false
                        }else{
                            me.pageShow=true
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.messageEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.messageEvent();
            },
            addEvent(){
                this.addShow=true;
                this.menuShow=false;
                this.editShow=false;
            },
            editEvent(id){
                this.addShow=false;
                this.menuShow=false;
                this.editShow=true;
                var me = this;
                me.$axios.post(me.url+"master/message/get?id="+id)
                    .then(function (result) {
                        me.ruleFormEdit.content=result.data.content
                        me.ruleFormEdit.id=result.data.id
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delEvent(id){
                var me=this;
                me.$axios.get(me.url+"master/message/delete?id="+id)
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
                            me.messageEvent();
                        }
                    })
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        var vuex=sessionStorage.getItem('vuex')
                        this.ruleFormAdd.uid=JSON.parse(vuex).user.id
                        me.$axios.post(me.url+"master/message/set", me.ruleFormAdd)
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
                                    me.messageEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                    me.ruleFormAdd={
                                      content:''
                                    }
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
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/message/edit", me.ruleFormEdit)
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
                                    me.messageEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
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
                this.menuShow=true;
                this.addShow=false;
                this.editShow=false;
            },

        },
        mounted(){
            this.messageEvent();
            this.authorityEvent();
         }
    	}
</script>

<style lang="less">
	@import '../../style/mixin';
    .mar {
        margin-top: 10px;
    }
</style>
