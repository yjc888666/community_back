<template>
    <div style="margin-bottom: 10px">
       <div class="layui-form">
            <div class="layui-field-box">
                <div class="layui-box-searchber">
                    <form class="layui-form layui-form-pane">
                        <el-date-picker
                            v-model="forms1.year"
                            type="year"
                            value-format="yyyy"
                            placeholder="选择年"
                        >
                        </el-date-picker>

                        <el-date-picker
                            v-model="forms1.month"
                            type="month"
                            format="MM"
                            value-format="MM"
                            placeholder="选择月"
                        >
                        </el-date-picker>

                        <div class="right">
                            <el-button
                                type="primary tijiao"
                                size="small"
                                @click="daoEvent(forms1)"
                                class="tijiao"
                                style="padding-left: 10px"
                                >查询</el-button
                            >
                        </div>
                    </form>
                </div>

                <el-table
                    :data="
                        data_list.slice(
                            (currentPage - 1) * pageSize,
                            currentPage * pageSize
                        )
                    "
                    stripe
                    style="width: 100%; padding-top: 10px"
                    header-align="center"
                    :max-height="getTableHeight"
                >
                    <el-table-column
                        type="index"
                        label="ID"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="year"
                        label="年份"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="month"
                        label="月份"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="w_day"
                        label="出勤天数"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="rest"
                        label="休息天数"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="man_hour"
                        label="平均工时"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="late"
                        label="迟到"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="leave_e"
                        label="早退"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="absent"
                        label="旷工"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="over_time"
                        label="加班"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="outwork"
                        label="外出"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column> 
                    <el-table-column
                        prop="surplus"
                        label="之前加班结余"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                     <el-table-column
                        prop="count"
                        label="总共加班结余"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                       <el-table-column
                        prop="adjust"
                        label="调休天数"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="AlterInfo(scope.$index, scope.row)"
                                >修改</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div
                class="block page"
                style="text-align: center"
                v-show="pageShow"
            >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mytotal"
                >
                </el-pagination>
            </div>
            <el-dialog
                title="更改"
                :visible.sync="dialogFormVisible"
                class="dia"
                width="30%"
                :modal-append-to-body="false"
            >
                <div class="center">{{ alterInfo.username }}的出勤信息</div>
                <el-form
                    :model="alterInfo"
                    status-icon
                    :rules="rule"
                    ref="alterInfo"
                    label-width="100px"
                    class="demo-ruleForm mars"
                >
                    <el-form-item label="出勤天数" prop="w_day">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.w_day"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="休息天数" prop="rest">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.rest"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="平均工时" prop="man_hour">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.man_hour"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="迟到" prop="late">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.late"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="早退" prop="leave_e">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.leave_e"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="旷工" prop="absent">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.absent"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="加班" prop="over_time">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.over_time"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="外出" prop="outwork">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.outwork"
                        ></el-input>
                    </el-form-item>
                      <el-form-item label="之前加班结余" prop="surplus">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.surplus"
                        ></el-input>
                    </el-form-item>
                       <el-form-item label="总共加班结余" prop="count">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.count"
                        ></el-input>
                    </el-form-item>
                        <el-form-item label="调休天数" prop="adjust">
                        <el-input
                            size="small"
                            v-model.trim="alterInfo.adjust"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="mini">
                        取消
                    </el-button>
                    <el-button
                        type="primary"
                        @click="submitForms('alterInfo')"
                        size="mini"
                        style="background-color: 1aa094"
                        >修改</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
           screenHeight: document.body.clientHeight,
           dialogFormVisible:false,
            forms1: {
                year: "",
                month: "",
            },
            alterInfo:{
              id:'',
              uid:'',
              w_day:'',
              rest:'',
              man_hour:'',
              late:'',
              leave_e:'',
              absent:'',
              over_time:'',
              outwork:'',
              surplus:'',
              count:'',
              adjust:''
            },
            username:'',
            data_list: [],
            currentPage: 1,
            mytotal: 0,
            pageSize: 10,
            pageShow:true,
            rule:{
                w_day:[{
                    required:true,
                    message:'请输入出勤天数',
                    trigger:'blur'
                }],
                rest:[{
                    required:true,
                    message:'请输入休息天数',
                    trigger:'blur'
                }],
                man_hour:[{
                    required:true,
                    message:'请输入平均工时',
                    trigger:'blur'
                }],
                late:[{
                    required:true,
                    message:'请输入迟到次数',
                    trigger:'blur'
                }],
                leave_e:[{
                    required:true,
                    message:'请输入早退次数',
                    trigger:'blur'
                }],
                absent:[{
                    required:true,
                    message:'请输入旷工次数',
                    trigger:'blur'
                }],
                over_time:[{
                    required:true,
                    message:'请输入加班次数',
                    trigger:'blur'
                }],
                outwork:[{
                    required:true,
                    message:'请输入外出次数',
                    trigger:'blur'
                }],
            }
        };
    },
    computed:{
    getTableHeight() {
    return this.screenHeight-100
  },
    },
    mounted(){
        this.daoEvent(this.forms1)
    },
    methods: {

        daoEvent(forms1) {
            this.getInfoByWorker(forms1);
        },
        //根据查询的条件获取查询出勤的详细数据
        getInfoByWorker(forms1) {
            var that = this;
            this.$axios
                .post(
                    this.$baseUrl+'master/attendance/getlist',
                    forms1
                )
                .then((res) => {
                    if (res.data.result == true) {
                        this.data_list = res.data.pojo;
                         this.mytotal=this.data_list.length;
                    } else {
                        that.$message.error(res.data.msg);
                    }
                })
                .catch((err) => {
                    console.log("逻辑错误");
                });
        },
        //分页
        handleSizeChange(val) {
            this.pageSize = val;

        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        //更改出勤的信息
        AlterInfo(index,row){
          this.alterInfo=row;
          this.username=row.username;
          this.dialogFormVisible=true

        },
        //向服务器发送修改的网络请求
        submitForms(formName){
         this.$refs[formName].validate((valid) => {
                if (valid) {
                 var para={
                id:this.alterInfo.id,
                uid:this.alterInfo.uid,
                w_day:this.alterInfo.w_day,
                rest:this.alterInfo.rest,
                 man_hour:this.alterInfo.man_hour,
                 late:this.alterInfo.late,
                 leave_e:this.alterInfo.leave_e,
                 absent:this.alterInfo.absent,
                 over_time:this.alterInfo.over_time,
                 outwork:this.alterInfo.outwork,
                 surplus:this.alterInfo.surplus,
                 count:this.alterInfo.count,
                 adjust:this.alterInfo.adjust
            }
            this.$axios.post(this.$baseUrl+'master/attendance/update',para)
            .then(res=>{
                if(res.data.result==true){
                    this.alterInfo={};
                    this.$message.success('修改成功')
                    this.dialogFormVisible=false
                }
                else{
                    this.$message.error(res.data.msg)
                }
            })
            .catch(err=>{
                console.log(err)
            })
            }
      })

        }
    },
};
</script>
<style scoped>
.el-input__inner {
    height: 20px !important;
    line-height: 20px !important;
}

.el-button.is-active,
.el-button:active {
    background: #179898;
    border-color: #179898;
    color: #fff;
}

.el-button:focus,
.el-button:hover {
    /* background: #179898; */
    border-color: #179898;
    /* color: #179898; */
}

.el-button--primary {
    color: #fff;
    background-color: #179898;
    border-color: #179898;
}

.dia {
    z-index: 999;
}

.dia .el-dialog .el-dialog__header {
    width: 95%;
    margin: 0 auto;
    padding: 10px 0;
    padding-top: 15px;
    margin-bottom: 5px;
    border-bottom: #179898 dotted 2px;
}
.dia .el-dialog .el-dialog__header .el-dialog__title {
    font-size: 14px;
    color: #179898;
    font-weight: bold;
}
.dia .el-dialog .el-dialog__body {
    padding: 10px 20px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.mars {
    margin-top: 20px;
}
.dia .el-select {
    width: 100%;
}
.right {
    float: right;
    padding-left: 10px;
    padding-right: 20px;
}
.center {
    margin: 0 auto;
    text-align: center;
    color: #179898;
}
</style>
