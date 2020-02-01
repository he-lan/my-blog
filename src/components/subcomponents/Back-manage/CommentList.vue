<template>
  <div class="comment-listwrap">
    <h1>留言列表</h1>

    <el-table
      :data="tableData.slice(this.lastIndex,this.nextIndex)"
      style="width: 100%; border-top:1px solid rgb(228, 221, 221);margin:30px 30px;"
    >
      <el-table-column label="日期" width="180" header-align="center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time  | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="100" header-align="center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论内容" width="360" header-align="center" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.message }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-button @click="lastpage">上一页</el-button>
      <el-button @click="nextpage">下一页</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [
        {
          time: "2016-05-02",
          id: 1,
          userName: "何岚",
          message: "这是一条测试的评论内容kkkkkkkkkkkkkkkk你好啊！"
        },
      ],
      lastIndex: 0,
      nextIndex: 10
    };
  },
  created(){
    this.load();
  },
  methods: {
    load(){
      axios.post('/api/messageList/list').then(result=>{
        this.tableData=result.data.comment;
        console.log(result);
      })
    },
    handleDelete(index, row) {
      //   删除
      let formData=new FormData();
      formData.append("id",row.id);
      axios.post('api/messageList/delete',formData,{
                  "Content-Type": "multipart/form-data"
      }).then(result=>{
          alert(result.data.info)
      })
      this.tableData.splice(index, 1);
      console.log(index, row);
    },
    // 上一页
    lastpage() {
      if (this.lastIndex <= 0) return;
      this.lastIndex -= 10;
      this.nextIndex = this.nextIndex - 10;
      this.tableData.slice(this.lastIndex, this.nextIndex);
    },
    // 下一页
    nextpage() {
      if (this.nextIndex > this.tableData.length) return;
      this.lastIndex += 10;
      this.nextIndex = this.nextIndex + 10;
      this.tableData.slice(this.lastIndex, this.naxtIndex);
    }
  },
};
</script>

<style lang="scss" scoped>
.comment-listwrap {
  height: 750px;
  width: 102%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;

  h1 {
    margin: 0;
    font-size: 20px;
    border-left: 4px solid rgb(53, 124, 218);
    padding-left: 7px;
    margin-bottom: 30px;
  }
  .pagination {
    padding-left: 30px;
  }
}
</style>