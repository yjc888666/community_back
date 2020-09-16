import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//登陆页面
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
//管理页面
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
//签到
const sign = r => require.ensure([], () => r(require('@/page/sign/sign')), 'sign');
//系统配置
const siteConfig = r => require.ensure([], () => r(require('@/page/system/siteConfig')), 'siteConfig');
//菜单
const bgMenu = r => require.ensure([], () => r(require('@/page/menu/bgMenu')), 'bgMenu');
//内容管理
const shequ = r => require.ensure([], () => r(require('@/page/content/shequ')), 'shequ');
const forum = r => require.ensure([], () => r(require('@/page/content/forum')), 'forum');
const comment = r => require.ensure([], () => r(require('@/page/content/comment')), 'comment');
const message = r => require.ensure([], () => r(require('@/page/content/message')), 'message');
const activity = r => require.ensure([], () => r(require('@/page/content/activity')), 'activity');
const vote = r => require.ensure([], () => r(require('@/page/content/vote')), 'vote');
//用户管理
const adminHt = r => require.ensure([], () => r(require('@/page/user/adminHt')), 'adminHt');
const permisGroup = r => require.ensure([], () => r(require('@/page/user/permisGroup')), 'permisGroup');
const adminQt = r => require.ensure([], () => r(require('@/page/user/adminQt')), 'adminQt');
const userManage = r => require.ensure([], () => r(require('@/page/user/userManage')), 'userManage');
const memberLevel = r => require.ensure([], () => r(require('@/page/user/memberLevel')), 'memberLevel');
//记录
const operation = r => require.ensure([], () => r(require('@/page/record/operation')), 'operation');
const integral = r => require.ensure([], () => r(require('@/page/record/integral')), 'integral');
// 请假
const holiday = r => require.ensure([], () => r(require('@/page/sign/holiday')), 'holiday');
const leave = r => require.ensure([], () => r(require('@/page/sign/leave')), 'leave');
const information = r => require.ensure([], () => r(require('@/page/leave/information')), 'information');
// 简历
const resume = r => require.ensure([], () => r(require('@/page/leave/resume')), 'resume');
const reimbursement = r => require.ensure([], () => r(require('@/page/leave/reimbursement')), 'reimbursement');
const absenteeism = r => require.ensure([], () => r(require('@/page/leave/absenteeism')), 'absenteeism');
const salary = r => require.ensure([], () => r(require('@/page/leave/salary')), 'salary');
//分享
const share = r => require.ensure([], () => r(require('@/page/share/share')), 'share');
//项目管理
const interfaces = r => require.ensure([], () => r(require('@/page/project/interfaces')), 'interfaces');
const module = r => require.ensure([], () => r(require('@/page/project/module')), 'module');
const projects = r => require.ensure([], () => r(require('@/page/project/projects')), 'projects');
const changeRecord = r => require.ensure([], () => r(require('@/page/project/changeRecord')), 'changeRecord');
//附件
const list = r => require.ensure([], () => r(require('@/page/enclosure/list')), 'list');
const download = r => require.ensure([], () => r(require('@/page/enclosure/download')), 'download');
const bug = r => require.ensure([], () => r(require('@/page/enclosure/bug')), 'bug');
const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		children: [{
            path: '/sign',
            component: sign,
            meta: ['考勤管理','签到管理'],
        },{
            path: '/attendance',
            component: resolve => require(['@/page/sign/attendance'], resolve),
            meta: ['考勤管理','迟到早退'],
        },{
            path: '/siteConfig',
            component: siteConfig,
            meta: ['系统配置','站点配置'],
        },{
            path: '/bgMenu',
            component: bgMenu,
            meta: ['菜单管理','后台菜单'],
        },{
             path: '/shequ',
             component: shequ,
             meta: ['内容管理','社区板块'],
        },{
            path: '/forum',
            component: forum,
            meta: ['内容管理','帖子管理'],
        },{
            path: '/comment',
            component: comment,
            meta: ['内容管理','评论管理'],
        },{
            path: '/message',
            component: message,
            meta: ['内容管理','消息管理'],
        },{
            path: '/activity',
            component: activity,
            meta: ['内容管理','活动管理'],
        },{
            path: '/vote',
            component: vote,
            meta: ['内容管理','投票管理'],
        },{
            path: '/adminHt',
            component: adminHt,
            meta: ['用户管理','后台管理员'],
        },{
            path: '/permisGroup',
            component: permisGroup,
            meta: ['用户管理','后台权限组'],
        },{
            path: '/adminQt',
            component: adminQt,
            meta: ['用户管理','前台权限组'],
        },{
            path: '/userManage',
            component: userManage,
            meta: ['用户管理','前台用户管理'],
        },{
            path: '/memberLevel',
            component: memberLevel,
            meta: ['用户管理','会员等级'],
        },{
            path: '/operation',
            component: operation,
            meta: ['记录管理','操作记录'],
        },{
            path: '/integral',
            component: integral,
            meta: ['记录管理','积分记录']
        },{
            path: '/information',
            component: information,
            meta: ['员工管理','员工信息']
        },{
            path: '/resume/:id',
            component: resume,
            meta: ['员工管理','简历信息']
        },{
            path: '/leave',
            component: leave,
            meta: ['员工管理','请假调休']
        },{
            path: '/holiday',
            component: holiday,
            meta: ['员工管理','加班考勤']
        },{
            path: '/outwork',
            component: resolve => require(['@/page/sign/outwork'], resolve),
            meta: ['员工管理','外出考勤']
        },{
            path: '/reimbursement',
            component: reimbursement,
            meta: ['员工管理','报销记录']
        },{
            path: '/absenteeism',
            component: absenteeism,
            meta: ['员工管理','旷工记录']
        },{
            path: '/salary',
            component: salary,
            meta: ['员工管理','薪资记录']
        },{
            path: '/share',
            component: share,
            meta: ['分享管理','分享记录']
        },{
            path: '/interfaces',
            component: interfaces,
            meta: ['项目管理','接口记录']
        },{
            path: '/module',
            component: module,
            meta: ['项目管理','模块记录']
        },{
            path: '/projects',
            component: projects,
            meta: ['项目管理','项目记录']
        },{
            path: '/changeRecord',
            component: changeRecord,
            meta: ['项目管理','变更记录']
        },{
            path: '/list',
            component: list,
            meta: ['附件管理','附件列表']
        },{
            path: '/download',
            component: download,
            meta: ['附件管理','下载纪录']
        },{
            path: '/bug',
            component: bug,
            meta: ['附件管理','购买纪录']
        }
        ]
	}
]

const router = new Router({
    linkActiveClass:'.el-menu-item.is-active',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

router.beforeEach((to, from, next) => {
    var userInfo = JSON.parse(sessionStorage.getItem('vuex'));//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页咯
        next();
    } else {
        if(to.path=='/'){ //如果是登录页面路径，就直接next()
            next();
        }else { //不然就跳转到登录；
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
})

export default router
