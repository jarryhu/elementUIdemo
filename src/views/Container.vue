<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <my-aside></my-aside>
      </el-aside>
      <el-container class="main">

          <router-view></router-view>

      </el-container>
    </el-container>
    <el-footer>
      <my-fooder></my-fooder>
    </el-footer>
  </el-container>
</template>

<script>
import MyFooder from './MyFooder'
import MyHeader from './MyHeader'
import MyAside from './MyAside'

export default {
  name: 'Container',
  components: {
    MyHeader,
    MyFooder,
    MyAside

  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .main{
    padding: 0;
    margin: 0;
  }
</style>
