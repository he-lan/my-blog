<template>
  <div class="Albumtwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="centent">
      <left></left>
      <!-- <commentMiddle></commentMiddle> -->
      <album-middle></album-middle>
      <right></right>
    </div>
    <div class="bottom">
      <sub-bottom></sub-bottom>
    </div>
  </div>
</template>

<script>
import Banner from "./subcomponents/Banner";
import Left from "./subcomponents/Left";
// import CommentMiddle from "./subcomponents/CommentMiddle"
import Right from "./subcomponents/Right"
import SubBottom from "./subcomponents/SubBottom"
import AlbumMiddle from "./subcomponents/AlbumMiddle"
export default {
  components: {
    Banner,
    Left,
    AlbumMiddle,
    Right,
    SubBottom,
  }
};
</script>

<style lang="scss" scoped>
* {
  color: black;
  overflow: hidden;
}
.Albumtwrap {
  width: 100%;
  .banner {
    position: fixed;
    width: 100%;
    z-index: 9999;
  }
  .centent {
    display: flex;
    padding-top: 70px;
    .leftwrap, .rightwrap {
      animation-name: bounceInUp;
      animation-duration: 1s;
    }

  }
}
</style>