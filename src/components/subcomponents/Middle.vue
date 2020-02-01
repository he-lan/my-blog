<template>
  <div class="middlewrap">
    <div class="blogs" >
      <!-- 头部推荐文章 -->
      <div class="top">
        <div class="left" v-for="item in topBlog" :key="item.id">
          <div class="img">
            <img :src="item.coverUrl" alt />
          </div>
          <div class="text">
            <router-link :to="'/blog/'+item.id" tag="a">{{item.tittle.slice(0,12)+'...'}}</router-link>
            <p>{{item.introduce.slice(0,44)+'...'}}</p>
          </div>
        </div>
      </div>

      <!-- 博客列表 -->
      <div class="blog_list" v-if="searchType==false">
        <div v-for="item in blogs" :key="item.id">
          <div class="blog">
            <div class="tittle">
              <span>博客日记</span>
              <router-link :to="'/blog/'+item.id" tag="p">{{item.tittle}}</router-link>
            </div>
            <div class="content">
              <img :src="item.coverUrl" alt />
              <div class="text">
                <p>{{item.introduce+'...'}}</p>
              </div>
            </div>
            <div class="more">
              <div class="time">
                <i class="el-icon-time"></i>
                <p>{{item.publishTime|dateFormat}}</p>
              </div>
              <div class="star">
                <i class="el-icon-star-off"></i>
                <p>星星数量({{item.starCount}})</p>
              </div>
              <div class="readmore">
                <router-link :to="'/blog/'+item.id" tag="p">阅读更多>></router-link>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <!-- 搜索的博客列表 -->
      <div class="blog_list" v-if="searchType==true">
        <div v-for="item in searchBlogs" :key="item.id">
          <div class="blog">
            <div class="tittle">
              <span>博客日记</span>
              <router-link :to="'/blog/'+item.id" tag="p">{{item.tittle}}</router-link>
            </div>
            <div class="content">
              <img :src="item.coverUrl" alt />
              <div class="text">
                <p>{{item.introduce}}</p>
              </div>
            </div>
            <div class="more">
              <div class="time">
                <i class="el-icon-time"></i>
                <p>{{item.publishTime|dateFormat}}</p>
              </div>
              <div class="star">
                <i class="el-icon-star-off"></i>
                <p>星星数量({{item.starCount}})</p>
              </div>
              <div class="readmore">
                <router-link :to="'/blog/'+item.id" tag="p">阅读更多>></router-link>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <el-button @click="lastpagefun" id="lb" style="display:none;">上一页</el-button>
        <el-button @click="nextpagefun" id="rb" style="display:none;">下一页</el-button>
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
      blogs: [],
      page: 1,
      lastPage: 0,
      firstPage: 0,
      topBlog: [],
      searchItems: []
    };
  },
  computed: {
    ...mapState({
      searchType: state => state.common.searchType,
      searchBlogs: state => state.common.searchBlogs
    }),
    getorderid() {
      return this.$store.state.search;
    }
  },


  methods: {
    lastpagefun() {
      if (this.page == 1) {
        return;
      }
      var page = this.page - 1;
      axios.post("/api/text/list?page=" + page).then(result => {
        this.blogs = result.data.rows;
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
      axios.post("/api/text/list?page=" + page).then(result => {
        this.blogs = result.data.rows;
         this.$nextTick(() => {
          //  documentElement 属性以一个元素对象返回一个文档的文档元素,
          // scrollTop:获取匹配的元素集合中第一个元素的当前垂直滚动条的位置或设置每个匹配元素的垂直滚动条位置。
              document.documentElement.scrollTop = 0;
            });
      });
      this.page += 1;
    },
    loadBlog() {
      // 设置首次加载该页面时都执行分页的数据列表，避免执行搜索，跳转页面之后还是显示搜索的数据页面
      this.$store.commit("SET_SEARCHTYPE", false);
      axios.post("/api/text/list").then(result => {
        this.blogs = result.data.rows;
        console.log(this.blogs);
        this.lastPage = result.data.lastPage;
        this.firstPage = result.data.firstPage;
       var lbutton= document.getElementById("lb");
       lbutton.style.display="block";
       var rbutton=document.getElementById("rb");
       rbutton.style.display="block";
      });
    },
    loadTop() {
      axios.post("/api/text/top/list").then(result => {
        this.topBlog = result.data.list;
      });
    }
  },

  created() {
    this.loadTop();
    this.loadBlog();
    window.scrollTo(0,0)
  }
};
</script>

<style lang="scss" scoped>
.middlewrap {
  width: 45%;
  border: 1px solid rgb(218, 218, 218);
  margin: 0 15px;
  padding: 10px;
  // overflow: hidden;
  .blogs {
    // width: 105%; //宽度比父元素多，从而达到隐藏效果
    // height: 1200px;
    // overflow-x: hidden;
    // overflow-y: scroll;

    .top {
      display: flex;
      justify-content: center;

      .left {
        width:33%;
        // height: 150px;
        animation-duration: 1s;
        animation-name: fadeInLeft;
        animation-fill-mode: both; //animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见。both:向前和向后填充模式都被应用。
        box-shadow: 1px 1px 2px rgb(185, 184, 184);
        padding: 0 2px;
        .img {
          height: 150px;
          // width: 210px;
          // height: 100%;
          width: 100%;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
          img:hover {
            transform: scale(1.2);
            transition: all ease 2s;
          }
        }
        .text {
          width: 210px;
          padding: 0 10px;
          overflow: hidden;
          a {
            display: block;
            padding: 10px 0;
            font-size: 14px;
            font-weight: bold;
            text-decoration: none;
          }
          a:hover {
            cursor: pointer;
          }
          p {
            font-size: 12px;
            color: gray;
          }
        }
      }
      .left:nth-child(1) {
        animation-delay: 1.5s;
      }
      .left:nth-child(2) {
        animation-delay: 1s;
      }
      .left:nth-child(3) {
        animation-delay: 0.5s;
        //             animation-duration: 2s;
        // animation-name: fadeInLeft;
      }
    }

    // 博客列表
    .blog_list {
      padding-top: 10px;
      .blog {
        margin-bottom: 10px;
        position: relative;
        //   padding-bottom: 20px;
        border-bottom: 1px solid gray;
        .tittle {
          display: flex;
          span {
            height: 32px;
            background-color: darkgreen;
            padding: 5px 20px;
            color: white;
            border-radius: 2px;
            font-weight: bold;
            position: relative;
          }
          // span后面的小三角形
          span::after {
            width: 0;
            height: 0;
            border: 15px solid;
            content: "";
            border-color: transparent transparent transparent darkgreen;
            margin: 0;
            padding: 0;
            position: absolute;
            right: -30px;
            top: 0.8px;
          }
          p {
            position: relative;
            margin-left: 30px;
            line-height: 32px;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .tittle:hover {
          cursor: pointer;
        }
        .content {
          padding: 0 1px;
          display: flex;
          img {
            height: 80px;
            // width: 130px;
            width: 18%;
          }
          .text {
            width: 82%;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 10px;
            p {
              color: rgb(99, 98, 98);
            }
          }
        }
        .more {
          padding-top: 5px;
          display: flex;
          color: rgb(99, 98, 98);
          .time,
          .star {
            height: 20px;
            display: flex;
            justify-content: center;
            padding-left: 10px;

            i {
              line-height: 20px;
            }
            p {
              padding-left: 10px;
              line-height: 20px;
              padding-right: 30px;
            }
          }
          .readmore {
            position: absolute;
            right: 20px;
            color: darkcyan;
          }
          .readmore:hover {
            cursor: pointer;
          }
        }
      }
      .blog:hover .line {
        width: 100% !important;
      }
      .line {
        margin-top: 10px;
        padding-top: 1px;
        width: 0;
        height: 2px;
        background: green;
        transition: all 3s ease;
      }
    }

    .pagination {
      display: flex;
      justify-content: space-around;
      margin-bottom: 3px;
      position: relative;
        .el-button {
      bottom: 5px;
      // position: absolute;
          }
    }
  }
}
</style>