<template>
    <div>
        <div class="layui-field-box layui-form" v-show="bgMenuShow">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addMenu" v-show="chang('/master/controller/set')">
                <i class="layui-icon">&#xe608;</i> 添加菜单
            </a>
            <table class="layui-table admin-table ">
                <thead>
                <tr>
                    <th style="width: 40px;">ID</th>
                    <th>排序</th>
                    <th>菜单名称</th>
                    <th>控制器方法</th>
                    <th  v-show="chang('/master/controller/open')">状态</th>
                    <th>操作</th>
                    <th>更多</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in menuFriList" v-show="oneShow" :key="index">
                    <td>一级{{index+1}}</td>
                    <td>{{item.sort}}</td>
                    <td> {{item.title}}</td>
                    <td>{{item.name}}</td>
                    <td v-show="chang('/master/controller/open')">
                        <el-switch
                        v-model="item.status"
                        class="demo"
                        active-text="显示"
                        inactive-text="隐藏"
                        :active-value="1"
                        :inactive-value="0"
                        on-color="#5FB878"
                        off-color="#ccc"
                        @change="changeSwitch(item.status,item.id)"
                    >
                    </el-switch>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm"  @click="addChild(item.id)" v-show="chang('/master/controller/set')">添加子菜单</a>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm"  @click="editMenu(item.id)" v-show="chang('/master/controller/edit')">编辑</a>
                        <a href="javascript:;"   class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delMenu(item.id,index)" v-show="chang('/master/controller/delete')">删除</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm"  @click="moreEvent(item.id)">二级列表</a>
                    </td>
                </tr>

                <tr v-for="(item,index) in menuSecList" v-show="twoShow" :key="index">
                    <td>二级{{index+1}}</td>
                    <td>{{item.sort}}</td>
                    <td> {{item.title}}</td>
                    <td>{{item.name}}</td>
                    <td v-show="chang('/master/controller/open')"><el-switch
                        v-model="item.status"
                        :active-value="1"
                        :inactive-value="0"
                        class="demo"
                        active-text="显示"
                        inactive-text="隐藏"
                        on-color="#5FB878"
                        off-color="#ccc"
                        @change="changeSwitch(item.status,item.id)"
                    >
                    </el-switch></td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm"  @click="addChild(item.id)" v-show="chang('/master/controller/set')">添加子菜单</a>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm"  @click="editMenu(item.id)" v-show="chang('/master/controller/edit')">编辑</a>
                        <a href="javascript:;"   class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delMenu(item.id,index)" v-show="chang('/master/controller/delete')">删除</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm"  @click="moreThrEvent(item.id)">三级列表</a>
                        <a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-danger"  @click="backOne()">返回一级列表</a>
                    </td>
                </tr>

                <tr v-for="(item,index) in menuThrList" v-show="threeShow" :key="index">
                    <td>三级{{index+1}}</td>
                    <td>{{item.sort}}</td>
                    <td> {{item.title}}</td>
                    <td>{{item.name}}</td>
                    <td v-show="chang('/master/controller/open')"><el-switch
                        v-model="item.status"
                        :active-value="1"
                        :inactive-value="0"
                        class="demo"
                        active-text="显示"
                        inactive-text="隐藏"
                        on-color="#5FB878"
                        off-color="#ccc"
                        @change="changeSwitch(item.status,item.id)"
                    >
                    </el-switch></td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm"  @click="editMenu(item.id)" v-show="chang('/master/controller/edit')">编辑</a>
                        <a href="javascript:;"   class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delMenu(item.id,index)" v-show="chang('/master/controller/delete')">删除</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-danger"  @click="backOne()">返回一级列表</a>
                        <a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-danger"  @click="backTwo()">返回二级列表</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="layui-tab-brief" v-show="add">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="上级菜单" prop="pid">
                                        <!--<el-select v-model="ruleFormAdd.pid" placeholder="请选择">-->
                                            <!--<el-option-->
                                                <!--v-for="item in options"-->
                                                <!--:key="item.id"-->
                                                <!--:label="item.title"-->
                                                <!--:value="item.id">-->
                                            <!--</el-option>-->
                                        <!--</el-select>-->
                                        <el-cascader
                                            :options="options"
                                            @change="handleItemChange"
                                            v-model="firstHandle"
                                        ></el-cascader>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="菜单名称" prop="title">
                                        <el-input v-model="ruleFormAdd.title" placeholder="请输入菜单名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="控制器方法" prop="name">
                                        <el-input v-model="ruleFormAdd.name" placeholder="如：admin/Index/index"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormAdd.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">显示</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">隐藏</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="排序" prop="sort">
                                        <el-input v-model="ruleFormAdd.sort" type="number"></el-input>
                                    </el-form-item>
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

        <div class="layui-tab-brief" v-show="childAdd">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormchildAdd" status-icon :rules="ruleschildAdd" ref="ruleFormchildAdd" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="上级菜单" prop="pid">
                                        <el-cascader
                                            :options="options"
                                            @change="handleItemChange"
                                            v-model="selectedOptions"
                                        ></el-cascader>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="菜单名称" prop="title">
                                        <el-input v-model="ruleFormchildAdd.title" placeholder="请输入菜单名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="控制器方法" prop="name">
                                        <el-input v-model="ruleFormchildAdd.name" placeholder="如：admin/Index/index"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormchildAdd.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">显示</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">隐藏</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="排序" prop="sort">
                                        <el-input v-model="ruleFormchildAdd.sort" type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormchildAdd('ruleFormchildAdd')">添加</el-button>
                                            <el-button @click="resetForm('ruleFormchildAdd')">返回</el-button>
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
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="上级菜单" prop="pid">
                                        <!--<el-select v-model="ruleFormAdd.pid" placeholder="请选择">-->
                                        <!--<el-option-->
                                        <!--v-for="item in options"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.title"-->
                                        <!--:value="item.id">-->
                                        <!--</el-option>-->
                                        <!--</el-select>-->
                                        <el-cascader
                                            :options="options"
                                            @change="handleItemChange"
                                            v-model="selectedOptionsEdit"
                                        ></el-cascader>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="菜单名称" prop="title">
                                        <el-input v-model="ruleFormEdit.title" placeholder="请输入菜单名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="控制器方法" prop="name">
                                        <el-input v-model="ruleFormEdit.name" placeholder="如：admin/Index/index"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormEdit.status">
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">显示</el-radio>
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">隐藏</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="排序" prop="sort">
                                        <el-input v-model="ruleFormEdit.sort" type="number"></el-input>
                                    </el-form-item>
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
    </div>

