<template>
  <el-button @click="handleClick">发送</el-button>
  <el-button @click="stop">停止</el-button>
  <span style="color: red;">{{ text }}</span>
</template>

<script>
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
    _this.text = text;

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


export default {
  name: "WebSocket",
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleClick() {
      // 开始录音
      xfVoice.start();
    },
    stop() {
      // 停止录音
      xfVoice.stop();
    }
  },
  mounted() {
    _this = this;
  }
}

</script>

<style scoped>

</style>