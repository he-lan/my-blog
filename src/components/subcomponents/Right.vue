<template>
  <div class="rightwrap">
    <div class="search">
      <!-- 如果用了封装组件的话，比如element，这个时候使用按键修饰符需要加上.native;即@key.enter.native="search" -->
      <input placeholder="请输入关键字搜索" v-model="input" @keyup.enter="searchFun" />
      <i class="el-icon-search"></i>
    </div>
    <!-- 热门文章 -->
    <div class="hot_essay">
      <div class="title">
        <div class="color">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>
        <span>热门文章</span>
      </div>
      <ul class="content">
        <li v-for="(item,index) in top10" :key="item.id">
          <span style="background-color: rgb(199, 50, 50);" v-show="index==0">1</span>
          <span style="background-color: rgb(58, 188, 228);" v-show="index==1">2</span>
          <span style="background-color:rgb(86, 224, 86);" v-show="index==2">3</span>
          <span v-show="index>=3">{{index+1}}</span>
          <router-link :to="'/blog/'+item.id" tag="a">{{item.tittle.slice(0,17)}}</router-link>
        </li>
      </ul>
    </div>

    <!-- 站长推荐 -->
    <div class="recommend">
      <div class="title">
        <div class="color">
          <div class="red"></div>
          <div class="yellow"></div>
          <div class="green"></div>
        </div>
        <span>站长推荐</span>
      </div>
      <div class="content">
        <div class="one" v-for="item in recommendBlog" :key="item.id">
          <router-link :to="'/blog/'+item.id" tag="h1">{{item.tittle.slice(0,15)}}</router-link>

          <div class="box">
            <img :src="item.coverUrl" alt />
            <p>{{item.introduce.slice(0,35)+'...'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      input: "",
      top10: [],
      recommendBlog: []
      // blogs:[],
    };
  },
  computed: {
    ...mapState({
      searchBlogs: state => state.common.searchBlogs,
      searchType: state => state.common.searchType
    })
  },
  methods: {
    loadHotBlog() {
      axios.post("/api/text/hot").then(result => {
        this.top10 = result.data.texts;
      });
    },

    loadRecommend() {
      axios.post("/api/text/recommend/list").then(result => {
        this.recommendBlog = result.data.list;
      });
    },
    searchFun() {
      let formdata = new FormData();
      formdata.append("key", this.input);
      axios
        .post("/api/text/search", formdata, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
          if (result.data.status == 1) {
            alert("找不到该文章，请重新搜索！");
            return;
          }
          this.$store.commit("SET_SEARCHBLOGS", result.data.texts);
          // 当输入框没有输入内容，或者输入为空字符串时才跳转执行分页的博客列表数据
          if (this.input == null || this.input == "") {
            this.$store.commit("SET_SEARCHTYPE", false);
          } else {
            this.$store.commit("SET_SEARCHTYPE", true);
          }
        });
    }
  },
  created() {
    this.loadHotBlog();
    this.loadRecommend();
  }
};
</script>

<style lang="scss" scoped>
.rightwrap {
  padding-bottom: 30px;
  margin-right: 8%;
  width: 20%;
  // border: 1px solid gray;
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

  .search {
    z-index: 1;
    width: 100%;
    height: 80px;
    background-color: gray;
    text-align: center;
    position: relative;
    border-radius: 6px;

    input {
      margin-top: 20px;
      width: 80%;
      height: 40px;
      border-radius: 40px;
      padding: 0 20px;
      border: transparent;
      outline: none; //input输入框点击时有边框
    }
    i {
      font-size: 18px;
      position: absolute;
      height: 50px;
      right: 45px;
      top: 32px;
      font-weight: bold;
    }
  }

  // 热门文章
  .hot_essay {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgb(199, 194, 194);
    border-radius: 6px;
    .content {
      padding: 12px 0 10px 15px;
      width: 100%;
      list-style-type: none;
      li {
        padding-top: 10px;
        display: flex;
        span {
          // margin-left: 30px;
          height: 20px;
          width: 20px;
          display: block;
          // border-radius: 100px;
          background-color: rgb(218, 213, 213);
          text-align: center;
        }
        a {
          color: black;

          padding-left: 10px;
        }
      }
    }
  }

  // 站长推荐
  .recommend {
    margin-top: 10px;
    width: 100%;
    border: 1px solid rgb(199, 194, 194);
    border-radius: 6px;
    .content {
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      .one,
      .two,
      .three {
        h1 {
          font-size: 14px;
          font-weight: bold;
        }
        .box {
          display: flex;
          img {
            height: 80px;
            // width: 100px;
            width: 38%;
          }
          p {
            width: 62%;
            padding-left: 10px;
            color: rgb(85, 83, 83);
          }
        }
      }
    }
  }
}
</style>