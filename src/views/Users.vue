<template>
  <div>
    <Option></Option>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="140">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>

    </el-table>
  </el-main>
    <page></page>
  </div>
</template>

<script>
import Page from './page'
import Option from './Option'
export default {
  name: 'Users',
  components: { Option, Page },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.$http.get('getUserlist').then(d => {
      if (d.body.code === 0) {
        this.tableData = d.body.data
      }
    })
  }
}
</script>

<style scoped>

</style>
