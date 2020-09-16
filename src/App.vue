<template>
    <div id="app" class="fillcontain">
		    <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return{
            }
        },
        mounted(){
            var me=this;
            setInterval( () => {
              if(sessionStorage.getItem("vuex")){
                me.$axios.post("https://neibu.qklshequ.com/bbs/master/connect")
                    .then(function (result) {
                        if(result.data.login==false&&sessionStorage.getItem("vuex")!=null){
                            me.$message({
                                message: '打开页面时间太长，请重新登录',
                                type: 'error'
                            })
                            sessionStorage.clear();
                            me.$router.push({path: '/'});
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }, 5000)

        }
    }
</script>

<style lang="less">
	@import './style/common';
</style>
