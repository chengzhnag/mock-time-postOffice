<template>
<div class="index-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px" size="small" label-position="left" class="demo-ruleForm">
        <el-form-item label="你的姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写姓名, 将在邮件的标题中出现"></el-input>
        </el-form-item>
        <el-form-item label="收件邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="可以是你自己, 或是任何一个你想倾诉的人. 填写TA的邮箱地址, 形如 abc@163.com"></el-input>
        </el-form-item>
        <el-form-item label="发信时间" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="是否公开" prop="type">
            <el-checkbox label='选中后, 信的内容将在"公开信"中展示, 所有人都可以浏览和评论' v-model="ruleForm.public"></el-checkbox>
        </el-form-item>
        <div class="edit_container">
            <quill-editor v-model="ruleForm.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <el-form-item>
            <div class="verification-box">
                <img style="margin-right: 20px;" :src="imgSrc" @click="changeImg">
                <el-input style="width: 140px;margin-right: 20px;" v-model="ruleForm.verificationCode" placeholder="输入验证码"></el-input>
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
} from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
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
    data() {
        return {
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
                    message: '请输入您的姓名',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入收件邮箱',
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
                }]
            },
            editorOption: {},
            imgSrc: 'http://192.168.0.106:3000/captcha'
        };
    },

    beforeMount() {},

    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },

    mounted() {},

    methods: {
        handleSelect() {

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange() {}, // 内容改变事件
        changeImg(e) {
            this.imgSrc = 'http://192.168.0.106:3000/captcha?' + Math.random();
        }
    }
}
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
    }
}

.el-form-item--small .el-form-item {
    margin-bottom: 0;
}

/deep/ .ql-editor {
    min-height: 240px;
}
</style>
