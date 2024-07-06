<template>
  <el-card shadow="always" style="width: 66%;margin: 10px;min-width: 300px;">
    <span style="font-size: 20px;font-weight: bold;">单词书</span>
  </el-card>

  <!-- 3 * 3 布局 -->
  <div class="books-row" v-for="row in Math.ceil(books.length / 3)" :key="row">
    <div class="books-col" v-for="col in 3" :key="col">
      <a style="text-decoration: none;" @click="handleClick(row, col)">
        <el-card shadow="always" class="books-card">
          <el-row :span="24">
            <el-col :span="14">
              <div class="books-info">
                <p class="books-title">{{ books[(row - 1) * 3 + col - 1].name }}</p>
                <p class="books-words">词汇量：{{ books[(row - 1) * 3 + col - 1].vocCount }}</p>
              </div>
            </el-col>
            <el-col :span="10" style="height: 110px">
              <el-image :src="books[(row - 1) * 3 + col - 1].cover" alt="cover" fit="fill"
                        style="height: 100%;width: 75%;border-radius: 1rem;margin: auto 0"/>
            </el-col>
          </el-row>
        </el-card>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElNotification} from "element-plus";

const books = [
  {
    "name": "2013版四级词汇便携版",
    "id": 21,
    "vocCount": 4000,
    "cover": "https://wordforest.cn/static/images/cet4.jpg",
  },
  {
    "name": "星火6级词汇必背",
    "vocCount": 6000,
    "cover": "https://wordforest.cn/static/images/cet6.jpg",
  },
  {
    "name": "《CET 6》",
    "vocCount": 6000,
    "cover": "https://wordforest.cn/static/images/cet6.jpg",
  }
]

export default {
  name: "BooksPageMain",
  data() {
    return {
      books: books
    }
  },
  methods: {
    handleClick(row, col) {
      const index = (row - 1) * 3 + col - 1
      this.$router.push({
        path: '/book', query: {id: this.books[index].id}
      })
    }
  },
  mounted() {
    axios.get("/api/books").then(res => {
      if (res.data.code === 1) {
        this.books = res.data.data
        console.log(this.books)
      } else {
        ElNotification({
          title: '错误',
          message: '获取书籍信息失败: ' + res.data.msg,
          type: 'error'
        });
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

</script>

<style scoped>
.books-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.books-col {
  margin: 20px;
}

.books-card {
  width: 300px;
  border-radius: 1rem;
  height: 100%;
}

.books-card:hover {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.books-info {

}

.books-title {
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
}

.books-words {
  font-size: 12px;
  color: #999;
  line-height: 12px;
}

</style>