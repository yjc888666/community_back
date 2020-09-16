<template>
    <div>
        <div class="layui-field-box"  v-show="menuShow">
            <div class="layui-box-searchber">
                <form class="layui-form-pane">
                    <div class="layui-form">
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

                    <th width="5%" align="center">ID</th>
                    <th align="center">项目名称</th>
                    <th width="60px" style="text-align:center">负责人</th>
                    <th width="70px" style="text-align:center">变更时间</th>
                    <th width="70px" style="text-align:center">消息</th>
                </tr>
                </thead>
                <tbody id="content">
                <tr v-for="(item,index) in forumList.list" :key="index">
                    <td align="center">{{index+1}}</td>
                    <td style="padding-left: 20px;"><a target="_blank" href="javascript:;" v-html="item.name"></a></td>
                    <td align="center">{{item.responsible}}</td>
                    <td align="center">{{item.time}}</td>
                    <td align="center">{{item.message}}</td>
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
    </div>


</template>

<script>
    export default {
        name: 'changeRecord',
        data(){
            return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                keyword:'',
                forumList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],

            }
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
            forumEvent(){
                var me=this;
                var para={
                    page: this.pageNum,
                    size:this.pageSize,
                    name:this.keyword
                }
                me.$axios.post(me.url+"master/record/bypage",para)
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
            keywordEvent(val){
                this.keyword=val;
                this.forumEvent()
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
