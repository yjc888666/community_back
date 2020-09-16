<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menu">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent" v-show="chang('/master/user/group/set')">
                <i class="layui-icon"></i> 添加权限组
            </a>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th style="width: 30px;">ID</th>
                    <th>名称</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in groupList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.status}}</td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm" @click="authorizeEvent(item.id)" v-show="chang('/master/user/group/grant')">授权</a>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)" v-show="chang('/master/user/group/edit')">编辑</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delEvent(item.id,index)" v-show="chang('/master/user/group/delete')">删除</a>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
        <div class="layui-tab-brief" v-show="add">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container" >
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="title">
                                        <el-input v-model="ruleFormAdd.title" placeholder="请输入权限组名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormAdd.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">启用</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">禁用</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')">添加</el-button>
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

        <div class="layui-tab-brief" v-show="edit">

            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container" >
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="title">
                                        <el-input v-model="ruleFormEdit.title" placeholder="请输入权限组名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormEdit.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">启用</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">禁用</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="btable-paged">
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

        <div class="layui-field-box auth layui-form " v-show="authorize">
            <fieldset class="layui-elem-field" v-for="(partition,partitionIndex) in distributorsInfo" :key="partitionIndex">
                <legend>
                    <el-checkbox :indeterminate="partition.indeterminate" v-model="partition.grant" :value="partition.id" @change="handleCheckedCountryAllChange(partitionIndex,partition.id,$event)" :key="partitionIndex">{{partition.name}}</el-checkbox>
                </legend>
                <div class="layui-field-box auth1" >
                    <el-checkbox  v-for="country in partition.secondList"  :value="country.id" v-model="country.grant" @change="handleCheckedCountryChange(partitionIndex,country.id,partition.id,$event)" :label="country" :key="country.id">
                        <a href="javascript:;" @click.stop="formEvent(country.id)">{{country.name}}</a>
                    </el-checkbox>
                </div>
            </fieldset>
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="submitFormAuth">授权</el-button>
                        <el-button @click="resetForm('ruleFormEdit')">返回</el-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="admin-main layui-form"  v-show="formShow">
            <div class="layui-field-box">
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th width="5%" align="center"><input type="checkbox" v-model="checkAll" @change="changeState"></th></th>
                        <th width="5%" align="center">ID</th>
                        <th align="center">帖子标题</th>
                        <th width="60px" style="text-align:center">作者</th>

                    </tr>
                    </thead>
                    <tbody id="content">
                    <tr v-for="(item,index) in form.list" :key="index">
                        <td align="center"><input type="checkbox" v-model="checkModel" :value="item.id"></td>
                        <td align="center">{{index+1}}</td>
                        <td style="padding-left: 20px;"><a target="_blank" href="javascript:;">{{item.title}}</a></td>
                        <td align="center">{{item.username}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="block page"  style="text-align: right;position: fixed;bottom:80px;right:20px;" v-show="pageShow">
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
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="formAuth">授权</el-button>
                        <el-button @click="resetForm('ruleFormEdit')">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'adminQt',
        data(){
//            添加
            var addname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入权限组名称'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                menu: true,
                add:false,
                edit:false,
                authorize:false,
                formShow:false,
                isRouterAlive:true,
                groupList:[],
//              授权
                distributorsInfo:[],
                ruleFormAdd: {
                    title:'',
                    status:'1'
                },
                rulesAdd: {
                    title: [
                        {validator: addname, trigger: 'blur'},
                    ],
                },
                ruleFormEdit: {
                    title:'',
                    status:'1',
                    id:''
                },
                rulesEdit: {
                    title: [
                        {validator: addname, trigger: 'blur'},
                    ],
                },
                rules:[],
                authId:'',
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                form:[],
                tid:"",
//               帖子授权
                checkAll:false,
                checkModel:[],
                auth:[],

            }
        },
        created(){

        },
        watch:{
            checkModel: {
                handler () {
                    if(this.checkModel.length==this.form.list.length){
                        this.checkAll=true;
                    }else{
                        this.checkAll=false;
                    }
                },
                deep: true
            },
        },
        methods: {
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

            handleCheckedCountryAllChange(index, topId, e){//二级change事件
                this.distributorsInfo[index].grant = e//二级勾选后，子级全部勾选或者取消
                if(e == false) this.distributorsInfo[index].indeterminate = false //去掉二级不确定状态
                var childrenArray = this.distributorsInfo[index].secondList
                if(childrenArray)
                    for(var i=0,len=childrenArray.length; i<len; i++)
                        childrenArray[i].grant = e
                this.getIsCheckAll()
            },
            handleCheckedCountryChange(topIndex, sonId, topId, e){//三级change事件
                var childrenArray = this.distributorsInfo[topIndex].secondList
                var tickCount = 0, unTickCount = 0, len = childrenArray.length
                for(var i = 0; i < len; i++){
                    if(sonId == childrenArray[i].id) childrenArray[i].grant = e
                    if(childrenArray[i].grant == true) tickCount++
                    if(childrenArray[i].grant == false) unTickCount++
                }
                if(tickCount == len) {//三级级全勾选
                    this.distributorsInfo[topIndex].grant = true
                    this.distributorsInfo[topIndex].indeterminate = false
                } else if(unTickCount == len) {//三级级全不勾选
                    this.distributorsInfo[topIndex].grant = false
                    this.distributorsInfo[topIndex].indeterminate = false
                } else {
                    this.distributorsInfo[topIndex].grant = true
                    this.distributorsInfo[topIndex].indeterminate = true //添加二级不确定状态
                }
//                this.getIsCheckAll()
            },
            getIsCheckAll(){
                var tickCount = 0, unTickCount = 0, ArrLength = this.distributorsInfo.length
                for(var j=0; j<ArrLength; j++){//全选checkbox状态
                    if(this.distributorsInfo[j].grant == true) tickCount++
                    if(this.distributorsInfo[j].grant == false) unTickCount++
                }
                if(tickCount == ArrLength) {//二级全勾选
                    this.ischeckAll = true
                    this.indeterminate = false
                } else if(unTickCount == ArrLength) {//二级全不勾选
                    this.ischeckAll = false
                    this.indeterminate = false
                } else {
                    this.ischeckAll = false
                    this.indeterminate = true //添加一级不确定状态
                }
            },

            submitFormAuth(){
                var me=this;
                $(".auth .el-checkbox.is-checked").each(function() {
                    me.rules.push(this.getAttribute("value"))
                })

                // 授权数据
                me.$axios.post(me.url+"master/user/group/grant?id="+ me.authId+"&cates=" + me.rules)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '授权成功',
                                type: 'success'
                            })
                            me.listMenu();
                            me.rules=[];
                            me.menu=true;
                            me.add=false;
                            me.edit=false;
                            me.authorize=false;
                            me.formShow=false;
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            //  帖子的列表
            formEvent(id){
                var me=this;
                me.tid=id;
                me.formShow=true;
                me.menu=false;
                me.add=false;
                me.edit=false;
                me.authorize=false;
                me.$axios.post(me.url+"master/forum/grant?tid="+ me.tid + "&id=" + me.authId +"&page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.form=result.data
                        me.mytotal= result.data.total
                        if(me.mytotal<10){
                            me.pageShow=false
                        }else{
                            me.pageShow=true
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            // 帖子选中
            changeState(item){
                var me=this;
                me.checkModel=[];
                if(me.checkAll==true){
                    me.form.list.forEach(function(value,index){
                        me.checkModel.push(value.id)
                    })
                }
            },
            formAuth(){
                var me=this;
                me.$axios.post(me.url+"master/user/group/disable?id="+ me.authId + "&forums=" + me.checkModel )
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '帖子授权成功',
                                type: 'success'
                            })
                            me.listMenu();
                            me.menu=true;
                            me.add=false;
                            me.edit=false;
                            me.authorize=false;
                            me.formShow=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.formEvent(this.tid);

            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.formEvent(this.tid);
            },
//            前台权限组的列表
            listMenu(){
                var me=this;
                me.$axios.post(me.url+"master/user/group/list")
                    .then(function (result) {
                        me.groupList=result.data;
                        me.groupList.forEach(function(index){
                            if(index.status==1){
                                index.status='启用'
                            }
                            if(index.status==0){
                                index.status='禁用'
                            }

                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            resetForm(formName) {
                this.menu=true;
                this.add=false;
                this.edit=false;
                this.authorize=false;
                this.formShow=false;
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/user/group/set", me.ruleFormAdd)
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
                                }
                                me.menu=true;
                                me.add=false;
                                me.edit=false;
                                me.listMenu();
                                me.ruleFormAdd={
                                      title:''
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
//                        console.log('error submit!!');
                        return false;
            }
            });
            },
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/user/group/edit", me.ruleFormEdit)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '编辑成功',
                                        type: 'success'
                                    })
                                    me.menu=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.listMenu();
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
//                        console.log('error submit!!');
                        return false;
            }
            });
            },
            addEvent(){
                this.add=true;
                this.edit=false;
                this.menu=false;
                this.authorize=false;
                this.ruleFormAdd.status=1;
            },
            authorizeEvent(id){
                this.add=false;
                this.edit=false;
                this.menu=false;
                this.authorize=true;
                var me=this;
//               授权
                me.authId=id;
                me.$axios.post(me.url+"master/fcate/grant?id="+id)
                    .then(function (result) {
                        me.distributorsInfo=result.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            editEvent(id){
                this.add=false;
                this.edit=true;
                this.menu=false;
                this.authorize=false;
                var me=this;
                me.$axios.post(me.url+"master/user/group/get?id="+id)
                    .then(function (result) {
                        me.ruleFormEdit.title = result.data.title
                        me.ruleFormEdit.status = result.data.status
                        me.ruleFormEdit.id = result.data.id
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delEvent(id,index){
                var me=this;
                me.$axios.post(me.url+"master/user/group/delete?id="+id)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })

                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            me.groupList.splice(index,1);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            clickitem(status){
                this.ruleFormAdd.status=status
                this.ruleFormEdit.status=status
            },
        },
        mounted(){
            this.ruleFormAdd.status=1;
            var me=this;
            me.menu=true;
            me.listMenu();
            me.authorityEvent();
            console.log($(".auth1 .el-checkbox.is-checked").length)
        }
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .layui-form-item .layui-input-inline {
        width:auto;
    }
    .layui-form-item{
        margin-bottom:0;
    }
    @media screen and (max-width: 450px) {
        .el-radio-group {
            margin-top: 10px;
        }
    }
    .layui-form input[type=checkbox], .layui-form input[type=radio], .layui-form select {
         display: block;
    }
</style>
