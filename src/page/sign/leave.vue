<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form">
            <div class="layui-field-box"  v-show="menuShow">
                <div class="layui-box-searchber">

                    <form class="layui-form layui-form-pane">
                        <div class="layui-inline" style="width: 110px;">
                            <el-select v-model="username" filterable placeholder="用户名"  @change="getuser()" clearable>
                                <el-option
                                    v-for="item in userList"
                                    :key="item.username"
                                    :label="item.username"
                                    :value="item.username">
                                </el-option>
                            </el-select>
                            <!--<el-input v-model="username" placeholder="用户名查询" @change="getuser()"></el-input>-->
                        </div>
                        <div class="layui-inline" style="width: 140px;">
                            <el-date-picker
                                v-model="valueYear"
                                type="year"
                                @change="getYear"
                                value-format="yyyy"
                                placeholder="选择年">
                            </el-date-picker>

                        </div>
                        <div class="layui-inline" style="width: 140px;">
                            <el-date-picker
                                v-model="valueMonth"
                                type="month"
                                @change="getMonth"
                                format="MM"
                                value-format="MM"
                                placeholder="选择月">
                            </el-date-picker>
                        </div>
                    
                        <div class="layui-inline" >
                            <div @click="daoEvent()" class="dao" v-if="chang('/master/leave/leaveExcel')">导出</div>
                        </div>

                    </form>
                </div>
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th align="center">请假人</th>
                        <th align="center">请假类型</th>
                        <th align="center">开始时间</th>
                        <th align="center">结束时间</th>
                        <th align="center">请假时长</th>
                        <th align="center">请假原因</th>
                        <th align="center">审核日期</th>
                        <th align="center">审批状态</th>
                        <th align="center">审批人</th>
                        <th align="center">审核留言</th>
                        <th align="center">操作</th>
                    </tr>
                    </thead>
                    <tbody id="content">

                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{item.myname}}</td>
                        <td>{{item.type1}}</td>
                        <td>{{item.startdate}}{{item.stime}}</td>
                        <td>{{item.enddate}}{{item.etime}}</td>
                        <td>{{item.days}}天</td>
                        <td>{{item.reason}}</td>
                        <td>{{item.exdate}}</td>
                        <td>{{item.status}}</td>
                        <td>{{item.exname}}</td>
                        <td>{{item.remark}}</td>
                        <td  v-show="chang('/master/leave/examine')">
                            <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="leaveMenu(item.id,item.myname)"   v-if="item.status!='已通过'">审核</a>
                            <a href="javascript:;"  v-if="item.status=='已通过'">已审核</a>

                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            <div class="layui-tab-brief"  v-show="addShow">
                <div class="layui-tab-content">
                    <div class="layui-tab-item layui-show">
                        <div class="layui-form form-container">
                            <el-form :model="ruleFormAdd" status-icon ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">
                                <div class="layui-form-item" style="margin-bottom:0">
                                    <div class="layui-input-inline">
                                        <el-form-item label="请假人" prop="name">
                                            <el-input v-model="ruleFormAdd.name" placeholder="请输入请假人" :disabled="true"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="layui-form-item" style="margin-bottom:15px">
                                    <label class="layui-form-label">审核状态</label>
                                    <div class="layui-input-inline" style="margin-top:10px;">
                                        <el-radio-group v-model="ruleFormAdd.status">
                                            <el-radio  :label="1"  @click.native.prevent="clickitem(1)">通过</el-radio>
                                            <el-radio  :label="2"  @click.native.prevent="clickitem(2)">不通过</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>


                                <div class="layui-form-item layui-form-text">
                                    <el-form-item label="审核留言" prop="description">
                                        <el-input type="textarea" v-model="ruleFormAdd.remark" placeholder="请输入审核留言"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="btable-paged">
                                    <div class="layui-main">
                                        <div class="formbtngroup">
                                            <el-form-item>
                                                <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/leave/examine')">完成</el-button>
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
            <div class="block page" style="text-align: center" v-show="pageShow">
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

    </div>
</template>

