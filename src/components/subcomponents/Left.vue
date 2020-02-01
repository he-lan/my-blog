<template>
  <div class="leftwrap">
    <!-- 统计信息 -->
    <div class="info">
      <div class="title">
        <div class="color">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>
        <span>统计信息</span>
      </div>
      <ul>
        <li>
          <i class="el-icon-s-data"></i>
          博客数量 : {{this.textNumber}}
        </li>
        <li>
          <i class="el-icon-star-on"></i>
          星星数量 : {{this.starNumber}}
        </li>
        <li>
          <i class="el-icon-s-comment"></i>评论数量 : {{this.commentNumber}}
        </li>
        <li>
          <i class="el-icon-message-solid"></i>留言数量 : {{this.messageListNumber}}
        </li>
        <li>
          <i class="el-icon-video-camera-solid"></i>音乐数量 : {{this.videoNumber}}
        </li>
        <li>
          <i class="el-icon-picture"></i>照片数量 : {{this.albumNumber}}
        </li>
      </ul>
    </div>
    <!-- 博主简介 -->
    <div class="introduce">
      <div class="title">
        <div class="color">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>
        <span>博主简介</span>
      </div>
      <div class="content">
        <img src="../../../static/pic/person1.jpg" alt />
        <ul>
          <li>姓名：何岚</li>
          <li>性别：女</li>
          <li>个人微信：18990737494</li>
          <li>职业：web前端设计师</li>
          <li>毕业院校：四川轻化工大学</li>
        </ul>
      </div>
    </div>
    <!-- 我的相册 -->
    <div class="picture">
      <div class="title">
        <div class="color">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>

        <span>我的相册</span>
      </div>
      <div class="content">
        <div class="one">
          <li v-for="item in oneImg" :key="item.id">
            <img :src="item.imageUrl" alt />
          </li>
        </div>
        <div class="two">
          <li v-for="item in twoImg" :key="item.id">
            <img :src="item.imageUrl" alt />
          </li>
        </div>
        <div class="three">
          <li v-for="item in threeImg" :key="item.id">
            <img :src="item.imageUrl" alt />
          </li>
        </div>
        <div class="four">
          <li v-for="item in fourImg" :key="item.id">
            <img :src="item.imageUrl" alt />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      album: [],
      oneImg: [],
      twoImg: [],
      threeImg: [],
      fourImg: [],
      textNumber: 0,
      starNumber: 0,
      videoNumber:0,
      albumNumber:0,
      commentNumber:0,
      messageListNumber:0,
    };
  },
  created() {
    this.loadAlbum();
    this.textNum();
  },
  methods: {
    loadAlbum() {
      axios.post("/api/album/list").then(result => {
        this.album = result.data;
        this.oneImg = this.album.slice(0, 3);
        this.twoImg = this.album.slice(3, 6);
        this.threeImg = this.album.slice(6, 9);
        this.fourImg = this.album.slice(9, 12);

        // console.log(result);
      });
    },
    textNum() {
      axios.post("/api/count/msg").then(result => {
        console.log(result);
        this.starNumber = result.data.starCount;
        this.textNumber = result.data.textCount;
        this.videoNumber=result.data.videoCount;
        this.albumNumber=result.data.albumCount;
        this.commentNumber=result.data.commentCount;
        this.messageListNumber=result.data.messageListCount;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.leftwrap {
  margin-left: 8%;
  width: 20%;
  .title {
    padding-left: 15px;
    display: flex;
    border-bottom: 1px solid rgb(224, 219, 219);

    .color {
      align-items: center;
      display: flex;

      .red {
        height: 12px;
        width: 12px;
        border-radius: 100px;
        background-color: red;
      }
      .yellow {
        margin: 0 5px;
        height: 12px;
        width: 12px;
        border-radius: 100px;
        background-color: rgb(151, 151, 39);
      }
      .green {
        height: 12px;
        width: 12px;
        border-radius: 100px;
        background-color: rgb(18, 112, 18);
      }
    }
    span {
      line-height: 40px;
      padding-left: 15px;
      font-size: 18px;
      font-weight: 400;
    }
  }
  //   统计信息
  .info {
    width: 100%;
    border: 1px solid rgb(199, 194, 194);
    border-radius: 6px;

    ul {
      list-style: none;
      padding-left: 15px;
      li {
        padding-top: 10px;
        font-weight: bold;
        font-size: 14px;

        i {
          padding-right: 10px;
          color: rgb(88, 88, 88);
        }
      }
    }
  }
  // 博主简介
  .introduce {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgb(199, 194, 194);
    border-radius: 6px;
    .content {
      padding: 15px 0 10px;
      width: 100%;
      text-align: center;

      img {
        height: 70px;
        width: 70px;
        border-radius: 100px;
      }
      ul {
        text-align: left;
        list-style-type: none;
        padding: 8px 15px 0 15px;
        font-size: 14px;
        font-weight: bold;
        li {
          padding: 4px 0;
          margin-top: 5px;
          border: 1px solidrgb(233, 231, 231);
          border-radius: 6px;
          background-color: rgb(243, 243, 243);
        }
      }
    }
  }
  .picture {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgb(199, 194, 194);
    border-radius: 6px;
    .content {
      padding: 15px 0;
      width: 100%;
      .one,
      .two,
      .three,
      .four {
        display: flex;
        list-style-type: none;
        padding: 0 15px;
        li {
          margin: 2px;
          width: 87px;
          height: 87px;
          overflow: hidden;

          img {
            height: 100%;
            width: 100%;
          }
          img:hover {
            // overflow: hidden;
            transform: scale(1.2);
            transition-duration: 2s;
          }
        }
      }
    }
  }
}
</style>