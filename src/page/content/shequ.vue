<template>
    <div>
        <div class="layui-field-box layui-form" v-show="menuShow">
            <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent"  v-show="chang('/master/fcate/set')">
                <i class="layui-icon">&#xe608;</i> 添加板块
            </a>
            <a href="javascript:;" class="layui-btn layui-btn-sm banzhu" @click="banzuEventAll">
                <i class="layui-icon">&#xe608;</i> 设置超级版主
            </a>
            <a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-danger"  @click="backOne()">一级列表</a>
            <table class="layui-table admin-table" >
                <thead>
                <tr>
                    <th width="5%" align="center">ID</th>
                    <th>排序</th>
                    <th align="center">板块名称</th>
                    <th width="10%" align="center"  v-show="chang('/master/fcate/open')">是否显示</th>
                    <th width="10%" align="center"  v-show="chang('/master/fcate/open')">权限设置</th>
                    <th width="10%" align="center">板块图片</th>
                    <!--<th width="20%" align="center">板块连接</th>-->
                    <th width="10%" align="center">版主</th>
                    <th width="200" align="center">基本操作</th>
                    <th width="200" align="center">更多</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in fristList" v-show="oneShow" :key="index">
                    <td align="center">一级{{index+1}}</td>
                    <td>{{item.sort}}</td>
                    <td style="padding-left: 20px;">{{item.name}}</td>

                    <td align="center"  v-show="chang('/master/fcate/open')">
                        <el-switch
                            v-model="item.open"
                            class="demoBtn"
                            active-text="显示"
                            inactive-text="隐藏"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitch(item.id,item.open,item.auth)"
                        >
                        </el-switch>
                    </td>
                    <td align="center"  v-show="chang('/master/fcate/open')">
                        <el-switch
                            v-model="item.auth"
                            class="demoBtn"
                            active-text="开启"
                            inactive-text="关闭"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitch(item.id,item.open,item.auth)"
                        >
                        </el-switch>
                    </td>
                    <td align="center">{{item.pic}}</td>
                    <td align="center"></td>
                    <td align="left">
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)"  v-show="chang('/master/fcate/edit')">修改</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delEvent(item.id)"  v-show="chang('/master/fcate/delete')">删除</a>
                        <a class="layui-btn layui-btn-sm banzhu" href="javascript:;" @click="banzuEvent(item.id)">设置版主</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm"  @click="moreEvent(item.id)">二级列表</a>
                    </td>
                    <div class="block page"  style="text-align: right;position: fixed;bottom:20px;right:20px;" v-show="pageShow1">
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
                </tr>

                <tr v-for="(item,index) in menuSecList" v-show="twoShow" :key="index">
                    <td align="center">二级{{index+1}}</td>
                    <td>{{item.sort}}</td>
                    <td style="padding-left: 20px;">{{item.name}}</td>

                    <td align="center"  v-show="chang('/master/fcate/open')">
                        <el-switch
                            v-model="item.open"
                            class="demoBtn"
                            active-text="显示"
                            inactive-text="隐藏"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitch(item.id,item.open,item.auth)"
                        >
                        </el-switch>
                    </td>
                    <td align="center"  v-show="chang('/master/fcate/open')">
                        <el-switch
                            v-model="item.auth"
                            class="demoBtn"
                            active-text="开启"
                            inactive-text="关闭"
                            :active-value="1"
                            :inactive-value="0"
                            on-color="#5FB878"
                            off-color="#ccc"
                            @change="changeSwitch(item.id,item.open,item.auth)"
                        >
                        </el-switch>
                    </td>
                    <td align="center">{{item.pic}}</td>
                    <td align="center"></td>
                    <td align="left">
                        <a href="javascript:;" class="layui-btn layui-btn-normal layui-btn-sm" @click="editEvent(item.id)"  v-show="chang('/master/fcate/edit')">修改</a>
                        <a href="javascript:;" class="elementdel layui-btn layui-btn-danger layui-btn-sm ajax-delete" @click="delEvent(item.id)"  v-show="chang('/master/fcate/delete')">删除</a>
                    </td>
                    <td>
                        <a href="javascript:;" class="layui-btn layui-btn-sm layui-btn-danger"  @click="backOne()">返回一级列表</a>
                    </td>
                    <div class="block page"  style="text-align: right;position: fixed;bottom:20px;right:20px;" v-show="pageShow1">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="currentPage1"
                            :page-sizes="[5,10,20,30]"
                            :page-size="pageSize1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="mytotal1">
                        </el-pagination>
                    </div>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="layui-tab-brief" v-show="addShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demoBtn-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="排序" prop="sort">
                                        <el-input v-model="ruleFormAdd.sort" placeholder="请输入排序" type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="板块名称" prop="name">
                                        <el-input v-model="ruleFormAdd.name" placeholder="请输入板块名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <!--<div class="layui-form-item">-->
                            <!--<div class="layui-input-inline">-->
                            <!--<el-form-item label="别名（英文）" prop="biename">-->
                            <!--<el-input v-model="ruleFormAdd.biename" placeholder="请输入板块别名"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="所属板块" prop="tid">
                                        <el-select v-model="ruleFormAdd.tid" placeholder="请选择">
                                            <el-option
                                                v-for="item in fristList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>

                            <!--<div class="layui-form-item">-->
                            <!--<el-form-item label="关键词" prop="keymain">-->
                            <!--<el-input v-model="ruleFormAdd.keymain" placeholder="请输入板块名称"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</div>-->

                            <div class="layui-form-item">
                                <el-form-item label="版块图片" prop="pic">
                                    <el-upload
                                        class="upload-demo"
                                        action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <el-button size="small" type="primary"><i class="layui-icon"></i>上传头像</el-button>
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    </el-upload>
                                </el-form-item>

                            </div>

                            <div class="layui-form-item layui-form-text">
                                <el-form-item label="描述" prop="description">
                                    <el-input type="textarea" v-model="ruleFormAdd.description" placeholder="请输入板块名称"></el-input>
                                </el-form-item>
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

        <div class="layui-tab-brief" v-show="editShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demoBtn-ruleForm">
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="排序" prop="sort">
                                        <el-input v-model="ruleFormEdit.sort" placeholder="请输入排序" type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="板块名称" prop="name">
                                        <el-input v-model="ruleFormEdit.name" placeholder="请输入板块名称"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <!--<div class="layui-form-item">-->
                            <!--<div class="layui-input-inline">-->
                            <!--<el-form-item label="别名（英文）" prop="biename">-->
                            <!--<el-input v-model="ruleFormAdd.biename" placeholder="请输入板块别名"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="所属板块" prop="name">
                                        <el-select v-model="ruleFormEdit.name" placeholder="请选择">
                                            <el-option
                                                v-for="item in fristList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>

                            <!--<div class="layui-form-item">-->
                            <!--<el-form-item label="关键词" prop="keymain">-->
                            <!--<el-input v-model="ruleFormAdd.keymain" placeholder="请输入板块名称"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</div>-->

                            <div class="layui-form-item">
                                <el-form-item label="版块图片" prop="pic">
                                    <el-upload
                                        class="upload-demo"
                                        action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <el-button size="small" type="primary"><i class="layui-icon"></i>上传头像</el-button>
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    </el-upload>
                                </el-form-item>

                            </div>

                            <div class="layui-form-item layui-form-text">
                                <el-form-item label="描述" prop="description">
                                    <el-input type="textarea" v-model="ruleFormEdit.description" placeholder="请输入板块名称"></el-input>
                                </el-form-item>
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


        <div class="layui-field-box auth layui-form " v-show="banzu">
            <fieldset class="layui-elem-field">
                <legend>
                    <!--<input type="checkbox" v-model="checkAll" @change="changeState">全选-->
                    <el-checkbox v-model="checkAll" @change="changeState">全选</el-checkbox>
                </legend>
                <div v-for="(item,index) in banzuList" style="float:left;text-align: center;margin-right:10px;" :key="index">
                    <input type="checkbox" v-model="checkModel" :value="item.id" style="text-align:center;margin-left:20px">{{item.username}}
                    <!--<el-checkbox  v-model="checkModel" :value="item.id">{{item.username}}</el-checkbox>-->
                </div>

            </fieldset>
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="submitFormAuth" >版主</el-button>
                        <el-button @click="resetForm">返回</el-button>
                    </div>
                </div>
            </div>
        </div>


        <div class="layui-field-box auth layui-form " v-show="Superbanzu">
            <fieldset class="layui-elem-field">
                <legend>
                    <!--<input type="checkbox" v-model="checkAll" @change="changeState">全选-->
                    <el-checkbox v-model="checkAll" @change="changeState">全选</el-checkbox>
                </legend>
                <div v-for="(item,index) in banzuList" style="float:left;text-align: center;margin-right:10px;" :key="index">
                    <input type="checkbox" v-model="checkModel" :value="item.id" style="text-align:center;margin-left:20px">{{item.username}}
                    <!--<el-checkbox  v-model="checkModel" :value="item.id">{{item.username}}</el-checkbox>-->
                </div>

            </fieldset>
            <div class="btable-paged">
                <div class="layui-main">
                    <div class="formbtngroup">
                        <el-button type="primary" @click="submitFormAuthSper" >超级版主</el-button>
                        <el-button @click="resetForm">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'shequ',
        data(){
            var sort = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入排序'));
                }
                callback();
            };
            var name = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入板块名称'));
                }
                callback();
            };
            var tid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入所属板块'));
                }
                callback();
            };
            return {
                url: this.GLOBAL.baseUrl,
                fristList:[],
                menuSecList:[],
                oneShow:true,
                twoShow:false,
                shequList:[],
                menuShow:true,
                addShow:false,
                editShow:false,
                banzu:false,
                imageUrl: '',
                ruleFormAdd: {
                    sort:'',
                    name:'',
                    tid:"",
                    biename:'',
                    keymain:'',
                    pic:"",
                    description:""
                },
                rulesAdd: {
                    sort: [
                        {validator: sort, trigger: 'blur'},
                    ],
                    name: [
                        {validator: name, trigger: 'blur'},
                    ]
                },
                ruleFormEdit: {
                    sort:'',
                    name:'',
                    tid:"",
                    biename:'',
                    keymain:'',
                    pic:"",
                    description:"",
                    id:""
                },
                rulesEdit: {
                    sort: [
                        {validator: sort, trigger: 'blur'},
                    ],
                    name: [
                        {validator: name, trigger: 'change'},
                    ]
                },
                auth:[],
                checkAll:false,
                checkModel:[],
                banzuList:[],
                banzuId:"",
                fids:[],
                Superbanzu:false,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                mytotal1:0,
                pageSize1:10,
                pageNum1:1,
                pageShow1:true,
                currentPage:1,
                currentPage1:1,
                moreId:'',
            }
        },
        watch:{
            checkModel: {
                handler () {
                    if(this.checkModel.length==this.banzuList.length){
                        this.checkAll=true;
                    }else{
                        this.checkAll=false;
                    }
                },
                deep: true
            },
        },
        methods:{
            first(){
                var me=this;
                me.$axios.post(me.url+"master/fcate/flist?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        console.log(result)
                        me.fristList=result.data.list;
                        me.mytotal=result.data.total;
                        if(me.mytotal>10){
                            me.pageShow=false
                        }else{
                            me.pageShow=true
                        }
                        result.data.list.forEach(function(item){
                            me.fids.push(item.id)
                        })
//                        添加一级分类
//                        var row={}
//                        row.name='一级分类';
//                        row.id='0';
//                        row.sort='0';
//                        me.fristList.unshift(row)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            banzhus(){
                var me=this;
                me.$axios.post(me.url+"master/fcate/userlist")
                    .then(function (result) {
                        me.banzuList=result.data.pojo.ulist
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            banzuEvent(id){
                this.banzu=true;
                this.menuShow=false;
                this.banzuId=id;
            },
            banzuEventAll(){
                this.Superbanzu=true;
                this.menuShow=false;
            },

            submitFormAuthSper(){
                var me=this;
                var para={
                    fids:me.fids,
                    uids:me.checkModel
                }
                me.$axios.post(me.url+"master/fcate/addmost",para)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '版主添加成功',
                                type: 'success'
                            })
                            me.menuShow=true;
                            me.banzu=false;
                            me.Superbanzu=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            changeState(){
                var me=this;
                me.checkModel=[];
                if(me.checkAll==true){
                    me.banzuList.forEach(function(value,index){
                        me.checkModel.push(value.id)
                    })
                }
            },
            submitFormAuth(){
                var me=this;
                var para={
                    id:me.banzuId,
                    uids:me.checkModel
                }
                me.$axios.post(me.url+"master/fcate/oneset",para)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '版主添加成功',
                                type: 'success'
                            })
                            me.menuShow=true;
                            me.banzu=false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
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
            handleAvatarSuccess(res, file) {
                this.userhead=res.pojo
                this.ruleFormAdd.pic=res.pojo
                this.ruleFormEdit.pic=res.pojo
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.success('上传头像成功');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG  && !isGif ) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG || isPNG  || isGif  && isLt2M;
            },

            backOne(){
                this.oneShow=true;
                this.twoShow=false;
            },
            moreEvent(id){
                this.oneShow=false;
                this.twoShow=true;
                var me=this;
                me.moreId=id
                me.$axios.post(me.url+"master/fcate/flist?id="+id+"&page=" + this.pageNum1 + "&size=" + this.pageSize1)
                    .then(function (result) {
                        me.menuSecList=result.data.list;
                        me.mytotal1=result.data.total;
                        if(me.mytotal1<10){
                            me.pageShow1=false
                        }else{
                            me.pageShow1=true
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            addEvent(){
                this.addShow=true;
                this.menuShow=false;
                this.editShow=false;
                this.ruleFormAdd.sort=1
            },
            editEvent(id){
                this.addShow=false;
                this.menuShow=false;
                this.editShow=true;
                var me = this;
                me.$axios.post(me.url+"master/fcate/get?id="+id)
                    .then(function (result) {
                        me.ruleFormEdit.sort=result.data.sort
                        me.ruleFormEdit.name=result.data.name
                        me.ruleFormEdit.tid=result.data.tid
                        me.ruleFormEdit.description=result.data.description
                        me.ruleFormEdit.id=result.data.id
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delEvent(id){
                var me=this;
                me.$axios.get(me.url+"master/fcate/delete?id="+id)
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
                            me.first();
                            me.moreEvent();
                        }
                    })
            },
            changeSwitch(id,open,auth){
                var me = this;
                var para={
                    id:id,
                    open:open,
                    auth:auth
                }
                me.$axios.post(me.url+"master/fcate/open",para)
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
                            me.first();
//                          me.moreEvent();
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
//                        if(me.ruleFormAdd.tid==''){
//                            me.ruleFormAdd.tid=0
//                        }
                        me.$axios.post(me.url+"master/fcate/set", me.ruleFormAdd)
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
                                    me.first();
//                                    me.moreEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                    me.ruleFormAdd={
                                        sort:'',
                                        name:'',
                                        tid:"",
                                        biename:'',
                                        keymain:'',
                                        pic:"",
                                        description:""
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
                        me.$axios.post(me.url+"master/fcate/edit", me.ruleFormEdit)
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
                                    me.first();
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
                this.banzu=false;
                this.Superbanzu=false
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.first();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.first();
            },
            handleSizeChange1(val) {
                this.pageSize1=val;
                this.moreEvent(this.moreId);
            },
            handleCurrentChange1(val) {
                this.pageNum1=val;
                this.moreEvent(this.moreId);
            },
        },
        mounted(){
            var me=this;
            me.oneShow=true;
            me.twoShow=false;
            me.authorityEvent();
            me.first();
            me.banzhus()

        }

    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .el-message-box{
        width:327px!important;
    }
    .layui-form-item .layui-input-inline {
        width:auto;
    }
    .demoBtn .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }
    /*打开时文字位置设置*/
    .demoBtn .el-switch__label--right {
        z-index: 1;
        right: 5px;
    }
    /*关闭时文字位置设置*/
    .demoBtn .el-switch__label--left {
        z-index: 1;
        left: 8px;
    }
    /*显示文字*/
    .demoBtn .el-switch__label.is-active {
        display: block;
    }
    .demoBtn.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 60px !important;
    }
    .layui-form-item{
        margin-bottom: 0px;
    }
    .el-textarea__inner {
        min-height: 100px!important;
    }
    .el-upload-list{
        display:none;
    }
    .el-upload img {
        max-height: 200px
    }
    .layui-form input[type=checkbox], .layui-form input[type=radio], .layui-form select {
        display: block;
    }
</style>
