<template>
    <div class="layui-layout layui-layout-admin" style="border-bottom: solid 5px #1aa094;height:60px;">
    <div class="layui-header header header-demo">
        <div class="layui-main">
            <div class="admin-login-box">
                <a class="logo" style="left: 0;">
                    <span style="font-size: 30px;">wswsk</span>
                </a>
                <div class="admin-side-toggle">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div class="admin-side-full">
                    <i class="fa fa-life-bouy" aria-hidden="true"></i>
                </div>
            </div>
            <ul class="layui-nav admin-header-item">
                <li class="layui-nav-item">
                    <a class="update_cache" href="javascript:void(0)">清除缓存</a>
                </li>
                <li class="layui-nav-item">
                    <a href="" target="_blank">浏览首页</a>
                </li>
                <span class="layui-nav-bar" style="left: 58px; top: 60px; width: 0px; opacity: 0;"></span>
                <li class="layui-nav-item">
                    <a href="javascript:;" class="admin-header-user">
                        <img src="../assets/img/default.png" />
                        <span>ydadmin</span>
                    </a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a id="changemima" href="javascript:;" data-url="view/diachange_password.html">
                                <i class="fa fa-user-circle" aria-hidden="true"></i> 修改密码</a>
                        </dd>

                        <dd>
                            <a class="logi_logout" href="javascript:void(0)">
                                <i class="fa fa-sign-out" aria-hidden="true"></i> 注销</a>
                        </dd>
                    </dl>
                </li>
                <span class="layui-nav-bar"></span>
            </ul>
            <ul class="layui-nav admin-header-item-mobile">
                <li class="layui-nav-item">
                    <a class="logi_logout" href="javascript:void(0)">
                        <i class="fa fa-sign-out" aria-hidden="true"></i> 注销</a>
                </li>
            </ul>
        </div>
    </div>
 </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<!--<style lang="less">-->
	<!--@import '../style/mixin';-->
	<!--.header_container{-->
		<!--background-color: #EFF2F7;-->
		<!--height: 60px;-->
		<!--display: flex;-->
		<!--justify-content: space-between;-->
		<!--align-items: center;-->
		<!--padding-left: 20px;-->
	<!--}-->
	<!--.avator{-->
		<!--.wh(36px, 36px);-->
		<!--border-radius: 50%;-->
		<!--margin-right: 37px;-->
	<!--}-->
	<!--.el-dropdown-menu__item{-->
        <!--text-align: center;-->
    <!--}-->
<!--</style>-->
<style lang="less" scoped>
    @import '../style/mixin';
    .layui-nav * {
        font-size:@f14!important;
    }
    .logo span{
        color:@sizeC;
        font-weight: bold;
    }
</style>
