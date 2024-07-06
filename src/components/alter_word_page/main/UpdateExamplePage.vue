<template>
  <el-container class="delete-example-page">
    <el-input v-model="search_word" placeholder="请输入需要查询的单词" size="large" clearable class="input-with-select">
      <template #append>
        <el-button @click="search" :icon="Search" circle></el-button>
      </template>
    </el-input>
    <el-divider/>

    <el-form label-width="120px" style="margin-top: 20px;">

      <el-form-item v-for="(item, index) in word.example" :key="index">
        例句&翻译：
        <el-input v-model="word.example[index]" placeholder="请输入例句" style="width: 40%;"/>
        <el-input v-model="word.etrans[index]" placeholder="请输入例句释义" style="width: 40%;"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update_example">修改</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import {Headset, Microphone, Search} from '@element-plus/icons-vue'
import axios from "axios";
import {ElNotification} from "element-plus";

const word = {
  word: "", // 单词
  example: [], // 例句
  etrans: [], // 例句释义
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
      if (!/^[a-zA-Z]+$/.test(this.search_word)) {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        });
        return;
      }
      axios.get('/api/query/' + this.search_word.trim()).then(res => {
        if (res.data.code === 1) {
          this.word = res.data.data;
          this.old_example = JSON.parse(JSON.stringify(this.word.example));
          this.old_etrans = JSON.parse(JSON.stringify(this.word.etrans));
        } else {
          ElNotification({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        ElNotification({
          title: '错误',
          message: err,
          type: 'error'
        });
      })
    },
    update_example() {
      axios.put('/api/pr', {
        voc: this.search_word,
        phrase: this.old_example,
        newPhrase: this.word.example,
        etrans: this.old_etrans,
        newEtrans: this.word.etrans,
      }).then(res => {
        if (res.data.code === 1) {
          ElNotification({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
        } else {
          ElNotification({
            title: '失败',
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        console.log(err);
        ElNotification({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
      })
    },
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