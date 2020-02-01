<template>
  <div class="backwrap">
    <div class="top">
      <h1>个人博客后台管理</h1>
      <!-- <i class="el-icon-s-custom"></i> -->
      <el-dropdown placement="bottom-start" trigger="click">
        <span
          aria-hidden="true"
          style="color:white; font-size: 200%;
          user-select: none;
          outline:none;
          "
        >
          <i class="el-icon-s-custom"></i>
        </span>
        <!-- <i class="el-icon-s-custom"></i> -->

        <el-dropdown-menu slot="dropdown" style="margin-right:-10px;">
          <router-link to="/first">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
      <div class="aside">
        <div class="user">
          <img src="./../../static/pic/person1.jpg" alt />
          <div class="introduce">
            <p>何岚</p>
            <p>四川轻化工大学</p>
          </div>
        </div>
        <div class="list">
          <li @click="showAccount">
            <i class="el-icon-s-custom"></i>
            <span>账号管理</span>
          </li>
          <li @click="showAdd">
            <i class="el-icon-edit"></i>
            <span>添加博客</span>
          </li>
          <li @click="showEdit">
            <i class="el-icon-edit-outline"></i>
            <span>博客管理</span>
          </li>
          <li @click="showVideo">
            <i class="el-icon-video-camera"></i>
            <span>添加视频</span>
          </li>
            <li @click="showVideoManage">
            <i class="el-icon-video-camera-solid"></i>
            <span>视频管理</span>
          </li>
          <li @click="showAlbum">
            <i class="el-icon-picture"></i>
            <span>更新相册</span>
          </li>
          <li @click="showComment">
            <i class="el-icon-chat-dot-square"></i>
            <span>留言列表</span>
          </li>
        </div>
      </div>

      <div class="main">
        <account v-show="this.showItem=='account'"></account>
        <add-blog v-show="this.showItem=='addBlog'"></add-blog>
        <edit-blog v-show="this.showItem=='editBlog'"></edit-blog>
        <add-video v-show="this.showItem=='addVideo'"></add-video>
        <video-manage v-show="this.showItem=='videoManage'"></video-manage>
        <update-album v-show="this.showItem=='updateAlbum'"></update-album>
        <comment-list v-show="this.showItem=='commentList'"></comment-list>
      </div>
    </div>
    <!-- <div class="bottom">bottom</div> -->
  </div>
</template>

<script>
import {mapGetters,mapState} from "vuex"
import Account from "./subcomponents/Back-manage/Account";
import AddBlog from "./subcomponents/Back-manage/AddBlog";
import EditBlog from "./subcomponents/Back-manage/EditBlog";
import AddVideo from "./subcomponents/Back-manage/AddVideo";
import VideoManage from "./subcomponents/Back-manage/VideoManage"
import UpdateAlbum from "./subcomponents/Back-manage/UpdateAlbum";
import CommentList from "./subcomponents/Back-manage/CommentList";
export default {
  components: {
    Account,
    AddBlog,
    EditBlog,
    AddVideo,
    VideoManage,
    UpdateAlbum,
    CommentList,
  },
  data() {
    return {
      showItem:"account",
    };
  },
  methods: {
    showAccount() {
      this.showItem = "account";
      // console.log(this.showItem);
    },
    showAdd() {
      this.showItem = "addBlog";
      // 默认设置showEdit为false，即显示添加博客页面，不现实编辑博客页面
      this.$store.commit("SET_SHOWEDIT",false);
      // console.log(this.showItem);
    },
    showEdit() {
      this.showItem = "editBlog";
      // console.log(this.showItem);
    },
    showVideo() {
      this.showItem = "addVideo";
      // console.log(this.showItem);
    },
    showVideoManage(){
      this.showItem="videoManage"
    },
    showAlbum() {
      this.showItem = "updateAlbum";
      // console.log(this.showItem);
    },
    showComment() {
      this.showItem = "commentList";
      // console.log(this.showItem);
    }
  }
};
</script>

<style lang="scss" scoped>
.backwrap {
  height: 100%;
  width: 100%;

  .top {
    // height: 15%;
    height: 60px;
    width: 100%;
    background-color: #23262e;
    display: flex;
    justify-content: space-between;
    h1 {
      margin-top: 0;
      font-size: 26px;
      line-height: 60px;
      padding-left: 40px;
      color: white;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    i {
      font-size: 34px;
      line-height: 60px;
      padding-right: 100px;
    }
  }
  .content {
    width: 100%;
    height: 750px;
    display: flex;
    .aside {
      background-color: #393d49;

      height: 750px;
      width: 18%;
      // background-color: rgb(223, 170, 170);
      .user {
        padding: 30px;
        display: flex;

        img {
          height: 70px;
          width: 70px;
          border-radius: 99px;
        }
        .introduce {
          padding-left: 20px;
          font-weight: bold;
          padding-top: 15px;
          color: white;
        }
      }
      .list {
        list-style: none;
        // padding-left: 10px;
        // padding-right: 10px;
        color: white;
        li {
          height: 40px;
          padding-left: 40px;
          i {
            font-size: 19px;
            line-height: 40px;
          }
          span {
            padding-left: 10px;
            font-size: 16px;
            line-height: 40px;
          }
        }
        li:first-child {
          background-color: rgb(29, 28, 28);
          border-left: 5px solid rgb(11, 156, 240);
        }
        li:hover {
          background-color: rgb(29, 28, 28);
          border-left: 5px solid rgb(11, 156, 240);
          cursor: pointer;
        }
      }
    }
    .main {
      overflow: hidden;
      width: 80%;
    }
  }
  .bottom {
    height: 15%;
    width: 100%;
    background-color: rgb(240, 233, 233);
  }
}
</style>