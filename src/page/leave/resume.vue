<template>
    <div>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md11 content detail">
                    <div class="fly-panel detail-box">
                        <div class="detail-about">
                            <a class="fly-avatar" href="javascript:;">
                                <img :src="url+data.userhead" alt=""> </a>
                            <div class="fly-detail-user">
                                <a href="javascript:;" class="fly-link">
                                    <cite>{{data.username}}</cite>
                                </a>
                            </div>
                            <div class="detail-hits" id="LAY_jieAdmin" data-id="437">
                                <span>时间:	{{data.add_time}} </span>
                            </div>
                        </div>

                        <div class="detail-body photos" style="min-height:100px;">
                            <div class="wangEditor-container cl" style="border: 0px solid #e6e6e6;">

                                <div class="wangEditor-txt" style="padding: 0;margin-top: 0;">
                                    <p v-html="data.content_resume"></p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="fly-panel detail-box" id="flyReply">
                        <div id="comment"></div>
                        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
                            <legend>回帖</legend>
                        </fieldset>
                        <ul class="jieda">
                        <li class="jieda-daan" v-for="(replyItem,index) in replyData" :key="index">
                        <div class="detail-about detail-about-reply">
                        <a class="fly-avatar" href="javascript:;">
                        <img :src="url+replyItem.userhead" alt=""/> </a>
                        <div class="fly-detail-user">
                        <a href="javascript:;" class="fly-link">
                        <cite class="username">{{replyItem.username}}</cite>
                        </a>
                        </div>
                        <div class="detail-hits">
                         <span>{{replyItem.time}}</span>
                        </div>
                        </div>
                        <div class="detail-body jieda-body photos">
                         <p v-html="replyItem.content"></p>
                        </div>
                        <div class="jieda-reply">
                        <span type="edit" @click="delEvent1(replyItem.id)" >
                            <a style="color:#999" data-id="490"  class="del_btn">
                                <i class="iconfont icon-guanbi"></i>删除
                            </a>
                        </span>
                        </div>
                        </li>
                        </ul>
                        <div v-show="pageShow">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="totalCount">
                            </el-pagination>
                        </div>

                        <div class="layui-form" style="margin-top:20px;" id="reply">
                            <form>
                                <div class="layui-form-item layui-form-text" style="margin-bottom:20px;">
                                    <div class="edit_container">
                                       <vue-html5-editor :content="contents" :height="300" @change="updateData"></vue-html5-editor>
                                     </div>

                                </div>
                                <div class=" layui-form-item">
                                    <el-button type="primary" @click="submit" class="layui-btn">提交回答</el-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'resume',
        data () {
            return {
                url: this.GLOBAL.baseUrl,
                data: '',
                replyData: [],
                totalCount: 0,
                currentPage: 1,
                pageSize: 10,
                pageShow: false,
                contents:"",
                infoId:""
            }
        },
        methods: {
            updateData(e = "") {
                let c1 = e.replace(/<img style="margin:auto;display:table;" width="70%"/g, "<img");
                let c2 = c1.replace(/<img/g, '<img style="margin:auto;display:table;" width="70%"');
                this.contents = c2;
            },
            getReply(mypages){
                var me = this;
                var id = this.$route.params.id;
                me.$axios.post(me.url + "master/commentresume/bypage?id=" + id + "&page=" + mypages + "&size=" + this.pageSize)
                    .then(function (result) {
                        console.log(result)
                        me.replyData = result.data.list;
                        me.totalCount = result.data.total;
                        if (me.totalCount> 0) {
                            me.pageShow = true
                        }
                        else {
                            me.pageShow = false
                        }
                    })
                    .catch(function (error) {

                    });
            },
//            发表回复
            submit(){
                var me = this;
                if (me.contents == '') {
                    me.$message.error('请输入内容!');
                    return;
                }
                var contents = {
                    uid: this.$route.params.id,
                    rid:this.infoId,
                    content: me.contents,
                }
                me.$axios.post(me.url + "master/commentresume/add", contents)
                    .then(function (result) {
//                    console.log(result)
                        if (result.data.result == true) {
                            me.$message.success('提交成功!');
                        }
                        //将文本框中的值清空
                        me.content = "";
                        //直接将列表数据重新加载一次
                        me.getReply(1);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                var me = this;
                me.getReply(val)
            },

//        自己删除回复
            delEvent1(id){
                var me = this;
                me.$axios.post(me.url + "/master/commentresume/delete?id=" + id)
                    .then(function (result) {
                        me.getReply(1);
                        me.$message({
                            type: 'success',
                            message: result.data.msg
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        mounted(){
            var id = this.$route.params.id
            var me = this;
//            文章详情页
            me.$axios.post(me.url + "/master/resume/get?uid=" + id)
                .then(function (result) {
                    me.data = result.data;
                    me.infoId=result.data.id;
                })
                .catch(function (error) {
                    console.log(error);
                });

//            帖子回复
            me.getReply(parseInt(this.currentPage))

        }
    }
</script>

<style>
    .fly-footer {
        margin: 50px 0 0;
        padding: 20px 0 30px;
        line-height: 30px;
        text-align: center;
        color: #737573;
        border-top: 1px solid #e2e2e2;
    }

    .fly-footer a {
        padding: 0 6px;
        font-weight: 300;
        color: #333;
    }

    .fly-footer a:hover {
        color: #777;
    }

    .fly-union {
        margin-top: 10px;
        color: #999;
    }

    .fly-union > * {
        display: inline-block;
        vertical-align: middle;
    }

    .fly-union a[upyun] img {
        width: 80px;
    }

    .fly-union span {
        position: relative;
        top: 3px;
    }

    .fly-union span a {
        padding: 0;
        display: inline;
        color: #999;
    }

    .fly-union span a:hover {
        text-decoration: underline;
    }

    .rule li {
        line-height: 30px;
        list-style: normal;
        list-style: disc;
    }

    .rule li:nth-child(2) {
        margin-bottom: 20px;
    }

    .rule {
        margin-top: 15px;
        padding: 0 18px;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #333;
    }

    .jieda li:last-child {
        border-bottom: 0;
    }

    .edit_container {
        margin-top: 25px;
    }

    .ql-editor {
        min-height: 120px !important;
    }

    .reward {
        width: 320px;
        height: 363px;
        border-radius: 14px;
        padding: 0 40px;
    }

    .close_reward {
        width: 46px;
        height: 46px;
        position: absolute;
        right: 1px;
        cursor: pointer;
    }

    div#reward_form {
        text-align: center;
        margin: 40px 0 0;
    }

    .reward_btn {
        background: #f1bc78;
        position: absolute;
        bottom: 40px;
        font-size: 30px;
        color: #d3454e;
        width: 320px;
        text-align: center;
        line-height: 60px;
        border-radius: 5px;
        cursor: pointer;
    }

    .reward_name {
        text-align: center;
        margin: 10px;
        font-size: 20px;
        color: #fff;
    }

    .reward_avatar {
        text-align: center;
    }

    .reward_avatar img {
        border-radius: 100px;
        width: 92px;
        height: 92px;
        margin-top: -45px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.46);
    }

    div#reward_form input {
        background: 0;
        border: 0;
        color: #FBD776;
        font-size: 70px;
        text-align: center;
        width: 155px;
    }

    div#reward_form i {
        color: #FBD776;
        font-style: normal;
        margin-left: 10px;
        font-size: 20px;
    }

    .layui-layer-page .layui-layer-content {
        position: relative;
    }

    .layui-layer-shade {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
    }

    .wangEditor-txt {
        overflow: hidden;
    }

    .w-e-text-container {
        z-index: 90 !important;
    }

    .ql-editor {
        min-height: 200px !important;
    }
</style>
