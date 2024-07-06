<template>
  <el-form label-position="top" label-width="120px" :model="form" ref="form" :rules="rules" class="add-word-form">
    <el-form-item label="单词" prop="word">
      <el-input v-model="form.word" size="large"></el-input>
    </el-form-item>
    <el-form-item label="词性&释义" prop="translate">
      <template #label>
        <span>词性&释义 </span>
        <span style="color: #6e6e73">（格式：词性.释义）</span>
      </template>
      <el-input v-for="i in form.translate_num" :key="i" v-model="form.translate[i-1]" class="add-word-input"
                placeholder="请输入词性&释义" size="large"/>
    </el-form-item>
    <div class="add-word-button">
      <el-button @click="addRow" type="primary">添加一行</el-button>
      <el-button @click="deleteRow" type="warning">删除一行</el-button>
      <el-button @click="clearRow" type="danger">清空</el-button>
    </div>

    <el-form-item label="英式音标" prop="puk">
      <template #label>
        <span>英式音标 </span>
        <span style="color: #6e6e73">（格式：[...]）</span>
      </template>
      <el-input v-model="form.puk" placeholder="请输入英式音标" size="large"/>
    </el-form-item>
    <el-form-item label="美式音标" prop="pus">
      <template #label>
        <span>美式音标 </span>
        <span style="color: #6e6e73">（格式：[...]）</span>
      </template>
      <el-input v-model="form.pus" placeholder="请输入美式音标" size="large"/>
    </el-form-item>
    <el-form-item label="难度" prop="difficulty">
      <el-input-number v-model="form.difficulty" :min="0" :max="10"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import {ElNotification} from "element-plus";

const form = ref({
  word: '',
  translate: [],
  translate_num: 1,
  puk: '',
  pus: '',
  difficulty: ''
})

const rules = ref({
  word: [
    {required: true, message: '请输入单词', trigger: 'blur'},
    {pattern: /^[a-zA-Z]+$/, message: '单词格式错误', trigger: 'blur'}
  ],
  translate: [
    {required: true, message: '请输入释义', trigger: 'blur'},
    {pattern: /^[a-zA-Z]+\..*$/, message: '释义格式错误', trigger: 'blur'}
  ],
  puk: [
    {pattern: /^\[.*]$/, message: '英式音标格式错误', trigger: 'blur'}
  ],
  pus: [
    {pattern: /^\[.*]$/, message: '美式音标格式错误', trigger: 'blur'}
  ],
})

export default {
  name: 'AddWordPage',
  data() {
    return {
      form: form.value,
      rules: rules.value
    }
  },
  methods: {
    addRow() {
      this.form.translate_num += 1
    },
    deleteRow() {
      if (this.form.translate_num > 1) {
        this.form.translate_num -= 1
      }
    },
    clearRow() {
      this.form.translate = []
      this.form.translate_num = 1
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/word', this.form).then(res => {
            if (res.data.code === 1) {
              ElNotification({
                title: '添加成功',
                message: '添加成功',
                type: 'success'
              });
              this.resetForm(formName)
            } else {
              ElNotification({
                title: '添加失败',
                message: res.data.message,
                type: 'error'
              });
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<style scoped>
.add-word-form {
  width: 400px;
}

.add-word-input {
  margin-bottom: 10px;
}

.add-word-button {
  width: 100%;
}


</style>