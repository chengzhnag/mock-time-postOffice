<template>
<div class="public-box">
    <div class="alone" v-for="(item, index) in pageControl.list" :key="index">
        <div class="message">
            <span class="a">投递人: {{ item.name }} {{ item.receiptEmail | hiddenEmail }}</span>
            <span>{{ item.createTime | formatDate }} 寄往 {{ item.sendTime | formatDate }}</span>
        </div>
        <div class="content" v-html="item.content">
        </div>
    </div>
    <div class="pagination" v-if="!isExtract">
        <el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="pageControl.total"></el-pagination>
    </div>
</div>
</template>

<script>
import {
    Pagination
} from 'element-ui';
import {
    getPublicLetter
} from '@/api/index.js';
export default {
    components: {
        [Pagination.name]: Pagination
    },
    data() {
        return {
            pageControl: {
                page: 1,
                pageSize: 6,
                list: [],
                total: 0
			},
			isExtract: false
        };
    },

    beforeMount() {},

    mounted() {
        let _data = this.$storage.read('extract-data');
        if (_data) {
			this.isExtract = true;
			this.pageControl.list.push(_data);
            this.$storage.remove('extract-data');
        } else {
            this.loadData();
        }
    },

    methods: {
        loadData() {
            let params = {
                page: this.pageControl.page,
                pageSize: this.pageControl.pageSize
            };
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            getPublicLetter(params)
                .then(res => {
                    loading.close();
                    if (res.statusCode) {
                        this.pageControl.list = res.data;
                        this.pageControl.total = res.totalCount;
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    loading.close();
                    this.$message.error(err || '获取公开信列表失败, 请稍后重试!');
                });
        },
        pageChange(e) {
            console.log(e);
            this.pageControl.page = e;
            this.loadData();
        }
    }
};
</script>

<style lang="scss" scoped>
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
        border-top: 1px solid #000;

        .message {
            display: flex;
            flex: 1;
            margin-bottom: 30px;
            font-size: 16px;

            .a {
                color: #3498db;
                word-wrap: break-word;
                margin-right: 70px;
            }

            span {
                font-weight: 500;
            }
        }

        .content {}
		&:first-child {
			border-top: none;
		}
    }

    .pagination {
        width: 100%;
        text-align: right;
        margin-top: 24px;
    }
}
</style>
