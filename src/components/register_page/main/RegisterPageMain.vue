<template>
  <div class="form-container">
    <el-aside class="form">
      <el-form ref="ruleFormRef"
               style="max-width: 600px; width: 80%"
               :model="ruleForm"
               :rules="rules"
               label-width="auto"
               label-position="top"
               class="demo-ruleForm"
               status-icon>
        <h2 style="letter-spacing: 1px; font-size: 22px; font-weight: 600; text-align: left; margin: 0;line-height: 25px">
          注册 <span style="color: #5cb85c">英语词汇小助手</span>
        </h2>
        <hr style="margin-bottom: 20px;border: 0;border-top: 1px solid rgba(162,169,182,0.25)"/>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-model="ruleForm.email" size="large" :prefix-icon="Message" placeholder="电子邮箱"/>
        </el-form-item>
        <el-form-item label="手机号：" prop="tel">
          <el-input v-model="ruleForm.tel" size="large" :prefix-icon="Phone" placeholder="手机号"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password size="large"
                    :prefix-icon="Lock" placeholder="密码"/>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm_password">
          <el-input v-model="ruleForm.confirm_password" type="password" autocomplete="off" show-password size="large"
                    :prefix-icon="Lock" placeholder="确认密码"/>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox-group v-model="ruleForm.agree">
            <el-checkbox>已仔细阅读并同意</el-checkbox>
          </el-checkbox-group>
          《<a href="https://resource.neea.edu.cn/project/Passport/PublicInfo/CETNCREPETSServicesAgreement.pdf"
              target="_blank">用户服务协议</a>》
          《<a href="https://resource.neea.edu.cn/project/Passport/PublicInfo/CETNCREPETSPrivacyPolicy.pdf"
              target="_blank">用户隐私政策</a>》
        </el-form-item>
        <!--    注册    -->
        <el-form-item style="margin-top: 7%">
          <el-button @click="submitForm('ruleFormRef')" round size="large"
                     style="width: 70%; margin: auto" color="#007bff">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-aside>

    <el-main class="form-extra">
      <ul style="width: 100%;margin-bottom: 70%">
        <li style="text-align: left;line-height: 40px">
          <span style="color: #26337A;margin-left: 5%">已有账号？</span>
        </li>
        <li>
          <el-button @click="toLoinPage" round style="width: 90%" color="#007bff" size="large">
            登录
          </el-button>
          <p style="font-size: 12px;line-height: 15px;text-align: left;padding-left: 5%">
            <span style="color: #a0aec0">
              忘记密码?
              <a @click="toResetPasswordPage">重置密码</a>
            </span>
          </p>
          <hr style="margin-bottom: 20px;border: 0;border-top: 1px solid rgba(162,169,182,0.25)"/>
        </li>
        <li style="text-align: left;line-height: 30px">
          <div class="col-md-12 mt-5 p-4"
               style="background: rgb(252, 252, 245);padding: 13px; border-radius: 10px; border: 1px solid #e4d08f; color:rgb(113, 128, 150) ;">
            <div class="px-md-1" style="color: #222;font-size: 16px;margin-bottom:1em;">
              什么是英语小助手？
            </div>
            <div class="px-md-1" style="color: rgb(248, 64, 8);margin-bottom:1em;font-size:14px;font-weight:600">
              “英语小助手”支持用户注册、登录、查询单词、背单词、查看单词书等功能。
            </div>
          </div>
        </li>
        <li style="text-align: left">
          <span style="margin-left: 5%">信息被占用？</span>
        </li>
        <li>
          <el-button @click="submitForm('ruleFormRef')" round style="width: 90%" color="#dc3545" size="large">
            信息占用申诉
          </el-button>
        </li>
      </ul>
    </el-main>
  </div>
</template>

<script src="">
import {reactive} from 'vue'
import {CircleCheck, Lock, Message, Phone, Postcard, User} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessageBox} from "element-plus";

// 表单项
const ruleForm = reactive({
  email: '',
  tel: '',
  password: '',
})

class RuleFormOutput {
  constructor(email, tel, password,) {
    this.email = email
    this.tel = tel
    this.password = password
  }
}

// 校验密码
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}

// 校验规则
const rules = {
  email: [
    {required: true, message: '请输入电子邮箱', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
  ],
  tel: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  confirm_password: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: validatePass2, trigger: 'blur'}
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '长度在 6 个字符', trigger: 'blur'}
  ],
  agree: [
    {required: true, message: '请同意用户服务协议和用户隐私政策', trigger: 'change'}
  ],
}

export default {
  email: 'LoginPageMain',
  computed: {
    Postcard() {
      return Postcard
    },
    Phone() {
      return Phone
    },
    Message() {
      return Message
    },
    CircleCheck() {
      return CircleCheck
    },
    User() {
      return User
    },
    Lock() {
      return Lock
    },
  },
  data() {
    return {
      ruleForm,
      rules,
      img_url: '',
      checkNum: '获取验证码',
      checkDisabled: false,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          let ruleFormOutput = new RuleFormOutput(
              this.ruleForm.email,
              this.ruleForm.tel,
              this.ruleForm.password,
          )
          // 提交表单
          axios.post('api/sign', ruleFormOutput
          ).then(res => {
            if (res.data.code === 1) {
              this.$router.push('/login')
            } else {
              ElMessageBox.alert(res.data.msg, '提示', {
                confirmButtonText: '确定',
                type: 'error',
                callback: () => {
                  console.error('error: ', '注册失败!')
                }
              })
            }
          }).catch(err => {
            console.log(err)
            ElMessageBox.alert('注册失败!', '提示', {
              confirmButtonText: '确定',
              type: 'error',
              callback: () => {
                console.error('error: ', '注册失败!')
              }
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toLoinPage() {
      this.$router.push({path: '/login'})
    },
    toResetPasswordPage() {
      this.$router.push({path: '/reset_password'})
    }
  },
}

</script>


<style scoped>
.form-container {
  display: flex;
  width: 71%;
  margin: 2% auto 4% auto;

  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 65%;
  padding-top: 50px;
  padding-bottom: 10px;
}

.form-extra {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #DDE7FF;
}

.el-button {
  font-size: 16px;
  font-weight: bold;
}

/*ul li去点*/
ul {
  list-style: none;
  padding: 0;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

/deep/ .el-input-group__append {
  padding: 0;
}
</style>