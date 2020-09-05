<template>
<div class="index-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px" size="small" label-position="left" class="demo-ruleForm">
        <el-form-item class="media-mobile" label="您的昵称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写昵称, 将在邮件的标题中出现"></el-input>
        </el-form-item>
        <el-form-item class="media-mobile" label="收件邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="可以是你自己, 或是任何一个你想倾诉的人. 填写TA的邮箱地址, 形如 abc@163.com"></el-input>
        </el-form-item>
        <el-form-item class="media-mobile media-date-time" label="发信时间" required>
            <el-col :span="11">
                <el-form-item class="not-media-mobile" prop="date1">
                    <el-date-picker :picker-options="pickerOptions1" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item class="not-media-mobile" prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item class="media-mobile" label="是否公开" prop="type">
            <el-checkbox label="选中后, 信的内容将在&quot;公开信&quot;中展示, 所有人都可以浏览和评论" v-model="ruleForm.public"></el-checkbox>
        </el-form-item>
        <div class="edit_container">
            <quill-editor v-model="ruleForm.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
        </div>
        <el-form-item class="not-media-mobile">
            <div class="verification-box">
                <img style="margin-right: 20px;" :src="imgSrc" @click="changeImg" />
                <el-form-item prop="verificationCode">
                    <el-input style="width: 140px;margin-right: 20px;" v-model="ruleForm.verificationCode" placeholder="输入验证码"></el-input>
                </el-form-item>
                <el-button style="width: 120px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    Form,
    FormItem,
    DatePicker,
    TimePicker,
    Col,
    Checkbox
} from 'element-ui';
import {
    quillEditor
} from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import {
    sendEmail
} from '@/api/index.js';
import dayjs from 'dayjs';
import {
    mixins
} from '@/utils/mixins';
export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [DatePicker.name]: DatePicker,
        [TimePicker.name]: TimePicker,
        [Col.name]: Col,
        [Checkbox.name]: Checkbox,
        quillEditor
    },
    mixins: [mixins],
    data() {
        return {
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < (Date.now() - 60 * 60 * 24 * 1000);
                }
            },
            ruleForm: {
                name: '',
                email: '',
                date1: '',
                date2: '',
                public: false,
                content: '',
                verificationCode: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入您的昵称',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入收件邮箱',
                    trigger: 'blur'
                }, {
                    validator: this.validEmail,
                    trigger: 'blur'
                }],
                date1: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                date2: [{
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'change'
                }],
                type: [{
                    required: false
                }],
                verificationCode: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }]
            },
            editorOption: {},
            imgSrc: process.env.VUE_APP_BASE_API + '/captcha?' + new Date().getTime()
        };
    },

    beforeMount() {},

    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        url() {
            return process.env.VUE_APP_BASE_API;
        }
    },

    mounted() {},

    methods: {
        handleSelect() {},
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.ruleForm.content) {
                        let params = {
                            name: this.ruleForm.name,
                            receiptEmail: this.ruleForm.email,
                            sendTime: this.jointDate(),
                            isPublic: this.ruleForm.public,
                            content: this.ruleForm.content,
                            verificationCode: this.ruleForm.verificationCode
                        };
                        if (this.compareToNow(params.sendTime)) {
                            this.$message('亲, 请选择未来时间发送!');
                            return;
                        }
                        const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        sendEmail(params)
                            .then(res => {
                                console.log(res);
                                loading.close();
                                if (res.statusCode) {
                                    this.$message({
                                        showClose: true,
                                        message: '发送成功',
                                        type: 'success'
                                    });
                                    setTimeout(() => {
                                        this.$storage.write('email-data', res.data || {});
                                        this.$router.push('extract');
                                    }, 400)
                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                            .catch(err => {
                                loading.close();
                                this.$message.error('发送失败, 请稍后重试');
                            });
                    } else {
                        this.$message('请输入邮件内容');
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange() {}, // 内容改变事件
        changeImg(e) {
            console.log(this.url);
            this.imgSrc = this.url + '/captcha?' + new Date().getTime();
        },
        jointDate() {
            let q = dayjs(this.ruleForm.date1)
                .format('YYYY-MM-DD HH:mm:ss')
                .split(' ')[0];
            let h = dayjs(this.ruleForm.date2)
                .format('YYYY-MM-DD HH:mm:ss')
                .split(' ')[1];
            return `${q} ${h}`;
        },
        compareToNow(date) {
            let result = false;
            if (date) {
                new Date().getTime() > new Date(date).getTime() ? result = true : '';
            }
            return result;
        }
    }
};
</script>

<style lang="scss" scoped>
.index-box {
    width: 100%;
    height: auto;

    .demo-ruleForm {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: left;
        padding: 30px 12% 0 12%;

        .edit_container {
            margin-bottom: 18px;
        }

        .verification-box {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        .line {
            text-align: center;
        }
    }
}

.el-form-item--small .el-form-item {
    margin-bottom: 0;
}

/deep/ .ql-editor {
    min-height: 240px;
}
</style>
