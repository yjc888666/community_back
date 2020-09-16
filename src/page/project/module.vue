<template>
    <div>
        <div class="layui-field-box"  v-show="menuShow">
            <div class="layui-box-searchber">
                <a href="javascript:;"  class="layui-btn layui-btn-sm" @click="addEvent"  v-show="chang('/master/module/set')"><i class="layui-icon"></i> 添加模块</a>
                <button class="layui-btn layui-btn-sm"  @click="delAllEvent" v-show="chang('/master/module/del')">删除选中</button>
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
                    <th align="center">模块标题</th>
                    <th width="60px" style="text-align:center">开发人</th>
                    <th width="60px" style="text-align:center">状态</th>
                    <th width="70px" style="text-align:center">开始时间</th>
                    <th width="70px" style="text-align:center">结束时间</th>
                    <th width="70px" style="text-align:center">预估时间</th>
                    <th width="70px" style="text-align:center">模块进度</th>
                    <th width="70px" style="text-align:center">已开发时间</th>
                    <th width="70px" style="text-align:center">所属项目</th>
                    <th width="300px" style="text-align:center">操作</th>
                </tr>
                </thead>
                <tbody id="content">
                <tr v-for="(item,index) in forumList.list" :key="index">
                    <td align="center">
                        <input type="checkbox" v-model="checkModel" :value="item.id">
                    </td>
                    <td align="center">{{index+1}}</td>
                    <td style="padding-left: 20px;"><a target="_blank" href="javascript:;" v-html="item.name"></a></td>
                    <td align="center">{{item.developers}}</td>
                    <td align="center">{{item.status}}</td>
                    <td align="center">{{item.stime}}</td>
                    <td align="center">{{item.ctime}}</td>
                    <td align="center">{{item.etime}}天</td>
                    <td align="center">{{item.progress}}%</td>
                    <td align="center">{{item.atime}}</td>
                    <td align="center">{{item.pname}}</td>
                    <td align="center">
                        <a class="layui-btn layui-btn-normal layui-btn-sm" href="javascript:;" @click="editEvent(item.id)" v-show="chang('/master/module/edit')">修改</a>
                        <a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delEvent(item.id)" v-show="chang('/master/module/del')">删除</a>
                        <a class="layui-btn layui-btn-normal layui-btn-sm" href="javascript:;" @click="joinEvent(item.id)" v-show="chang('/master/module/add')">加入</a>
                        <a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="removeEvent(item.id)" v-show="chang('/master/module/remove')">移除</a>
                        <a class="elementdel layui-btn  layui-btn-sm" href="javascript:;" @click="settingEvent(item.id)" v-show="chang('/master/module/developers')">开发人</a>
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
                                <el-form-item label="模块名称" prop="name">
                                    <el-input v-model="ruleFormAdd.name" placeholder="请输入模块名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/module/set')">添加</el-button>
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
                                <el-form-item label="模块名称" prop="name">
                                    <el-input v-model="ruleFormEdit.name" placeholder="请输入模块名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')" v-show="chang('/master/module/edit')">更新</el-button>
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
        <div class="layui-field-box" v-show="joinShow">
            <button class="layui-btn layui-btn-sm"  @click="joinAllEvent" v-show="chang('/master/module/add')">全部加入</button>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th width="5%" align="center"><input type="checkbox" v-model="checkAllJoin" @change="changeStateJoin"></th>
                    <th width="5%" align="center">ID</th>
                    <th align="center">接口标题</th>
                    <th width="60px" style="text-align:center">状态</th>
                    <th width="70px" style="text-align:center">预估时间</th>
                    <th width="70px" style="text-align:center">完成时间</th>
                    <th width="70px" style="text-align:center">描述</th>
                    <th width="70px" style="text-align:center">备注</th>
                    <th width="70px" style="text-align:center">所属模块</th>
                    <th width="70px" style="text-align:center">所属项目</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in joinList.list" :key="index">
                    <td align="center">
                        <input type="checkbox" v-model="checkModelJoin" :value="item.id">
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
                </tr>
                </tbody>
            </table>
            <div class="block page"  style="position: fixed;bottom:20px;left:250px;" v-show="pageShow">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10,20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mytotalJoin">
                </el-pagination>
            </div>
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="submitFormJoin" v-show="chang('/master/module/add')">加入</el-button>
                        <el-button @click="resetForm">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="layui-field-box" v-show="removeShow">
            <button class="layui-btn layui-btn-sm"  @click="removeAllEvent" v-show="chang('/master/module/remove')">全部移除</button>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th width="5%" align="center"><input type="checkbox" v-model="checkAllRemove" @change="changeStateRemove"></th>
                    <th width="5%" align="center">ID</th>
                    <th align="center">接口标题</th>
                    <th width="60px" style="text-align:center">状态</th>
                    <th width="70px" style="text-align:center">预估时间</th>
                    <th width="70px" style="text-align:center">完成时间</th>
                    <th width="70px" style="text-align:center">描述</th>
                    <th width="70px" style="text-align:center">备注</th>
                    <th width="70px" style="text-align:center">所属模块</th>
                    <th width="70px" style="text-align:center">所属项目</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in removeList.list" :key="index">
                    <td align="center">
                        <input type="checkbox" v-model="checkModelRemove" :value="item.id">
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
                </tr>
                </tbody>
            </table>
            <div class="block page"  style="position: fixed;bottom:20px;left:250px;" v-show="pageShow">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5,10,20,30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mytotalRemove">
                </el-pagination>
            </div>
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="submitFormRemove" v-show="chang('/master/module/remove')">移除</el-button>
                        <el-button @click="resetForm">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="layui-field-box" v-show="settingShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormSet" status-icon :rules="rulesSet" ref="ruleFormSet" label-width="100px" class="demoBtn-ruleForm">

                            <div class="layui-form-item">
                                <el-form-item label="用户名" prop="developers">
                                    <el-select v-model="ruleFormSet.developers" placeholder="请输入用户名">
                                        <el-option
                                            v-for="item in optionsUser"
                                            :key="item.id"
                                            :label="item.username"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormSet('ruleFormSet')" v-show="chang('/master/module/developers')">设置开发人</el-button>
                                            <el-button @click="resetForm('ruleFormSet')">返回</el-button>
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
        name: 'module',
        data(){
            var title = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入模块名称'));
                }
                callback();
            };
            var developer = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入模块开发人'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                editShow:false,
                addShow:false,
                joinShow:false,
                removeShow:false,
                settingShow:false,
                status:'',
                keyword:'',
                forumList:[],
                currentPage:1,
                mytotal:0,
                mytotalJoin:0,
                mytotalRemove:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                editorOption: {},
                content:'',
                contentEdit:'',
                ruleFormAdd: {
                    name:'',
                },
                rulesAdd: {
                    name: [
                        {validator: title, trigger: 'blur'},
                    ],
                },
                ruleFormEdit: {
                    name:'',
                    id:''
                },
                rulesEdit: {
                    name: [
                        {validator: title, trigger: 'blur'},
                    ],
                },
                ruleFormSet: {
                    developers:'',
                },
                rulesSet: {
                    developers: [
                        {validator: developer, trigger: 'blur'},
                    ],
                },
                isClear: false,
                zldata: {
                    info:'',
                },
                checkAll:false,
                checkModel:[],
                checkAllJoin:false,
                checkModelJoin:[],
                checkAllRemove:false,
                checkModelRemove:[],
                auth:[],
                initQCode: '',
                joinList:[],
                joinId:'',
                removeList:[],
                removeId:'',
                optionsUser:'',
                setId:''
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
            checkModelJoin: {
                handler () {
                    if(this.checkModelJoin.length==this.joinList.list.length){
                        this.checkAllJoin=true;
                    }else{
                        this.checkAllJoin=false;
                    }
                },
                deep: true
            },
            checkModelRemove: {
                handler () {
                    if(this.checkModelRemove.length==this.removeList.list.length){
                        this.checkAllRemove=true;
                    }else{
                        this.checkAllRemove=false;
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
                me.$axios.post(me.url+"master/module/batchdel",me.checkModel)
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
                me.$axios.post(me.url+"master/module/del?id="+id)
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
//            加入
            joinAllEvent(){
                var me=this;
                if(this.checkModelJoin.length>0){
                    this.submitFormJoin()
                }else{
                    me.$message({
                        message:"请选择加入数据",
                        type: 'error'
                    })
                }
            },
            changeStateJoin(item){
                var me=this;
                me.checkModelJoin=[];
                if(me.checkAllJoin==true){
                    me.joinList.list.forEach(function(value,index){
                        me.checkModelJoin.push(value.id)
                    })
                }
            },
            removeAllEvent(){
                var me=this;
                if(this.checkModelRemove.length>0){
                    this.submitFormRemove()
                }else{
                    me.$message({
                        message:"请选择加入数据",
                        type: 'error'
                    })
                }
            },
            changeStateRemove(item){
                var me=this;
                me.checkModelRemove=[];
                if(me.checkAllRemove==true){
                    me.removeList.list.forEach(function(value,index){
                        me.checkModelRemove.push(value.id)
                    })
                }
            },
            forumEvent(){
                var me=this;
                var para={
                    page: this.pageNum,
                    size:this.pageSize,
                    status:this.status,
                    name:this.keyword
                }
                me.$axios.post(me.url+"master/module/bypage",para)
                    .then(function (result) {
//                        console.log(result)
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
                me.$axios.post(me.url+"master/module/get?id="+id)
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
                            name:this.ruleFormAdd.name
                        };
                        me.$axios.post(me.url+"master/module/set",para)
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
                                    }
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
                            id:this.ruleFormEdit.id
                        };
                        me.$axios.post(me.url+"master/module/edit",para)
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
            submitFormJoin() {
                        var me=this;
                        var para = {
                            id:this.joinId,
                            inid:this.checkModelJoin
                        };
                        me.$axios.post(me.url+"master/module/join",para)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '加入成功',
                                        type: 'success'
                                    })
                                    me.forumEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                    me.joinShow=false;
                                    me.removeShow=false;
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })

            },
            submitFormRemove() {
                var me=this;
                var para = {
                    id:this.removeId,
                    inid:this.checkModelRemove
                };
                me.$axios.post(me.url+"master/module/remove",para)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '移除成功',
                                type: 'success'
                            })
                            me.forumEvent();
                            me.menuShow=true;
                            me.addShow=false;
                            me.editShow=false;
                            me.joinShow=false;
                            me.removeShow=false;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            submitFormSet() {
                var me=this;
                var para = {
                    id:this.setId,
                    developers:this.ruleFormSet.developers
                };
                console.log(para)
                me.$axios.post(me.url+"master/module/developers",para)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '开发人设置成功',
                                type: 'success'
                            })
                            me.forumEvent();
                            me.menuShow=true;
                            me.addShow=false;
                            me.editShow=false;
                            me.joinShow=false;
                            me.removeShow=false;
                            me.settingShow=false;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            resetForm(formName) {
                this.menuShow=true;
                this.addShow=false;
                this.editShow=false;
                this.joinShow=false;
                this.removeShow=false;
                this.settingShow=false;
            },
