<template>
  <div class="Accountwrap">
    <h1>用户中心</h1>
    <div class="user">
      <img src="../../../../static/pic/person1.jpg" alt />
      <div class="info">
        <p>用户账号：何岚</p>
        <p>注册时间：2019-11-29</p>
      </div>
    </div>
    <div class="modify">
      <h1>修改密码</h1>
      <div class="one">
        <span>旧&nbsp;&nbsp;密&nbsp;&nbsp;码&nbsp;:</span>
        <el-input v-model="oldpass" placeholder="请输入旧密码"></el-input>
      </div>
      <div class="two">
        <span>新&nbsp;&nbsp;密&nbsp;&nbsp;码&nbsp;:</span>
        <el-input v-model="newpass" placeholder="请输入新密码"></el-input>
      </div>
      <div class="three">
        <span>确认密码&nbsp;:</span>
        <el-input v-model="newpass1" placeholder="请输入旧密码"></el-input>
      </div>

      <el-button type="primary" @click="commit">确认</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      oldpass: "",
      newpass: "",
      newpass1: ""
    };
  },
  computed: {
    ...mapState({
      userName: state => state.common.userName,
    })
  },
  methods: {
    commit() {
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
          console.log(result);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.Accountwrap {
  height: 100%;
  width: 100%;
  padding: 20px;
  h1 {
    margin: 0;
    font-size: 20px;
    border-left: 4px solid rgb(53, 124, 218);
    padding-left: 7px;
  }
  .user {
    margin-top: 20px;
    border-top: 1px solid rgb(228, 221, 221);
    padding-top: 20px;
    display: flex;
    padding-left: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(228, 221, 221);
    img {
      height: 100px;
      width: 100px;
      border-radius: 14px;
    }
    .info {
      padding-left: 30px;

      p {
        line-height: 50px;
      }
    }
  }
  .modify {
    margin-top: 20px;
    padding-top: 20px;
    .one,
    .two,
    .three {
      display: flex;
      padding-top: 30px;
      padding-left: 150px;
      span {
        padding-top: 6px;
        font-size: 18px;
        width: 100px;
        color: rgb(88, 86, 86);
      }
      .el-input {
        width: 400px;
      }
    }
    .el-button {
      width: 80px;
      margin-top: 30px;
      margin-left: 570px;
    }
  }
}
</style>