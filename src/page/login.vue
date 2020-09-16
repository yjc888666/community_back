<template>
    <div class="fillcontain">
        <canvas id="canvas" class="canvas"></canvas>
        <div class="login-box">
            <div class="logos"></div>
            <form>
                <div class="ipunt-wrap">
                    <label for="username" class="icon-user">
                        <img src="../assets/img/user.png" alt="">
                    </label>
                    <input type="text" id="username" placeholder="用户名" v-model="username">
                </div>
                <div class="ipunt-wrap">
                    <label for="password" class="icon-password">
                        <img src="../assets/img/password.png" alt="">
                    </label>
                    <input type="password" id="password" placeholder="密码" v-model="password">
                </div>
                <div class="button" >
                    <a class="gv" href="javascript:;" @click="Login()">登录</a>
                </div>
            </form>
        </div>
        <div class="city"></div>
    </div>
</template>

<script>
    import Stars from '../../static/js/Star'
    import Moon from '../../static/js/Moon'
    import Meteor   from '../../static/js/Meteor'
    export default {
        name: 'login',
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                username:'',
                password:"",
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
            let canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                width = window.innerWidth,
                height = window.innerHeight,
            //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
                moon = new Moon(ctx, width, height),
                stars = new Stars(ctx, width, height, 200),
                meteors = [],
                count = 0

            canvas.width = width;
            canvas.height = height;

            const meteorGenerator = ()=> {
                //x位置偏移，以免经过月亮
                let x = Math.random() * width + 800
                meteors.push(new Meteor(ctx, x, height))

                //每隔随机时间，生成新流星
                setTimeout(()=> {
                    meteorGenerator()

                }, Math.random() * 2000)
            }

            const frame = ()=>{
                count++
                count % 10 == 0 && stars.blink()
                moon.draw()
                stars.draw()

                meteors.forEach((meteor, index, arr)=> {
                    //如果流星离开视野之内，销毁流星实例，回收内存
                    if (meteor.flow()) {
                    meteor.draw()
                } else {
                    arr.splice(index, 1)
                }
            })
                requestAnimationFrame(frame)
            }
            meteorGenerator()
            frame()
        },
        computed: {

        },
        methods: {
            Login(){
                if (!this.username || !this.password) {
                    this.$message({
                        message:'请填写完整信息',
                        type: 'error'
                    })
                    return;
                }
                var user = {
                    username: this.username,
                    password: this.password
                }
                var me=this;
                me.$axios.post(me.url+"master/land", user)
                    .then(function (result) {
                        if(result.data.result===false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result===true){

                            me.$store.dispatch("login",result.data.pojo).then(() => {
                                me.$message({
                                message: "登录成功",
                                type: 'success'
                            })
                        })
//                            me.$router.push('/manage');
                            let redirect = decodeURIComponent(me.$route.query.redirect || '/manage');
                            sessionStorage.setItem('redirect',me.$route.query.redirect)
                            me.$router.push({ path: redirect })
                        }
                    }) .catch(function (error) {
                    console.log(error);
                });

            },
        }
    }

</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .form_contianer{
    .wh(260px, 210px);
        position: relative;
        top:100px;
        padding: 60px;
        border-radius: 5px;
        margin:0 auto;
        text-align: center;
        background-color: #fff;
        padding-bottom:100px;
    .submit_btn{
        width: 100%;
        font-size: 16px;
    }
    }
    .loginTitle{
        margin-bottom:50px;
        color:@sizeC;
        font-weight: 100;
    }
    @media screen and (max-width: 768px){
        .form_contianer{
            padding: 50px;
        }
    }
    .fillcontain{
        position: fixed;
    }
    .canvas {
        position: fixed;
        z-index: -1;
    }
    .city {
        width: 100%;
        height: 170px;
        position: fixed;
        bottom: 0px;
        z-index: 100;
        background: url(../assets/img/city.png) no-repeat;
        background-size: cover;
    }
    .ipunt-wrap input{
        border: none;
        outline: none;
        background: none;
        border-bottom: 1px solid #fff;
        margin-top: 30px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        /* text-align: center; */
        color: #fff;
        font-size: 14px;
        padding: 0 5px;
    }
    .button{
        margin-top: 30px;
        margin-left: 60px;
    }
    .gv {
        text-decoration: none;
        background: url('../assets/img/nav_gv.png') repeat 0px 0px;
        width: 130px;
        height: 43px;
        display: block;
        text-align: center;
        line-height: 43px;
        cursor: pointer;
        float: left;
        margin: 10px 2px 10px 2px;
        font: 18px/43px 'microsoft yahei';
        color: #066197;
    }
    .login-box {
        width: 600px;
        padding: 50px;
        margin: 100px auto;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-direction: column;
        flex-direction: column;
        z-index: 1;
    }
    .login-box .logos {
        width: 270px;
        height: 108px;
        margin-bottom: 20px;
        background: url(../assets/img/logo.png) no-repeat;
        background-size: cover;
    }
    @media screen and (max-width: 450px) {
        .login-box{
            width: 210px;
            padding: 50px;
            margin: 0px auto;
            margin-top:20px;
        }
        .ipunt-wrap input{
            width:auto;
        }
        .button{
            margin-left: 40px;
        }
    }
</style>
