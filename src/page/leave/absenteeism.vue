<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form">
            <div class="layui-field-box"  v-show="menuShow">
                <div class="layui-box-searchber">
                    <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent()" v-show="chang('/master/stafAbsenteeism/set')">
                        <i class="layui-icon"></i> 添加旷工
                    </a>
                    <form class="layui-form layui-form-pane">
                        <div class="layui-inline" style="width: 110px;">
                            <el-input v-model="username" placeholder="用户名查询" @change="getuser()"></el-input>
                        </div>
                    </form>
                </div>
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th align="center">旷工人</th>
                        <th align="center">开始时间</th>
                        <th align="center">结束时间</th>
                        <th align="center">旷工时长</th>
                        <th align="center">旷工原因</th>
                    </tr>
                    </thead>
                    <tbody id="content">

                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{item.username}}</td>
                        <td>{{item.startdate}}{{item.stime}}</td>
                        <td>{{item.enddate}}{{item.etime}}</td>
                        <td>{{item.days}}天</td>
                        <td>{{item.absenteeism_cause}}</td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div class="layui-tab-brief"  v-show="addShow">
                <div class="layui-tab-content">
                    <div class="layui-tab-item layui-show">
                        <div class="layui-form form-container">
                            <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">
                                <div class="layui-form-item" style="margin-bottom:0">
                                    <div class="layui-input-inline">
                                        <el-form-item label="用户名" prop="uid">
                                            <el-select v-model="ruleFormAdd.uid" placeholder="请输入用户名">
                                                <el-option
                                                    v-for="item in optionsUser"
                                                    :key="item.id"
                                                    :label="item.username"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <el-form-item label="开始时间" prop="startdate">
                                            <el-date-picker
                                                v-model="ruleFormAdd.startdate"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择开始时间">
                                            </el-date-picker>
                                     </el-form-item>
                                </div>
                                <div class="layui-form-item" style="margin-bottom:15px">
                                    <label class="layui-form-label">开始日期</label>
                                    <div class="layui-input-inline" style="margin-top:10px;">
                                        <el-radio-group v-model="stime">
                                            <el-radio  :label="0"  @click.native.prevent="clickitemStart(0)">上午</el-radio>
                                            <el-radio  :label="1"  @click.native.prevent="clickitemStart(1)">下午</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                       <el-form-item label="结束时间" prop="enddate">
                                            <el-date-picker
                                                v-model="ruleFormAdd.enddate"
                                                type="date"
                                                value-format="yyyy-MM-dd"
                                                placeholder="选择结束时间">
                                            </el-date-picker>
                                       </el-form-item>
                                </div>
                                <div class="layui-form-item" style="margin-bottom:15px">
                                    <label class="layui-form-label">开结束日期</label>
                                    <div class="layui-input-inline" style="margin-top:10px;">
                                        <el-radio-group v-model="etime">
                                            <el-radio  :label="0"  @click.native.prevent="clickitemEnd(0)">上午</el-radio>
                                            <el-radio  :label="1"  @click.native.prevent="clickitemEnd(1)">下午</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="layui-form-item layui-form-text">
                                    <el-form-item label="旷工原因" prop="description">
                                        <el-input type="textarea" v-model="ruleFormAdd.absenteeism_cause" placeholder="请输入旷工原因"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="btable-paged">
                                    <div class="layui-main">
                                        <div class="formbtngroup">
                                            <el-form-item>
                                                <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/stafAbsenteeism/set')">完成</el-button>
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
        </div>

    </div>
</template>

<script>
    export default {
        name: 'absenteeism',
        data() {
            var username = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                callback();
            };
            var beginTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入开始时间'));
                }
                callback();
            };
            var endTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入结束时间'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                signList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],
                menuShow:true,
                addShow:false,
                username:'',
                optionsUser:[],
                stime:"",
                etime:"",
                ruleFormAdd: {
                    uid:"",
                    absenteeism_cause:"",
                    startdate:"",
                    enddate:""
                },
                rulesAdd: {
                    uid: [
                        {validator: username,trigger: 'blur'},
                    ],
                    startdate: [
                        {validator: beginTime,trigger: 'blur'}
                    ],
                    enddate: [
                        {validator: endTime, trigger: 'blur'}
                    ],
                    absenteeism_cause: [
                        { trigger: 'blur'}
                    ],
                },
            }
        },
        methods: {
//           权限的接口
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
            addEvent(){
                this.menuShow=false;
                this.addShow=true;
                this.stime=0;
                this.etime=0;
            },
            signEvent(){
                var me=this;
                me.$axios.post(me.url+"master/stafAbsenteeism/list?page=" + this.pageNum + "&size=" + this.pageSize+"&username=" + this.username)
                    .then(function (result) {
                        me.signList=result.data.list;
                        me.signList.forEach(function(index){
                            if(index.status==0){
                                index.status='未审核'
                            }
                            if(index.status==1){
                                index.status='已通过'
                            }
                            if(index.status==2){
                                index.status='未通过'
                            }
                            if(index.stime==0){
                                index.stime='上午'
                            }
                            if(index.stime==1){
                                index.stime='下午'
                            }
                            if(index.etime==0){
                                index.etime='上午'
                            }
                            if(index.etime==1){
                                index.etime='下午'
                            }
                        })
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
                this.signEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.signEvent();
            },
            getuser(){
                var me=this;
                me.signEvent()
            },
            clickitemStart(status){
                this.stime=status;

            },
            clickitemEnd(status){
                this.etime=status;
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        var para={
                            uid:me.ruleFormAdd.uid,
                            absenteeism_cause:me.ruleFormAdd.absenteeism_cause,
                            startdate:me.ruleFormAdd.startdate,
                            enddate:me.ruleFormAdd.enddate,
                            stime:me.stime,
                            etime:me.etime
                        }
                        me.$axios.post(me.url+"master/stafAbsenteeism/set", para)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '审核完成',
                                        type: 'success'
                                    })
                                    me.signEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.ruleFormAdd={
                                        uid:"",
                                        absenteeism_cause:"",
                                        startdate:"",
                                        enddate:""
                                    }
                                    me.stime=0;
                                    me.etime=0;
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
            },
        },
        mounted(){
            var me=this;
            me.signEvent();
            me.authorityEvent();
            // 用户权限
            me.$axios.post(me.url+"master/user/list")
                .then(function (result) {
                    me.optionsUser=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .layui-form{
        overflow:scroll;
    }
    .el-input__inner{
        height:30px!important;
    }
    .layui-field-box {
        padding: 5px 15px;
    }
    .page{
        position: fixed;
        bottom:20px;
        right:20px;
        width:100%;
        overflow: scroll;
    }
    .layui-tab-content{
        overflow-y: scroll!important;
    }

    .el-input__inner{
        height:33px;
        line-height:33px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
    }
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
    }
    .layui-form-item .layui-input-inline {
        width:auto;
    }
    .layui-form-item .layui-input-inline {
        width: auto!important;
    }
    .layui-form-item {
        margin-bottom:0px;
    }
</style>
