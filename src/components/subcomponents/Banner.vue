<template>
  <div class="bannerwrap">
    <div class="logo">
      <router-link to="/" tag="p">helan</router-link>
      <!-- <p></p> -->
    </div>
    <ul>
      <li>
        <router-link to="/first" tag="p">首页</router-link>
      </li>

      <li>
        <router-link to="/music" tag="p">爱音乐</router-link>
      </li>
      <li>
        <router-link to="/album" tag="p">相册</router-link>
      </li>
      <li>
        <router-link to="/comment" tag="p">留言</router-link>
      </li>
      <li>
        <!-- <p>关于我</p> -->
        <router-link to="/about" tag="p">关于我</router-link>
      </li>

      <li>
        <!-- <p>关于我</p> -->
        <router-link to="/back" tag="p" v-if="manager=='root'">后台管理</router-link>
      </li>
    </ul>
    <div class="login">
      <router-link to="/user" tag="p">
        <!-- <i class="el-icon-s-custom"></i>
        <span>{{this.userName}}</span>-->
        <div v-if="this.userName==null || this.userName==''">
        <i class="el-icon-s-custom"></i>
        </div>
        <!-- <span>{{this.userName}}</span> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <span style="color:white;line-height:50px;font-size:20px;">{{this.userName}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <router-link to="/personal">
              <el-dropdown-item>管理</el-dropdown-item>
            </router-link>-->
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      manager: window.sessionStorage.getItem("userName")
    };
  },
  computed: {
    ...mapState({
      userName: state => state.common.userName
    })
  },
  created() {
    console.log(this.manager);
  },
  methods: {
    loginOut() {
      sessionStorage.setItem("userName", "");
      sessionStorage.setItem("userId", "");
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("role", "");
      this.$store.commit("SET_USERNAME", "");
      this.$store.commit("SET_USERID", "");
      this.$store.commit("SET_TOKEN", "");
      this.$store.commit("SET_ROLE", "");
      location.reload(); //执行浏览器刷新
      console.log(this.userName);
      console.log("ok");
    }
  }
};
</script>

<style lang="scss" scoped>
.bannerwrap {
  height: 100%;
  width: 100%;
  background-color: rgb(12, 12, 26);
  display: flex;
  color: white;
  .logo {
    margin-left: 10%;
    p {
      font-size: 24px;
      line-height: 40px;
      font-family: "Times New Roman", Times, serif;
    }
    p:hover {
      cursor: pointer;
      color: rgb(12, 180, 124);
    }
  }

  ul {
    width: 80%;
    height: 40px;
    list-style-type: none;
    display: flex;
    margin-left: 10%;
    // justify-content: center;

    li {
      margin-right: 100px;
      p {
        font-size: 18px;
        line-height: 45px;
      }
    }
    li:hover {
      cursor: pointer;
      border-bottom: 2px solid white;
    }
  }
  .login {
    position: absolute;
    margin-left: 90%;
    i {
      font-size: 30px;
      line-height: 50px;
    }
  }
}
</style>