<template>
  <div>
    <div class="about-middlewrap">
      <div class="about-wrap">
        <div class="top">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <img src="../../../static/pic/about/about5.jpg" alt />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>当蜘蛛网无情地查封了我的炉台，当灰烬的余烟叹息着贫困的悲哀，我依然固执地铺平失望的灰烬，用美丽的雪花写下：相信未来。</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <img src="../../../static/pic/about/about2.jpg" alt />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>当我的紫葡萄化为深秋的露水目之阳。最是那一低头的温柔，恰似水莲花不胜凉风的娇羞。</p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>我之所以坚定地相信未来，是我相信未来人们的眼睛--她有拨开历史风尘的睫毛，她有看透岁月篇章的瞳孔</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <img src="../../../static/pic/about/about3.jpg" alt />
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>那一年南国之南，你如灼目之阳。最是那一低头的温柔，恰似水莲花不胜凉风的娇羞</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <img src="../../../static/pic//about//about4.jpg" alt />
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 博主简介 -->
        <div class="personal">
          <div class="title">
            <h2>博主简介</h2>
            <p>何岚，来自四川轻化工大学(原四川理工学院)，2016级计算机科学与技术专业的90后学生。热爱前端编程，并且一直在校潜心研究web前端技术，一边学习一边积累经验，制作个人博客，以及优化改进等心得。</p>
          </div>
          <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <p>姓名：何岚</p>
                <p>职业：学生</p>
                <p>学校：四川轻化工大学</p>
                <p>专业：计算机科学与技术</p>
                <p>邮箱：1451098517@qq.com</p>
                <p>个人微信：</p>
                <img
                  src="../../../static/pic/about/erwei.png"
                  alt="我的微信二维码"
                  style="height:150px;width:150px;margin-left:10px;"
                />
              </el-tab-pane>
              <el-tab-pane label="工作技能" name="second">
                <p style="font-weight:bold;">工作技能：</p>
                <p>&nbsp;&nbsp;1.web前端页面的开发</p>
                <p>&nbsp;&nbsp;2.熟悉使用HTML, CSS, JAVASCRIPT</p>
                <p>&nbsp;&nbsp;3.了解jQuery</p>
                <p>&nbsp;&nbsp;4.了解VUE,并用它写了个人博客</p>
                <p>&nbsp;&nbsp;5.element,mui等，并在个人博客中使用了他们的组件</p>
                <p>&nbsp;&nbsp;6.了解c++，Java等一些基础知识</p>
              </el-tab-pane>
              <el-tab-pane label="心路历程" name="third">
                <p style="font-weight:bold;">心路历程</p>
                <p>【大三以前按部就班的学习，上课，没有思考自己未来究竟要做什么】</p>
                <p>【大三下学期，伴随着课程减少，自己可支配时间越来越多，开始自己学习。从大学学过的专业课程开始复习了一些重要知识点】</p>
                <p>【持续迷茫，看到做网上漂亮的网页，开始尝试跟着一起做，同时再次学习HTML，CSS，JS等】</p>
                <p>【大三暑假确定自己想做前端的目标，投了简历，想去实习，最终决定留在学校自学。开始在网上找项目跟着做】</p>
                <p>【大四开始着手写一个自己的vue项目——个人博客】</p>
                <p>【前端的知识就像是一个万维网，包罗万象，未来还需要坚持学习】</p>
              </el-tab-pane>
              <el-tab-pane label="友情链接" name="four">
                <p style="font-weight:bold;">友情链接</p>
                <a href="http://simple.yangqq.com/">
                  <p>【杨青个人模板】</p>
                </a>
                <a href="https://www.nbclass.com/">
                  <p>【智博客】</p>
                </a>
                 <a href="https://www.wenyuanblog.com/">
                  <p>【码农本纪】</p>
                </a>
                 <a href="https://yoyoteacher.cn/">
                  <p>【优店代码】</p>
                </a>
                 <a href="https://yoyoteacher.cn/">
                  <p>【厌世而谋生】</p>
                </a>
                 <a href="https://www.yxxxm.com/">
                  <p>【分享新鲜科技与IT技术】</p>
                </a>
                 <a href="https://www.hankin.cn/">
                  <p>【唤醒-hankin】</p>
                </a>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped >
.about-middlewrap {
  animation-name: fadeInUp;
  animation-duration: 1s;
  .about-wrap {
    // background-color: rgb(223, 217, 217);

    width: 75%;
    padding: 0 20px;
    margin: 0 auto;

    .top {
      // padding-top: 82px;
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
        overflow: hidden;
        img {
          height: 160px;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
        }
        img:hover {
          transform: scale(1.2);
          transition-duration: 2s;
          cursor: pointer;
        }
        p {
          text-align: center;
          padding: 30px;
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
        border-radius: 4px;
        min-height: 160px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    }
    .personal {
      margin-top: 50px;
      display: block;
      // margin-left: 250px;
      // margin-right: 250px;
      .title {
        h2 {
          color: rgb(80, 79, 79);
          font-size: 24px;
        }
        p {
          padding-top: 10px;
          font-size: 17px;
          color: rgb(48, 47, 47);
        }
      }
      .content {
        // 重写element tabs的样式，去掉style中的scoped
        .el-tabs__item {
          font-size: 18px;
          margin-top: 20px;
        }

        .el-tabs__nav-wrap::after {
          // tabs导航栏下的横线宽度
          height: 5px;
        }
        .el-tabs__active-bar {
          // tabs导航栏点击时横线的宽度以及颜色
          height: 5px;
          background-color: #409eff;
        }
        p {
          color: rgb(75, 74, 74);
        }
      }
    }
  }
}
</style>