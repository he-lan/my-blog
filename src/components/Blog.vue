<template>
  <div class="blogwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="content">
      <!-- <left></left> -->
      <blog-left></blog-left>
      <right></right>
    </div>
        <div class="bottom">
      <sub-bottom></sub-bottom>
    </div>
  </div>
</template>

<script>
import Banner from "./subcomponents/Banner";
// import Left from "./subcomponents/Left";
import Right from "./subcomponents/Right";
import BlogLeft from "./subcomponents/BlogLeft"
import SubBottom from "./subcomponents/SubBottom"
export default {
  components: {
    Banner,
    // Left,
    Right,
    BlogLeft,
    SubBottom,
  },

};
</script>

<style lang="scss" scoped>
.blogwrap {
  width: 100%;
  height: 100%;
  .banner {
    position: fixed;
    width: 100%;
    z-index: 9999;
  }
  .content {
    display: flex;
    padding-top: 70px;
    .leftwrap,
    .music-middlewrap,
    .rightwrap {
      animation-name: bounceInUp;
      animation-duration: 1s;
    }
  }
}
</style>