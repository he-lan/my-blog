<template>
  <div class="blog-leftwrap">
    <div class="text">
      <div class="top">
        <h1>{{singleBlog.tittle}}</h1>
        <span>作者：何岚</span>
        <span>{{singleBlog.publishTime|dateFormat}}</span>
      </div>
      <div class="content">
         <!-- 下列样式解决文本显示的样式存取格式不一致问题 -->
         <article style="white-space:pre-wrap; text-indent:2em;">{{singleBlog.content}}</article>
      </div>
      <div class="star">
        <p>
          很赞哦！
          <i class="el-icon-star-off"></i>
          ({{singleBlog.starCount}})
        </p>
      </div>
      <div class="comment">
        <hr />
        <div class="top">
          <h3>发表评论</h3>
          <span class="hr"></span>
        </div>

        <div class="comment-box">
          <!-- <i class="el-icon-user"></i> -->
          <div class="left">
            <svg
              t="1574333343052"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4698"
              width="40"
              height="40"
            >
              <path
                d="M951.306 811.97c-5.153-45.795-43.343-72.571-76.926-88.81-33.583-16.235-216.953-114.45-219.889-118.692-2.934-4.242 5.243-50.991 7.941-58.202 2.7-7.21 43.774-65.189 57.122-94.329 11.056-24.133 25.519-66.368 26.579-102.895 1.6-54.241-0.39-91.363-25.391-139.548-21.983-42.302-48.252-74.105-83.692-97.231-37.676-24.578-75.419-35.219-115.246-35.174v-0.001h-0.122v0.001c-39.826-0.041-77.573 12.244-115.247 36.82-31.988 20.878-65.158 59.923-83.692 95.588-24.998 48.183-26.99 85.307-25.391 139.548 1.059 36.53 15.523 78.763 26.579 102.895 13.345 29.139 54.42 87.116 57.122 94.329 2.697 7.212 10.876 53.961 7.941 58.202-2.937 4.242-185.527 103.659-219.889 118.692-34.365 15.034-71.772 43.013-76.924 88.81-5.153 45.796 27.646 79.012 49.177 88.336 21.534 9.325 35.785 8.229 59.113 8.236 97.21 0.007 545.329 0.007 642.54 0 23.33-0.004 37.579 1.090 59.111-8.236 21.529-9.324 54.327-42.541 49.173-88.336z"
                p-id="4699"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div class="right">
            <div class="write">
              <textarea id="test" :rows="4" placeholder="请输入内容" v-model="textarea"></textarea>
            </div>
            <div class="commit">
              <el-button @click="commitComment">提交</el-button>
            </div>

            <!-- <img src="" alt=""> -->
          </div>
        </div>
        <!-- 评论列表展示 -->
        <div class="commentList">
          <div class="single" v-for="item in commentLists.slice(0,this.num)" :key="item.id">
            <img src="../../../static/pic/person.jpg" alt />
            <div class="right">
              <h1>{{item.userName}}</h1>
              <p>{{item.content}}</p>
              <span>{{item.time | dateFormat }}</span>
              <!-- <span>回复</span> -->
            </div>
          </div>
          <el-button @click="more" v-show="hasComment">加载更多</el-button>
        </div>
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
      id: this.$route.params.id,
      textarea: "",
      hasComment: false,
      singleBlog: {
        tittle: "",
        publishTime: "",
        content: ""
      },
      num: 10,
      commentLists: [
        {
          content: "",
          time: "",
          userName: "",
          id: ""
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userId: state => state.common.userId,
      userName: state => state.common.userName
    })
  },
  methods: {
    load() {
      let formData = new FormData();
      formData.append("id", this.id);

      axios
        .post("/api/text/select", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          // console.log(result)
          this.singleBlog = result.data.text;
          // console.log(this.singleBlog);
        });
    },
    commitComment() {
      if (this.userId == null || this.userName == null || this.userName=="") {
        alert("请登录！");
        return;
      }
      if (this.textarea == null || this.textarea == "") {
        alert("请输入评论内容！");
        return;
      }
      let formData = new FormData();
      formData.append("textId", this.id);
      formData.append("userId", this.userId);
      formData.append("userName", this.userName);
      formData.append("content", this.textarea);
      axios
        .post("/api/comment/insert", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
          // this.loadComment();
          // 手动拼接一个评论对象
          var cmt = {
            content: this.textarea.trim(),
            userName: this.userName.trim()
          };
          this.commentLists.unshift(cmt);
          this.textarea = "";
          alert(result.data.info);
        });
    },
    loadComment() {
      let formData = new FormData();
      formData.append("textId", this.id);
      axios
        .post("/api/comment/list", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
          this.commentLists = result.data.comment;
          // 判断是否有评论，如果没有，就不显示加载更多按钮
          if (this.commentLists.length == 0) {
            this.hasComment = false;
          } else {
            this.hasComment = true;
          }
        });
    },
    more() {
      this.num = this.num + 10;
    }
  },
  created() {
    this.load();
    this.loadComment();
  }
};
</script>

<style lang="scss" scoped>
.blog-leftwrap {
  margin-left: 9%;
  margin-right: 15px;
  width: 60%;
  border: 1px solid rgb(218, 218, 218);
  // margin: 0 15px;
  padding: 0px;
  .text {
    padding: 20px 35px;
    .top {
      h1 {
        font-size: 26px;
        margin-bottom: 25px;
        letter-spacing: 1px;
      }
      span {
        padding-right: 50px;
      }
    }
    .content {
      padding-top: 20px;
      p {
        letter-spacing: 1px;
      }
    }
    .star {
      padding-top: 50px;
      display: flex;
      justify-content: center;
      p {
        height: 40px;
        width: 160px;
        background-color: rgb(211, 58, 58);
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        color: white;
        font-size: 16px;
      }
    }
    .comment {
      .top {
        display: flex;
        .hr {
          border: 1x solid green;
          height: 3px;
          width: 85%;
          margin-left: 25px;
          background: green;
          margin-top: 30px;
        }
      }

      .comment-box {
        display: flex;
        padding-top: 28px;
        .left {
          // padding: 10px;
          width: 50px;
          height: 50px;
          background-color: rgb(173, 172, 172);
          border-radius: 99px;
          text-align: center;
          align-items: center;
          svg {
            margin-top: 5px;
          }
        }
        .right {
          margin-left: 20px;
          // border: 1px solid gray;
          width: 100%;
          textarea {
            width: 100%;
            outline: none;
            border-radius: 6px;
            padding: 15px;
            // border: none;
          }

          .commit {
            float: right;
          }
        }
      }
      .commentList {
        padding-top: 40px;
        .single {
          display: flex;
          border-bottom: 1px solid rgb(228, 224, 224);
          padding-top: 10px;
          padding-bottom: 30px;

          img {
            height: 50px;
            width: 50px;
            border-radius: 99px;
          }
          .right {
            margin-left: 20px;
            h1 {
              margin-top: 1px;
              font-weight: bold;
              font-size: 16px;
              color: rgb(61, 60, 60);
            }
            p {
              font-size: 15px;
            }
            span {
              color: gray;
            }
            // span:last-child {
            //   padding-left: 20px;
            //   color: rgb(55, 101, 170);
            // }
          }
        }
        .el-button {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>

