<template>
    <div style="margin-bottom: 10px">
        <div class="layui-form">
            <div class="layui-field-box">
                <div class="layui-box-searchber">
                    <a
                        href="javascript:;"
                        class="layui-btn layui-btn-sm"
                        id="add"
                        @click="addEvent()"
                    >
                        <i class="layui-icon"></i> 添加岗位
                    </a>
                    <el-dialog
                        title="添加岗位"
                        :visible.sync="dialogFormVisible"
                        class="dia"
                        width="20%"
                        :modal-append-to-body='false'
                    >
                        <el-form
                            :model="forms"
                            status-icon
                            :rules="rule"
                            ref="forms"
                            label-width="80px"
                            class="demo-ruleForm mars"
                        >
                            <el-form-item label="岗位名称" prop="position">
                                <el-input
                                    size="small"
                                    v-model.trim="forms.position"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="部门名称" >
                                <el-select
                                    v-model.trim="forms.dept_id"
                                    placeholder="部门名称"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in dept_list"
                                        :key="item.id"
                                        :label="item.dept_name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button
                                @click="dialogFormVisible = false"
                                size="mini"
                            >
                                取消
                            </el-button>
                            <el-button
                                type="primary"
                                @click="submitForms('forms')"
                                v-show="show"
                                size="mini"
                                style="background-color: 1aa094"
                                >确定</el-button
                            >
                            <el-button
                                type="primary"
                                @click="modifyEvent('forms')"
                                v-show="!show"
                                size="mini"
                                >修改</el-button
                            >
                        </div>
                    </el-dialog>
                   
                 <form class="layui-form layui-form-pane">
                        <div class="layui-inline" style="width: 110px">
                            <!--<el-input v-model="username" placeholder="用户名查询" @change="getuser()"></el-input>-->
                             <el-select
                                v-model.trim="forms1.dept_id"
                                placeholder="部门名称"
                                clearable
                            >
                                <el-option
                                    v-for="item in dept_list"
                                    :key="item.id"
                                    :label="item.dept_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                         <div class="layui-inline" style="width: 110px">
                          <el-select
                                v-model.trim="forms1.position"
                                placeholder="岗位名称"
                                clearable
                            >
                                <el-option
                                    v-for="item in job_list"
                                    :key="item.id"
                                    :label="item.position"
                                    :value="item.position"
                                ></el-option>
                            </el-select>
                        </div>
                        <el-button
                            type="primary tijiao"
                            size="small"
                            @click="daoEvent(forms1)"
                            class="tijiao"
                            >查询</el-button
                        >
                    </form>
                </div>
                 <hr />
                   <el-table
                    :data="data_list"
                    stripe
                    style="width: 100%"
                    header-align="center"
                >
                    <el-table-column
                        type="index"
                        label="ID"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="dept_name"
                        label="部门名称"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                  
                    ></el-table-column>
                    <el-table-column
                        prop="position"
                        label="岗位名称"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="AlterJob(scope.$index, scope.row)"
                                >修改</el-button
                            >
                            <el-button
                                size="mini"
                                type="primary"
                                style="background-color: 1aa094"
                                @click="DeleteJob(scope.$index, scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>


</template>
<script>
export default {
    data() {
        return {
            forms: {
                dept_id: "",
                position: "",
            },
            forms1: {
                dept_id: "",
                position: "",
            },
            dept_list: [],
            data_list: [],
            job_list:[],
            dialogFormVisible: false,
            show: true,
            rule: {
                // dept_name: [
                //     {
                //         required: true,
                //         message: "请输入部门名称",
                //         trigger: "blur",
                //     },
                // ],
                position:[{
                    required:true,
                    message:'请输入岗位名称',
                    trigger:'blur'
                }]
            },
        };
    },
    created() {
         this.$axios.post(this.$baseUrl+'leave/auditor')
         .then(res=>{
             console.log(res)
         })
         .catch(err=>{
             console.log(err)
         })

        this.getdeptAll();
        this.getjobAll();
        // this.getjobAll2();
        this.daoEvent();
      
    },
    methods: {
          daoEvent(form1) {
            this.getjobAll2();
        },
        //  //岗位名称的格式化
        //  partNameFormat(row){
        //    this.dept_list.forEach(item => {
        //        if(item.id==row.dept_id){
        //            return item.dept_name
        //        }
        //    });
        //  },
         //岗位修改
        AlterJob(index, row) {
            this.forms.dept_id = row.dept_id;
            this.forms.position = row.position;
            this.dialogFormVisible = true;
            this.show = false;
        },
          modifyEvent(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var that = this;
                    that.$axios
                        .post(this.$baseUrl + `master/position/update`, {
                            dept_id: this.forms.dept_id,
                            position: this.forms.position,
                        })
                        .then(function (res) {
                            if (res.data.result == true) {
                                that.daoEvent();
                                that.$message.success("修改成功");
                                that.dialogFormVisible = false;
                                that.forms.dept_id = "";
                                that.forms.position = "";

                                // that.list();
                            } else {
                                that.$message.error("修改失败");
                            }
                        })
                        .catch(function (error) {
                            console.log("逻辑错误");
                        });
                }
            });
        },
  
         //岗位删除
        DeleteJob(index, row) {
            var that = this;
            // var data={
            //     id:row.id
            // }
             let fordata = new FormData();
            fordata.append('id',row.id)
            that.$axios
                .post(this.$baseUrl + `master/position/del`,fordata)
                .then(function (res) {
                    if (res.data.result == true) {
                        that.getjobAll2();
                        that.$message.success("删除成功");

                        // that.list();
                    } else {
                        that.$message.error("删除失败");
                    }
                })
                .catch(function (error) {
                    console.log("逻辑错误");
                });
        },
         getdeptAll(){
              this.$axios
                .post(this.$baseUrl + "master/dept/list")
                .then((res) => {
                    if (res.data.result == true) {
                        this.dept_list = res.data.pojo;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
         },
        getjobAll() {
            this.$axios
                .post(this.$baseUrl + "master/position/list")
                .then((res) => {
                    if (res.data.result == true) {
                        this.job_list = res.data.pojo;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
          getjobAll2() {
            // var that = this;
            console.log('hah')
            var para = {
                dept_id: this.forms1.dept_id,
                position:this.forms1.position
            };
            this.$axios
                .post(this.$baseUrl + "master/position/list", para)
                .then((res) => {
                    if (res.data.result == true) {
                        this.data_list = res.data.pojo.reverse();
                    }
                    else{
                        console.log('出错啦！')
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },


        addEvent() {
             this.forms={}
            this.show=true
            this.dialogFormVisible = true;
        },
        submitForms(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var that = this;
                    that.$axios
                        .post(this.$baseUrl + `master/position/insert`, this.forms)
                        .then(function (res) {
                            if (res.data.result == true) {
                                that.$message.success("添加成功");
                                that.dialogFormVisible = false;
                                that.forms.position = "";
                                that.forms.dept_id = "";
                                that.daoEvent();
                                // that.list();
                            } else {
                                that.$message.error("添加失败");
                            }
                        })
                        .catch(function (error) {
                            console.log("逻辑错误");
                        });
                }
            });
        },
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
    padding: 0px 20px !important;
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
</style>
