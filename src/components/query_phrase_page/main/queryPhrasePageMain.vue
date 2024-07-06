<template>
  <el-input class="query-input" v-model="input" clearable placeholder="请输入需要查询的例句">
    <template #append>
      <el-button style="height: 54px;background: transparent;" link :icon="Search" @click="query"></el-button>
    </template>
  </el-input>

  <el-card v-for="phrase in phrases" :key="phrase.phrase" class="query-phrase-card">
    <p v-html="process_item(phrase)"></p>
    <p>{{ phrase.interpretation }}</p>
  </el-card>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import axios from "axios";
import {ElMessageBox, ElNotification} from "element-plus";

export default {
  name: "QueryPhrasePageMain",
  data() {
    return {
      input: "",
      Search: Search,
      phrases: []
    }
  },
  methods: {
    query() {
      if (this.input.trim() === '') {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        });
      }
      axios.get("/api/queryPhrase/" + this.input).then(res => {
        if (res.data.code === 1) {
          this.phrases = res.data.data
        } else {
          ElMessageBox.alert("查询失败: " + res.data.msg)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    process_item(phrase) {
      const regex = new RegExp(`${this.input}`, 'gi');
      return phrase.phrase.replace(regex, `<span style="color: #409eff">$&</span>`);
    }
  },
}

</script>

<style scoped>
.query-input {
  width: 60%;
  margin: 20px auto;
}

.query-phrase-card {
  margin: 20px auto;
  width: 60%;
}
</style>