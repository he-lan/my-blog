<template>
  <div class="firstwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="centent">
      <left></left>
      <middle></middle>
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
import Middle from "./subcomponents/Middle";
import Right from "./subcomponents/Right"
import SubBottom from "./subcomponents/SubBottom"
export default {
  components: {
    Banner,
    Left,
    Middle,
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
.firstwrap {
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
    // .middlewrap{
    //    animation-name: bounceInUp;
    //   animation-duration: 1s;
    // }

  }
}
</style>