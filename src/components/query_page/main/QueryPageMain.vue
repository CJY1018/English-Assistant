<template>
  <el-input v-if="!word.word" class="query-input" v-model="input" clearable placeholder="请输入需要查询的单词">
    <template #append>
      <el-button style="height: 54px;background: transparent;" link :icon="Search" @click="query"></el-button>
    </template>
  </el-input>

  <el-row v-if="word.word" :gutter="20" class="queried dark">
    <el-col :span="3"></el-col>
    <el-col :span="8" style="min-width: 280px">
      <span class=" query-tittle query-tittle-color">W</span>
      <span class="query-tittle">ord </span>
      <span class=" query-tittle query-tittle-color">Q</span>
      <span class="query-tittle">uery</span>
    </el-col>
    <el-col :span="8" style="min-width: 280px">
      <!--      <el-row :gutter="20" style="border: 2px none #6e6e73;border-bottom-style: solid">-->
      <!--        <el-col>-->
      <!--          <input type="text" v-model="input" class="queried-input" @keyup.enter="query">-->
      <!--        </el-col>-->
      <!--        <el-col :span="2">-->
      <!--          <el-button style="height: 54px;background: transparent;" link :icon="Search" @click="query"></el-button>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <div style="border: 2px none #6e6e73;border-bottom-style: solid">
        <el-input class="inputDeep" v-model="input" clearable placeholder="请输入需要查询的单词" @change="query">
          <template #append>
            <el-button style="height: 54px;background: transparent;margin: 0 6px 0 0" link :icon="Microphone"
                       @click="voice2text"></el-button>
            <el-button style="height: 54px;background: transparent;margin: 0" link :icon="Search"
                       @click="query"></el-button>
          </template>
        </el-input>
      </div>
    </el-col>
    <el-divider style="margin: 0"/>
    <el-col :span="4"/>
  </el-row>


  <!-- 单词信息表  -->
  <div v-if="word.word" style="width: 52%;top: 140px;left: 0;">
    <!--  单词  -->
    <el-card class="box-card" shadow="hover">
      <span style="font-size: 30px;font-weight: 560;color: #409eff">{{ word.word }}</span><br/>
      <el-tag round size="large" style="margin-right: 20px">
        <span style="font-size: 15px;color: #6e6e73">英 {{ word.puk }}</span>&nbsp;
        <el-button type="text" @click="play('uk')" :icon="Headset" style="color: #409eff"></el-button>
      </el-tag>
      <el-tag round size="large">
        <span style="font-size: 15px;color: #6e6e73">美 {{ word.pus }}</span>&nbsp;
        <el-button type="text" @click="play('us')" :icon="Headset" style="color: #409eff"></el-button>
      </el-tag>
    </el-card>
    <!--  释义  -->
    <el-card class="box-card" shadow="hover">
      <span style="font-size: 20px">释义</span>
      <el-divider></el-divider>
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
    <!--  助记  -->
    <el-card class="box-card" shadow="hover" v-if="word.note">
      <span style="font-size: 20px">助记</span>
      <el-divider></el-divider>
      <span>{{ word.note }}<span style="color: #409eff" v-if="word.noteType">({{ word.noteType }})</span></span>
    </el-card>
    <!--  例句  -->
    <el-card class="box-card" shadow="hover" v-if="word.example">
      <span style="font-size: 20px">例句</span>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in word.example" :key="index" style="font-size: 16px;font-weight: 600;">
        <el-col :span="24" style="line-height: 30px;margin-bottom: 25px;">
          <span style="font-size: 14px;color: #6e6e73">{{ index + 1 }}. </span>
          <!--          <span v-for="(i,j) in item.split(' ')" :key="j"-->
          <!--                :style="i.match(word.word) ? 'color: #409eff' : ''">-->
          <!--            {{ i + (j < item.match(/\b\w+\b/g).length ? ' ' : '') }}-->
          <!--          </span>-->
          <span v-html="process_item(item, word.word)"></span>
          <el-button type="text" @click="play2(index)" :icon="Headset" style="color: #409eff;margin-left: 10px;"/>
          <!--          <el-button type="text" @click="play2(index)" :icon="Headset" style="color: #409eff;margin-left: 10px;"/>-->
          <br/>
          <!--          &lt;!&ndash;     动态替换高亮单词  &ndash;&gt;-->
          <!--          <span v-for="(i,j) in item.split(new RegExp(`${word.word}`, 'gi'))" :key="j">-->
          <!--            {{ i }} &lt;!&ndash; 若不是最后的.则加入单词, 若为第一个单词则大写 &ndash;&gt;-->
          <!--            <span v-if="i === '' && j === 0"-->
          <!--                  style="color: #409eff">{{ word.word.charAt(0).toUpperCase() + word.word.slice(1) }}</span>-->
          <!--            <span v-else-if="i !== '.'" style="color: #409eff">{{ word.word }}</span>-->
          <!--          </span>-->

          <span style="font-size: 15px;font-weight:normal;color: #6e6e73;padding-left: 18px;">{{
              word.etrans[index]
            }}</span>
          <!--          <span style="color: #409eff">{{ word.highlight[index] }}</span>-->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import {Headset, Microphone, Search} from '@element-plus/icons-vue'
