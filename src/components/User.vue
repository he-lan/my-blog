<template>
  <div class="userwrap">
    <div class="banner">
      <!-- <banner></banner> -->
    </div>
    <div class="centent">
        <login></login>
    </div>
    <div class="bottom">
      <!-- <sub-bottom></sub-bottom> -->
    </div>
  </div>
</template>

<script>
import Banner from "./subcomponents/Banner";
import SubBottom from "./subcomponents/SubBottom";
import Login from "./subcomponents/Login"
export default {
  components: {
    Banner,
    SubBottom,
    Login,
  },
  data() {
    return {
    
    };
  }
};
</script>

<style lang="scss" scoped>
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
  
  }
}
</style>