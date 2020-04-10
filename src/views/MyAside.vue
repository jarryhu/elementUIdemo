<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>管理页面</template>

          <el-menu-item index="1-1" @click="goto('/container')">产品管理</el-menu-item>
          <el-menu-item index="1-2" @click="goto('/container/users')">用户管理</el-menu-item>

        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'myaside',
  methods: {
    goto (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped>

</style>
