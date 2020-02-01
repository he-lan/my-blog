<template>
  <div class="commentwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="centent">
      <left></left>
      <commentMiddle></commentMiddle>
      <!-- <right></right> -->
    </div>
    <div class="bottom">
      <sub-bottom></sub-bottom>
    </div>
  </div>
</template>

<script>
import Banner from "./subcomponents/Banner";
import Left from "./subcomponents/Left";
import CommentMiddle from "./subcomponents/CommentMiddle"
// import Right from "./subcomponents/Right"
import SubBottom from "./subcomponents/SubBottom"
export default {
  components: {
    Banner,
    Left,
    CommentMiddle,
    // Right,
    SubBottom,
  }
};
</script>

<style lang="scss" scoped>
* {
  color: black;
  overflow: hidden;
}
.commentwrap {
  width: 100%;
  .banner {
    position: fixed;
    width: 100%;
    z-index: 9999;
  }
  .centent {
    display: flex;
    padding-top: 70px;
    .leftwrap {
      animation-name: fadeIn;
      animation-duration: 2s;
    }
    .comment-middlewrap{
      animation-name: fadeIn;
      animation-duration: 2s;
    }

  }
}
</style>