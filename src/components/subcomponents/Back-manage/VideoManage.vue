<template>
  <div class="video-managewrap">
    <h1>视频管理</h1>

    <el-table
      :data="tableData"
      style="width: 100%;border:1px solid rgb(228, 221, 221);margin:30px 10px;"
    >
      <el-table-column label="日期" width="190" header-align="center"  align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.publishTime |dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频封面" width="100" header-align="center"  align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.img }}</span> -->
          <img :src="scope.row.coverUrl" alt style="width:80px;height:60px;" />
        </template>
      </el-table-column>
      <!-- header-align:表头对齐方式; align:表格内容对齐方式; -->
      <el-table-column label="标题" width="250" header-align="center" align="center">
        <template slot-scope="scope" >
          <span >{{scope.row.tittle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="250" header-align="center"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.singerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="星星数量" width="150" header-align="center" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.starCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-button @click="lastpagefun">上一页</el-button>
      <el-button @click="nextpagefun">下一页</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          id: 1,
          coverUrl: "../../../static/pic/头像.jpg",
          tittle: "分享我的个人1博客访问量如何做到IP从10到2000的",
          singerName: "上海市普陀区金沙江路 1518 弄",
          starCount: 22
        }
      ],
      intro: "",
      tittle: "",
      imgBase64: [],
      page: 1
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      axios.post("/api/video/list").then(result => {
        // console.log(result);
        this.tableData = result.data.rows;
        // console.log(result.data.rows);
        this.lastPage = result.data.lastPage;
        this.firstPage = result.data.firstPage;
      });
    },
    handleDelete(index, row) {
      //   删除
      // console.log(row.id);
      let formData = new FormData();
      formData.append("id", row.id);
      axios
        .post("/api/video/delete", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          // console.log(result);
        });
      this.tableData.splice(index, 1);
      // console.log(index, row);
    },
    getImgBase() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imgBase64.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    // 上一页
    lastpagefun() {
      if (this.page == 1) {
        return;
      }
      var page = this.page - 1;
      axios.post("/api/video/list?page=" + page).then(result => {
        console.log(result.data);
        this.tableData = result.data.rows;
      });
      this.page -= 1;
      console.log(this.page);
    },
    // 下一页
    nextpagefun() {
      console.log(this.lastPage);
      if (this.page >= this.lastPage) {
        return;
      }
      var page = this.page + 1;
      axios.post("/api/video/list?page=" + page).then(result => {
        console.log(result.data);
        this.tableData = result.data.rows;
      });
      this.page += 1;
      console.log(this.page);
    }
  }
};
</script>

<style lang="scss" scoped>
// 去除滚动条
// ::-webkit-scrollbar{
//   display: none;
// }
.video-managewrap {
  width: 102%; //宽度比父元素多，从而达到隐藏效果
  height: 750px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  h1 {
    margin: 0;
    font-size: 20px;
    border-left: 4px solid rgb(53, 124, 218);
    padding-left: 7px;
  }
  .el-table {
    .cel{
        text-align: center;
    }
  }

  .pagination {
    padding-left: 30px;
  }
}
</style>