<template>
    <div>
        <div class="layui-field-box"  v-show="menuShow">
            <div class="layui-box-searchber">
                <button class="layui-btn layui-btn-sm"  @click="delAllEvent"  v-show="chang('/master/vote/delete')">删除选中</button>
                <form class="layui-form-pane">
                    <div class="layui-form">
                        <div class="layui-inline" style="width:110px">
                            <el-select  v-model="open"  placeholder="显示状态" @change="openEvent">
                                <el-option  :value="2" label="是否显示"></el-option>
                                <el-option  :value="1" label="显示"></el-option>
                                <el-option  :value="-1" label="隐藏"></el-option>
                            </el-select>
                        </div>
                        <!--<div class="layui-inline" style="width:140px">-->
                            <!--<el-date-picker-->
                                <!--type="date"-->
                                <!--v-model="beginValue"-->
                                <!--@change="beginEvent"-->
                                <!--value-format="yyyy-MM-dd"-->
                                <!--placeholder="开始日期">-->
                            <!--</el-date-picker>-->
                        <!--</div>-->
                        <div class="layui-inline" style="width:140px">
                            <el-date-picker
                                type="date"
                                v-model="endValue"
                                @change="endEvent"
                                value-format="yyyy-MM-dd"
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="layui-inline" style="width:110px">
                            <el-select  v-model="settop"  placeholder="是否置顶" @change="settopEvent">
                                <el-option  :value="2" label="是否置顶"></el-option>
                                <el-option  :value="1" label="置顶"></el-option>
                                <el-option  :value="0" label="普通"></el-option>
                            </el-select>
                        </div>
                        <div class="layui-inline" style="width:110px">
                            <el-select  v-model="choice"  placeholder="是否精选" @change="choiceEvent">
                                <el-option   :value="2" label="是否精选"></el-option>
                                <el-option   :value="1" label="精选"></el-option>
                                <el-option   :value="0" label="一般"></el-option>
                            </el-select>
                        </div>
                        <div class="layui-inline" style="width:110px">
                            <el-select  v-model="memo"  placeholder="是否备忘" @change="memoEvent">
                                <el-option   :value="2" label="是否备忘"></el-option>
                                <el-option   :value="1" label="备忘"></el-option>
                                <el-option   :value="0" label="平常"></el-option>
                            </el-select>
                        </div>

                        <!--<div class="layui-inline" style="width:110px">-->
                            <!--<el-input v-model="keyword" placeholder="关键词" @change="keywordEvent"></el-input>-->
                        <!--</div>-->
                    </div>
                </form>
            </div>
            <hr>

            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th width="5%" align="center"><input type="checkbox" v-model="checkAll" @change="changeState"></th>
                    <th width="5%" align="center">ID</th>
                    <th align="center">活动标题</th>
                    <th width="60px" style="text-align:center">作者</th>
                    <th width="60px" align="center" >是否显示</th>
                    <th width="60px" align="center" >是否顶置</th>
                    <th width="60px" align="center" >是否精选</th>
                    <th width="60px" align="center" >设置备忘</th>
                    <th width="80px" style="text-align:center">更新时间</th>
                    <th width="80px" style="text-align:center">结束日期</th>

                    <th width="170px" style="text-align:center">操作</th>
                </tr>
                </thead>
                <tbody id="content">
                <tr v-for="(item,index) in forumList.list" :key="index">
                    <td align="center">
                        <input type="checkbox" v-model="checkModel" :value="item.id">
                    </td>
                    <td align="center">{{index+1}}</td>
                    <td style="padding-left: 20px;"><a target="_blank" href="javascript:;" v-html="item.title"></a></td>
                    <td align="center">{{item.username}}</td>
                    <td align="center">
                        <el-switch
                            v-model="item.open"
                            class="demobtn"
                            active-text="显示"
                            inactive-text="隐藏"
                            :active-value="1"
                            :inactive-value="-1"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitchOpen($event,item.id)">
                        </el-switch>
                    </td>
                    <td align="center">
                        <el-switch
                            v-model="item.settop"
                            class="demobtn"
                            active-text="置顶"
                            inactive-text="普通"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitchSettop($event,item.id)">
                        </el-switch>
                    </td>
                    <td align="center">
                        <el-switch
                            v-model="item.choice"
                            class="demobtn"
                            active-text="精选"
                            inactive-text="一般"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitchChoice($event,item.id)">
                        </el-switch>
                    </td>
                    <td align="center">
                        <el-switch
                            v-model="item.memo"
                            class="demobtn"
                            active-text="备忘"
                            inactive-text="平常"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitchMemo($event,item.id)">
                        </el-switch>
                    </td>
                    <td align="center">{{item.add_time}}</td>
                    <td align="center">{{item.end_time}}</td>

                    <td align="center">

                        <!--<a class="layui-btn layui-btn-normal layui-btn-sm" href="javascript:;" @click="editEvent(item.id)" v-show="chang('/master/forum/edit')">修改</a>-->
                        <!--<a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delEvent(item.id)" v-show="chang('/master/forum/delete')">删除</a>-->
                        <a class="layui-btn layui-btn-normal layui-btn-sm" href="javascript:;" @click="editEvent(item.id)" v-show="chang('/master/vote/edit')">修改</a>
                        <a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delEvent(item.id)" v-show="chang('/master/vote/delete')">删除</a>
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

        <div class="layui-tab-brief" v-show="editShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demoBtn-ruleForm">

                            <div class="layui-form-item">
                                <label class="layui-form-label">结束时间</label>
                                <div class="layui-input-block">
                                    <el-date-picker
                                        v-model="endTime"
                                        type="datetime"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        placeholder="选择活动结束时间">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="btable-paged"  v-show="chang('/master/vote/edit')">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')">更新</el-button>
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
    import EditorBar from '../../components/editor'
    export default {
        name: 'vote',
        data(){
            var title = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入标题'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                editShow:false,
                open:'',
                beginValue:'',
                endValue:'',
                settop:'',
                choice:'',
                memo:'',
                keyword:'',
                forumList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                ruleFormEdit: {
                    title:'',
                    content:"",
                    score:""
                },
                rulesEdit: {
                    title: [
                        {validator: title, trigger: 'blur'},
                    ]
                },
                isClear: false,
                zldata: {
                    info:'',
                },
                checkAll:false,
                checkModel:[],
                auth:[],
                startTime:"",
                endTime:"",
            }
        },
        components: {
            EditorBar
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
                me.$axios.post(me.url+"master/vote/delete",me.checkModel)
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
                me.$axios.post(me.url+"master/vote/delete",[id])
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
                me.$axios.post(me.url+"master/vote/list?page=" + this.pageNum + "&size=" + this.pageSize+ "&open=" + this.open+"&start_time=" + this.beginValue+"&end_time=" + this.endValue+"&choice=" + this.choice+"&settop=" + this.settop+"&memo=" + this.memo+"&keywords=" + this.keyword)
                    .then(function (result) {
                        me.forumList=result.data;
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
            openEvent(val){
                this.open=val
                if(this.open==null||this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                    this.open=''
                }
                this.forumEvent()
            },
            beginEvent(val){
                this.beginValue=val;
                if(this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                }
                this.forumEvent()
            },
            endEvent(val){
                this.endValue=val
                if(this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                }
                this.forumEvent()
            },
            settopEvent(val){
                this.settop=val;
                if(this.settop==null||this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                    this.settop=''
                }
                this.forumEvent()
            },
            choiceEvent(val){
                this.choice=val;
                if(this.choice==null||this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                    this.choice=''
                }
                this.forumEvent()
            },
            memoEvent(val){
                this.memo=val;
                if(this.memo==null||this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                    this.memo=''
                }
                this.forumEvent()
            },
            keywordEvent(val){
                this.keyword=val;
                if(this.keyword==null||this.beginValue==null||this.endValue==null){
                    this.beginValue='';
                    this.endValue=''
                    this.memo=''
                }
                this.forumEvent()
            },
            editEvent(id){
                this.menuShow=false;
                this.editShow=true;
                var me = this;
                me.$axios.post(me.url+"master/vote/get?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.ruleFormEdit.id=result.data.pojo.vote.id;
                            me.endTime=result.data.pojo.vote.end_time;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            changeSwitch(open,settop,choice,memo,id){
                var me=this;
                var para={
                    id:id,
                    open:open,
                    settop:settop,
                    choice:choice,
                    memo:memo
                }
                me.$axios.post(me.url+"master/vote/open",para)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '更新成功',
                                type: 'success'
                            })
                            me.forumEvent();
                        }
                    })
            },
            changeSwitchOpen(val,id){
                this.changeSwitch(val,'','','',id)
            },
            changeSwitchSettop(val,id){
                this.changeSwitch('',val,'','',id)
            },
            changeSwitchChoice(val,id){
                this.changeSwitch('','',val,'',id)
            },
            changeSwitchMemo(val,id){
                this.changeSwitch('','','',val,id)
            },
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        if(this.endTime==''||this.endTime==null){
                            me.$message({
                                message: '请填写结束日期',
                                type: 'error'
                            })
                            return;
                        }
                        var para = {
                            id:this.ruleFormEdit.id,
                            end_time:this.endTime,
                        };
                        me.$axios.post(me.url+"master/vote/edit",para)
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
    .layui-input-block .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
    }

</style>
