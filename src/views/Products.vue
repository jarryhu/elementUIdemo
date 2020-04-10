<template>
  <el-main>
    <div class="btnel">
      <el-row>
        <el-input style="width: 200px;margin-right: 20px"
                  placeholder="请输入关键字搜索"
                  v-model="input"
                  clearable>
        </el-input>
        <el-button icon="el-icon-search" circle @click="search(input)"></el-button>
        <el-button type="primary" @click="addDialogVisible = true">添加产品</el-button>
        <el-button type="danger" round @click="delBatch()">批量删除</el-button>
      </el-row>
    </div>

    <el-table :data="tableData" border height="320"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              :summary-method="getSummaries"
              show-summary
              tooltip-effect="dark">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" width="100">
      </el-table-column>
      <el-table-column prop="productName" label="名称" width="100">
      </el-table-column>
      <el-table-column prop="product_price" sortable label="价格" width="100">
      </el-table-column>

      <el-table-column prop="total" sortable label="总数" width="100">
      </el-table-column>
      <el-table-column prop="imagePath" label="描述图片">
        <template scope="scope">
          <img v-for="item in scope.row.imagePath" :src="item.imagePath" :key="item.imagePath"
               width="40" height="40"
               class="head_pic"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 4, 8, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalCount>
        </el-pagination>
      </div>
      <el-dialog title="添加产品" :visible.sync="addDialogVisible" width="50%">
        <add-product></add-product>
      </el-dialog>
      <el-dialog title="修改产品" :visible.sync="editDialogVisible" width="50%">
        <edit-product ref="edit"></edit-product>
      </el-dialog>
    </div>

  </el-main>

</template>

<script>

import AddProduct from './AddProduct'
import EditProduct from './EditProduct'

export default {

  name: 'products',
  components: {
    EditProduct,
    AddProduct

  },
  data () {
    return {
      input: '',
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      pageSize: 8,
      ids: '', // '59,60,61"
      totalCount: 0,
      currentPage: 1
    }
  },
  created () {
    this.getList(this.input, this.currentPage, this.pageSize)
    this.getProductListCount()
  },

  methods: {
    getProductListCount () {
      this.$http.post('getListCount', { productName: this.input }, { emulateJSON: true })
        .then(d => {
          if (d.body.code === 0) {
            this.totalCount = d.body.result
          }
        })
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      console.log('this.pageSize>>>>' + this.pageSize)
      this.getList(this.input, this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      console.log('this.currentPage>>>>' + this.currentPage)
      this.getList(this.input, this.currentPage, this.pageSize)
    },

    handleSelectionChange (val) {
      for (let i = 0; i < val.length; i++) {
        if (i === 0) {
          this.ids = val[i].id
        }
        if (i >= 1) {
          this.ids = this.ids + ',' + val[i].id
        }
      }
      // 要拼接的结果是  59，60，61
      console.log(this.ids)
    },

    delBatch () {
      console.log('this.ids>>>' + this.ids)
      this.$http.post('deleteProductsByids', { ids: this.ids }, { emulateJSON: true })
        .then(d => {
          if (d.body > 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList(this.input, this.currentPage, this.pageSize)
            this.getProductListCount()
          }
        })
    },
    // String productName, int pageCount, int pageSize
    getList (productName, currentPage, pageSize) {
      this.tableData = []
      this.$http.post('getProductPageByName', {
        productName: productName,
        currentPage: currentPage,
        pageSize: pageSize
      }, { emulateJSON: true }).then(d => {
        if (d.body.code === 0) {
          for (var i = 0; i < d.body.data.length; i++) {
            var imagePaths = []
            var pathArr = d.body.data[i].imagePath.split(',')
            console.log('pathArr>>>' + pathArr)
            for (var j = 0; j < pathArr.length; j++) {
              if (pathArr[j]) {
                imagePaths.push({ imagePath: 'http://localhost:8000/upload/' + pathArr[j] })
                console.log('imagePaths>>>' + imagePaths)
              }
            }
            this.tableData.push({
              id: d.body.data[i].id,
              productName: d.body.data[i].productName,
              product_price: d.body.data[i].product_price,
              total: d.body.data[i].total,
              imagePath: imagePaths
            })
          }
        } else if (d.body.code === -1) {
          this.tableData = []
        }
        console.log(this.tableData)
      }
      )
    },

    search (input) {
      this.getList(input, this.currentPage, this.pageSize)
      this.getProductListCount()
    },

    handleEdit (index, row) {
      this.editDialogVisible = true
      // 因为第一次打开子组件需要点时间 才能初始化好子组件的data和methods 所以需要做一个时间延迟
      setTimeout(() => {
        this.$refs.edit.init(row.id)
      }, 80)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.get('deleteProductByid/' + row.id).then(d => {
          if (d.body === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList(this.input, this.currentPage, this.pageSize)
            this.getProductListCount()
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

      console.log(index, row)
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        } else if (index === 1 || index === 2) {
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }

  }

}
</script>

<style scoped>
  .el-main {
    padding: 0;
    margin: 0;
  }

  .btnel {
    background-color: rgb(245, 245, 245);
    padding: 10px;
    text-align: left;
  }

  .page {
    margin-top: 15px;
    margin-bottom: 10px;
    text-align: left;
  }
</style>
