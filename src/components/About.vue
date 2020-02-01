<template>
  <div class="firstwrap">
    <div class="banner">
      <banner></banner>
    </div>
    <div class="centent">
      <about-middle></about-middle>
    </div>
    <div class="bottom">
      <sub-bottom></sub-bottom>
    </div>
  </div>
</template>

<script>
import Banner from "./subcomponents/Banner";
import SubBottom from "./subcomponents/SubBottom"
import AboutMiddle from "./subcomponents/AboutMiddle"
export default {
  components: {
    Banner,
    SubBottom,
    AboutMiddle
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
    .about-middlewrap {
      animation-name: bounceInUp;
      animation-duration: 1s;
    }

  }
}
</style>