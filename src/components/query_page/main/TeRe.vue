<template>
  <!-- 单词信息表  -->
  <div v-if="word.vcVocabulary" style="width: 52%;">
    <!--  单词  -->
    <el-card class="box-card" shadow="hover">
      <span style="font-size: 20px">{{ word.vcVocabulary }}</span>
      <span style="font-size: 14px;margin-left: 10px">{{ word.vcPhoneticUs }}</span>
      <span style="font-size: 14px;margin-left: 10px">{{ word.vcPhoneticUk }}</span>
    </el-card>
    <!--  释义  -->
    <el-card class="box-card" shadow="hover">
      <span style="font-size: 20px">释义</span>
      <el-divider></el-divider>
      <el-row v-for="item in word.vcInterpretation" :key="item.type">
        <el-col :span="4"><span style="color: #409eff">{{ item.type }}</span></el-col>
        <el-col :span="20"><span>{{ item.interpretation }}</span></el-col>
      </el-row>
    </el-card>
    <!--  助记  -->
    <el-card class="box-card" shadow="hover" v-if="word.note">
      <span style="font-size: 20px">助记</span>
      <el-divider></el-divider>
      <span>{{ word.note }}<span style="color: #409eff" v-if="word.type">({{ word.type }})</span></span>
    </el-card>
    <!--  例句  -->
    <el-card class="box-card" shadow="hover" v-if="word.phrase">
      <span style="font-size: 20px">例句</span>
      <el-divider></el-divider>
      <span>{{ word.phrase }}</span>
      <span style="color: #409eff">{{ word.highlight }}</span>
      <span>{{ word.interpretation }}</span>
    </el-card>
  </div>
</template>

<script>
const word = {
  vcVocabulary: "bee", // 单词
  vcPhoneticUs: "1", // 美式音标
  vcPhoneticUk: "2", // 英式音标
  vcInterpretation: [{"n.": "蜜蜂"}], // 释义
  note: "1", // 单词助记
  type: "2", // 助记类型
  phrase: "3", // 例句
  highlight: "4", // 高亮
  interpretation: "5" // 例句释义
};

export default {
  name: "QueryPageMain",
  data() {
    return {
      word: word
    };
  }
};
</script>

<style scoped>
.box-card {
  margin-top: 20px;
  text-align: left;
  transform: scale(1);
  z-index: 100;
}
</style>