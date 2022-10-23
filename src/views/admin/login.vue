<template>
<div class="login-box">
    <h1 class="login-box-title">管理员登陆</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="account">
            <el-input placeholder="请输入账号" v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input placeholder="请输入密码" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    Form,
    FormItem,
} from "element-ui";
import {
    adminLogin
} from '@/api/index.js';
export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        return {
            ruleForm: {
                account: "",
                password: "",
            },
            rules: {
                account: [{
                    required: true,
                    message: '账号不能为空'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空'
                }]
            },
        };
    },

    beforeMount() {},

    mounted() {},

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    adminLogin(this.ruleForm)
                        .then(res => {
                            console.log(res);
                            loading.close();
                            if (res.statusCode) {
                                this.$message({
                                    showClose: true,
                                    message: '登录成功',
                                    type: 'success'
                                });
                                setTimeout(() => {
                                    this.$router.push('/admin/list');
                                }, 400)
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                        .catch(err => {
                            loading.close();
                            this.$message.error('登录失败, 请稍后重试');
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style lang="less" scoped>
.login-box {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(178, 238, 225, 0.2);

    &-title {
        font-size: 18px;
        margin-bottom: 30px;
        font-weight: bold;
    }
}

.demo-ruleForm {
    width: 78%;
    max-width: 300px;
    margin-bottom: 60px;
}
</style>
