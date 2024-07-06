<template>
  <div style="margin: 0 auto; width: 50%">
    <el-input v-model="word" placeholder="请输入需要删除的单词" size="large" clearable/>
    <el-button type="primary" @click="delete_word">删除</el-button>
  </div>
</template>

<script>
import axios from "axios";
import {ElNotification} from "element-plus";

export default {
  data() {
    return {
      word: "",
    }
  },
  methods: {
    delete_word() {
      if(!/^[a-zA-Z]+$/.test(this.word)) {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        });
        return;
      }
      axios.delete('/api/word/' + this.word.trim(), {
        word: this.word
      }).then(res => {
        if (res.data.code === 1) {
          ElNotification({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
        } else {
          ElNotification({
            title: '失败',
            message: res.data.msg,
            type: 'error'
          });
        }
      })
    }
  }
}

</script>

<style scoped>

</style>