import {ElNotification} from 'element-plus'
import 'element-plus/dist/index.css'
import {XfVoiceDictation} from '@muguilin/xf-voice-dictation';

let times = null;

let _this = '';

// 实例化迅飞语音听写（流式版）WebAPI
const xfVoice = new XfVoiceDictation({
  APPID: '2f66de84',
  APISecret: 'MDEzYTMwMjA1MWJlYjIyOWZhMjg5NWIw',
  APIKey: '1ef266e65cc357d6108c1ff6f0e47c89',

  // webSocket请求地址 非必传参数，默认为：wss://iat-api.xfyun.cn/v2/iat
  // url: '',

  // 监听录音状态变化回调
  onWillStatusChange: function (oldStatus, newStatus) {
    // 可以在这里进行页面中一些交互逻辑处理：如：倒计时（语音听写只有60s）,录音的动画，按钮交互等！
    console.log('识别状态：', oldStatus, newStatus);
  },

  // 监听识别结果的变化回调
  onTextChange: function (text) {
    // 可以在这里进行页面中一些交互逻辑处理：如将文本显示在页面中
    console.log('识别内容：', text)
    _this.input = text;

    // 如果3秒钟内没有说话，就自动关闭（60s后也会自动关闭）
    if (text) {
      clearTimeout(times);
      times = setTimeout(() => xfVoice.stop(), 3000);
    }
  },

  // 监听识别错误回调
  onError: function (error) {
    console.log('错误信息：', error)
  },
});


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
  name: "QueryPageMain",
  computed: {
    Microphone() {
      return Microphone
    }
  },
  data() {
    return {
      input: "",
      Search: Search,
      Headset: Headset,
      word: word,
      dark: document.documentElement.classList.contains("dark"),
      text: ''
    };
  },
  methods: {
    query() {
      if (this.input === '') {
        ElNotification({
          title: '错误',
          message: '请输入单词',
          type: 'error'
        });
        return
      }
      axios.get("/api/query/" + this.input, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
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
    changeTheme() {
      this.dark = !this.dark;
      document.documentElement.classList.toggle("dark");
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
    play2(index) {
      axios.get("/api/YuYin/" + this.word.example[index], {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        // 播放音频
        let audio = new Audio('https://web-yuban-tlias.oss-cn-shenzhen.aliyuncs.com/' + res.data.data);
        audio.play();
        audio.onended = () => {
          audio = null;
        };
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
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      return item.replace(regex, `<span style="color: #409eff">$&</span>`);
    },
    voice2text() {
      // 开始录音
      xfVoice.start();
    }
  },
  mounted() {
    _this = this;
  }
};

</script>

<style scoped>
.query-input {
  width: 50%;
  height: 50px;
  margin-bottom: 18%;
}

.queried {
  position: fixed;
  top: 60px;

  width: 100%;
  min-width: 700px;
  height: 80px;
  z-index: 1;

  background-color: var(--el-bg-color);
}

.query-tittle {
  line-height: 80px;
  display: inline;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 40px;
  font-weight: 560;
  letter-spacing: -.003em;
  color: #35495e;

  font-style: italic;
  width: 280px;
}

.query-tittle-color {
  color: #41b883;
}

.queried-input {
  width: 100%;
  border: none;
  background: transparent;

  font-size: 20px;
  color: #6e6e73;
  vertical-align: bottom;
  line-height: 40px;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;
}

.queried-input:focus {
  outline: none;
  border-bottom-color: #409eff;
}

.box-card {
  margin-bottom: 20px;
  text-align: left;
  transform: scale(1);
  z-index: -1;
}

:deep(.inputDeep .el-input__wrapper) {
  box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: default;
  border-radius: 0;
  font-size: 20px;
  color: #6e6e73;
  line-height: 40px;
  vertical-align: bottom;
  font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif;

  .el-input__inner {
    cursor: default !important;
    background-color: transparent;
  }
}

:deep(.inputDeep .el-input-group__append) {
  background-color: transparent;
  box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: default;
  border-radius: 0;
}


</style>