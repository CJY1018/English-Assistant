<template>
  <div class="word_box" @click="play">
    <div v-if="words[index].tips === 2" style="margin-bottom: 60px">
      <span style="font-size: 28px;font-weight: bold;">{{
          words[index].word
        }}</span>
    </div>

    <ul style="padding: 0">
      <li v-for="w in words[index].translates" :key="w.type" class="word_translates">
        <span style="color: #409EFF">{{ w.type }}</span>&nbsp;
        <span>{{ w.interpretation }}</span>
      </li>
    </ul>

    <div v-if="words[index].tips >= 1" class="example_box">
      <span>{{
          words[index].example[0] ? words[index].example[0].split(words[index].word).join("___") : "不存在例句"
        }}</span><br/>
      <span style="line-height: 40px">{{
          words[index].etrans[0] ? words[index].etrans[0] : "不存在例句翻译"
        }}</span>
    </div>
  </div>

  <div style="width: 60%;display: flex;" id="card">
    <el-card @click="back" style="min-width: 80px;" class="no_card">返回</el-card>
    <el-card style="padding: 10px; min-width: 420px;width: 100%;margin: 0 20px;" class="no_card">
      <div>
        <el-input v-model="input" placeholder="请输入单词" class="word_input"></el-input>
        <el-button type="primary" @click="check" plain>确认</el-button>
      </div>

      <div style="margin-top: 20px">
        <el-button type="primary" round @click="last" style="margin-right: 40px">上一个</el-button>
        <el-button type="primary" round @click="next">下一个</el-button>
        <el-progress type="line" :percentage=" (index + 1) / words.length * 100"
                     :format="percentage => `${(index + 1)}/${words.length}`" style="margin-top: 20px"/>
      </div>
    </el-card>
    <el-card @click="tips" style="min-width: 80px;" class="no_card">提示</el-card>
  </div>

</template>

<script>
import axios from "axios";
import {ElMessage} from 'element-plus'

const word = [
  {
    "word": "",
    "translate": [],
    "example": [],
    "highLight": [],
    "note": "",
    "noteType": "",
    "books": "",
    "etrans": [],
    "pus": "",
    "puk": ""
  },
];


export default {
  name: "StartTestPageMain",
  data() {
    return {
      words: word,
      index: 0,
      input: "",
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "TestPage",
      });
    },
    play() {
      const audio = new Audio("http://dict.youdao.com/dictvoice?audio=" + this.words[this.index].word);
      audio.play();
    },
    last() {
      if (this.index > 0) {
        this.index--;
      }
    },
    next() {
      if (this.index < this.words.length - 1) {
        this.index++;
      }
    },
    check() {
      if (this.input === this.words[this.index].word) {
        ElMessage.success("正确");
        this.input = "";
        this.next();
      } else {
        ElMessage.error("错误");
      }
    },
    tips() {
      this.words[this.index].tips = (this.words[this.index].tips + 1) % 3;
    }
  },
  mounted() {
    this.words.map(item => {
      item.tips = 0;
      item.translates = item.translate ? item.translate.map(i => {
        return {
          type: i.split(',')[0],
          interpretation: i.split(',')[1]
        }
      }) : []
    })

    axios.get("api/wordText?count=" + this.$route.query.questionNum + "&difficulty=" + this.$route.query.difficulty)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          this.words = [];
          data.map(item => {
            this.words.push({
              word: item.word,
              tips: 0,
              translate: item.translate,
              translates: item.translate ? item.translate.map(i => {
                return {
                  type: i.split(',')[0],
                  interpretation: i.split(',')[1]
                }
              }) : [],
              puk: item.puk,
              pus: item.pus,
              note: item.note,
              noteType: item.noteType,
              example: item.example,
              etrans: item.etrans
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }
};


</script>

<style scoped>
.word_box {
  font: 18px "Microsoft YaHei";
  margin: auto 0;
  vertical-align: middle !important;
  text-align: center;
}

.word_translates {
  padding: 0;
  font: 18px "Microsoft YaHei";
  display: block !important;
  text-align: left !important;
}

.word_input {
  width: 300px;
  vertical-align: middle !important;
  text-align: center;
  margin: 0 10px;
}

.example_box {
  margin-top: 40px;
  display: block !important;
  text-align: left !important;

  color: #6e6e73;
}

</style>