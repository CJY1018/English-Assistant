<template>
  <h1>文章评分</h1>


  <!-- 写作区 -->
  <el-row>
    <el-col :span="12">
      <el-input type="textarea" :rows="10" class="write_box" placeholder="请输入文章内容"></el-input>
    </el-col>
    <el-col :span="12">
      <!-- 评分区 -->
      <el-card class="box-card">
      </el-card>
    </el-col>
  </el-row>

</template>

<script setup>

</script>

<style scoped>
.box-card {
  width: 80%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  color: #333;
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  transition: all 0.3s;

}

.write_box {
  width: 90%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>