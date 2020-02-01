<template>
  <div class="add-blogwrap">
    <!-- 添加博客 -->
    <div class="add" v-show="showEdit==false">
      <h1>添加博客</h1>
      <div class="blog">
        <div class="one">
          <p>博客标题&nbsp;:</p>
          <el-input v-model="inputAdd" placeholder="请输入内容"></el-input>
        </div>
        <div class="two">
          <p>博客内容&nbsp;:</p>
          <el-input type="textarea" :rows="14" placeholder="请输入内容" v-model="textareaAdd"></el-input>
        </div>
        <div class="image-view">
          <p>请上传博客封面:</p>
          <div class="addbox">
            <input type="file" @change="getImgBase()" ref="file" />
            <div class="addbtn">+</div>
          </div>
          <div class="view">
            <div class="item" v-for="(item, index) in imgBase64" :key="index">
              <span class="cancel-btn" @click="delImg(index)">x</span>
              <img :src="item" />
            </div>
          </div>
        </div>
        <el-button type="danger" @click="commit()">添加博客</el-button>
      </div>
    </div>
    <!-- 编辑博客 -->
    <div class="edit" v-show="showEdit==true ">
      <h1>编辑博客</h1>
      <div class="blog">
        <div class="one">
          <p>博客标题&nbsp;:</p>
          <el-input v-model="input" placeholder="请输入内容" id="tittle"></el-input>
        </div>
        <div class="two">
          <p>博客内容&nbsp;:</p>
          <el-input type="textarea" :rows="14" placeholder="请输入内容" v-model="textarea" id="content"></el-input>
        </div>
        <div class="two">
          <p>博客封面&nbsp;:</p>
          <img :src="blog.coverUrl" alt style="width:200px;height:200px;" />
        </div>

        <div class="image-view">
          <p>重新上传博客封面(可选):</p>
          <div class="addbox">
            <input type="file" @change="getImgBase()" ref="file1" />
            <div class="addbtn">+</div>
          </div>
          <div class="view">
            <div class="item" v-for="(item, index) in imgBase64" :key="index">
              <span class="cancel-btn" @click="delImg(index)">x</span>
              <img :src="item" />
            </div>
          </div>
        </div>
        <el-button type="danger" @click="reCommit()">重新添加博客</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      inputAdd: "",
      textareaAdd: "",
      input: "",
      textarea: "",
      imgBase64: [],
      blog: []
    };
  },
  computed: {
    ...mapState({
      showEdit: state => state.common.showEdit,
      editId: state => state.common.editId
      // token:state=>state.common.token,
    })
  },
  created() {
    if (this.showEdit == true) {
      this.load();
    }
  },
  methods: {
    load() {
      console.log(this.editId);
      let formData = new FormData();
      formData.append("id", this.editId);
      // formData.append("token",this.token)
      axios
        .post("/api/text/select", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
          this.blog = result.data.text;
          // 将要编辑的内容显示到编辑组件中
          this.input += this.blog.tittle;
          this.textarea += this.blog.content;
        });
    },
    reCommit() {
      let formData = new FormData();
      formData.append("tittle", this.input);
      formData.append("content", this.textarea);
      formData.append("introduce", this.textarea.slice(0, 85));
      formData.append("id", this.editId);
      // formData.append("uploadFile", this.$refs.file.files[0]);
      if (this.$refs.file1.files[0] !== "") {
        console.log(formData.get("uploadFile"));
        formData.append("uploadFile", this.$refs.file1.files[0]);
      }
      axios
        .post("/api/text/edit", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result.id);
          alert(result.data.info);
          // 提交了之后编辑页面不再显示，只显示添加页面
          this.$store.commit("SET_SHOWEDIT", false);
        });
    },
    commit() {
      let formData = new FormData();
      formData.append("tittle", this.inputAdd);
      formData.append("content", this.textareaAdd);
      formData.append("introduce", this.textareaAdd.slice(0, 85));
      formData.append("uploadFile", this.$refs.file.files[0]);
      console.log(formData.get("uploadFile"));
      axios
        .post("/api/text/upload", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          alert(result.data.info);
        });
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
  .edit,
  .add {
    h1 {
      margin: 0;
      font-size: 20px;
      border-left: 4px solid rgb(53, 124, 218);
      padding-left: 7px;
    }
    .one {
      margin-top: 20px;
      border-top: 1px solid rgb(228, 221, 221);
      padding-top: 20px;
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
    .two {
      padding-top: 20px;
      padding-left: 100px;
      p {
        font-size: 18px;
        color: gray;
        width: 100px;
      }
      .el-textarea {
        width: 600px;
      }
    }
    .el-button {
      margin-left: 100px;
      margin-top: 20px;
    }
    .image-view {
      width: 400px;
      // height: 300px;
      margin: 20px 100px;
      p {
        font-size: 18px;
        color: gray;
        width: 300px;
      }
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
    .el-button {
      margin: 0;
      position: relative;
      margin-top: 20px;
      margin-left: 100px;
    }
  }
}
</style>