<template>
  <el-container>
    <el-header>
      <PageHeader></PageHeader>
    </el-header>
    <el-main>
      <StartTestPageMain></StartTestPageMain>
    </el-main>
  </el-container>
</template>

<script setup>
import PageHeader from "@/components/common/header/PageHeader.vue";
import StartTestPageMain from "@/components/start_test_page/main/StartTestPageMain.vue";

</script>

<style scoped>
.common-layout {
  height: 100vh;
  width: 100%;
  margin: 0;
}

.el-header {
  top: 0;
  left: 0;
  z-index: 1;
  position: fixed;
}

.el-container {
  height: 100%;
  width: 100%;
  padding: 20px;
}

.el-main {
  display: flex !important;
  margin: auto 0;
  flex-direction: column !important;
  position: relative;
  color: #333;
  height: 92dvh;
  padding: 0;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
</style>