<script>
    export default {
        name: 'leave',
        data() {
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
                ruleFormAdd: {
                    id:"",
                    remark:"",
                    status:""
                },
                username:'',
                valueYear:'',
                valueMonth:'',
                userList:[],
                option:[]
            }
        },
        methods: {
            leavetype(){
                var me=this;
                me.$axios.post(me.url+"/leave/leaveType")
                    .then(function (result) {
                        me.option=result.data;
                    })
            },
            lists(){
                //用户列表
                var me = this;
                me.$axios.post(me.url+"master/user/list")
                    .then(function (result) {
                        me.userList=result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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
            signEvent(){
                var me=this;
                if(this.valueYear==null){
                    this.valueYear=''
                }
                if(this.valueMonth==null){
                    this.valueMonth=''
                }
                let formData = new FormData();
                formData.append('myname',me.username );
                formData.append('year', me.valueYear);
                formData.append('month',me.valueMonth);
                formData.append('page',me.pageNum);
                formData.append('size',me.pageSize);
//             请假管理
                me.$axios.post(me.url+"master/leave/all",formData)
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
                            me.option.forEach(function(item){
                                if(index.type==item.id){
                                    index.type1=item.type
                                }
                            })
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
           clickitem(val){
               this.ruleFormAdd.status=val
           },
            leaveMenu(id,name){
                this.menuShow=false;
                this.addShow=true;
                this.pageShow=false;
                this.ruleFormAdd.status=1
                this.ruleFormAdd.name=name
                this.ruleFormAdd.id=id;
                // this.ruleFormAdd.leader_id='4'
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        if(me.ruleFormAdd.status==2){
                            if(me.ruleFormAdd.remark==''){
                                me.$message.error('请输入审核留言');
                                return;
                            }
                        }
                        me.$axios.post(me.url+"master/leave/examine", me.ruleFormAdd)
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
                                    me.pageShow=true;
                                    me.ruleFormAdd={
                                        id:"",
                                        remark:"",
                                        status:""
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
            resetForm(formName) {
                this.menuShow=true;
                this.addShow=false;
                this.pageShow=true;
            },
            getuser(){
                var me=this;
                me.signEvent()
            },
            getYear(val){
                this.valueYear=val
                if(this.valueYear==null){
                    this.valueYear=''
                }
                if(this.valueMonth==null){
                    this.valueMonth=''
                }
                if(this.valueMonth=="" &&this.valueYear==''||this.valueMonth!="" &&this.valueYear!=''){
                    this.signEvent()
                }
            },
            getMonth(val){
                this.valueMonth=val
                if(this.valueYear==null){
                    this.valueYear=''
                }
                if(this.valueMonth==null){
                    this.valueMonth=''
                }
                if(this.valueMonth=="" &&this.valueYear==''||this.valueMonth!="" &&this.valueYear!=''){
                    this.signEvent()
                }
            },
            daoEvent(){
                var me=this;
                if(me.signList==undefined){
                    this.$message.error("没有可以导出的数据");
                    return;
                }
                if(me.signList.length ==0||me.signList.length ==undefined){
                    this.$message.error("没有可以导出的数据");
                }else{
                    me.$axios({ 
                        method: 'post',
                        url: me.url+"/master/leave/leaveExcel", 
                        data:{
                            myname:this.username,
                            year:this.valueYear,
                            month :this.valueMonth
                        },
                        responseType: 'blob', 
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => { 
                        const BLOB = res.data

                        const fileReader = new FileReader()
                        
                        fileReader.readAsDataURL(BLOB)
                    fileReader.onload = (event) => {
                        let a = document.createElement('a')
                        a.download = `请假调休.xls`
                        a.href = event.target.result
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                    }
                })
                }
            }
        },
        mounted(){
            this.signEvent();
            this.authorityEvent();
            this.lists();
            this.leavetype();
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
        width:140px;
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
    .dao{
        width:60px;
        height:33px;
        border: 1px solid #dcdfe6;
        line-height:33px;
        text-align: center;
    }
</style>
