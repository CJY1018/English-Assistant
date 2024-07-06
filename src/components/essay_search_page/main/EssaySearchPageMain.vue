<template>
  <el-input v-model="search_word" placeholder="请输入需要查询的单词" size="large" clearable class="input-with-select">
    <template #append>
      <el-button @click="search" :icon="Search" circle></el-button>
    </template>
  </el-input>

  <el-card type="textarea" class="text-area" v-for="(item,index) in essay_list" :key="item">
    <span v-html="process_item(essay_list[index].essay,this.search_word)" style="font-size: 16px"></span><br/><br/>
    译：<span style="font-size: 15px">{{ essay_list[index].translation }}</span>
  </el-card>

</template>

<script>
import {Headset, Microphone, Search} from '@element-plus/icons-vue'
import axios from "axios";
import {ElNotification} from "element-plus";

const essay_list = []

export default {
  data() {
    return {
      search_word: '',
      Headset,
      Microphone,
      Search,
      essay_list: essay_list
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
        return
      }
      axios.get('/api/essay/' + this.search_word.trim()).then(res => {
        if (res.data.code === 1) {
          this.essay_list = res.data.data
        } else {
          ElNotification({
            title: '错误',
            message: '查询失败: ' + res.data.msg,
            type: 'error'
          });
        }
      })
    },
    process_item(item, word) {
      if (this.search_word.trim() === '') {
        return item
      } else {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        return item.replace(regex, `<span style="color: #409eff;font-weight: bold">$&</span>`);
      }
    }
  }
}

</script>

<style scoped>
.input-with-select {
  width: 50%;
  min-width: 300px;
}

.text-area {
  width: 50%;
  min-width: 300px;
  margin-top: 20px;
  text-align: left;
  line-height: 30px;
}

</style>