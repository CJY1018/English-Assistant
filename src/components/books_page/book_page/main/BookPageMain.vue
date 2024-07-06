<template>
  <div>
    <h1>书籍: {{ bookName }}</h1>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" header-row-style="font-size: 16px">
        <el-table-column type="index" label="" align="center" width="60"/>
        <el-table-column prop="word" label="单词">
          <template #default="scope">
            <el-button link style="color: #409EFF; font-size: 20px;font-weight: bold;line-height: 30px"
                       @click="handleClick(scope.row)">
              {{ scope.row.word }}
            </el-button>
            <span style="display: block">英式：{{ scope.row.puk }}</span>
            <span style="display: block">美式：{{ scope.row.pus }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="translate" label="释义"/>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="perPage"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessageBox} from 'element-plus'
import {h} from 'vue'

export default {
  data() {
    return {
      bookName: '',
      id: this.$route.query.id,
      tableData: [],
      currentPage: 1,
      perPage: 10,
      total: 100
    }
  },
  methods: {
    handleClick(row) {
      ElMessageBox.confirm(row.word, '单词详细信息', {
        confirmButtonText: '确定',
        showCancelButton: false,
        center: false,
        message: () => {
          return h('div', {style: 'justify-content: left;width: 100%'}, [
            h('p', {style: 'font-size: 18px;color: #409EFF;font-weight: bold;line-height: 30px'}, row.word),
            h('span', {style: 'display: block'}, row.puk),
            h('span', {style: 'display: block'}, row.pus),
            h('hr'),
            h('p', {style: 'font-size: 16px;color: #6e6e73;font-weight: bold'}, "释义"),
            row.translates.map(i => h('p', null, [
              h('span', {style: 'color: #409EFF'}, i.type + ' '),
              h('span', null, ' ' + i.interpretation)
            ])),
            h('hr'),
            h('p', {style: 'font-size: 16px;color: #6e6e73;font-weight: bold'}, "助记"),
            h('span', null, row.note + ' ('),
            h('span', {style: 'color: #409EFF'}, row.noteType),
            h('span', null, ')'),
            h('hr', {style: 'width: 396px'}),
            h('p', {style: 'font-size: 16px;color: #6e6e73;font-weight: bold'}, "例句"),
            // h('p', null, row.example + ' ' + row.etrans)
            row.example.map(i => h('p', null, [
                  h('span', {style: 'color: #409EFF'}, row.example.indexOf(i) + 1 + '. '),
                  h('span', null, i),
                  h('br'),
                  h('span', null, row.etrans[row.example.indexOf(i)])
                ])
            )
          ])
        }
      }).then(() => {
        // 确定
      }).catch(() => {
        // 取消
      });
    },
    handleSizeChange(size) {
      this.perPage = size;
      this.currentPage = 1;
      axios.get("/api/book?id=" + this.id + "&pageSize=" + this.perPage + "&pageNum=" + this.currentPage)
          .then(res => {
            this.tableData = [];
            const data = res.data.data.queryVoList;
            data.map(item => {
              this.tableData.push({
                word: item.word,
                translate: item.translate,
                translates: item.translate.map(i => {
                  return {
                    type: i.split(',')[0],
                    interpretation: i.split(',')[1]
                  }
                }),
                puk: item.puk,
                pus: item.pus,
                note: item.note,
                noteType: item.noteType,
                example: item.example,
                etrans: item.etrans
              });
            });
            this.bookName = res.data.data.bookName;
            this.total = res.data.data.total;
          })
          .catch(error => {
            console.log(error);
          });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      axios.get("/api/book?id=" + this.id + "&pageSize=" + this.perPage + "&pageNum=" + this.currentPage)
          .then(res => {
            // this.tableData = res.data.data.queryVoList;
            this.tableData = [];
            const data = res.data.data.queryVoList;
            data.map(item => {
              this.tableData.push({
                word: item.word,
                translate: item.translate,
                translates: item.translate.map(i => {
                  return {
                    type: i.split(',')[0],
                    interpretation: i.split(',')[1]
                  }
                }),
                puk: item.puk,
                pus: item.pus,
                note: item.note,
                noteType: item.noteType,
                example: item.example,
                etrans: item.etrans
              });
            });
            this.bookName = res.data.data.bookName;
            this.total = res.data.data.total;
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  mounted() {
    axios.get("/api/book?id=" + this.id + "&pageSize=" + this.perPage + "&pageNum=" + this.currentPage)
        .then(res => {
          console.log(res.data.data.queryVoList)
          this.tableData = [];
          const data = res.data.data.queryVoList;
          data.map(item => {
            this.tableData.push({
              word: item.word,
              translate: item.translate,
              translates: item.translate.map(i => {
                return {
                  type: i.split(',')[0],
                  interpretation: i.split(',')[1]
                }
              }),
              puk: item.puk,
              pus: item.pus,
              note: item.note,
              noteType: item.noteType,
              example: item.example,
              etrans: item.etrans
            });
          });
          this.bookName = res.data.data.bookName;
          this.total = res.data.data.total;
        })
        .catch(error => {
          console.log(error);
        });
  },
}


</script>

<style scoped>
.box-card {
  width: 80%;
  border-radius: 0.75rem;
  margin: 0 auto;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

/deep/ .el-message-box__container {
  display: block !important;
  width: 100%;
}

</style>