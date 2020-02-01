<template>
  <div class="update-Albumwrap">
    <h1>更新相册</h1>

    <div class="addpic">
      <div class="one">
        <span>标题:</span>
        <el-input v-model="tittle" placeholder="请输入内容"></el-input>
      </div>

      <div class="two">
        <span>描述:</span>
        <el-input v-model="intro" placeholder="请输入内容"></el-input>
      </div>
      <div class="three">
        <span>添加图片:</span>
        <div class="image-view">
          <div class="addbox">
            <input type="file" multiple="multiple" @change="getImgBase()" ref="file" />
            <div class="addbtn">+</div>
          </div>
          <div class="view">
            <div class="item" v-for="(item, index) in imgBase64" :key="index">
              <span class="cancel-btn" @click="delImg(index)">x</span>
              <img :src="item" />
            </div>
          </div>
        </div>

      </div>

      <div class="confirm">
        <el-button type="primary" @click="addAlbum">确认添加</el-button>
      </div>
    </div>
<!-- 前端进行分页展示数据 -->
    <el-table
      :data="tableData.slice(this.lastIndex,this.nextIndex)"
      style="width: 100%;border:1px solid rgb(228, 221, 221);margin:30px 10px;"
    >
      <el-table-column label="日期" width="120" header-align="center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.publishTime |dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="120" header-align="center" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.img }}</span> -->
          <img :src="scope.row.imageUrl" alt style="width:80px;height:60px;" />
        </template>
      </el-table-column>
      <el-table-column label="标题" width="360" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.tittle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="介绍" width="320" header-align="center" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.introduce }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
          publishTime: "2016-05-02",
          id: 1,
          imageUrl: "../../../static/pic/头像.jpg",
          tittle: "分享我的个人1博客访问量如何做到IP从10到2000的",
          introduce: "上海市普陀区金沙江路 1518 弄"
        },
      ],
      
      intro: "",
      tittle: "",
      imgBase64: [],
      lastIndex: 0,
      nextIndex: 10,
      albums:[],
    };
  },
  created(){
    this.loadImg();
  },
  methods: {
    addAlbum(){
      let formData=new FormData();
      formData.append("tittle",this.tittle);
      formData.append("introduce",this.intro);
      this.albums.forEach(item => {
           formData.append("uploadFiles", item);
      });
        axios.post("/api/album/upload",formData,{
          "Content-Type":"multipart/form-data"
        }).then(result=>{
          alert("成功上传："+result.data.success+"\n"+"上传失败："+result.data.defeat);
          this.loadImg();
          console.log(result);
        })
    },
    loadImg(){
      axios.post("/api/album/list").then(result=>{
        this.tableData=result.data;
        // console.log(this.tableData);
      })
    },
 
    handleDelete(index, row) {
      //   删除
      let formData=new FormData();
      formData.append("id",row.id);
      axios.post("/api/album/delete",formData,{"Content-Type": "multipart/form-data"}).then(result=>{
        console.log(result);
        alert(result.data.info);
      })
      
      this.tableData.splice(index, 1);
      console.log(index, row);
    },

//base64转二进制
      binarySystem (baseurl) {
      let arr = baseurl.split(',')
      baseurl = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      let nameImg = []
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
        nameImg.push(bstr.charCodeAt(n))
      }
      return nameImg
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
      this.albums.push(file);
    },
    //删除图片
    delImg(index) {
 
      this.imgBase64.splice(index, 1);
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
  }
};
</script>

<style lang="scss" scoped>
// 去除滚动条
// ::-webkit-scrollbar{
//   display: none;
// }
.update-Albumwrap {
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
  .addpic {
    //   border-top:1px solid rgb(228, 221, 221);
    //   margin-top: 30px;
    // border: 1px solid gray;
    .one,
    .two {
      display: flex;
      margin-top: 30px;
      margin-left: 20px;
      span {
        width: 50px;
        font-size: 16px;
        padding-top: 5px;
      }
      .el-input {
        width: 1000px;
      }
    }
    .three {
      margin-left: 20px;
      padding-top: 30px;
      font-size: 16px;
      .image-view {
        width: 400px;
        // height: 300px;
        margin: 20px 100px;
        .addbox {
          float: left;
          position: relative;
          height: 100px;
          width: 100px;
          margin-bottom: 20px;
          text-align: center;
          input {
            position: absolute;
            left: 0;
            height: 100px;
            width: 100px;
            opacity: 0;
          }
          .addbtn {
            float: left;
            height: 100px;
            width: 100px;
            line-height: 100px;
            color: #fff;
            font-size: 40px;
            background: #ccc;
            border-radius: 10px;
          }
        }
        .view {
          clear: both;
          display: flex;
          .item {
            position: relative;
            // float: left;

            height: 100px;
            width: 100px;
            margin: 10px 10px 0 0;
            .cancel-btn {
              position: absolute;
              right: 0;
              top: 0;
              display: block;
              width: 20px;
              height: 20px;
              color: #fff;
              line-height: 20px;
              text-align: center;
              background: red;
              border-radius: 10px;
              cursor: pointer;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .confirm {
      margin-top: 30px;
      margin-left: 20px;
    }
  }

  .pagination {
    padding-left: 30px;
  }
}
</style>