<template>
  <el-container>
    <el-header>
      <PageHeader></PageHeader>
    </el-header>
    <el-main>
      <el-menu
          default-active="1"
          :router='true'
          :unique-opened="true"
          class="alter-page-menu"
      >
        <el-sub-menu index="1">
          <template #title>增加</template>
          <el-menu-item index="/alter/add_word">增加单词</el-menu-item>
          <el-menu-item index="/alter/add_example">增加例句</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>修改</template>
          <el-menu-item index="/alter/update_word">修改单词</el-menu-item>
          <el-menu-item index="/alter/update_example">修改例句</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>删除</template>
          <el-menu-item index="/alter/delete_word">删除单词</el-menu-item>
          <el-menu-item index="/alter/delete_example">删除例句</el-menu-item>
        </el-sub-menu>
      </el-menu>

      <el-container class="alter-page-main">
        <router-view/>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import PageHeader from "@/components/common/header/PageHeader.vue";

export default {
  components: {
    PageHeader,
  },

};

</script>

<style scoped>
.common-layout {
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
  width: 100%;
  padding: 20px;
}

.el-main {
  top: 60px;
  left: 0;


  position: relative;
  display: flex;
  color: #333;

  padding: 0;
  line-height: 55px;
  overflow: hidden;
}

.alter-page-menu {
  width: 200px;
}

.alter-page-main {
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>