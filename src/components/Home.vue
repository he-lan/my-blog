<template>
  <div class="wrap">
    <div class="enter">
      <!-- 设置单独的背景图片图层来实现只改变背景图片的透明度不改变内容的透明度 -->
      <div class="bg"></div>
      <div class="tp-icon">
        <!-- <span
          class="glyphicon glyphicon-menu-hamburger"
          aria-hidden="true"
          style="color:white; font-size: 200%;"
        ></span> -->

        <el-dropdown style="outline:none;border:none; user-select: none;">
  <span class="glyphicon glyphicon-menu-hamburger"
          aria-hidden="true"
          style="color:white; font-size: 200%;
          user-select: none;
          ">
    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
  </span>
  <el-dropdown-menu slot="dropdown" >
    <router-link to="/first">
        <el-dropdown-item>首页</el-dropdown-item>

    </router-link>
    <router-link to="/music">
        <el-dropdown-item>爱音乐</el-dropdown-item>

    </router-link>
    <router-link to="/comment">
        <el-dropdown-item>评论</el-dropdown-item>

    </router-link>
    <router-link to="/album">
        <el-dropdown-item >相册</el-dropdown-item>

    </router-link>
    <router-link to="/about">
        <el-dropdown-item >关于我</el-dropdown-item>

    </router-link>
  </el-dropdown-menu>
</el-dropdown>



      </div>
      <div class="title">
        <h2>何岚的个人网站</h2>
        <p>Dream what you want to dream; go where you want to go;be what you want to be, because you have only one life and one chance to do all the things you want to do.</p>
        <router-link to="/first">
          <el-button type="primary">Enter Blog</el-button>
        </router-link>
      </div>
      <div class="bt-icon">
        <span
          class="glyphicon glyphicon-menu-down"
          aria-hidden="true"
          style="color:white; font-size: 200%;"
        ></span>
      </div>
    </div>
    <div class="About">
      <div class="text">
        <h1>About</h1>
        <p>也许征程的迷茫会扯碎我的手臂，可我相信未来会给我一双梦想的翅膀，虽然挫折的创伤已让我寸步难行，可我坚信光明就在远方。</p>
      </div>
      <div class="about_img">
        <div class="img">
          <el-row :gutter="20">
            <el-col :span="6" style="paddingRight:0;">
              <div class="grid-content bg-purple">
                <img src="../../static/pic/about/bw2.jpg" alt style="width:100%;height:220px;" />
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple" style="color:white;background:black;">
                <!-- <h2 style="fontSize:20px;paddingTop:35px;margin:0;">Earliest prehistory</h2> -->
                <p
                  style="padding:55px 25px;"
                >To live is to open roads in mountains and build bridges in waters. Life, you give me pressure, I also you miracle!</p>
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple">
                <img src="../../static/pic/about/bw3.jpg" alt style="width:100%;height:220px;" />
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple" style="color:white;background:black;">
                <!-- <h2 style="fontSize:20px;paddingTop:35px;margin:0;">Earliest prehistory</h2> -->
                <p
                  style="padding:55px 25px;"
                >On the road of life, never retreat from the whole body, enjoy its achievements and get something for nothing. If you don't work hard, you're out.</p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" style="paddingRight:0;">
              <div class="grid-content bg-purple" style="color:white;background:black;">
                <!-- <h2 style="fontSize:20px;paddingTop:35px;margin:0;">Earliest prehistory</h2> -->
                <p
                  style="padding:55px 25px;"
                >If it's really bitter, you don't have time to shout tired. If it's really tragic, there's no time for you to feel ashamed. Because it's not enough, you have time to complain.</p>
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple">
                <img src="../../static/pic/about/bw7.jpg" alt style="width:100%;height:220px;" />
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple" style="color:white;background:black;">
                <!-- <h2 style="fontSize:20px;paddingTop:35px;margin:0;">Earliest prehistory</h2> -->
                <p
                  style="padding:55px 25px;"
                >All good things come to an end. Choose a gesture to make your life irreplaceable. There is no so-called luck, only absolute effort.</p>
              </div>
            </el-col>
            <el-col :span="6" style="padding:0;">
              <div class="grid-content bg-purple">
                <img src="../../static/pic/about/bw9.jpg" alt style="width:100%;height:220px;" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bg2"></div>
      <div class="text">
        <router-link to="/music">
        <el-button style="            animation-name: fadeInLeft;
    animation-duration: 5s;">love music</el-button>
    </router-link>
    <router-link to="/about">
        <el-button style="            animation-name: fadeInRight;
    animation-duration: 5s;">关于 / 友链</el-button>
    </router-link>
      </div>
      <div class="introduce">
        <h3>热爱前端</h3>
        <p>看文档，视频教学，查阅资料，制作小demo</p>
      </div>
    </div>
    <div class="copyright">
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import Bottom from "@/components/subcomponents/Bottom";
export default {
  components: {
    Bottom
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vm;
}

.enter {
  //   height: 100vh;
  .tp-icon {
    position: fixed;
    right: 30px;
    top: 30px;
    border-radius: 50%;
    background-color: gray;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
     .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  }
  .bg {
    height: 100vh;
    background-image: url("../../static/pic/sybg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; //背景图片位置固定
    filter: brightness(0.4); //设置背景图片的亮度范围为（0-1）
  }
  .title {
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    color: aliceblue;
    width: 450px;
    height: 300px;
    text-align: center;
    animation-duration: 2s;
    animation-name: zoomIn;
    h2 {
      padding-bottom: 20px;
    }
    p {
      padding-bottom: 20px;
    }
  }
  .bt-icon {
    position: absolute;
    bottom: 30px;
    margin: auto;
    left: 0;
    right: 0;
    // transform:translate(-50%,-50%);  //使用了absolute，导致text-align：center失效。解决方法:配合left：50%使该div居中
    // 是图标在该div块内居中
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    animation-duration: 2s;
    animation-name: fadeInUp;
  }
  .bt-icon:hover {
    border-radius: 50%;
    background: green;
  }
}

.About {
  width: 100vw;
  height: 100vh;
  text-align: center;
  .text {
    animation-name: zoomIn;
    animation-duration: 5s;

    p {
      margin: 0 auto;
      width: 300px;
    }
  }

  .about_img {
    margin: 0 auto;
    width: 80%;
    padding-top: 50px;
    text-align: center;

    .img {
      .el-row {
        margin-bottom: 0px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        height: 220px;
        overflow: hidden;
      }
      .row-bg {
        padding: 0;
        background-color: #f9fafc;
      }
      img:hover {
        transform: scale(1.2);
        transition-duration: 2s;
      }
    }
  }
}

.bottom {
  height: 200px;
  position: absolute;
  width: 100vw;
  .bg2 {
    height: 100%;
    width: 100vw;
    background-image: url(../../static/pic/sybg1.jpg);
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.5);
    background-attachment: fixed; //背景图片位置固定
  }
  .text {
    // display: block;
    height: 200px;
    width: 100vw;
    position: absolute; //与父级的absolute对应，固定背景图上内容的位置
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      margin-right: 100px;
      background: rgba(0, 0, 0, 0);
      color: #f9fafc;
      width: 180px;
      height: 40px;
    }
    .el-button:hover {
      background: #66b1ff;
      transition: background 2s;
    }
  }
  .introduce {
    padding-top: 50px;
    width: 100vw;
    text-align: center;
    font-weight: bold;
    h3 {
      font-weight: bold;
    }
  }
}
.copyright {
  margin-top: 400px;
}
</style>