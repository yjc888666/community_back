<template>
    <div class="editor">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text">
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    let editor=null
    export default {
        name: 'Editorbar',
        data () {
            return {
                info_: null
            }
        },
        model: {
            prop: 'value',
            event: 'focus'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear (val) {
                // 触发清除文本域内容
                if (val) {
                    editor.txt.clear()
                    this.info_ = null
                }
            },
            value (val) {
                // 使用 v-model 时,设置初始值
                editor.txt.html(val)
            }
        },
        mounted () {
            this.seteditor()
        },
        methods: {
            seteditor () {
                editor = new E(this.$refs.toolbar, this.$refs.editor)
                editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
                editor.customConfig.uploadImgServer = 'https://neibu.qklshequ.com/bbs/master/file/uploadimg'// 配置服务器端地址
                editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
                editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
                editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
                editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
                // this.editor.customConfig.uploadParams = {formFile:'2'};
                editor.customConfig.onchangeTimeout = 5000
                // 配置菜单
                editor.customConfig.menus = [
                    'bold', // 粗体
                    'underline', // 下划线
                    'link', // 插入链接
                    'quote', // 引用
                    'emoticon', // 表情
                    'image', // 插入图片
                    'table', // 表格
                    'code', // 插入代码
                ]
                editor.customConfig.uploadImgHooks = {
                        fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                    },
                    success: (xhr, editor, result) => {
                    // 图片上传成功回调
                    //
                    // let imgUrl = result.data;
                    // insertImg(imgUrl)
                },
                timeout: (xhr, editor) => {
                    // 网络超时的回调
                },
                error: (xhr, editor) => {
                    console.log(editor)
                    // 图片上传错误的回调
                },
                customInsert: (insertImg, result, editor) => {
                    // 图片上传成功,插入图片的回调
                    console.log(result);
                    var url = result.data;
                    insertImg(url)

                }
            };

                editor.customConfig.onchange = (html) => {
                    this.info_ = html
                    this.$emit('focus', this.info_)
//                    console.log(this.info_ )
                };

                // 创建富文本编辑器
                editor.create()
            }
        }
    }
</script>

<style>
    .toolbar {

        border: 1px solid #ccc;
    }
    .w-e-menu{
        z-index:1 !important;
    }
    .text {
        width:100%;
        border: 1px solid #ccc;
        height: 300px;
    }
</style>
