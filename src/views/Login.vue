<template>
  <div class="div">
    <h2>用户登录</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入登录名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请填密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(this.ruleForm.name)
      console.log(this.ruleForm.password)

      // this.$http.post('http://localhost:8000/login',
      //   {
      //     name: this.ruleForm.name,
      //     password:
      //       this.ruleForm.password
      //   },
      //   { emulateJSON: true }
      // ).then(d => {
      //   if (d.data.code === 0) {
      //     // 路由的跳转this.$router.push("新路由的地址")
      //     this.$router.push('/mainPage')
      //   }
      //   this.$message(d.data.message)
      // }
      // )

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('login',
            this.ruleForm, { emulateJSON: true }
          ).then(d => {
            if (d.data.code === 0) {
              // 路由的跳转this.$router.push("新路由的地址")
              localStorage.setItem('token', d.data.token)
              localStorage.setItem('user', JSON.stringify(d.data.data))
              this.$router.push('/container')
            }
            this.$message({
              message: d.data.message,
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

  .div {
    margin: 0 auto;
    width: 300px;
    height: 200px;
    border-color: #000;
    border-width: 1px
  }
</style>
