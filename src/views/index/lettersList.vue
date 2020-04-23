<template>
	<div class="letters-box">
		<el-table :data="pageControl.list" class="table-box">
			<el-table-column style="width: 100%" align="center" prop="name" label="昵称" width="120"></el-table-column>
			<el-table-column align="center" prop="receiptEmail" label="email地址" width="220"></el-table-column>
			<el-table-column align="center" prop="createTime" label="创建时间" width="220"></el-table-column>
			<el-table-column align="center" prop="sendTime" label="收信时间" width="220"></el-table-column>
			<el-table-column align="center" prop="statusText" label="当前状态  "></el-table-column>
		</el-table>
		<div class="pagination"><el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="pageControl.total"></el-pagination></div>
	</div>
</template>

<script>
import { Table, TableColumn, Pagination } from 'element-ui';
import { getAllLetter } from '@/api/index.js';
import dayjs from 'dayjs';
export default {
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Pagination.name]: Pagination
	},
	data() {
		return {
			pageControl: {
				page: 1,
				pageSize: 10,
				list: [],
				total: 0
			},
			statusTexts: ['尚未寄送', '已寄送']
		};
	},

	beforeMount() {},

	mounted() {
		this.loadData();
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
			getAllLetter(params)
				.then(res => {
					loading.close();
					if (res.statusCode) {
						this.pageControl.list = res.data;
						this.setField();
						this.pageControl.total = res.totalCount;
					} else {
						this.$message.error(res.message);
					}
				})
				.catch(err => {
					loading.close();
					this.$message.error(err || '获取邮件列表失败, 请稍后重试!');
				});
		},
		pageChange(e) {
			console.log(e);
			this.pageControl.page = e;
			this.loadData();
		},
		setField() {
			let data = this.pageControl.list;
			try {
				data.forEach(item => {
					item.receiptEmail = item.receiptEmail.replace(/(\d{3})(\d+)(\d{0})/, (x, y, z, p) => {
						var i = '';
						while (i.length < z.length) {
							i += '*';
						}
						return y + i + p;
					});
					item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm');
					item.sendTime = dayjs(item.sendTime).format('YYYY-MM-DD HH:mm');
					item.statusText = this.statusTexts[item.status - 1];
				});
			} catch (e) {
				console.log(e);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.letters-box {
	height: auto;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 30px 12% 0 12%;

	.table-box {
		width: 100%;
	}

	.pagination {
		width: 100%;
		text-align: right;
		margin-top: 24px;
	}
}

.el-table::before {
	content: none;
}

.el-table {
	width: auto;
}
</style>
