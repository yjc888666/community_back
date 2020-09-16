<template>
    <div style="margin-bottom:10px;">
        <div class="layui-form">
            <div class="layui-field-box"  v-show="menuShow">
                <table class="layui-table admin-table">
                    <thead>
                    <tr>
                        <th align="center">分享用户</th>
                        <th align="center">分享类型</th>
                        <th align="center">分享时间</th>
                    </tr>
                    </thead>
                    <tbody id="content">

                    <tr v-for="(item,index) in signList" :key="index">
                        <td>{{item.username}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.time}}</td>
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
        name: 'share',
        data() {
            return {
                url: this.GLOBAL.baseUrl,
                signList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],
                menuShow:true
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
            signEvent(){
                var me=this;
                me.$axios.post(me.url+"master/share/list?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.signList=result.data.list;
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
                this.signEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.signEvent();
            }
        },
        mounted(){
            this.signEvent();
        }

    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .layui-form{
        overflow:scroll;
    }
     .el-input__inner{
        height:30px!important;
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

    .el-input__inner{
        height:33px;
        line-height:33px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width:140px;
    }
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
    }
    .layui-form-item .layui-input-inline {
        width:auto;
    }
</style>
