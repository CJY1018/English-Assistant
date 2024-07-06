<template>
  <div>
    <input v-model="transVar.text" placeholder="输入待翻译文本">
    <select v-model="transVar.from">
      <option value="cn">中文</option>
      <option value="en">英文</option>
      <!-- 其他语言选项 -->
    </select>
    <select v-model="transVar.to">
      <option value="cn">中文</option>
      <option value="en">英文</option>
      <!-- 其他语言选项 -->
    </select>
    <button @click="translate">翻译</button>
    <div v-if="translation">
      <p>原文：[{{ translation.from }}] {{ translation.src }}</p>
      <p>译文：[{{ translation.to }}] {{ translation.dst }}</p>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import axios from 'axios'

export default {
  data() {
    return {
      config: {
        hostUrl: "/translate",
        host: "itrans.xfyun.cn",
        appid: "5d662063", // 请替换为您的appid
        apiSecret: "MDEzYTMwMjA1MWJlYjIyOWZhMjg5NWIw", // 请替换为您的apiSecret
        apiKey: "1ef266e65cc357d6108c1ff6f0e47c89", // 请替换为您的apiKey
        uri: "/v2/its"
      },
      transVar: {
        text: "你好世界！",
        from: "cn",
        to: "en"
      },
      translation: null
    }
  },
  methods: {
    async translate() {
      let date = (new Date().toUTCString())
      let postBody = this.getPostBody(this.transVar.text, this.transVar.from, this.transVar.to)
      let digest = this.getDigest(postBody)

      let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json,version=1.0',
        'Host': this.config.host,
        'Date': date,
        'Digest': digest,
        'Authorization': this.getAuthStr(date, digest)
      }

      try {
        let response = await axios.post(this.config.hostUrl, postBody, { headers })
        if(response.data.code !== 0) {
          console.error(`发生错误，错误码：${response.data.code} 错误原因：${response.data.message}`)
        } else {
          this.translation = {
            from: response.data.data.result.from,
            to: response.data.data.result.to,
            src: response.data.data.result.trans_result.src,
            dst: response.data.data.result.trans_result.dst
          }
        }
      } catch (error) {
        console.error('error ' + error)
      }
    },
    getPostBody(text, from, to) {
      let digestObj = {
        common: {
          app_id: this.config.appid
        },
        business: {
          from: from,
          to: to
        },
        data: {
          text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
        }
      }
      return digestObj
    },
    getDigest(body) {
      return 'SHA-256=' + CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
    },
    getAuthStr(date, digest) {
      let signatureOrigin = `host: ${this.config.host}\ndate:${date}\nPOST ${this.config.uri} HTTP/1.1\ndigest:${digest}`
      let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.config.apiSecret)
      let signature = CryptoJS.enc.Base64.stringify(signatureSha)
      let authorizationOrigin = `api_key="${this.config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`
      return authorizationOrigin
    }
  }
}
</script>

<style>
/* 样式根据需要添加 */
</style>
