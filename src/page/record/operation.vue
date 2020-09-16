<template>
    <div>
        <!--主体-->
        <div class="layui-field-box">
                    <div class="layui-box-searchber">
                        <form class="layui-form layui-form-pane" action="">
                            <div class="layui-inline">
                                <label class="layui-form-label">用户名</label>
                                <div class="layui-input-inline"  style="width:110px;">
                                    <!--<input type="text"  value="" placeholder="请输入用户名" class="layui-input">-->
                                    <!--<el-select v-model="value" placeholder="用户名"  @change="getuser()">-->
                                        <!--<el-option-->
                                            <!--v-for="item in manageList"-->
                                            <!--:key="item.id"-->
                                            <!--:label="item.username"-->
                                            <!--:value="item.id">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                    <el-input v-model="username" placeholder="用户名查询"></el-input>
                                </div>
                            </div>
                            <div class="layui-inline">
                                <button class="layui-btn  layui-btn-sm" @click="getuser()">搜索</button>
                            </div>
                        </form>
                    </div>
                    <hr>
                    <table class="layui-table admin-table">
                        <thead>
                        <tr>
                            <th align="center">ID</th>
                            <th align="center">操作</th>
                            <th align="center">子操作</th>
                            <th align="center">管理员</th>
                            <th align="center">操作时间</th>

                        </tr>
                        </thead>
                        <tbody id="content">
                        <tr v-for="(item,index) in recordList" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.secondtitle}}</td>
                            <td>{{item.username}}</td>
                            <td>{{item.add_time}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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

</template>

<script>

    export default {
        name: 'operation',
    	data(){
            return {
                url: this.GLOBAL.baseUrl,
                manageList:[],
                recordList:[],
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                value:"",
                pageShow:true,
                auth:[],
                username:''
            }
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
            getuser(){
              this.recordEvent();
            },
            recordEvent(){
              var me=this;
//            操作记录
              me.$axios.post(me.url+"master/log/list?page=" + this.pageNum + "&size=" + this.pageSize+ "&username=" + this.username)
                    .then(function (result) {
                        me.recordList=result.data.list;
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
                this.recordEvent();
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.recordEvent();
            },
        },
        mounted(){
          this.authorityEvent();
          var me = this;
          me.recordEvent()
          //后台管理员的列表
                var me=this;
                me.$axios.post(me.url+"master/list")
                    .then(function (result) {
                        me.manageList=result.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

          }
    	}
</script>

<style lang="less">
	@import '../../style/mixin';
    .mar {
        margin-top: 10px;
    }
</style>
