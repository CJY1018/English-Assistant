<template>
  <el-menu class="header-fixed el-menu-demo" style="z-index: 2000" mode="horizontal" :default-active="active_index" :ellipsis="ellipsis"
           :router='true'>
    <a href="http://localhost:8080/"><img src="../../../assets/logo.png" alt="null" class="header-logo"/></a>
    <el-menu-item index="/" class="header-left">首页</el-menu-item>
    <el-menu-item index="/login" class="header-left">登录</el-menu-item>
    <el-menu-item index="/register" class="header-left">注册</el-menu-item>
    <div class="flex-grow"/>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <el-menu-item index="/alter" style="margin-right: 20px">管理员</el-menu-item>
    <el-menu-item>
      <ToggleTheme/>
    </el-menu-item>
  </el-menu>
</template>

<script>
import ToggleTheme from "@/components/ToggleTheme.vue";

export default {
  components: {ToggleTheme},
  email: "PageHeader",
  data() {
    return {
      ellipsis: window.innerWidth < 800,
      active_index: '/'
    }
  },
  created() {
    this.active_index = this.$route.path
  },
  mounted() {
    let _this = this
    window.onresize = function () {
      _this.ellipsis = window.innerWidth < 800
    }
  },
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.header-fixed {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--el-bg-color);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  z-index: 300;
}

.header-logo {
  width: 50px;
  margin: 10px 20px 0 20px;
  float: left;
}

</style>
