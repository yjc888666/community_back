<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menu">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent()"  v-show="chang('/master/grade/set')">
                <i class="layui-icon">&#xe608;</i> 添加会员等级
            </a>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th style="width: 30px;">ID</th>
                    <th>名称</th>
                    <th>积分</th>

                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in memberList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.score}}</td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)"  v-show="chang('/master/grade/edit')">编辑</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delEvent(item.id,index)"  v-show="chang('/master/grade/delete')">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="layui-tab-brief" v-show="add">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container" >
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="ruleFormAdd.name" placeholder="请输入等级名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="积分" prop="score">
                                        <el-input v-model="ruleFormAdd.score" placeholder="积分为整数"  type="number"></el-input>
                                    </el-form-item>
                                </div>
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

        <div class="layui-tab-brief" v-show="edit">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container" >
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="ruleFormEdit.name" placeholder="请输入等级名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="积分" prop="score">
                                        <el-input v-model="ruleFormEdit.score" placeholder="积分为整数"  type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">添加</el-button>
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
        name: 'memberLevel',
        data(){
//            添加
            var addname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入等级名称'));
                }
                callback();
            };
            var addscore = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入积分'));
                }else{
                    callback();
                }

            };
            return {
                url: this.GLOBAL.baseUrl,
                menu: true,
                memberList:[],
                add:false,
                edit:false,
                ruleFormAdd: {
                    name:'',
                    score:''
                },
                rulesAdd: {
                    name: [
                        {validator: addname, trigger: 'blur'},
                    ],
                    score:[
                        {validator: addscore,trigger: 'blur'},
                    ]
                },
                ruleFormEdit: {
                    name:'',
                    score:'',
                    id:''
                },
                rulesEdit: {
                    name: [
                        {validator: addname, trigger: 'blur'},
                    ],
                    score:[
                        {validator: addscore,trigger: 'blur'},
                    ]
                },
                auth:[],
            }
        },
        created(){

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
            listMenu(){
                // 会员的列表
                var me=this;
                me.$axios.post(me.url+"master/grade/list")
                    .then(function (result) {
                        me.memberList=result.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        console.log(me.ruleFormAdd)
                        me.$axios.post(me.url+"master/grade/set", me.ruleFormAdd)
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
                                    me.menu=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.listMenu();
                                    me.ruleFormAdd={
                                        name:'',
                                        score:''
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
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        console.log(me.ruleFormEdit)
                        me.$axios.post(me.url+"master/grade/edit", me.ruleFormEdit)
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
                                    me.menu=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.listMenu();
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
            addEvent(){
                this.add=true;
                this.edit=false;
                this.menu=false;
            },
            editEvent(id){
                this.add=false;
                this.edit=true;
                this.menu=false;
                 var me=this;
//                会员的编辑
                me.$axios.post(me.url+"master/grade/get?id="+id)
                    .then(function (result) {
                        console.log(result.data.name)
                      me.ruleFormEdit.name=result.data.name;
                      me.ruleFormEdit.score=result.data.score;
                      me.ruleFormEdit.id=result.data.id
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delEvent(id,index){
                var me=this;
//                会员的编辑
                me.$axios.post(me.url+"master/grade/delete?id="+id)
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
                            me.memberList.splice(index,1);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            var me=this;
            me.listMenu();
            me.authorityEvent();
        }
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .layui-form-item .layui-input-inline {
        width:auto!important;
    }
    .layui-form-item{
        margin-bottom:0;
    }

</style>
