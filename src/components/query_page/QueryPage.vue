<template>
  <el-container>
    <el-header>
      <PageHeader></PageHeader>
    </el-header>
    <el-main>
      <QueryPageMain></QueryPageMain>
    </el-main>
  </el-container>
</template>

<script setup>
import PageHeader from "@/components/common/header/PageHeader.vue";
import QueryPageMain from "@/components/query_page/main/QueryPageMain.vue";

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
  top: 140px;
  left: 0;
  display: flex !important;
  flex-direction: column !important;
  position: relative;
  color: #333;
  height: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 55px;
  overflow: hidden;
}
</style>