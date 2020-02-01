<template>
  <div class="musicwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="content">
      <left></left>
      <music-middle></music-middle>
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
import Right from "./subcomponents/Right";
import MusicMiddle from "./subcomponents/MusicMiddle"
import SubBottom from "./subcomponents/SubBottom"
export default {
  components: {
    Banner,
    Left,
    Right,
    MusicMiddle,
    SubBottom,
  }
};
</script>

<style lang="scss" scoped>
.musicwrap {
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
    // .music-middlewrap,
    .rightwrap {
      animation-name: bounceInUp;
      animation-duration: 1s;
    }
  }
}
</style>