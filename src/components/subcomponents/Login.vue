<template>
  <div class="Login-wrap">
    <div class="banner_img">
      <div class="login">
        <div class="lg" v-show="login">
          <div class="title">
            <h1>用户登录</h1>
          </div>
          <div class="content" style="padding-top:50px;">
            <div class="user">
              <p>用户名：</p>
              <el-input v-model="username" placeholder="用户名" minlength="2" maxlength="6"></el-input>
            </div>
            <div class="password">
              <p>密&nbsp;&nbsp;&nbsp;&nbsp;码:</p>
              <el-input
                v-model="password"
                placeholder="密码长度:6~16"
                minlength="8"
                maxlength="16"
                type="password"
              ></el-input>
            </div>
            <div class="logining">
              <el-button type="primary" @click="getLogin">登录</el-button>
              <div class="register">
                <span>还没有账号？</span>
                <a href @click.prevent="loginToRegister">立即注册</a>
              </div>
              <a href @click.prevent="modify">修改密码</a>
            </div>
          </div>
        </div>
        <div class="mg" v-show="register">
          <div class="title">
            <h1>用户注册</h1>
          </div>
          <div class="content">
            <el-button
              icon="el-icon-back"
              round
              style="margin:-42px;margin-top:-65px;position:absolute;width:60px;rgba(255,255,255,0.5);"
              @click.prevent="(login=true) &&(register=false) "
            ></el-button>
            <div class="user">
              <p>用户名：</p>
              <el-input v-model="username" placeholder="用户名" minlength="2" maxlength="6"></el-input>
            </div>
            <div class="password">
              <p>密&nbsp;&nbsp;&nbsp;&nbsp;码:</p>
              <el-input
                v-model="password"
                placeholder="输入密码"
                type="password"
                minlength="8"
                maxlength="16"
              ></el-input>
            </div>
            <div class="confirm-password">
              <p>确认密码:</p>
              <el-input
                v-model="confirmPassword"
                placeholder="确认密码"
                type="password"
                minlength="8"
                maxlength="16"
              ></el-input>
            </div>
            <div class="logining" style="padding-top:30px;">
              <el-button type="primary" @click="getRegister">注册</el-button>
            </div>
          </div>
        </div>
        <div class="rg" v-show="passWordPage">
          <div class="title">
            <h1>修改密码</h1>
          </div>
          <div class="content">
            <el-button
              icon="el-icon-back"
              round
              style="margin:-42px;margin-top:-65px;position:absolute;width:60px;rgba(255,255,255,0.5);"
              @click.prevent="(login=true)&& (passWordPage=false) "
            ></el-button>
            <div class="user">
              <p>旧&nbsp;密&nbsp;码</p>
              <el-input v-model="oldpass" placeholder="请输入旧密码"></el-input>
            </div>
            <div class="password">
              <p>新&nbsp;密&nbsp;码:</p>
              <el-input v-model="newpass" placeholder="输入密码" type="password" maxlength="16"></el-input>
            </div>
            <div class="confirm-password">
              <p>确认密码:</p>
              <el-input v-model="newpass1" placeholder="确认密码" type="password" maxlength="16"></el-input>
            </div>
            <div class="logining" style="padding-top:30px;">
              <el-button type="primary" @click="modifyPassword">修改密码</el-button>
            </div>
          </div>
        </div>
        <!-- <div>
          <component :is="comName" :comName="comName"></component>
          <logining v-show="'flag==true'"></logining>
          <register v-show="'flag==false'"></register>
        </div>-->
      </div>
      <div class="lunbotu">
        <!-- 轮播图距离该div的顶部和左边距离 -->
        <el-carousel style="height:200px;width:600px;top:280px;left:200px;">
          <el-carousel-item v-for="item in lunbo_items" :key="item.id">
            <h3 class="small" style="color:white;font-size:24px;">{{ item.info }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      userName: state => state.common.userName
    })
  },
  data() {
    return {
      login: true,
      register: false,
      passWordPage: false,
      oldpass: "",
      newpass: "",
      newpass1: "",
      username: null,
      password: null,
      confirmPassword: null,
      lunbo_items: [
        {
          id: 0,
          info:
            "Remember what should be remembered,and forget what should be forgotten.After what is changeable,and accept what is mutable."
        },
        {
          id: 1,
          info:
            "Apart from tears,only time could wear every away.While feeling is being processed by time,conflicts would be reconciled as time goes by,just like a cup of tea that is being continuously diluted."
        },
        {
          id: 2,
          info:
            "Complaints are the greatest offerings that God obtains from human beings,as well as the most faithful prayers human being might utter to God."
        },
        {
          id: 3,
          info:
            "Only till my natural death could i tell which of what i have been doing is right or wrong,so now i have to try todo well in everything,and then waut to die a natural death."
        }
      ]
    };
  },
  methods: {
    modify() {
      this.passWordPage = true;
      this.login = false;
      this.register = false;
    },
    loginToRegister() {
      this.register = true;
      this.login = false;
      this.passWordPage = false;
    },
    getLogin() {
      var vm = this;
      let formData = new FormData();
      formData.append("name", this.username);
      formData.append("password", this.password);
      axios
        .post("/api/user/login", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          console.log(result);
          if (result.data.status == 0) {
            sessionStorage.setItem("userName", result.data.name);
            sessionStorage.setItem("token", result.data.taken);
            sessionStorage.setItem("userId", result.data.id);
            console.log(sessionStorage.getItem("userName"));
            this.$store.commit("SET_USERNAME", result.data.name);
            this.$store.commit("SET_TOKEN", result.data.taken);
            this.$store.commit("SET_USERID", result.data.id);
            this.$store.commit("SET_ROLE", result.data.role);
            this.$router.go(-1);
          } else {
            alert("输入错误，请重试！");
          }
        });
    },
    getRegister() {
      if (this.password.length < 6) {
        alert("密码太短了");
      }
      if (this.password.length > 16) {
        alert("密码太长了");
      }
      if (
        this.password == null ||
        this.confirmPassword == null ||
        this.username == null
      ) {
        alert("请正确填写信息");
        return;
      } else if (this.password != this.confirmPassword) {
        alert("输入密码不相同,请重新输入");
      } else {
        let formData = new FormData();
        formData.append("name", this.username);
        formData.append("password", this.password);
        axios
          .post("/api/user/register", formData, {
            "Content-Type": "multipart/form-data"
          })
          .then(result => {
            console.log(result);
            // 注册成功之后调用登录方法，才能将username等信息保存到vuex
            if (result.data.status == 0) {
              this.getLogin();
            }
            this.$router.go(-1);
          });
      }
    },
    modifyPassword() {
      if (this.newpass != this.newpass1) {
        alert("两次输入新密码不一致,请重新输入");
        return;
      }
      let formData = new FormData();
      formData.append("name", this.userName);
      formData.append("oldPassword", this.oldpass);
      formData.append("newPassword", this.newpass);
      axios
        .post("/api/user/password", formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(result => {
          alert(result.data.info);
          // console.log(result);
          this.$router.go(-1);
        });
    }
  }
};
</script>

