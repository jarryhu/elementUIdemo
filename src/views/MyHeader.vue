<template>
  <div style="text-align:end">
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="watch">查看</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{loginName}}&nbsp;<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></span>

  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      loginName: '请登录'
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$message('你已经退出登陆了')
          localStorage.setItem('user', null)
          this.$router.push('/')
          break
      }
    }

  },
  created () {
    console.log(localStorage.getItem('user'))
    this.loginName = JSON.parse(localStorage.getItem('user')).name
  }
}
</script>

<style scoped>

</style>
