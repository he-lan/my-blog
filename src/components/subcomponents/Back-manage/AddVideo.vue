<template>
  <div class="add-blogwrap">
    <h1>添加视频</h1>
    <div class="blog">
      <div class="one">
        <p>视频标题&nbsp;:</p>
        <el-input v-model="tittle" placeholder="请输入内容"></el-input>
      </div>
      <div class="two">
        <p>歌手&nbsp;:</p>
        <el-input placeholder="请输入内容" v-model="singerName"></el-input>
      </div>
      <div class="two">
        <p>视频链接&nbsp;:</p>
        <el-input placeholder="请输入内容" v-model="videoLink"></el-input>
      </div>

      <div class="image-view">
        <p>视频封面:</p>
        <div class="addbox">
          <input type="file"  @change="getImgBase()" ref="file" />
          <div class="addbtn">+</div>
        </div>
        <div class="view">
          <div class="item" v-for="(item, index) in imgBase64" :key="index">
            <span class="cancel-btn" @click="delImg(index)">x</span>
            <img :src="item" />
          </div>
        </div>
      </div>

      <form id="myForm" enctype="multipart/form-data" name="fileinfo" action target="uploadFrame">
        <div class="img-file">
          <label for="imgFile" class="addbutton button-green">选择视频</label>
          <input
            @change="changeVideo"
            id="imgFile"
            class="upload_input"
            type="file"
            accept="video/*"
          />
        </div>
      </form>

      <el-button type="danger" @click="addVideo">
        上传视频
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tittle: "",
      singerName: "",
      videoLink: "",
      imgBase64: []
    };
  },
  methods: {

    // let formData = new FormData();
    //   formData.append("tittle", this.inputAdd);
    //   formData.append("content", this.textareaAdd);
    //   formData.append("introduce", this.textareaAdd.slice(0, 5));
    //   formData.append("uploadFile", this.$refs.file.files[0]);
    //   console.log(formData.get("uploadFile"));
    //   axios
    //     .post("/api/text/upload", formData, {
    //       "Content-Type": "multipart/form-data"
    //     })
    //     .then(result => {
          
    //       alert(result.data.info);
    //     });
    addVideo(){
      let formData=new FormData();
      formData.append("tittle",this.tittle);
      formData.append("singerName",this.singerName);
      formData.append("videoUrl",this.videoLink);
      formData.append("imgFile",this.$refs.file.files[0]);
      axios.post('/api/video/upload',formData,{
        "Content-Type":"multipart/form-data"
      }).then(result=>{
        alert(result.data.info);
      })
    },
    //获取图片base64实现预览
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
    //删除图片
    delImg(index) {
      this.imgBase64.splice(index, 1);
      
    },
    changeVideo() {
      let that = this;
      var file = document.getElementById("imgFile").files[0];
      that.file = file;
      var ids = this.ids;
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加  到FormData里面，这样就可以直接把formData作为参数传递了
      if (file) {
        formData.append("file", file); //接口需要传递的参数
      }
      let potss = formData;
      let urls = "http:url地址";
      axios
        .post(urls, potss)
        .then(function(res) {
          that.prames.videoUrl = res.data.info;
          that.videoshow = false;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-blogwrap {
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
  .one {
    margin-top: 20px;
    border-top: 1px solid rgb(228, 221, 221);
    padding-top: 10px;
    padding-left: 100px;
    p {
      font-size: 18px;
      color: gray;
      width: 100px;
    }
    .el-input {
      width: 600px;
    }
  }
  .two,
  .three {
    margin-top: 10px;
    padding-top: 10px;
    padding-left: 100px;
    p {
      font-size: 18px;
      color: gray;
      width: 100px;
    }
    .el-input {
      width: 600px;
    }
  }

  .image-view {
    width: 400px;
    // height: 300px;
    margin: 20px 100px;
    font-size: 18px;
    color: gray;
    // width: 100px;
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

  #myForm {
    margin-left: 100px;
    margin-top: 20px;
       font-size: 18px;
    color: gray;
    #imgFile {
      margin: 30px 0;
    }
  }
  .el-button {
    margin-left: 100px;
    margin-top: 20px;
  }

  //   .el-button {
  //     margin: 0;
  //     position: relative;
  //     margin-top: 20px;
  //     margin-left: 100px;
  //   }
}
</style>