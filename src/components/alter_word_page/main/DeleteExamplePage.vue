<template>
  <el-container class="delete-example-page">
    <el-input v-model="search_word" placeholder="请输入需要查询的单词" size="large" clearable class="input-with-select">
      <template #append>
        <el-button @click="search" :icon="Search" circle></el-button>
      </template>
    </el-input>
    <el-divider/>

    <el-form label-width="120px" style="margin-top: 20px;" v-if="word.word">
      <el-form-item v-for="(item, index) in word.example" :key="index" style="margin-right: 20px;">
        <el-input v-model="word.example[index]" placeholder="请输入例句" style="width: 40%;" disabled/>
        <el-input v-model="word.etrans[index]" placeholder="请输入例句释义" style="width: 40%;" disabled/>
        <el-button type="danger" @click="delete_example(index)">删除</el-button>
      </el-form-item>
      <el-button type="danger" @click="delete_all_example">删除全部</el-button>
    </el-form>
  </el-container>
</template>

<script>
import {Headset, Microphone, Search} from '@element-plus/icons-vue'
import axios from "axios";
import {ElNotification} from "element-plus";

// const word = {
//   word: "", // 单词
//   example: [], // 例句
// };
const word = {
  word: "", // 单词
  pus: "", // 美式音标
  puk: "", // 英式音标
  translate: [], // 释义
  note: "", // 单词助记
  noteType: "", // 助记类型
  example: [], // 例句
  highlight: [], // 高亮
  etrans: [], // 例句释义
  books: [],
};


export default {
  data() {
    return {
      search_word: '',
      word: word,
      Headset,
      Microphone,
      Search,
      example: '',
      old_example: [],
      old_etrans: [],
    }
  },
  methods: {
    search() {
      if(!/^[a-zA-Z]+$/.test(this.search_word)) {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        });
        return;
      }
      axios.get('/api/query/' + this.search_word.trim()).then(res => {
        if(res.data.code === 1) {
          this.word = res.data.data;
          this.old_example = res.data.data.example;
          this.old_etrans = res.data.data.etrans;
        } else {
          ElNotification({
            title: '失败',
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        console.log(err);
      })
    },
    delete_example(index) {
      axios.delete('/api/pr/' + this.search_word.trim() + '/' + this.word.example[index]).then(res => {
        if (res.data.code === 1) {
          this.word.example.splice(index, 1);
          this.word.etrans.splice(index, 1);
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
    },
    delete_all_example() {
      axios.delete('/api/allPr/' + this.search_word.trim()).then(res => {
        if (res.data.code === 1) {
          this.word.example = [];
          this.word.etrans = [];
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
  },
};

</script>

<style scoped>
.input-with-select {
  width: 400px;
  margin: 0 auto 40px;
}

.delete-example-page {
  display: block;

  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
}

.el-card {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
}

.el-row {
  margin: 0 0;
}

</style>