<style lang="scss"  >
.Login-wrap {
  overflow-x: hidden;
  // height: 100vh;
  width: 100vw;
  .banner_img {
    // margin-top: 20px;
    .lunbotu {
      // padding-top: 200px;
      width: 100%;
      height: 100vh;
      background: linear-gradient(
          rgba(255, 255, 255, 0) 0%,
          rgba(39, 39, 39, 0.1) 40%,
          rgb(255, 255, 255) 99%
        ),
        url("../../../static/pic/sybg1.jpg") no-repeat center;
      // background:url("../../../static/pic/sybg1.jpg") no-repeat center;

      // opacity: 0.6;
      background-size: cover;
      .el-carousel__item .h3 {
        // opacity: 0.75;
        line-height: 150px;
        margin: 0;
      }
      .el-carousel__container {
        height: 200px;
        width: 500px;
      }
      // .el-carousel .el-carousel--horizontal{
      //   padding: 200px 100px;
      // }
      // 设置去掉左右箭头
      .el-carousel__arrow {
        display: none;
        // opacity: 0;  可以隐藏箭头，但是还是会触发click事件
      }
      // .el-carousel__item:nth-child(2n) {
      //    background-color: #99a9bf;
      // }

      // .el-carousel__item:nth-child(2n+1) {
      //    background-color: #d3dce6;
      // }
    }
    .login {
      height: 400px;
      width: 500px;
      margin-top: 130px;
      // background-color: rgba(255, 255, 255,0.6);

      margin-right: 200px;
      float: right;
      .title {
        // background-color: rgba(1, 21, 46, 1);
        background-color: rgb(12, 12, 26);

        height: 50px;
        text-align: center;
        color: white;
        animation-duration: 1s;
        // animation-name: bounceInDown;
        animation-name: fadeInDown;

        h1 {
          font-size: 30px;
          line-height: 40px;
        }
      }
      .content {
        animation-duration: 2s;
        animation-name: bounceInRight;
        height: 400px;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 80px 50px;
        p {
          width: 100px;
          // line-height: 20px;
          // padding-top: 3px;
          font-size: 18px;
        }
        .user {
          // padding:40px 30px;
          display: flex;
          .el-input {
            width: 250px;
          }
        }
        .password {
          padding-top: 40px;
          display: flex;
          .el-input {
            width: 250px;
          }
        }
        .confirm-password {
          padding-top: 40px;
          display: flex;
          .el-input {
            width: 250px;
          }
        }
        .logining {
          padding-top: 60px;
          padding-left: 100px;
          .el-button {
            width: 250px;
          }
          .register {
            padding-top: 20px;
            padding-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>