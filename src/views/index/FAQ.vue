<template>
	<div class="faq-box">
		<div class="like" v-for="(item, index) in result" :key="index">
			<div class="title">{{ item.title }}</div>
			<div class="content" v-html="item.content"></div>
		</div>
	</div>
</template>

<script>
import { getQuestion } from '@/api/index.js';
export default {
	data() {
		return {
			data: [],
			defData: [
				{
					title: '1. 我在这个网站写信，会不会泄露隐私啊？',
					content: `私密信件不会泄露，邮件发送是全自动运行，内部存储也有一定加密措施，防止泄露。<br/>
当然，写信的时候勾选了“公开信”除外，公开信是所有人都能够阅读和评论的。公开信的邮件地址也是隐藏不显示的，不用担心泄露。`
				}
			]
		};
	},

	beforeMount() {},
	computed: {
		result() {
			return this.data.length ? this.data : this.defData;
		}
	},
	mounted() {
		this.loadData();
	},

	methods: {
		loadData() {
			getQuestion()
				.then(res => {
					if (res.statusCode) {
						this.data = res.data || [];
					} else {
						this.$message.error(res.message);
					}
				})
				.catch(err => {
					this.$message.error('获取常见问题失败, 请稍后重试');
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.faq-box {
	height: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 30px 12% 30px 12%;
	.like {
		width: 100%;
		height: auto;
		.title {
			font-size: 17px;
			font-weight: 500;
			color: rgb(0, 153, 204);
		}
		.content {
			font-size: 15px;
			margin-bottom: 16px;
			margin-top: 6px;
		}
	}
}
</style>
