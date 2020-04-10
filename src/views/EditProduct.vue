<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="产品名" prop="productName">
      <el-input v-model="ruleForm.productName"></el-input>
    </el-form-item>
    <el-form-item label="产品价格" prop="product_price">
      <el-input type="number" v-model="ruleForm.product_price"></el-input>
    </el-form-item>
    <el-form-item label="产品数量" prop="total">
      <el-input type="number" v-model="ruleForm.total"></el-input>
    </el-form-item>
    <input type="hidden" v-model="ruleForm.id"/>
    <el-form-item>
      <div class="bottom">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="modifyProduct('ruleForm')">确 定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EditProduct',
  data () {
    return {
      ruleForm: {
        id: 0,
        productName: '',
        product_price: 0,
        total: 0
      },
      rules: {
        productName: [
          {
            required: true,
            message: '请输入产品名',
            trigger: 'blur'

          },
          {
            min: 2,
            max: 100,
            message: '长度在 2 到 100 个字符',
            trigger: 'blur'
          }
        ],
        product_price: [
          {
            required: true,
            message: '请填价格',
            trigger: 'blur'
          }
        ],
        total: [
          {
            required: true,
            message: '请填数量',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    init (id) {
      console.log('EditProduct.vue init()>>>>>' + id)
      this.$http.get('selectProductById/' + id).then(d => {
        if (d.body.code === 0) {
          this.ruleForm.id = d.body.result.id
          this.ruleForm.productName = d.body.result.productName
          this.ruleForm.product_price = d.body.result.product_price
          this.ruleForm.total = d.body.result.total
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    modifyProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('updateProduct', this.ruleForm, { emulateJSON: true }).then(d => {
            if (d.body.code === 0) {
              // 关闭dialog 刷新父页面 element dialog 是自动关闭的 是因为父页面的 addDialogVisible 重置为false
              parent.location.reload()
              this.$message({
                message: d.body.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: d.body.message,
                type: 'warning'
              })
            }
          })
        } else {
          return false
        }
      })
    }

  }
  // created () {
  //   console.log('pid>>>>>' + this.pid)
  // }
}
</script>

<style scoped>
  .bottom {
    text-align: end;
    width: 100%;

  }
</style>
