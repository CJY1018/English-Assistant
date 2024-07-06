<template>
  <div>
    <span style="font: 20px 'Microsoft YaHei', 'Helvetica Neue', sans-serif;">
    {{ from }}&nbsp;
      <el-button type="primary" @click="changeLanguage" :icon="Switch" link size="large"/>
    &nbsp;{{ to }}
  </span>
  </div>

  <div class="translate-box">
    <el-input type="textarea" :rows="20"
              class="write_box" placeholder="请输入文章内容" v-model="inputText"
              resize="none"/>

    <!-- 评分区 -->
    <el-card class="box-card">
      <span>{{ outputText }}</span>
    </el-card>

  </div>
  <el-button class="translate-button" @click="translate" size="large" round
             style="font: 16px 'Microsoft YaHei', 'Helvetica Neue', sans-serif;">
    翻&nbsp;&nbsp;译
  </el-button>

</template>

<script>

import axios from "axios";
import {Switch} from '@element-plus/icons-vue';
import {ElNotification} from "element-plus";

export default {
  name: "TranslatePageMain",
  data() {
    return {
      from: "英",
      to: "中",
      inputText: "",
      outputText: "",
      Switch,
    };
  },
  methods: {
    changeLanguage() {
      let temp = this.from;
      this.from = this.to;
      this.to = temp;
    },
    translate() {
      if (this.to === "中") {
        this.translateEnToCn();
      } else {
        this.translateCnToEn();
      }
    },
    translateEnToCn() {
      if (!this.inputText) {
        ElNotification({
          title: '错误',
          message: '请输入文章内容',
          type: 'error'
        });
      }
      axios.get("api/EnToCn?originalSentence=" + this.inputText)
          .then((response) => {
            this.outputText = response.data.data
          })
          .catch((error) => {
            console.log(error);
          });
    },
    translateCnToEn() {
      axios.get("api/CnToEn?originalSentence=" + this.inputText)
          .then((response) => {
            this.outputText = response.data.data
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
}

</script>

<style scoped>
.translate-box {
  width: 80%;
  display: flex;
}

.write_box {
  width: 50%;
  height: 100%;
  margin-right: 26px;

  font: 16px/24px 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
}


.box-card {
  width: 50%;
  height: 488px;
  display: block !important;
  text-align: left !important;

  font: 16px/24px 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
}

.translate-button {
  margin-top: 20px;
}
</style>