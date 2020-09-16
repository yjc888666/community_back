<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form">
            <div class="layui-field-box">
                <div class="layui-box-searchber">
                    <form class="layui-form layui-form-pane">
                        <!--<div class="layui-inline" style="width: 110px;">-->
                            <!--<el-select  v-model="status"  placeholder="显示状态" @change="openEvent">-->
                                <!--<el-option  :value="0" label="全部"></el-option>-->
                                <!--<el-option  :value="1" label="正常"></el-option>-->
                                <!--<el-option  :value="2" label="过期"></el-option>-->
                                <!--<el-option  :value="3" label="停用"></el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                    </form>
                </div>
                <hr>
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th align="center">ID</th>
                        <th align="center">用户名</th>
                        <th align="center">帖子标题</th>
                        <th align="center">附件名称</th>
                        <th align="center">购买时间</th>
                        <th align="center">附件积分</th>
                        <th align="center">操作</th>
                    </tr>
                    </thead>
                    <tbody id="content">

                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{index+1}}</td>
                        <td >{{item.username}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.filename}}</td>
                        <td>{{item.add_time}}分</td>
                        <td>{{item.score}}分</td>
                        <td>
                            <a href="javascript:;"  class="elementdel layui-btn layui-btn-danger layui-btn-sm" @click="delEvent(item.id)"  v-show="chang('/master/forum/delbuy')">删除</a>
                        </td>
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
        name: 'list',
        data() {
            return {
                url: this.GLOBAL.baseUrl,
                signList:[],
                status:"",
                id:'',
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],
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
            delEvent(id){
                var me=this;
                me.$axios.post(me.url+"master/forum/delbuy?id="+id)
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
                            me.signEvent();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            signEvent(){
                var me=this;
                me.$axios.post(me.url+"master/forum/buypage?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        result.data.pojo.list.forEach(function(index){
                            if(index.status==1){
                                index.status='正常'
                            }
                            if(index.status==2){
                                index.status='过期'
                            }
                            if(index.status==3){
                                index.status='停用'
                            }
                        })
                        me.signList=result.data.pojo.list;
                        me.mytotal=result.data.pojo.total;
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
            openEvent(val){
                this.status=val
                this.signEvent()
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.signEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.signEvent();
            }
        },
        mounted(){
            var me=this;
            me.signEvent();
            me.authorityEvent();

        }


    }
</script>

<style lang="less" scoped>
    @import '../../style/mixin';
    .layui-form{
        overflow:scroll;
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
    .layui-form-item .layui-input-inline {
        width: auto!important;
    }
    .layui-form-item {
        margin-bottom:0px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
    }
    .el-upload img {
        max-height: 200px;
    }
    .el-upload-list__item-name{
        display:none!important;
    }
</style>
