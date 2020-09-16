<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form" v-show="menuShow">
            <div class="layui-field-box">
                <div class="layui-box-searchber">
                    <a href="javascript:;"  class="layui-btn layui-btn-sm" @click="addEvent" v-show="chang('/master/monthlyAssess/set')"><i class="layui-icon"></i> 添加工资计算</a>
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
                        <div class="layui-inline" style="width: 110px;">
                            <el-select v-model="position_id"  placeholder="职位"  @change="getposition()" clearable>
                                <el-option
                                    v-for="item in positionList"
                                    :key="item.id"
                                    :label="item.position"
                                    :value="item.id">
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
                        <!--<div class="layui-inline" style="width: 140px;">-->
                        <!--<el-date-picker-->
                        <!--type="date"-->
                        <!--v-model="valueDate"-->
                        <!--@change="getDate"-->
                        <!--value-format="yyyy-MM-dd"-->
                        <!--placeholder="选择日期">-->
                        <!--</el-date-picker>-->
                        <!--</div>-->
                        <div class="layui-inline" >
                            <div @click="daoEvent()" class="dao" v-if="chang('/master/monthlyAssess/monthlyAssessExcel')">导出</div>
                        </div>
                    </form>
                </div>
                <hr>
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th align="center">ID</th>
                        <th align="center">用户名</th>
                        <th align="center">日期</th>
                        <th align="center">职务</th>
                        <th align="center">基本工资</th>
                        <th align="center">应出勤天数</th>
                        <th align="center">实际出勤天数</th>
                        <th align="center">应发工资</th>
                        <th align="center">加班费</th>
                        <th align="center">餐补</th>
                        <th align="center">交通补助</th>
                        <th align="center">全勤奖</th>
                        <th align="center">绩效</th>
                        <th align="center">其他</th>
                        <th align="center">奖励</th>
                        <th align="center">实际工资</th>
                        <th align="center">养老保险</th>
                        <th align="center">失业保险</th>
                        <th align="center"> 医疗保险</th>
                        <th align="center">住房公积金</th>
                        <th align="center">子女教育扣除</th>
                        <th align="center">赡养扣除</th>
                        <th align="center">租房扣除</th>
                    </tr>
                    </thead>
                    <tbody id="content">
                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.year}}-{{item.month}}</td>
                        <td>{{item.position_id}}</td>
                        <td>{{item.base_pay}}</td>
                        <td>{{item.ought_number}}</td>
                        <td>{{item.practical_number}}</td>
                        <td>{{item.ought_salary}}</td>
                        <td>{{item.overtime_pay}}</td>
                        <td>{{item.meal_subsidy}}</td>
                        <td>{{item.traffic_allowance}}</td>
                        <td>{{item.attendance_bonus}}</td>
                        <td>{{item.performance}}</td>
                        <td>{{item.other}}</td>
                        <td>{{item.award}}</td>
                        <td>{{item.practical_salary}}</td>
                        <td>{{item.endowment_insurance}}</td>
                        <td>{{item.unemploymen_insurance}}</td>
                        <td>{{item.medical_insurance}}</td>
                        <td>{{item.housing_fund}}</td>
                        <td>{{item.education}}</td>
                        <td>{{item.support}}</td>
                        <td>{{item.renting}}</td>
                    </tr>
                    </tbody>
                </table>
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
        <div class="layui-tab-brief" v-show="addShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="出勤天数" prop="ought_number">
                                        <el-input v-model="ruleFormAdd.ought_number" placeholder="请输入出勤天数" type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="年份" prop="year" class="widths">
                                        <el-date-picker
                                            v-model="ruleFormAdd.year"
                                            type="year"
                                            @change="getYear"
                                            value-format="yyyy"
                                            placeholder="选择年">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="月份" prop="month" class="widths">
                                        <el-date-picker
                                            v-model="ruleFormAdd.month"
                                            type="month"
                                            @change="getMonth"
                                            format="MM"
                                            value-format="MM"
                                            placeholder="选择月">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/monthlyAssess/set')">添加</el-button>
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
</template>

<script>
    export default {
        name: 'salary',
        data() {
            var ought = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入出勤天数'));
                }
                callback();
            };
            var monthform = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入月份'));
                }
                callback();
            };
            var yearform = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入年份'));
                }
                callback();
            };
            return {
                url:this.GLOBAL.baseUrl,
                signList:[],
                userList:[],
                options:[],
                value: '',
                username:'',
                position_id:"",
                valueYear:'',
                valueMonth:'',
                valueDate:'',
                time:"",
                id:'',
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],
                menuShow:true,
                addShow:false,
                ruleFormAdd: {
                    ought_number:"",
                    month:"",
                    year:"",

                },
                rulesAdd: {
                    ought_number: [
                        {validator: ought, trigger: 'blur'}
                    ],
                    month: [
                        {validator: monthform, trigger: 'blur'}
                    ],
                    year: [
                        {validator: yearform, trigger: 'blur'}
                    ],
                },
                positionList:[]

            }
        },
        methods: {
            lists(){
                var me = this;
                me.$axios.post(me.url+"master/user/list")
                    .then(function (result) {
                        me.userList=result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            position(){
                var me = this;
                me.$axios.post(me.url+"master/position/getPosition")
                    .then(function (result) {
                        me.positionList=result.data
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
                var para ={
                    page:this.pageNum,
                    size:this.pageSize,
                    username:this.username,
                    position_id:this.position_id,
                    year:this.valueYear,
                    month:this.valueMonth,
                }
                me.$axios.post(me.url+"master/monthlyAssess/getList",para)
                    .then(function (result) {
                        me.signList=result.data.list;
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
            getposition(){
                var me=this;
                me.signEvent()
            },
//           年
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
            addEvent(){
                var me=this;
                me.menuShow=false;
                me.addShow=true;
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/monthlyAssess/set", me.ruleFormAdd)
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
                                    me.signEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                    me.ruleFormAdd={
                                        ought_number:"",
                                        month:"",
                                        year:"",
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
                this.addShow=false;
                this.menuShow=true;
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
                    me.$axios({ // 用axios发送post请求
                        method: 'post',
                        url: me.url+"master/monthlyAssess/monthlyAssessExcel", // 请求地址
                        data:{
                            username:this.username,
                            year:this.valueYear,
                            month :this.valueMonth
                        },
                        responseType: 'blob', // 表明返回服务器返回的数据类型'arraybuffer'"blob"
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => { // 处理返回的文件流
                        const BLOB = res.data
                        // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件的内容
                        const fileReader = new FileReader()
                        // 开始读取指定的Blob中的内容。读取完成result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
                        fileReader.readAsDataURL(BLOB)
                    // 处理load事件，该事件在读取操作完成时触发
                    fileReader.onload = (event) => {
                        let a = document.createElement('a')
                        a.download = `薪资记录.xls`
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
            var me=this;
            me.signEvent();
            me.authorityEvent();
            me.lists();
            me.position();
        }
    }
</script>

<style lang="less" scoped>
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
    .layui-form-item .layui-input-inline {
        width: auto!important;
    }
    .dao{
        width:60px;
        height:33px;
        border: 1px solid #dcdfe6;
        line-height:33px;
        text-align: center;
    }
    .widths .el-form-item__content .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
    }
</style>
