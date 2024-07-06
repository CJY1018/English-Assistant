<template>
  <el-container>
    <el-header>
      <PageHeader></PageHeader>
    </el-header>
    <el-main>
      <BookPageMain></BookPageMain>
    </el-main>
  </el-container>
</template>

<script setup>
import BookPageMain from "@/components/books_page/book_page/main/BookPageMain.vue";
import PageHeader from "@/components/common/header/PageHeader.vue";

</script>

<style scoped>

</style>