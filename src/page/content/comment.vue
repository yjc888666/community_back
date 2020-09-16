<template>
    <div>
        <div class="layui-field-box" v-show="menuShow">
            <div class="layui-box-searchber">
                <button class="layui-btn layui-btn-sm" @click="delAllEvent" v-show="chang('/master/comment/delete')">删除选中</button>
            </div>
            <hr>
            <table class="layui-table admin-table">
                <thead>
                <tr>
                    <th width="5%" align="center"><input type="checkbox" v-model="checkAll" @change="changeState"></th>
                    <th width="5%" align="center">ID</th>
                    <th width="30%" align="center">评论内容</th>
                    <th width="30%" align="center">所属帖子</th>
                    <th width="10%" align="center">所属会员</th>
                    <th width="10%" align="center">评论时间</th>
                    <th width="10%" align="center" v-show="chang('/master/comment/delete')">基本操作</th>
                </tr>
                </thead>
                <tbody id="content">
                 <tr v-for="(item,index) in commentlist.list" :key="index">
                    <td align="center"><input type="checkbox" v-model="checkModel" :value="item.id"></td>
                    <td align="center">{{index+1}}</td>
                    <td style="padding-left: 20px;">
                        <a target="_blank" href="javascript:;" v-html="item.content"></a>
                    </td>
                    <td style="padding-left: 20px;"><a target="_blank" href="javascript:;" v-html="item.tname"></a></td>
                    <td align="center"><a target="_blank" href="javascript:;">{{item.username}}</a></td>
                    <td align="center">{{item.time}}</td>
                    <td align="center" v-show="chang('/master/comment/delete')">
                        <a class="elementdel layui-btn layui-btn-danger layui-btn-sm" href="javascript:;"  @click="delEvent(item.id)" >删除</a>
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

   </div>


</template>

<script>

    export default {
        name: 'comment',
    	data(){
    		return {
                url: this.GLOBAL.baseUrl,
                menuShow:true,
                editShow:false,
                commentlist:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                checkAll:false,
                checkModel:[],
                auth:[],
            }
    		},
        watch:{
            checkModel: {
                handler () {
               if(this.checkModel.length==this.commentlist.list.length){
                   this.checkAll=true;
               }else{
                   this.checkAll=false;
               }
               },
                deep: true
            },
        },
        methods:{
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

            changeState(item){
                var me=this;
                me.checkModel=[];
                if(me.checkAll==true){
                    me.commentlist.list.forEach(function(value,index){
                        me.checkModel.push(value.id)
                   })
                }
            },
            commentEvent(){
                var me=this;
                me.$axios.post(me.url+"master/comment/list?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.commentlist=result.data;
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
            del(){
                var me=this;
                me.$axios.post(me.url+"master/comment/delete",me.checkModel)
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
                            me.commentEvent();
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
            handleSizeChange(val) {
                this.pageSize=val;
                this.commentEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.commentEvent();
            },
            delEvent(id){
                var me=this;
                me.$axios.post(me.url+"master/comment/delete",[id])
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
                            me.commentEvent();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

             },
        mounted(){
           this.commentEvent();
            this.authorityEvent();
        }
    	}
</script>

<style lang="less" scoped>

</style>
