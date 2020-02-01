<template>
  <div class="album-middlewrap">
    <div class="container">
      <!-- <div class="list" > -->
      <div class="single" v-for="(item ,index) in img.slice(0,this.moreImg)" :key="index" @click="showbg(item,index)">
        <img :src="item.imageUrl" alt class="photo-container" />
        <div class="slide">
          <div class="slide-text">
          <p>{{item.tittle}}</p>
          <span>{{item.introduce}}</span>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div class="more">
        <el-button  @click="more" id="bt" style="display:none;">加载更多</el-button>
      </div>
    </div>
    <div class="bgcontainer" v-show="showbig==true" @click="showbig=false">
      <div class="left" @click.stop="pre">
        <span><</span>
      </div>
      <div class="center">
        <img :src="singleimg.imageUrl" alt />
      </div>
      <div class="right" @click.stop="next">
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      img: [
        {
          imageUrl: "../../../static/pic/头像.jpg",
          tittle: "分享我的个人1博客访问量如何做到IP从10到2000的",
          introduce: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      showbig: false,
      singleimg: {},
      singleimgIndex: 0,
      moreImg:15,
    };
  },
  created() {
    console.log("ok");

    this.loadImg();
  },
  methods: {
    more(){

      // this.img=this.img.slice(0,this.moreImg);
      //             console.log(this.img)
      this.moreImg=this.moreImg+9;

    },
    loadImg() {
      console.log("ok");
      axios.post("/api/album/list").then(result => {
        this.img = result.data;
        var btM=document.getElementById("bt");
        btM.style.display="block";
        // this.img=this.img.slice(0,15);
        // console.log(this.img);
      });
    },
    showbg(item, index) {
      this.singleimg.imageUrl = item.imageUrl;
      this.singleimgIndex = index;
      this.showbig = true;
    },
    pre() {
      if (this.singleimgIndex == 0) return;
      this.singleimgIndex--;
      this.singleimg = this.img[this.singleimgIndex];
    },
    next() {
      if (this.singleimgIndex >= this.img.length - 1) return;
      this.singleimgIndex++;
      this.singleimg = this.img[this.singleimgIndex];
    }
  }
};
</script>

<style lang="scss" scoped>
.album-middlewrap {
  user-select: none; //去除掉点击文字出现蓝色底色（放大图片点击按钮左右切换时出现蓝色底色）
  width: 45%;
  border: 1px solid rgb(218, 218, 218);
  margin: 0 15px;
  padding: 0px;

  .container {
    width: 100%;
    padding: 2rem;

    text-align: center;

    .single {
      animation-duration: 1s;
      animation-name: fadeInLeft;
      animation-fill-mode: both; //animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。both:向前和向后填充模式都被应用。
      //  margin: 0 auto;
      position: relative;
      width: 32%;
      margin-right: 8px;
      margin-bottom: 6px;
      color: #fff;
      min-height: 200px;
      float: left;
      img {
        height: 100%;
        width: 100%;
        background: #0f0523 50% 50% / cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-transition: 1s;
        transition: 1s;
        -webkit-transform-origin: bottom right;
        transform-origin: bottom right;
      }
      img:before {
        background: -webkit-linear-gradient(
          transparent,
          rgba(67, 17, 51, 0.5),
          #000320
        );
        background: linear-gradient(
          transparent,
          rgba(67, 17, 51, 0.5),
          #000320
        );
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }
    .more{
      .el-button{
        width: 100%;
              margin-top: 20px;

        margin-left: -10px;
      }
    }
    .slide {
      background: rgba(25, 1, 21, 0.8);
      padding: 0 1.5rem;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: all 0.275s ease-in-out, visibility 0s 0.275s;
      visibility: hidden;
      will-change: transform;
      display: flex;
      justify-content: center;
      align-items: center;
      .slide-text{
      p {
        font-size: 16px;
      }
      span {
        font-size: 14px;
      }
      }
    }

    .single:hover .slide {
      transform: none;
      visibility: visible;
      -webkit-transition-delay: 0s;
      transition-delay: 0s;
      cursor: pointer;
    }
  }
}
.bgcontainer {
  z-index: 11111;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(31, 30, 30, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    // width: 80px;
    font-size: 70px;
    font-family: "宋体";
    color: white;
    height: 80px;
    width: 80px;
    border-radius: 99px;
    // float:left;
    line-height: 80px;
    text-align: center;
  }
  .left:hover,
  .right:hover {
    background-color: rgb(129, 135, 145);
  }

  .right {
    // width: 80px;
    font-size: 70px;
    float: right;
    font-family: "宋体";
    color: white;
    height: 80px;
    width: 80px;
    border-radius: 99px;
    text-align: center;
    line-height: 80px;
  }
  .center {
    width: 85%;
    justify-content: center;
    img {
      width: 85%;
      height: auto;
      text-align: center;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      min-width: 800px;
      max-width: 1000px;
    }
  }
}
</style>

