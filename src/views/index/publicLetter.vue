<template>
    <div class="public-box">
        <div class="alone" v-for="item in 5" :key="item">
            <div class="message">
                <a href="#" title="">投递人: 黄佳伟 87*******@qq.com</a>
                <span>2019-11-19 12:44 寄往 2021-05-20 12:39</span>
            </div>
            <div class="content">
                这是一封来自过去的我写给你的信，此时此刻的我坐在教室里听课，我们刚刚结束聊天。2020年2月23号的这天是个重要的日子，是你从这个世界走过的第23个年头
            </div>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
    Pagination
} from 'element-ui';
export default {
    components: {
        [Pagination.name]: Pagination
    },
    data() {
        return {

        };
    },

    beforeMount() {},

    mounted() {},

    methods: {},

}
</script>
<style lang='scss' scoped>
.public-box {
    height: auto;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 30px 12% 30px 12%;

    .alone {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 20px 40px;
        border-bottom: 1px solid #000;

        .message {
            display: flex;
            flex: 1;
            margin-bottom: 30px;
            font-size: 16px;

            a {
                color: #3498db;
                word-wrap: break-word;
                margin-right: 70px;
            }

            span {
                font-weight: 500;
            }
        }

        .content {}
    }
	.pagination {
		width: 100%;
        text-align: right;
        margin-top: 24px;
	}
}
</style>