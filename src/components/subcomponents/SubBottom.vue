<template>
  <div class="subbottomwrap">
    <div class="top-box">
      <div class="icon">
        <i class="el-icon-s-home"></i>
      </div>
      <div class="icon">
        <i class="el-icon-s-opportunity"></i>
      </div>
      <div class="icon">
        <i class="el-icon-date"></i>
      </div>
      <div class="icon">
        <i class="el-icon-question"></i>
      </div>

    </div>
    <div class="text">
        <p>Copyright © 2019-2020 何岚 All Rights Reserved V.1.0.0 蜀ICP备18008600号</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss"  scoped>
.subbottomwrap {
  margin-top: 3px;
  height: 100px;
  width: 100%;
  background-color: rgb(233, 233, 233);
  .top-box {
      padding-top: 13px;
    display: flex;
    justify-content: center;
    width: 100%;
    .icon {
        margin-left: 20px;
      height: 28px;
      width: 28px;
      border-radius: 20px;
      background-color: darkgray;
      text-align: center;
      i {
        line-height: 28px;
        vertical-align: middle;
        color: rgb(236, 235, 235);
        font-size: 20px;
      }
    }
  }
  .text{
      width: 100%;
      text-align: center;
      margin-top: 10px;
      p{
          color: rgb(39, 33, 33);
          font-size: 13px;
          padding-top: 5px;
      }
  }
}
</style>