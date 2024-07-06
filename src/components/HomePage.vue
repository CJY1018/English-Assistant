<template>
  <div class="home">
    <el-container>
      <el-header>
        <PageHeader></PageHeader>
      </el-header>
      <el-main>
        <div class="row" @mouseleave="show1 = show2 = show3 = show4 = true">
          <div v-show="show1">
            <el-button color="#74c0fc" class="button b1-color" :dark="isDark"
                       @click="show2 = false; show3 = false; show4 = false"
                       :class="{b1: !(show2 || show3 || show4)}" plain>查
            </el-button>
          </div>
          <div v-show="show2">
            <el-button color="#e599f7" class="button b2-color" :dark="isDark"
                       @click="show1 = false; show3 = false; show4 = false"
                       :class="{b2: !(show1 || show3 || show4)}" plain>译
            </el-button>
          </div>
          <div v-show="show3">
            <el-button color="#ff8787" class="button b3-color" :dark="isDark"
                       @click="show1 = false; show2 = false; show4 = false"
                       :class="{b3: !(show1 || show2 || show4)}" plain>测
            </el-button>
          </div>
          <div v-show="show4">
            <el-button color="#ffd43b" class="button b4-color" :dark="isDark"
                       @click="show1 = false; show2 = false; show3 = false"
                       :class="{b4: !(show1 || show2 || show3)}" plain>管
            </el-button>
          </div>
          <!--    左对齐      -->
          <div style="text-align: left">
            <span v-show="!(show2 || show3 || show4)">
            <router-link to="/query" style="font-size: 20px" class="router-button">
              <el-button color="#74c0fc" plain>查单词</el-button>
            </router-link>&nbsp;&nbsp;<span>在单词库里查询单词</span><br/>
            <router-link to="/query_phrase" style="font-size: 20px" class="router-button">
              <el-button color="#74c0fc" plain>查例句</el-button>
            </router-link>&nbsp;&nbsp;<span>根据输入单词查询例句</span><br/>
            <router-link to="/essay_search" style="font-size: 20px" class="router-button">
              <el-button color="#74c0fc" plain>查短文</el-button>
            </router-link>&nbsp;&nbsp;<span>根据输入单词查询短文</span><br/>
            <router-link to="/books" style="font-size: 20px" class="router-button">
              <el-button color="#74c0fc" plain>查书籍</el-button>
            </router-link>&nbsp;&nbsp;<span>根据书籍查询单词</span>
          </span>
            <span v-show="!(show1 || show3 || show4)">
             <router-link to="/translation" style="font-size: 20px">
              <el-button color="#e599f7" plain>翻译</el-button>
            </router-link>&nbsp;&nbsp;<span>中英互译</span>
          </span>
            <span v-show="!(show1 || show2 || show4)">
             <router-link to="/test" style="font-size: 20px">
              <el-button color="#ff8787" plain>单词测试</el-button>
            </router-link>&nbsp;&nbsp;<span>根据难度生成单词测试题</span>
          </span>
            <span v-show="!(show1 || show2 || show3)">
            <router-link to="/alter" style="font-size: 20px">
              <el-button color="#ffd43b" plain>单词管理</el-button>
            </router-link>&nbsp;&nbsp;<span>仅管理员，对单词和例句进行管理</span>
          </span>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PageHeader from "@/components/common/header/PageHeader.vue";

export default {
  name: "HomePage",
  data() {
    return {
      isDark: document.documentElement.classList.contains("dark"),
      show1: true,
      show2: true,
      show3: true,
      show4: true
    };
  },
  components: {PageHeader}
};
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
  min-height: 100dvh;
  width: 100%;
  padding: 20px;
}

.el-main {
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
}


$color: #2194E0;

@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
}

.wrapper {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.b1 {
  border-bottom: 4px solid #2194E0;
  width: 300px;
  height: 500px;
}

.b2 {
  border-bottom: 4px solid #9c36b5;
  width: 300px;
  height: 500px;
}

.b3 {
  border-bottom: 4px solid #e03131;
  width: 300px;
  height: 500px;
}

.b4 {
  border-bottom: 4px solid #e6a23c;
  width: 300px;
  height: 500px;
}

.b1-color {
  --color: #2194E0;
}

.b2-color {
  --color: #9c36b5;
}

.b3-color {
  --color: #e03131;
}

.b4-color {
  --color: #e6a23c;
}

.button {
  padding: 2.5em 1.5em;
  margin: 0;
  text-align: center;
  text-decoration: none;
  color: $color;
  border: 2px solid $color;
  font-size: 34px;
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 0.75em;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -10em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }

  &:hover {
    border-bottom: 4px solid var(--color);

    &:before {
      transform: skewX(-45deg) translateX(26.5em) translateY(-15px);
      transition: all 0.5s ease-in-out;
    }
  }
}

.row {
  height: 500px;
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.router-button {
  display: inline-block !important;
  text-align: left !important;
}
</style>
