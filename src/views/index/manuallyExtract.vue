<template>
    <div class="extract-box">
        <el-form ref="ruleForm" :rules="rules" label-width="190px" size="small" label-position="left" class="demo-ruleForm">
            <el-form-item label="请填写提取码" prop="name">
                <el-input v-model="ruleForm.name" placeholder="输入曾经收到的提取码, 手工提取时光信件"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button style="width: 120px;" type="primary" @click="submitForm('ruleForm')">我要提取</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {
    Form,
    FormItem
} from 'element-ui';
export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem
    },
    data() {
        return {
            ruleForm: {
                name: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入您的姓名',
                    trigger: 'blur'
                }]
            }
        };
    },

    beforeMount() {},

    mounted() {},

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }

}
</script>
<style lang='scss' scoped>
.extract-box {
    width: 100%;
    height: auto;

    .demo-ruleForm {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: left;
        padding: 30px 12% 0 12%;
    }
}
</style>