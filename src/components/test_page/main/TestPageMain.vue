<template>
  <el-card style="width: 360px; margin: 100px auto;">
    <el-row class="select-test">
      <el-col :span="12">
        <span>选择难度(0-10)</span>
      </el-col>
      <el-col :span="12">
        <el-input-number v-model="difficulty" :min="0" :max="10" precision="0"></el-input-number>
      </el-col>
    </el-row>
    <el-row class="select-test">
      <el-col :span="12">
        <span>选择题量(1-99)</span>
      </el-col>
      <el-col :span="12">
        <el-input-number v-model="questionNum" :min="1" :max="99" precision="0"></el-input-number>
      </el-col>
    </el-row>
    <el-button type="primary" round @click="startTest">开始测试</el-button>
  </el-card>
</template>

<script>

export default {
  name: "TestPageMain",
  data() {
    return {
      difficulty: 5,
      questionNum: 10,
    };
  },
  methods: {
    startTest() {
      this.$router.push({
        name: "StartTestPage",
        query: {
          difficulty: Math.round(this.difficulty),
          questionNum: Math.round(this.questionNum),
        },
      });
    },
  },
};

</script>

<style scoped>
.select-test {
  text-align: left;
  margin-bottom: 20px;
}

</style>