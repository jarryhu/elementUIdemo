<template>

  <el-row class="btnel">
    <el-input style="width: 200px;margin-right: 20px"
              placeholder="请输入关键字搜索"
              v-model="input"
              clearable>
    </el-input>
    <el-button icon="el-icon-search" circle @click="search(input)"></el-button>
    <el-button type="primary">添加产品</el-button>
    <el-button type="danger" round>批量删除</el-button>
  </el-row>

</template>

<script>
export default {
  name: 'Option',
  data () {
    return {
      input: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.btnel{
 padding: 10px;
  text-align: left;
}
</style>