</template>

<script>

    export default {
        name: 'bgMenu',
    	data(){
            var title = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入菜单名称'));
                }
                callback();
            };
            var name = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择控制器方法'));
                }
                callback();
            };
    		return {
                url: this.GLOBAL.baseUrl,
                menuList:[],
                menuFriList:[],
                menuSecList:[],
                menuThrList:[],
                oneShow:true,
                twoShow:false,
                threeShow:false,
                show:-1,
                tab:"",
                flag:0,
                newFlag:0,
                add:false,
                edit:false,
                childAdd:false,
                options:[],
                firstHandle:[],
                selectValue: '',
                radio:1,
                bgMenuShow:true,
                selectedOptions:[],
                selectedOptionsEdit:[],
                ruleFormAdd: {
                    title:'',
                    name: '',
                    pid:'',
                    status:'1',
                    sort:'0'
                },
                rulesAdd: {
                    title: [
                        {validator: title, trigger: 'blur'},
                    ],
                    name: [
                        {validator: name, trigger: 'blur'},
                    ],
                },
                ruleFormEdit: {
                    title:'',
                    name: '',
                    pid:'',
                    status:'1',
                    id:'',
                    sort:""
                },
                rulesEdit: {
                    title: [
                        {validator: title, trigger: 'blur'},
                    ],
                    name: [
                        {validator: name, trigger: 'blur'},
                    ]
                },
                ruleFormchildAdd: {
                    title:'',
                    name: '',
                    pid:'',
                    status:'1',
                    id:'',
                    sort:0
               },
               ruleschildAdd: {
                  title: [
                      {validator: title, trigger: 'blur'},
                     ],
                    name: [
                    {validator: name, trigger: 'blur'},
                ]
            },
            auth:[],
            }
    		},
        methods:{
//           权限的接口
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

            fristList(){
                var me=this;
                me.$axios.post(me.url+"master/controller/this")
                    .then(function (result) {
                        me.menuFriList=result.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            listMenu(){
                //列表分级查询
                var me=this;
                me.$axios.post(me.url+"master/controller/father")
                    .then(function (result) {
//                        console.log(result)
                        me.menuList=result.data;
                        var json = [];
                        result.data.forEach(function(item,index){
                            var row1={};
                            row1.label=item.title;
                            row1.value=item.id;
                            var secondjson=[];
                            var sendlist=item.list;
                            var row2={};
                            row2.value=item.id;
                            row2.label=item.title;
                            secondjson.push(row2);
                            $.each(sendlist,function(i,e){
                                var row2={};
                                row2.value=e.id;
                                row2.label=e.title;
                                secondjson.push(row2);
                            });
                            row1.children=secondjson;
                            json.push(row1);
                        })
                        var row={};
                        row.label='顶级菜单';
                        row.value='0';
                        var row2={};
                        row2.value='0';
                        row2.label='顶级菜单';
                        var secondjson=[];
                        secondjson.push(row2);
                        row.children=secondjson;
                        json.unshift(row);
                        me.options=json;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/controller/set", me.ruleFormAdd)
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
                                    me.fristList();
                                    me.listMenu();
                                    me.bgMenuShow=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.childAdd=false;
                                    me.ruleFormAdd={
                                        title:'',
                                        name: '',
                                        pid:''
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
            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/controller/edit", me.ruleFormEdit)
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
                                    me.fristList();
                                    me.listMenu();
                                    me.bgMenuShow=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.childAdd=false;
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
            submitFormchildAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/controller/set", me.ruleFormchildAdd)
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
                                    me.listMenu();
                                    me.bgMenuShow=true;
                                    me.add=false;
                                    me.edit=false;
                                    me.childAdd=false;
                                    me.ruleFormchildAdd={
                                            title:'',
                                            name: ''
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
                this.bgMenuShow=true;
                this.add=false;
                this.edit=false;
                this.childAdd=false;
            },
            handleItemChange(value){
                this.ruleFormAdd.pid=value[1];
                this.ruleFormEdit.pid=value[1];
                this.ruleFormchildAdd.pid=value[1];
            },
            addMenu(){
                this.firstHandle=[];
                this.ruleFormAdd.status=1;
                this.ruleFormAdd.sort=0;
                this.add=true;
                this.childAdd=false;
                this.bgMenuShow=false;
            },
            addChild(id){
                this.ruleFormchildAdd={
                        title:'',
                        name: '',
                        status:1,
                        sort:0,
                        pid:id
                },
                this.add=false;
                this.childAdd=true;
                this.bgMenuShow=false;
                var me=this;
                me.selectedOptions=[];
                me.$axios.get(me.url+"master/controller/get?id="+id)
                    .then(function (result) {
                        if(result.data.pid=='0'){
                            me.selectedOptions.push(result.data.id);
                        }else{
                            me.selectedOptions.push(result.data.pid);
                        }
                        me.selectedOptions.push(result.data.id)
                    })
            },
            editMenu(id){
                this.ruleFormEdit.id=id
                this.edit=true;
                this.add=false;
                this.bgMenuShow=false;
                var me=this;
                me.selectedOptionsEdit=[];
                me.$axios.get(me.url+"master/controller/get?id="+id)
                    .then(function (result) {
                            me.ruleFormEdit.title=result.data.title
                            me.ruleFormEdit.name=result.data.name
                            me.ruleFormEdit.status=result.data.status
                            me.ruleFormEdit.pid=result.data.pid
                             me.ruleFormEdit.sort=result.data.sort
                        if(result.data.ppid=='0'){
                            me.selectedOptionsEdit.push(result.data.pid);
                        }else{
                            me.selectedOptionsEdit.push(result.data.ppid);
                        }
                         me.selectedOptionsEdit.push(result.data.pid);

                    })
            },
            delMenu(id,index){
                var me=this;
                me.$axios.get(me.url+"master/controller/delete?id="+id)
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
                            me.fristList();
                            me.listMenu();
                            me.menuList.splice(index,1);
                            me.menuSecList.splice(index,1);
                            me.menuThrList.splice(index,1);
                        }
                    })
            },
            back(){
                this.bgMenuShow=true;
            },
            changeSwitch(sta,id){
                var me=this;
                me.$axios.post(me.url+"master/controller/open?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message.success('更新成功');
                        }
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            moreEvent(id){
                this.oneShow=false;
                this.twoShow=true;
                this.threeShow=false;
                var me=this;
                me.$axios.post(me.url+"master/controller/this?id="+id)
                    .then(function (result) {
                        me.menuSecList=result.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            moreThrEvent(id){
                this.oneShow=false;
                this.twoShow=false;
                this.threeShow=true;
                var me=this;
                me.$axios.post(me.url+"master/controller/this?id="+id)
                    .then(function (result) {
                        me.menuThrList=result.data;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            clickitem(status){
                this.ruleFormAdd.status=status;
                this.ruleFormchildAdd.status=status
            },
            backOne(){
                this.oneShow=true;
                this.twoShow=false;
                this.threeShow=false;
            },
            backTwo(){
                this.oneShow=false;
                this.twoShow=true;
                this.threeShow=false;
            }
        },
        mounted(){
            var me=this;
            me.listMenu();
            me.authorityEvent();
            me.fristList();
            me.ruleFormAdd.status=1;
            me.ruleFormchildAdd.status=1;
            me.ruleFormchildAdd.sort=0;

         }
    	}
</script>

<style lang="less" >
	@import '../../style/mixin';
    .mar {
        margin-top: 10px;
    }
    .layui-form-item .layui-input-inline {
        width: auto!important;

    }
    .layui-form-item {
        margin-bottom:0px;
    }
    .el-form-item__content{
        width:200px;
    }
    .demo .el-switch__label {
         position: absolute;
         display: none;
         color: #fff;
     }
    /*打开时文字位置设置*/
    .demo .el-switch__label--right {
        z-index: 1;
        right: -10px;
    }
    /*关闭时文字位置设置*/
    .demo .el-switch__label--left {
        z-index: 1;
        left: 20px;
    }
    /*显示文字*/
    .demo .el-switch__label.is-active {
        display: block;
    }
    .demo.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 60px !important;
    }
</style>
