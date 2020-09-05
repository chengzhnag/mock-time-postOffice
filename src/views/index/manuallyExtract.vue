<template>
<div class="extract-box">
    <div v-if="!isSendSuccess">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="190px" size="small" label-position="left" class="demo-ruleForm">
            <el-form-item label="请填写提取码" prop="extract">
                <el-input v-model="ruleForm.extract" placeholder="输入曾经收到的提取码, 手工提取时光信件"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button style="width: 120px;" type="primary" @click="extract('ruleForm')">我要提取</el-button>
            </el-form-item>
        </el-form>
        <div class="tips">导航栏向右滑动还有关注我们的故事☞☞☞</div>
    </div>
    <div v-else class="message-box">
        <span>
            本页面将在
            <span class="error-msg">{{ countDown }}</span>
            秒后过期
        </span>
        <span>在未来的某一天,</span>
        <span>我们将为你把邮件发送到你刚刚填写的邮箱中去</span>
        <span>或者,</span>
        <span>请保存你获得的提取码, 到期后即可手动提取</span>
        <span class="important">{{ extractCode }}</span>
        <span>将提取码发至以下邮箱(也可修改为他人的邮箱, 请朋友来领取):</span>
        <span>为确保收到我们的时光信,</span>
        <span>
            最好将
            <span class="error-msg">1772591173@qq.com</span>
            放入邮箱白名单哦 ^_^
        </span>
        <el-form :model="sendForm" ref="sendForm" :rules="sendRules" size="small" label-position="left" class="send-success">
            <el-form-item prop="email" style="width: 40%;">
                <el-input v-model="sendForm.email" placeholder="请把提取码发送至这个邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 120px;" type="primary" @click="submitForm('sendForm')">发送</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import {
    Form,
    FormItem
} from 'element-ui';
import {
    sendExtractEmail,
    byExtractGetEmail
} from '@/api/index.js';
import {
    mixins
} from '@/utils/mixins';
export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    mixins: [mixins],
    data() {
        return {
            ruleForm: {
                extract: ''
            },
            rules: {
                extract: [{
                    required: true,
                    message: '请输入您的提取码',
                    trigger: 'blur'
                }]
            },
            isSendSuccess: false,
            sendForm: {
                email: ''
            },
            sendRules: {
                email: [{
                        required: true,
                        message: '请输入目标邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: this.validEmail,
                        trigger: 'blur'
                    }
                ]
            },
            extractCode: '',
            countDown: 100,
            interval: null
        };
    },

    beforeMount() {},

    mounted() {
        let _data = this.$storage.read('email-data');
        console.log(_data);
        if (_data) {
            this.isSendSuccess = true;
            this.extractCode = _data['extractCode'] || '';
            this.sendForm.email = _data['receiptEmail'] || '';
            this.interval = setInterval(() => {
                this.countDown = this.countDown - 1;
                if (!this.countDown) {
                    clearInterval(this.interval);
                    this.$router.push('/');
                }
            }, 1000);
            this.$storage.remove('email-data');
        }
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        receiptEmail: this.sendForm.email,
                        extract: this.extractCode
                    };
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    sendExtractEmail(params)
                        .then(res => {
                            loading.close();
                            if (res.statusCode) {
                                this.funcMessageBox();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                        .catch(err => {
                            loading.close();
                            this.$message.error('发送提取码失败, 请稍后重试');
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        extract(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {
                        extract: this.ruleForm.extract
                    };
                    byExtractGetEmail(params)
                        .then(res => {
                            if (res.statusCode) {
                                this.$storage.write('extract-data', res.data || {});
                                this.$router.push('public');
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                        .catch(err => {
                            this.$message.error('发送提取码失败, 请稍后重试');
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        funcMessageBox() {
            const h = this.$createElement;
            this.$msgbox({
                title: '消息',
                message: h(
                    'p', {
                        style: 'display: flex;flex-direction: column;'
                    },
                    [
                        h('span', null, '成功发送, 如果未能收到, 请'),
                        h(
                            'span', {
                                style: 'margin-top: 20px'
                            },
                            '1. 确认邮箱地址正确;'
                        ),
                        h('span', null, '2. 翻看垃圾箱'),
                        h('span', null, '3. 稍后重试')
                    ]
                ),
                showCancelButton: false,
                confirmButtonText: '确定'
            });
        }
    },
    beforeDestroy() {
        console.log('********beforeDestroy********');
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};
</script>

<style lang="scss" scoped>
.extract-box {
    width: 100%;
    height: auto;

    .demo-ruleForm,
    .message-box {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: left;
        padding: 30px 12% 0 12%;

        .error-msg {
            color: #f00;
        }

        .important {
            font-size: 18px;
            font-weight: 900;
            color: #f00;
        }

        span {
            margin-bottom: 8px;
        }
    }

    .send-success {
        margin-top: 10px;
    }

    .tips {
        display: none;
        font-size: 14px;
        color: #f00;
        padding: 0 3%;
        margin-top: 50px;
        text-align: center;
    }
}
</style>
