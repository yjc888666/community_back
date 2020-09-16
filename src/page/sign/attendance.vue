<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form">
            <div class="layui-field-box">
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
                            <div @click="daoEvent()" class="dao" v-if="chang('/master/sign/signExcel')">导出</div>
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
                        <th align="center">签入时间</th>
                        <th align="center">签入ip</th>
                        <th align="center">签入备注</th>
                        <th align="center">签出时间</th>
                        <th align="center">签出ip</th>
                        <th align="center">签出备注</th>
                        <th align="center">时长</th>

                    </tr>
                    </thead>
                    <tbody id="content">

                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.date}}{{item.week}}</td>
                        <td>{{item.sign_in_time}}</td>
                        <td>{{item.sign_in_ip}}</td>
                        <td>{{item.sign_in_note}}</td>
                        <td>{{item.sign_out_time}}</td>
                        <td>{{item.sign_out_ip}}</td>
                        <td>{{item.sign_out_note}}</td>
                        <td>{{item.times}}</td>
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

    </div>
</template>

<script>
    export default {
        name: 'sign',
        data() {
            return {
                url:this.GLOBAL.baseUrl,
                signList:[],
                userList:[],
                options:[],
                value: '',
                username:'',
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
                if(this.valueDate==null){
                    this.valueDate=''
                }
//            签到管理
                var para ={
                    page:this.pageNum,
                    size:this.pageSize,
                    username:this.username,
                    year:this.valueYear,
                    month:this.valueMonth,
                }
                me.$axios.post(me.url+"master/sign/getByKey",para)
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
            getDate(val){
                this.valueDate=val
                if(this.valueDate==null){
                    this.valueDate=''
                }
                if(this.valueDate==val){
                    this.valueYear='';
                    this.valueMonth=''
                }
                this.signEvent()
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
                        url: me.url+"/master/sign/signExcel", 
                        data:{
                            username:this.username,
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
                        a.download = `迟到早退.xls`
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
//            用户列表
            me.$axios.post(me.url+"master/user/list")
                .then(function (result) {
                    me.userList=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
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
    .dao{
        width:60px;
        height:33px;
        border: 1px solid #dcdfe6;
        line-height:33px;
        text-align: center;
    }
</style>
