<template>
<div class="letters-box">
    <el-table :data="tableData" class="table-box">
        <el-table-column style="width: 100%" align="center" prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column align="center" prop="date" label="email地址" width="170">
        </el-table-column>
        <el-table-column align="center" prop="date" label="创建时间" width="170">
        </el-table-column>
        <el-table-column align="center" prop="date" label="收信时间" width="170">
        </el-table-column>
        <el-table-column align="center" prop="address" label="当前状态  ">
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    Table,
    TableColumn,
    Pagination
} from 'element-ui';
export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination
    },
    data() {
        return {
            tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]

        };
    },

    beforeMount() {},

    mounted() {},

    methods: {},

}
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
