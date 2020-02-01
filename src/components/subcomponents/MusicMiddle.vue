<template>
  <div class="music-middlewrap">
    <div class="wrap" v-for="item in videos " :key="item.id">
      <div class="box">
        <div class="img">
          <img :src="item.coverUrl" alt />
          <i class="el-icon-caret-right" @click="enter(item)"></i>
        </div>
        <div class="detail">
          <div class="title" @click="enter(item)">
            <i class="el-icon-paperclip"></i>
            <p>{{item.tittle}}</p>
          </div>

          <h2>{{item.tittle}} — {{item.singerName}}</h2>
          <h3>何岚 发布于 {{item.publishTime | dateFormat}}</h3>
          <div class="icon">
            <i class="el-icon-star-on" @click="clickStarfun" v-show="clickStar==false"></i>
            <i
              class="el-icon-star-on"
              v-bind:style="styleObject"
              v-show="clickStar==true"
              @click="clickStar=false"
            ></i>
            <span>{{item.starCount}}</span>
          </div>
        </div>
      </div>
      <div class="alertbg" v-if="showBig">
        <div id="m">
          <div class="close" @click=" close ">X</div>
          <p>观看完整视频</p>
          <video id="video" width="90%" height="400" controls>
            <source :src="itemData.videoUrl" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-button @click="lastpagefun" id="lb" style="display:none;">上一页</el-button>
      <el-button @click="nextpagefun" id="rb" style="display:none;">下一页</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showBig: false,
      clickStar: false,
      page: 1,
      iclass: "el-icon-star-on",
      iclickclass: "start-click",
      styleObject: {
        color: "red"
        // fontSize: '13px'
      },
      videos: [],
      itemData: {},
      lastPage: 0,
      firstPage: 0
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      axios.post("/api/video/list").then(result => {
        this.videos = result.data.rows;
        this.lastPage = result.data.lastPage;
        this.firstPage = result.data.firstPage;
        console.log(result.data.rows);
        var lbutton = document.getElementById("lb");
        lbutton.style.display = "block";
        var rbutton = document.getElementById("rb");
        rbutton.style.display = "block";
      });
    },
    lastpagefun() {
      if (this.page == 1) {
        return;
      }
      var page = this.page - 1;
      axios.post("/api/video/list?page=" + page).then(result => {
        // console.log(result.data);
        this.videos = result.data.rows;
        this.$nextTick(() => {
          document.documentElement.scrollTop = 0;
        });
      });
      this.page -= 1;
      console.log(this.page);
    },
    nextpagefun() {
      if (this.page >= this.lastPage) {
        return;
      }
      var page = this.page + 1;
      axios.post("/api/video/list?page=" + page).then(result => {
        // console.log(result.data);
        this.videos = result.data.rows;
        this.$nextTick(() => {
          document.documentElement.scrollTop = 0;
        });
      });
      this.page += 1;
      // console.log(this.page);
    },
    enter(item) {
      console.log(item);
      this.itemData = item;
      console.log(this.itemData, this.itemData.tittle, this.itemData);
      this.showBig = true;
    },
    close() {
      this.showBig = false;
      var myvideo = document.getElementById("video");
      myvideo.pause(); //关闭音乐
      console.log("关闭");
    },
    clickStarfun() {
      //  var mystar= document.getElementById("star");
      //  mystar.style.color = "red"
      this.clickStar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.music-middlewrap {
  width: 45%;
  border: 1px solid rgb(218, 218, 218);
  margin: 0 15px;
  padding: 0px;

  .wrap {
    //   filter: blur(2px);
    .box {
      // height: 152px;
      height: 142px;
      overflow: hidden;
      margin: 15px 15px;
      display: flex;
      border: 1px solid rgb(228, 223, 223);
      .img {
        height: 150px;
        width: 200px;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          z-index: 1;
          vertical-align: middle;
        }
        i {
          // height: 70px;
          // width: 70px;
          // z-index: 100;
          position: absolute;
          top: 50%;
          left: 50%;
          color: rgb(245, 245, 245);
          font-size: 70px;
          transform: translate(-50%, -50%);
        }
      }
      .img:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      .detail {
        padding-left: 25px;
        .title {
          display: flex;
          padding-top: 10px;
          i {
            line-height: 20px;
            font-weight: bold;
            color: rgb(110, 107, 107);
          }
          p {
            padding-left: 6px;
            font-size: 16px;
            font-weight: bolder;
          }
        }
        .title:hover {
          cursor: pointer;
          p {
            color: rgb(197, 77, 77);
          }
        }

        h2 {
          margin: 4px;
          font-size: 14px;
          color: rgb(139, 137, 137);
        }
        h3 {
          margin-left: 4px;
          font-size: 14px;
          color: rgb(68, 65, 65);
        }
        .icon {
          margin-left: 4px;

          color: rgb(85, 83, 83);

          .el-icon-star-on {
            font-size: 22px;
            // color: green;
          }

          .el-icon-star-on:hover {
            cursor: pointer;
            color: rgb(219, 58, 58);
          }
          .start-click {
            color: rgb(219, 58, 58);
          }

          span {
            // color: green;
            font-size: 12px;
          }
        }
      }
    }

    .alertbg {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(rgb(0, 0, 0), 0.4);
      background-size: cover;
      z-index: 10000; //banner的z-index较大，否则不能给banner设置透明度

      #m {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -235px; /*设为高度的1/2*/
        margin-left: -325px;
        animation-name: bounceInDown;
        animation-duration: 1s;
        z-index: 99;
        height: 470px;
        width: 650px;
        // background-color: rgba(255, 255, 255, 0.7);
        background-color: #fff;
        // vertical-align: middle;

        .close {
          position: relative;
          // margin-top: -27px;
          margin-top: 5px;
          color: rgb(29, 28, 28);
          font-size: 20px;
          // margin-top: 8px; //video默认有个padding-top，若该关闭的位置与video的padding重叠，则关闭按钮的click事件会出现问题
          right: 30px;
          opacity: 1;
          text-align: center;
          border-radius: 99px;
          height: 35px;
          width: 65px;
          line-height: 35px;
          border: 1px solid transparent;
          color: white;
          background-color: rgb(74, 76, 77);
        }

        p {
          padding-top: 45px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          margin: 0 auto;
          justify-content: center;
        }

        video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          outline: none;
          padding: 0;
          margin-top: 10px;
          // background-color: red;

          source {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: space-around;
  }
}
</style>

