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
    <el-form-item label="上传商品图片">
      <el-upload
        action="http://localhost:8000/imagesUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handlerUploadSuccess"
        multiple
        ref="upload"
        :auto-upload="false"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item>
      <div class="bottom">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addProduct('ruleForm')">确 定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      uploadSuccessFileCount: 0, // 计数器
      ruleForm: {
        productName: '',
        product_price: 0,
        total: 0,
        imagePath: ''

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
      },
      fileList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传成功一次就回调一次  思路是拿到上传附件的总数 然后 用一个计数器 计数回调一次+1
    // 直到计数器的值和上传的附件数相等的时候 才进行一次插入数据库操作
    handlerUploadSuccess (response, file, fileList) {
      // 首先要知道有多少张图片上传
      var filecount = this.$refs.upload.uploadFiles.length
      // 上传成功的计数器
      this.uploadSuccessFileCount++
      // 文件上传成功之后然后的得到文件名字 然后封装到 product里面 imagePath属性
      // 要把imagePath 封装成
      // 90ce9d39-c97e-476c-9c97-3b14c14f62d2.jpg,
      // 5888f2e8-51e8-40e3-b509-ade91f5314da.jpg,
      // ef183f80-3434-4b2b-9d85-f3e9367b97da.jpg
      if (this.uploadSuccessFileCount === 1) {
        this.ruleForm.imagePath = response
      } else {
        this.ruleForm.imagePath = this.ruleForm.imagePath + ',' + response
      }
      if (filecount === this.uploadSuccessFileCount) {
        this.$http.post('insertProduct', this.ruleForm, { emulateJSON: true }).then(d => {
          if (d.body === 1) {
            // 关闭dialog 刷新父页面 element dialog 是自动关闭的 是因为父页面的 addDialogVisible 重置为false
            parent.location.reload()
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        })
      }
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    addProduct (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          this.$message({
            message: '添加失败',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .bottom {
    text-align: end;
    width: 100%;

  }
</style>
