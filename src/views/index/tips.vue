<template>
<div class="index-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="190px" size="small" label-position="left" class="demo-ruleForm">
        <el-form-item class="media-mobile" label="您的昵称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写昵称, 将在邮件的标题中出现"></el-input>
        </el-form-item>
        <el-form-item class="media-mobile" label="收件邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="可以是你自己, 或是任何一个你想倾诉的人. 填写TA的邮箱地址, 形如 abc@163.com"></el-input>
        </el-form-item>
        <el-form-item class="media-mobile" label="是否公开" prop="type">
            <el-checkbox label='选中后, 信的内容将在"公开信"中展示, 所有人都可以浏览和评论' v-model="ruleForm.public"></el-checkbox>
        </el-form-item>
        <div class="edit_container">
            <quill-editor v-model="ruleForm.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
        </div>
        <el-form-item class="not-media-mobile">
            <div class="verification-box">
                <el-button style="width: 120px" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    Form,
    FormItem,
    Col,
    Checkbox
} from "element-ui";
import {
    quillEditor
} from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import {
    sendEmailTips
} from "@/api/index.js";
import {
    mixins
} from "@/utils/mixins";
export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Col.name]: Col,
        [Checkbox.name]: Checkbox,
        quillEditor,
    },
    mixins: [mixins],
    data() {
        return {
            ruleForm: {
                name: "",
                email: "",
                public: false,
                content: "",
            },
            rules: {
                name: [{
                    required: true,
                    message: "请输入您的昵称",
                    trigger: "blur",
                }, ],
                email: [{
                        required: true,
                        message: "请输入收件邮箱",
                        trigger: "blur",
                    },
                    {
                        validator: this.validEmail,
                        trigger: "blur",
                    },
                ],
                type: [{
                    required: false,
                }, ],
            },
            editorOption: {},
        };
    },

    beforeMount() {},

    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        url() {
            return process.env.VUE_APP_BASE_API;
        },
    },

    mounted() {},

    methods: {
        handleSelect() {},
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.content) {
                        let params = {
                            name: this.ruleForm.name,
                            receiptEmail: this.ruleForm.email,
                            isPublic: this.ruleForm.public,
                            content: this.ruleForm.content,
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: "Loading",
                            spinner: "el-icon-loading",
                            background: "rgba(0, 0, 0, 0.7)",
                        });
                        sendEmailTips(params)
                            .then((res) => {
                                console.log(res);
                                loading.close();
                                if (res.statusCode) {
                                    this.$message({
                                        showClose: true,
                                        message: "发送成功",
                                        type: "success",
                                    });
                                    setTimeout(() => {
                                        this.$storage.write("email-data", res.data || {});
                                        this.$router.push("extract");
                                    }, 400);
                                } else {
                                    this.$message.error(res.message);
                                }
                            })
                            .catch((err) => {
                                loading.close();
                                this.$message.error("发送失败, 请稍后重试");
                            });
                    } else {
                        this.$message("请输入邮件内容");
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
    },
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
