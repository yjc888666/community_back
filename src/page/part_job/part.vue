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
                        <i class="layui-icon"></i> 添加部门
                    </a>
                    <el-dialog
                        title="添加部门"
                        :visible.sync="dialogFormVisible"
                        class="dia"
                        width="20%"
                        :modal-append-to-body="false"
                    >
                        <el-form
                            :model="forms"
                            status-icon
                            :rules="rule"
                            ref="forms"
                            label-width="80px"
                            class="demo-ruleForm mars"
                        >
                            <el-form-item label="部门名称" prop="dept_name">
                                <el-input
                                    size="small"
                                    v-model.trim="forms.dept_name"
                                ></el-input>
                            </el-form-item>
                             <el-form-item label="上级部门" prop="pid">
                                <el-select
                                v-model.trim="forms.pid"
                                placeholder="上级部门"
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
                                v-model.trim="forms1.dept_name"
                                placeholder="部门名称"
                                clearable
                            >
                                <el-option
                                    v-for="item in dept_list"
                                    :key="item.id"
                                    :label="item.dept_name"
                                    :value="item.dept_name"
                                ></el-option>
                            </el-select>
                        </div>
                        <el-button
                            type="primary tijiao"
                            size="small"
                            @click="daoEvent(forms1.dept_name)"
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
                        prop="pid"
                        label="上级部门"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                        :formatter="pidFormat"
                    ></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="AlterPart(scope.$index, scope.row)"
                                >修改</el-button
                            >
                            <el-button
                                size="mini"
                                type="primary"
                                style="background-color: 1aa094"
                                @click="DeletePart(scope.$index, scope.row)"
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
            forms1: {
                dept_name: "",
            },
            forms: {
                dept_name: "",
                pid:''
            },
            id: "",
            dept_list: [],
            data_list: [],
            dialogFormVisible: false,
            show: true,
            rule: {
                dept_name: [
                    {
                        required: true,
                        message: "请输入部门名称",
                        trigger: "blur",
                    },
                ],
                 pid: [
                    {
                        required: true,
                        message: "请输入上级部门",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
        this.getpartAll();
        this.getpartAll2();
    },
    methods: {
       //上级部门的格式化
       pidFormat(row,column){
            for(var i=0,l=this.dept_list.length;i<l;i++){
              if(row.pid==this.dept_list[i].id){
              return this.dept_list[i].dept_name
              }
              }
       },

        daoEvent(name) {
            this.getpartAll2(name);
        },
        getpartAll(name) {
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

        getpartAll2(name) {
            var that = this;
            var para = {
                dept_name: name,
            };
            that.$axios
                .post(this.$baseUrl + "master/dept/list", para)
                .then((res) => {
                    if (res.data.result == true) {
                        this.data_list = res.data.pojo;
                    
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
        getuser() {},
        submitForms(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var that = this;
                    that.$axios
                        .post(this.$baseUrl + `master/dept/insert`, this.forms)
                        .then(function (res) {
                            if (res.data.result == true) {
                                that.$message.success("添加成功");
                                that.dialogFormVisible = false;
                                that.forms.departName = "";
                                that.daoEvent();
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

        //部门修改
        AlterPart(index, row) {
            this.id = row.id;
            this.forms.dept_name = row.dept_name;
            this.forms.pid = row.pid;
            this.dialogFormVisible = true;
            this.show = false;
        },
        modifyEvent(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var that = this;
                    that.$axios
                        .post(this.$baseUrl + `master/dept/update`, {
                            id: this.id,
                            pid:this.forms.pid,
                            dept_name: this.forms.dept_name,
                        })
                        .then(function (res) {
                            if (res.data.result == true) {
                                that.getpartAll2();
                                that.$message.success("修改成功");
                                that.dialogFormVisible = false;
                                this.id = "";
                                that.forms.departName = "";

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

        //部门删除
        DeletePart(index, row) {
           this.$confirm('您确定要删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
           })
           .then(()=>{
             
            let fordata = new FormData();
            fordata.append('id',row.id)
            var that = this;
            // let a=JSON.parse(data)
            that.$axios
                .post(this.$baseUrl + `master/dept/del`, fordata)
                .then(function (res) {
                    if (res.data.result == true) {
                        that.getpartAll2();
                        that.$message.success("删除成功");

                        // that.list();
                    } else {
                        that.$message.error("删除失败");
                    }
                })
                .catch(function (error) {
                    console.log("逻辑错误");
                });
           })
           .catch(()=>{
               this.$message({
            type: 'info',
            message: '已取消删除'
          });
           })

            
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
