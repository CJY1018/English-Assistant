<template>
  <el-container class="delete-example-page">
    <el-input v-model="search_word" placeholder="请输入需要查询的单词" size="large" clearable class="input-with-select">
      <template #append>
        <el-button @click="search" :icon="Search" circle></el-button>
      </template>
    </el-input>

    <!--  单词  -->
    <el-card class="box-card" shadow="hover" v-if="word.word">
      <span style="font-size: 30px;font-weight: 560;color: #409eff">{{ word.word }}</span><br/>
      <el-tag round size="large" style="margin-right: 20px">
        <span style="font-size: 15px;color: #6e6e73">英 {{ word.puk }}</span>&nbsp;
        <el-button type="text" @click="play('uk')" :icon="Headset" style="color: #409eff"></el-button>
      </el-tag>
      <el-tag round size="large">
        <span style="font-size: 15px;color: #6e6e73">美 {{ word.pus }}</span>&nbsp;
        <el-button type="text" @click="play('us')" :icon="Headset" style="color: #409eff"></el-button>
      </el-tag>
      <el-divider></el-divider>
      <!--  释义  -->
      <el-row v-for="item in word.translate" :key="item.type">
        <el-col><span style="color: #409eff">{{ item.type }}</span>&nbsp;
          <span>{{ item.interpretation }}</span></el-col>
      </el-row>
      <el-tag type="info" effect="plain" round size="large" style="margin-right: 10px"
              v-for="item in word.books.splice(0,3)"
              :key="item">
        {{ process_item(item, word.word) }}
      </el-tag>
    </el-card>
    <el-divider/>

    <el-form label-position="top" label-width="120px" :model="form" ref="form" :rules="rules" class="update-word-form">
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

  </el-container>
</template>

<script>
import {Headset, Microphone, Search} from '@element-plus/icons-vue'
import axios from "axios";
import {ref} from "vue";
import {ElNotification} from "element-plus";

const word = {
  word: "", // 单词
  pus: "", // 美式音标
  puk: "", // 英式音标
  translate: [], // 释义
  books: [],
};

const form = ref({
  word: '',
  translate: [],
  translate_num: 1,
  puk: '',
  pus: '',
  difficulty: ''
})

const rules = ref({
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
  data() {
    return {
      search_word: '',
      word: word,
      Headset,
      Microphone,
      Search,
      form: form.value,
      rules: rules.value
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
        return
      }
      axios.get('/api/query/' + this.search_word.trim()).then(res => {
        if (res.data.code === 1) {
          const data = res.data.data;
          console.log(data);
          this.word.word = data.word;
          this.word.pus = data.pus;
          this.word.puk = data.puk;
          // 分离词性和释义
          this.word.translate = [];
          const interpretation_list = data.translate;
          for (let i = 0; i < interpretation_list.length; i += 1) {
            this.word.translate.push({
              type: interpretation_list[i].split(',')[0],
              interpretation: interpretation_list[i].split(',')[1]
            });
          }
          this.word.note = data.note;
          this.word.noteType = data.noteType;
          this.word.example = data.example;
          /*const highlight_list = data.highlight;
          for (let i = 0; i < highlight_list.length; i += 1) {
            const highlight_strings = highlight_list[i].match(/d+,d+/g);
            for (let j = 0; j < highlight_strings.length; j += 1) {
              let highlight_split = highlight_strings[j].split(',');
              this.highlight.push(parseInt(highlight_split[0]), parseInt(highlight_split[1]))
            }
          }*/
          this.word.etrans = data.etrans;
          this.word.books = data.books;
        } else {
          ElNotification({
            title: "词库里没有这个单词~",
            message: res.data.msg,
            type: "error"
          });
        }
      }).catch(err => {
        console.log(err)
        ElNotification({
          title: "失败",
          message: "查询失败，请检查网络连接",
          type: "error"
        });
      });
    },
    process_item(item, word) {
      return item.replace(word, `<span style="color: #409eff">${word}</span>`)
    },
    play(type) {
      let audio = null;
      if (type === 'us') {
        audio = new Audio('https://dict.youdao.com/dictvoice?type=0&audio=' + this.word.word);
      } else if (type === 'uk') {
        audio = new Audio('https://dict.youdao.com/dictvoice?type=1&audio=' + this.word.word);
      } else {
        audio = new Audio('https://dict.youdao.com/dictvoice?type=1&audio=' + this.word.example[type]);
      }
      // 同一时间只能播放一个音频
      if (audio) {
        audio.play();
        audio.onended = () => {
          audio = null;
        };
      }
    },
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
          this.form.word = this.search_word.trim();
          axios.put('/api/word', this.form).then(res => {
            if (res.data.code === 1) {
              ElNotification({
                title: '成功',
                message: '修改成功',
                type: 'success'
              });
              this.resetForm(formName)
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
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

.update-word-form {
  width: 400px;
  margin: 40px auto 0;
}
</style>