//            加入列表
            joinEvent(id){
               var me=this;
               me.joinId=id;
               me.checkAllJoin=false;
               me.joinShow=true;
               me.menuShow=false;
               me.addShow=false;
               me.editShow=false;
               me.removeShow=false;
               var para={
                   page: this.pageNum,
                   size:this.pageSize,
               }
               me.$axios.post(me.url+"master/module/joinlist",para)
                   .then(function (result) {
                       me.joinList=result.data.pojo;
                       result.data.pojo.list.forEach(function(index){
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
                       me.mytotalJoin=result.data.pojo.total;
                       if(me.mytotalJoin<10){
                           me.pageShow=false
                       }else{
                           me.pageShow=true
                       }
                   })
                   .catch(function (error) {
                       console.log(error);
                   });
           },
            removeEvent(id){
                var me=this;
                me.removeId=id;
                me.checkAllRemove=false;
                me.joinShow=false;
                me.menuShow=false;
                me.addShow=false;
                me.editShow=false;
                me.removeShow=true;
                var para={
                    id:me.removeId,
                    page: this.pageNum,
                    size:this.pageSize,
                }
                me.$axios.post(me.url+"master/module/removelist",para)
                    .then(function (result) {
                        me.removeList=result.data.pojo;
                        result.data.pojo.list.forEach(function(index){
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
                        me.mytotalRemove=result.data.pojo.total;
                        if(me.mytotalRemove<10){
                            me.pageShow=false
                        }else{
                            me.pageShow=true
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            settingEvent(id){
                console.log(id)
                var me=this;
                me.setId=id;
                me.ruleFormSet.developers='';
                me.settingShow=true;
                me.joinShow=false;
                me.menuShow=false;
                me.addShow=false;
                me.editShow=false;
                me.removeShow=false;
            }
        },
        mounted(){
            this.forumEvent();
            this.authorityEvent();
//            用户权限
            var me=this;
            me.$axios.post(me.url+"master/staffMessage/list")
                .then(function (result) {
                    me.optionsUser=result.data.list
                })
                .catch(function (error) {
                    console.log(error);
                });
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
