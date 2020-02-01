<template>
  <div class="copyright">
    <div class="left">
      <h1>Newsletter</h1>
      <input type="text" class="email" placeholder="Email" />
      <input type="submit" class="submit" value="Subscribe" />
    </div>
    <div class="right">
      <h1>Follow Us</h1>
      <div class="icon">
        <i class="el-icon-user-solid"></i>
      </div>
      <div class="icon">
        <i class="el-icon-question"></i>
      </div>
      <div class="icon">
        <i class="el-icon-s-promotion"></i>
      </div>
      <div class="icon">
        <i class="el-icon-s-home"></i>
      </div>
      <div class="icon">
        <i class="el-icon-s-opportunity"></i>
      </div>
      <div class="icon">
        <i class="el-icon-date"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.copyright {
  display: flex;
  width: 100vw;
  background-color: black;
  margin-top: 60px;
  height: 200px;
  color: white;
  .left {
    width: 50%;
    padding-left: 12%;
    h1 {
      font-size: 26px;
      font-weight: 500;
    }
    .email {
      display: block;
      background-color: black;
      color: white;
      outline: none; //点击input时变为只显示border-bottom的样式
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid rgb(214, 213, 213);
      width: 400px;
      height: 35px;
    }
    .submit {
      margin-top: 20px;
      padding: 10px 15px;
    }
  }
  .right {
    // background-color: red;
    width: 50%;
    text-align: right;
    padding-right: 12%;
    h1 {
      font-size: 26px;
      font-weight: 500;
    }
    .icon {
      display: inline;
      // border-radius: 6p;
      // background-color: #fff;
      i {
        padding-top: 20px;
        padding-left: 20px;
        font-size: 25px;
      }
    }
  }
}
</style>