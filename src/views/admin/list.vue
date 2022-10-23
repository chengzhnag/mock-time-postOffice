<template>
<div class="admin-list-box">
    <div class="admin-list-box-filter">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="demo-form-inline-item">
                <el-input clearable v-model="formInline.name" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item class="demo-form-inline-item">
                <el-input clearable v-model="formInline.receiptEmail" placeholder="email地址"></el-input>
            </el-form-item>
            <el-form-item class="demo-form-inline-item">
                <el-input clearable v-model="formInline.extractCode" placeholder="提取码"></el-input>
            </el-form-item>
            <el-form-item class="demo-form-inline-item">
                <el-select clearable v-model="formInline.status" placeholder="状态">
                    <el-option label="尚未寄送" :value="1"></el-option>
                    <el-option label="已寄送" :value="2"></el-option>
                    <el-option label="寄送失败" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="demo-form-inline-item">
                <el-select clearable v-model="formInline.isPublic" placeholder="是否公开">
                    <el-option label="公开" :value="true"></el-option>
                    <el-option label="未公开" :value="false"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="admin-list-box-filter-btn">
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </div>
    </div>
    <el-table border :data="pageControl.list" class="table-box">
        <el-table-column fixed style="width: 100%" align="center" prop="name" label="昵称" width="200"></el-table-column>
        <el-table-column align="center" prop="receiptEmail" label="email地址" width="180"></el-table-column>
        <el-table-column align="center" prop="extractCode" label="提取码" width="180"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column align="center" prop="sendTime" label="收信时间" width="200"></el-table-column>
        <el-table-column align="center" prop="statusText" label="当前状态" width="120"></el-table-column>
        <el-table-column align="center" prop="isPublic" label="是否公开" width="120"></el-table-column>
        <el-table-column fixed='right' label="操作" align="center" width="120">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination @current-change="pageChange" background layout="prev, pager, next" :total="pageControl.total"></el-pagination>
    </div>
</div>
</template>

<script>
import {
    Table,
    TableColumn,
    Pagination,
    Select,
    Option,
    Form,
    FormItem,
} from "element-ui";
import {
    getAllLetter_v2
} from "@/api/index.js";
import dayjs from "dayjs";
export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        [Select.name]: Select,
        [Option.name]: Option,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        return {
            pageControl: {
                page: 1,
                pageSize: 10,
                list: [],
                total: 0,
            },
            formInline: {
                receiptEmail: "",
                extractCode: "",
                status: "",
                name: "",
                isPublic: "",
            },
            statusTexts: ["尚未寄送", "已寄送"],
        };
    },

    beforeMount() {},

    mounted() {
        this.loadData();
    },

    methods: {
        loadData(query) {
            let params = {
                page: this.pageControl.page,
                pageSize: this.pageControl.pageSize,
                ...query,
            };
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            getAllLetter_v2(params)
                .then((res) => {
                    loading.close();
                    if (res.statusCode) {
                        this.pageControl.list = res.data;
                        this.setField();
                        this.pageControl.total = res.totalCount;
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((err) => {
                    loading.close();
                    this.$message.error(err || "获取邮件列表失败, 请稍后重试!");
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
                data.forEach((item) => {
                    // item.receiptEmail = item.receiptEmail.replace(
                    //     /(\d{3})(\d+)(\d{0})/,
                    //     (x, y, z, p) => {
                    //         var i = "";
                    //         while (i.length < z.length) {
                    //             i += "*";
                    //         }
                    //         return y + i + p;
                    //     }
                    // );
                    item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm");
                    item.sendTime = dayjs(item.sendTime).format("YYYY-MM-DD HH:mm");
                    item.statusText = this.statusTexts[item.status - 1];
                    item.isPublic = item.isPublic ? '是' : '否';
                });
            } catch (e) {
                console.log(e);
            }
        },
        onSubmit() {
            console.log("submit!", this.formInline);
            this.loadData(this.formInline);
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.$msgbox.alert(`<div style='max-height: 500px;overflow: auto;'>${row.content}</div>`,'邮件内容',{
                dangerouslyUseHTMLString: true,
                customClass: 'msgbox-content'
            });
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
    },
};
</script>

<style lang="less" scoped>
.admin-list-box {
    height: 100vh;
    padding: 20px 20px;

    &-filter {
        display: flex;

        &-btn {
            justify-self: flex-end;
        }
    }

    .table-box {
        width: 100%;
    }

    .pagination {
        width: 100%;
        text-align: right;
        margin-top: 24px;
    }
}

.demo-form-inline {
    flex: 1;
    margin-right: 20px;
    margin-bottom: 12px;
}

.el-table::before {
    content: none;
}

.el-table {
    width: auto;
}

</style>
