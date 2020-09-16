<template>
    <div>
        <div class="layui-field-box"  v-show="menuShow">
            <div class="layui-box-searchber">
                <a href="javascript:;"  class="layui-btn layui-btn-sm" @click="addEvent" v-show="chang('/master/interface/set')"><i class="layui-icon"></i> 添加接口</a>
                <button class="layui-btn layui-btn-sm"  @click="delAllEvent" v-show="chang('/master/interface/batchdel')">删除选中</button>
                <form class="layui-form-pane">
                    <div class="layui-form">
                        <div class="layui-inline" style="width:110px">
                            <el-select  v-model="status"  placeholder="状态" @change="statusEvent">
                                <el-option  :value="0" label="可加入"></el-option>
                                <el-option  :value="1" label="未完成"></el-option>
                                <el-option  :value="2" label="完成"></el-option>
                                <el-option  :value="3" label="全部"></el-option>
                            </el-select>
                        </div>
                        <div class="layui-inline" style="width:110px">
                            <el-input v-model="keyword" placeholder="关键词" @change="keywordEvent"></el-input>
                        </div>
                    </div>
                </form>
            </div>
            <hr>

            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th width="5%" align="center"><input type="checkbox" v-model="checkAll" @change="changeState"></th>
                    <th width="5%" align="center">ID</th>
                    <th align="center">接口标题</th>
                    <th width="60px" style="text-align:center">状态</th>
                    <th width="70px" style="text-align:center">预估时间</th>
                    <th width="70px" style="text-align:center">完成时间</th>
                    <th width="70px" style="text-align:center">描述</th>
                    <th width="70px" style="text-align:center">备注</th>
                    <th width="70px" style="text-align:center">所属模块</th>
                    <th width="70px" style="text-align:center">所属项目</th>
                    <th width="170px" style="text-align:center">操作</th>
                </tr>
                </thead>
                <tbody id="content">
                <tr v-for="(item,index) in forumList.list" :key="index">
                    <td align="center">
                        <input type="checkbox" v-model="checkModel" :value="item.id">
                    </td>
                    <td align="center">{{index+1}}</td>
                    <td style="padding-left: 20px;"><a target="_blank" href="javascript:;" v-html="item.name"></a></td>

                    <td align="center"><a target="_blank" href="javascript:;">{{item.status}}</a></td>
                    <td align="center">{{item.etime}}天</td>
                    <td align="center">{{item.ctime}}</td>
                    <td align="center" v-html="item.descri"></td>
                    <td align="center">{{item.note}}</td>
                    <td align="center">{{item.mname}}</td>
                    <td align="center">{{item.pname}}</td>
                    <td align="center">

                        <a class="layui-btn layui-btn-normal layui-btn-sm" href="javascript:;" @click="editEvent(item.id)" v-show="chang('/master/interface/edit')">修改</a>
                        <a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delEvent(item.id)" v-show="chang('/master/interface/batchdel')">删除</a>
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
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesEdit" ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">

                            <div class="layui-form-item">
                                <el-form-item label="接口名称" prop="name">
                                    <el-input v-model="ruleFormAdd.name" placeholder="请输入接口名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item">
                                <el-form-item label="预估时间" prop="etime">
                                    <el-input v-model="ruleFormAdd.etime" placeholder="请输入预估时间" type="number"></el-input>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item ">
                                <label class="layui-form-label">内容</label>
                                <div class="layui-input-block">
                                    <div class="edit_container">
                                        <quill-editor v-model="content"
                                                      ref="myQuillEditor"
                                                      class="editer"
                                                      :options="editorOption"
                                                      @ready="onEditorReady($event)">
                                        </quill-editor>
                                    </div>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/interface/set')">添加</el-button>
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

                            <div class="layui-form-item">
                                <el-form-item label="接口名称" prop="name">
                                    <el-input v-model="ruleFormEdit.name" placeholder="请输入接口名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item">
                                <el-form-item label="预估时间" prop="etime">
                                    <el-input v-model="ruleFormEdit.etime" placeholder="请输入预估时间" type="number"></el-input>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <div class="layui-input-block">
                                    <div class="edit_container">
                                        <quill-editor v-model="contentEdit"
                                                      ref="myQuillEditor"
                                                      class="editer"
                                                      :options="editorOption"
                                                      @ready="onEditorReady($event)">
                                        </quill-editor>
                                    </div>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')"  v-show="chang('/master/interface/edit')">更新</el-button>
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
    import EditorBar from '../../components/editor';
    import {quillEditor} from 'vue-quill-editor'
    export default {
        name: 'interfaces',
        data(){
            var title = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入接口名称'));
                }
                callback();
            };
            var tids = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入预估时间'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                editShow:false,
                addShow:false,
                status:'',
                keyword:'',
                forumList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                editorOption: {},
                content:'',
                contentEdit:'',
                ruleFormAdd: {
                    name:'',
                    etime:'',
                    descri:''
                },
                rulesAdd: {
                    name: [
                        {validator: title, trigger: 'blur'},
                    ],
                    etime: [
                        {validator: tids, trigger: 'blur'},
                    ],
                },
                ruleFormEdit: {
                    name:'',
                    etime:'',
                    id:''
                },
                rulesEdit: {
                    name: [
                        {validator: title, trigger: 'blur'},
                    ],
                    etime: [
                        {validator: tids, trigger: 'blur'},
                    ],
                },
                isClear: false,
                zldata: {
                    info:'',
                },
                checkAll:false,
                checkModel:[],
                auth:[],
                initQCode: '',
            }
        },
        components: {
            EditorBar,
            quillEditor
        },
        watch:{
            checkModel: {
                handler () {
                    if(this.checkModel.length==this.forumList.list.length){
                        this.checkAll=true;
                    }else{
                        this.checkAll=false;
                    }
                },
                deep: true
            },
        },
        methods:{
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
            onEditorReady(editor) {
//                console.log('editor ready!', editor)
            },
            addEvent(){
                var me=this;
                me.addShow=true;
                me.menuShow=false;
            },
            changeState(item){
                var me=this;
                me.checkModel=[];
                if(me.checkAll==true){
                    me.forumList.list.forEach(function(value,index){
                        me.checkModel.push(value.id)
                    })
                }
            },
            del(){
                var me=this;
                me.$axios.post(me.url+"master/interface/batchdel",me.checkModel)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true) {
                            me.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            me.checkModel=[];
                            me.forumEvent();
                            me.checkAll=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            delAllEvent(){
                var me=this;
                if(this.checkModel.length>0){
                    this.del()
                }else{
                    me.$message({
                        message:"请选择删除数据",
                        type: 'error'
                    })
                }
            },
            delEvent(id){
                var me=this;
                me.$axios.post(me.url+"master/interface/del?id="+id)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true) {
                            me.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            me.forumEvent();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            forumEvent(){
                var me=this;
                var para={
                    page: this.pageNum,
                    size:this.pageSize,
                    status:this.status,
                    name:this.keyword
                }
                me.$axios.post(me.url+"master/interface/bypage",para)
                    .then(function (result) {
                        me.forumList=result.data;
                        result.data.list.forEach(function(index){
                             if(index.status==0){
                                 index.status='可加入'
                             }
                            if(index.status==1){
                                index.status='未完成'
                            }
                            if(index.status==2){
                                index.status='完成'
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
                this.forumEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.forumEvent();
            },
            statusEvent(val){
                console.log(val)
                this.status=val
                this.forumEvent()
            },
            keywordEvent(val){
                this.keyword=val;
                this.forumEvent()
            },
            editEvent(id){
                this.addShow=false;
                this.menuShow=false;
                this.editShow=true;
                var me = this;
                me.$axios.post(me.url+"master/interface/get?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.ruleFormEdit.name=result.data.pojo.name;
                            me.ruleFormEdit.etime=result.data.pojo.etime;
                            me.ruleFormEdit.id=result.data.pojo.id;
                            me.contentEdit=result.data.pojo.descri
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        var para = {
                            name:this.ruleFormAdd.name,
                            etime: this.ruleFormAdd.etime,
                            descri: this.content,
                        };
                        me.$axios.post(me.url+"master/interface/set",para)
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
                                    me.forumEvent();
                                    me.ruleFormAdd={
                                        name:'',
                                        etime: '',
                                    }
                                    me.content='';
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
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        var para = {
                            name:this.ruleFormEdit.name,
                            etime: this.ruleFormEdit.etime,
                            descri: this.contentEdit,
                            id:this.ruleFormEdit.id
                        };
                        me.$axios.post(me.url+"master/interface/edit",para)
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
                                    me.forumEvent();
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
            this.forumEvent();
            this.authorityEvent();
        }
    }
</script>

<style lang="less">
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 140px;
    }
    .demobtn .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }
    /*打开时文字位置设置*/
    .demobtn .el-switch__label--right {
        z-index: 1;
        right: 5px;
    }
    /*关闭时文字位置设置*/
    .demobtn .el-switch__label--left {
        z-index: 1;
        left: 8px;
    }
    /*显示文字*/
    .demobtn .el-switch__label.is-active {
        display: block;
    }
    .demobtn.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 60px !important;
    }
   .ql-editor{
      height:300px!important;
   }
</style>
