<template>
  <el-container class="delete-example-page">
    <el-input v-model="search_word" placeholder="请输入需要查询的单词" size="large" clearable class="input-with-select">
      <template #append>
        <el-button @click="search" :icon="Search" circle></el-button>
      </template>
    </el-input>
    <el-row v-for="(item,index) in old_example" :key="item" style="text-align: left;">
      <el-col>
        <span style="font-size: 16px;">[{{ index }}]</span>&nbsp;
        <span style="font-size: 16px;font-weight: 560;color: #409eff">{{ old_example[index] }}</span>&nbsp;&nbsp;
        <span style="font-size: 16px;font-weight: 560;">{{ old_etrans[index] }}</span>
      </el-col>
    </el-row>
    <el-divider/>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="width: 50%; margin: 0 auto;">
      <el-form-item label="例句&翻译" prop="phrase" v-for="i in form.phrase_num" :key="i">
        <el-input v-model="form.phrase[i - 1]" style="width: 50%;"></el-input>
        <el-input v-model="form.etrans[i - 1]" style="width: 50%;"></el-input>
      </el-form-item>
      <el-button @click="addRow" type="primary">添加一行</el-button>
      <el-button @click="deleteRow" type="warning">删除一行</el-button>
      <el-button @click="clearRow" type="danger">清空</el-button>
      <el-form-item style="margin-top: 40px;">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import {ElNotification} from "element-plus";
import {Search} from '@element-plus/icons-vue'

const form = ref({
  voc: '',
  phrase: [],
  etrans: [],
  phrase_num: 1,
})

const rules = ref({
  voc: [
    {required: true, message: '请输入单词', trigger: 'blur'},
    {pattern: /^[a-zA-Z]+$/, message: '单词格式错误', trigger: 'blur'}
  ],
  phrase: [
    {required: true, message: '请输入例句', trigger: 'blur'},
  ],
  etrans: [
    {required: true, message: '请输入翻译', trigger: 'blur'},
  ]
})

export default {
  name: 'AddExample',
  data() {
    return {
      Search,
      form: form.value,
      rules: rules.value,
      search_word: '',
      old_example: [],
      old_etrans: [],
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/pr', this.form).then(res => {
            if (res.data.code === 1) {
              ElNotification({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.resetForm('form')
              this.search()
            } else {
              ElNotification({
                title: '失败',
                message: res.data.msg,
                type: 'error'
              })
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.phrase = []
      this.form.etrans = []
      this.form.phrase_num = 1
    },
    addRow() {
      this.form.phrase_num += 1
    },
    deleteRow() {
      if (this.form.phrase_num > 1) {
        this.form.phrase_num -= 1
      }
    },
    clearRow() {
      this.form.phrase = []
      this.form.etrans = []
      this.form.phrase_num = 1
    },
    search() {
      if (!/^[a-zA-Z]+$/.test(this.search_word)) {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        })
        return
      }
      axios.get('/api/query/' + this.search_word.trim()).then(res => {
        if (res.data.code === 1) {
          this.form.voc = this.search_word
          this.word = res.data.data;
          this.old_example = JSON.parse(JSON.stringify(this.word.example));
          this.old_etrans = JSON.parse(JSON.stringify(this.word.etrans));
        } else {
          ElNotification({
            title: '错误',
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        ElNotification({
          title: '错误',
          message: err,
          type: 'error'
        })
      })
    }
  }
}

</script>

<style scoped>
.delete-example-page {
  display: block;

  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
}

</style>