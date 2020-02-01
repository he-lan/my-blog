<template>
  <div class="comment-middlewrap">
    <div class="top">
      <div class="tittle">
        <h1>留言板</h1>
        <span>沟通交流，拉近你我</span>
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
            <el-button @click="commit">提交</el-button>
          </div>

          <!-- <img src="" alt=""> -->
        </div>
      </div>
    </div>

    <!-- 评论列表展示 -->
    <div class="commentList">
      <div class="single" v-for="item in messageList.slice(0,this.num)" :key="item.id">
        <img src="../../../static/pic/person.jpg" alt />
        <div class="right">
          <h1>{{item.userName}}</h1>
          <p>{{item.message}}</p>
          <span>{{item.time | dateFormat}}</span>
          <!-- <span>回复</span> -->
        </div>
      </div>
      <el-button @click="more">加载更多</el-button>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
// 引入vue含表情评论回复组件
// import comment from 'hbl-comment'
import { mapGetters, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      textarea: "",
      showEmoji: false,
      num:10,
      messageList:[
        {
        message:"",
        time:"",
        userName:"",
        id:"",
        }
      ],
    };
  },
  computed: {
    ...mapState({
      userId: state => state.common.userId,
      userName: state => state.common.userName
    })
  },
  created(){
    this.loadMessage();
  },
  methods: {
    more(){
      this.num+=6;
    },
    commit() {
      // console.log(sessionStorage.getItem("userId"));
      // console.log(sessionStorage.getItem("userName"));
      // console.log(this.textarea);
      if(this.userId==null || this.userName==null ||this.userName==""){
        alert("请登录！")
        return;
      }
      if(this.textarea==null || this.textarea==""){
        alert("请输入评论内容！");
        return;
      }
      let formData = new FormData();
      console.log(this.userId);
      formData.append("userId", this.userId);
      formData.append("userName", this.userName);
      formData.append("message", this.textarea);
      axios
        .post("/api/messageList/insert", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);

             var msg={message:this.textarea.trim(),userName:this.userName};
        this.messageList.unshift(msg);
        this.textarea="";
        });
    },
    showemoji() {
      this.showEmoji = !this.showEmoji;
    },
    addEmoji: function(item) {
      this.textarea += item.alt;
      this.showEmoji = !this.showEmoji;
    },
    loadMessage(){
      axios.post("/api/messageList/list").then(result=>{
        this.messageList=result.data.comment;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-middlewrap {
  width: 65%;
  border: 1px solid rgb(218, 218, 218);
  margin: 0 15px;
  padding: 20px 50px;
  .top {
    .tittle {
      text-align: center;

      color: rgb(71, 69, 69);
      h1 {
        font-size: 26px;
        font-weight: bold;
        // font-size: 30px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
      }
    }
    .comment-box {
      display: flex;
      padding-top: 18px;
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
  }

  // 评论列表
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
    .el-button{
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>