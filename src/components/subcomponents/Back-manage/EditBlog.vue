<template>
  <div class="edit-blogwrap">
    <h1>博客管理</h1>


<div class="deal">
  <el-button type="primary" @click="load(2)">按置顶排序</el-button>
  <el-button type="primary" @click="load(1)">按推荐排序</el-button>
</div>
    <el-table
      :data="tableData"
      style="width: 90%; border-top:1px solid rgb(228, 221, 221);margin:30px 50px;"
    >
      <el-table-column label="日期" width="150" header-align="center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <!-- 格式化时间 -->
          <span>{{ scope.row.publishTime |dateFormat("YYYY-MM-DD")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="350"  header-align="center" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>作者: 何岚</p>
            <!-- <p>文章: {{ scope.row.address }}</p> -->
            <div slot="reference" class="tittle-wrapper">
              <el-tag size="medium">{{ scope.row.tittle }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="星星数量" width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.starCount }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="400"  header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
             :class="scope.row.recommend?yes:no"
            @click="recommend(scope.$index, scope.row)"
          >{{scope.row.recommend?"已推荐":"推荐"}}</el-button>
          <el-button
            size="mini"
            type="primary"
            :class="scope.row.setTop?yes:no"
            @click="top(scope.$index, scope.row)"
          >{{scope.row.setTop?"已置顶":"置顶"}}</el-button>

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
import {mapGetters,mapState} from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          publishTime: "2016-05-02",
          id: 1,
          author: "何岚",
          tittle: "分享我的个人1博客访问量如何做到IP从10到2000的",
          starCount: 1,
          setTop: true,
          recommend: false
        }
      ],
      lastPage: 0,
      firstPage: 0,
      page: 1,
      yes:"yes", //置顶，推荐为true时显示的样式
      no:"no",  //置顶，推荐为false时显示的样式
    };
  },
  methods: {
    load(orderType) {
      let formData=new FormData();
      formData.append("orderType",orderType);
      axios.post("/api/text/list",formData,{
          "Content-Type": "multipart/form-data"
        }).then(result => {
        console.log(result);
        this.tableData = result.data.rows;
        // console.log(result.data.rows[1].publishTime);
        this.lastPage = result.data.lastPage;
        this.firstPage = result.data.firstPage;
      });
    },
    handleEdit(index, row) {
      // 编辑
      console.log(index, row.id);
      this.$store.commit("SET_SHOWEDIT",true);
      this.$store.commit("SET_EDITID",row.id);
      this.$router.push("/addblog");
    },
    handleDelete(index, row) {
      //   删除
      // console.log(index,row.id);
      let formData = new FormData();
      formData.append("id", row.id);
      axios
        .post("/api/text/delete", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
        });
      this.tableData.splice(index, 1);
      // console.log(index, row);
    },

    recommend(index, row) {
      // 推荐
      let formData = new FormData();
      formData.append("recommend", !row.recommend);
      formData.append("id", row.id);
      axios
        .post("/api/text/recommend", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
        if(result.data.status==0){
              this.tableData[index].recommend = !this.tableData[index].recommend;
            }else{
              alert(result.data.info);
            }
        });
      console.log(index);
    },
    top(index, row) {
      console.log(row);
      let formData = new FormData();
      formData.append("id", row.id);
      formData.append("top", !row.setTop);
      axios
        .post("/api/text/top", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
            if(result.data.status==0){
              this.tableData[index].setTop = !this.tableData[index].setTop;
            }else{
              alert(result.data.info);
            }
        });
    },
    // 上一页
    lastpagefun() {
      if (this.page == 1) {
        return;
      }
      var page = this.page - 1;
      axios.post("/api/text/list?page=" + page).then(result => {
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
      axios.post("/api/text/list?page=" + page).then(result => {
        console.log(result.data);
        this.tableData = result.data.rows;
      });
      this.page += 1;
      console.log(this.page);
    }
  },
  created() {
    this.load(0);//0:时间 1:推荐 2:置顶
  }
};
</script>

<style lang="scss" scoped>
.edit-blogwrap {
  width: 102%; //宽度比父元素多，从而达到隐藏效果
  height: 750px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  .deal{
    margin: 20px 40px;
    .el-button{
      width: 120px;
      span{
      text-align: center;

      }
    }
  }
  .yes{
    background-color: gray;
    border: none;  //去掉button type为primary的蓝色边框
  }
  .no{
    background-color: #409EFF;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    border-left: 4px solid rgb(53, 124, 218);
    padding-left: 7px;
    margin-bottom: 30px;
  }

  .el-table {
    .el-table__header-wrapper {
      background-color: black;
    }
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }
  .cell {
    text-align: center;
  }
  .el-button{
    width: 65px; //设置button的宽度一致使页面的button对齐
  }
}
  .pagination {
    padding-left: 130px;
    .el-button{
      width:100px;
    }
  
}
</style>