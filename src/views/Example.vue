<template>
  <div class="about">
    <!-- <h1>示例</h1> -->
    <tableContainer
      :show-sub-btn="true"
      title="地址管理"
      sub-btn-text="新建"
    >
      <el-table
        :data="table.items"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="Date"
          width="180"
        />
        <el-table-column
          prop="name"
          label="Name"
          width="180"
        />
        <el-table-column
          prop="address"
          label="Address"
        />
      </el-table>
      <div class="paginationStyle">
        <el-pagination
          :disabled="table.loading"
          :current-page="query.pageNumber"
          :page-size="query.pageSize"
          :total="total"
          background
          layout="prev, pager, next, total, jumper"
          @current-change="onChangeCurrent"
        />
      </div>
    </tableContainer>
  </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
import tableContainer from '@/framework/components/tableContainer.vue'
export default defineComponent({
  components: {
    tableContainer
  },
  data() {
    return {
      query: {
        orderBy: '',
        orderDirection: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      table: {
        loading: false,
        items: [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          }
        ]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  background-color: orange;
}
</style>
