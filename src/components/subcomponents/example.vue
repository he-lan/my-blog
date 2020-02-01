<template>
  <div class="comment-middlewrap">
    <div class="top">
      <div class="tittle">
        <h1>留言板</h1>
        <span>沟通交流，拉近你我</span>
      </div>
      <div class="comment-box">
        <!-- <i class="el-icon-user"></i> -->
        <div class="left">
          <svg
            t="1574333343052"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4698"
            width="40"
            height="40"
          >
            <path
              d="M951.306 811.97c-5.153-45.795-43.343-72.571-76.926-88.81-33.583-16.235-216.953-114.45-219.889-118.692-2.934-4.242 5.243-50.991 7.941-58.202 2.7-7.21 43.774-65.189 57.122-94.329 11.056-24.133 25.519-66.368 26.579-102.895 1.6-54.241-0.39-91.363-25.391-139.548-21.983-42.302-48.252-74.105-83.692-97.231-37.676-24.578-75.419-35.219-115.246-35.174v-0.001h-0.122v0.001c-39.826-0.041-77.573 12.244-115.247 36.82-31.988 20.878-65.158 59.923-83.692 95.588-24.998 48.183-26.99 85.307-25.391 139.548 1.059 36.53 15.523 78.763 26.579 102.895 13.345 29.139 54.42 87.116 57.122 94.329 2.697 7.212 10.876 53.961 7.941 58.202-2.937 4.242-185.527 103.659-219.889 118.692-34.365 15.034-71.772 43.013-76.924 88.81-5.153 45.796 27.646 79.012 49.177 88.336 21.534 9.325 35.785 8.229 59.113 8.236 97.21 0.007 545.329 0.007 642.54 0 23.33-0.004 37.579 1.090 59.111-8.236 21.529-9.324 54.327-42.541 49.173-88.336z"
              p-id="4699"
              fill="#ffffff"
            />
          </svg>
        </div>
        <div class="right">
          <div class="write">
            <textarea id="test" :rows="4" placeholder="请输入内容" v-model="textarea"></textarea>
          </div>
          <div class="commit">
            <svg
              t="1574333294986"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4535"
              width="29"
              height="29"
              @click="showemoji"
            >
              <path
                d="M511.997414 49.131313C256.518465 49.131313 48.614141 257.035636 48.614141 512.514586 48.614141 768 256.518465 975.904323 511.997414 975.904323 767.482828 975.904323 975.387152 768 975.387152 512.514586 975.387152 257.035636 767.482828 49.131313 511.997414 49.131313L511.997414 49.131313zM511.997414 923.050667c-226.313051 0-410.529616-184.115717-410.529616-410.536081 0-226.313051 184.115717-410.529616 410.529616-410.529616 226.318222 0 410.536081 184.115717 410.536081 410.529616C922.533495 738.831515 738.315636 923.050667 511.997414 923.050667L511.997414 923.050667zM521.826263 685.558949c-72.40404 0.830061-137.879273-29.680485-183.802828-78.811798l-40.338101 34.029899c55.752404 60.712081 136.014869 98.469495 224.655515 97.536 83.475394-0.930909 158.672162-35.889131 212.560162-91.641535L696.835879 610.262626C652.462545 656.08404 590.50796 684.838788 521.826263 685.558949L521.826263 685.558949zM636.017778 395.737212c0-28.85301 23.373576-52.231758 52.231758-52.231758s52.236929 23.378747 52.236929 52.231758c0 28.858182-23.378747 52.236929-52.236929 52.236929S636.017778 424.595394 636.017778 395.737212L636.017778 395.737212zM283.619556 395.737212c0-28.85301 23.373576-52.231758 52.231758-52.231758 28.858182 0 52.233051 23.378747 52.233051 52.231758 0 28.858182-23.374869 52.236929-52.233051 52.236929C306.993131 447.974141 283.619556 424.595394 283.619556 395.737212L283.619556 395.737212zM283.619556 395.737212"
                p-id="4536"
                fill="#1296db"
              />
            </svg>
            <div class="box">
              <div class="emoji-content" v-show="showEmoji==true" @click="showEmoji=false">
                <ul class="emoji">
                  <li
                    v-for="item in this.emoji"
                    :key="item.alt"
                    :title="item.alt"
                    @click="addEmoji(item)"
                  >
                    <img :alt="item.alt" :src="item.src" />
                  </li>
                </ul>
              </div>
            </div>
            <el-button>提交</el-button>
          </div>

          <!-- <img src="" alt=""> -->
        </div>
      </div>
    </div>

    <!-- 评论列表展示 -->
    <div class="commentList">
      <div class="single" v-for="item in 5" :key="item">
        <img src="../../../static/pic/comment头像.jpg" alt />
        <div class="right">
          <h1>何岚</h1>
          <p>hahaha哈哈哈哈哈哈哈哈哈，评论内容</p>
          <span>2019-11-18 09:13:29</span> 
          <!-- <span>回复</span> -->

          
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
// 引入vue含表情评论回复组件
// import comment from 'hbl-comment'

export default {
  data() {
    return {
      textarea: "",
      showEmoji: false,
      emoji: [
        {
          alt: "[微笑]",
          src: "https://www.yanshisan.cn/layui/images/face/0.gif"
        },
        {
          alt: "[嘻嘻]",
          src: "https://www.yanshisan.cn/layui/images/face/1.gif"
        },
        {
          alt: "[哈哈]",
          src: "https://www.yanshisan.cn/layui/images/face/2.gif"
        },
        {
          alt: "[可爱]",
          src: "https://www.yanshisan.cn/layui/images/face/3.gif"
        },
        {
          alt: "[可怜]",
          src: "https://www.yanshisan.cn/layui/images/face/4.gif"
        },
        {
          alt: "[挖鼻]",
          src: "https://www.yanshisan.cn/layui/images/face/5.gif"
        },
        {
          alt: "[吃惊]",
          src: "https://www.yanshisan.cn/layui/images/face/6.gif"
        },
        {
          alt: "[害羞]",
          src: "https://www.yanshisan.cn/layui/images/face/7.gif"
        },
        {
          alt: "[挤眼]",
          src: "https://www.yanshisan.cn/layui/images/face/8.gif"
        },
        {
          alt: "[闭嘴]",
          src: "https://www.yanshisan.cn/layui/images/face/9.gif"
        },
        {
          alt: "[鄙视]",
          src: "https://www.yanshisan.cn/layui/images/face/10.gif"
        },
        {
          alt: "[爱你]",
          src: "https://www.yanshisan.cn/layui/images/face/11.gif"
        },
        {
          alt: "[泪]",
          src: "https://www.yanshisan.cn/layui/images/face/12.gif"
        },
        {
          alt: "[偷笑]",
          src: "https://www.yanshisan.cn/layui/images/face/13.gif"
        },
        {
          alt: "[亲亲]",
          src: "https://www.yanshisan.cn/layui/images/face/14.gif"
        },
        {
          alt: "[生病]",
          src: "https://www.yanshisan.cn/layui/images/face/15.gif"
        },
        {
          alt: "[太开心]",
          src: "https://www.yanshisan.cn/layui/images/face/16.gif"
        },
        {
          alt: "[白眼]",
          src: "https://www.yanshisan.cn/layui/images/face/17.gif"
        },
        {
          alt: "[右哼哼]",
          src: "https://www.yanshisan.cn/layui/images/face/18.gif"
        },
        {
          alt: "[左哼哼]",
          src: "https://www.yanshisan.cn/layui/images/face/19.gif"
        },
        {
          alt: "[嘘]",
          src: "https://www.yanshisan.cn/layui/images/face/20.gif"
        },
        {
          alt: "[衰]",
          src: "https://www.yanshisan.cn/layui/images/face/21.gif"
        },
        {
          alt: "[委屈]",
          src: "https://www.yanshisan.cn/layui/images/face/22.gif"
        },
        {
          alt: "[吐]",
          src: "https://www.yanshisan.cn/layui/images/face/23.gif"
        },
        {
          alt: "[哈欠]",
          src: "https://www.yanshisan.cn/layui/images/face/24.gif"
        },
        {
          alt: "[抱抱]",
          src: "https://www.yanshisan.cn/layui/images/face/25.gif"
        },
        {
          alt: "[怒]",
          src: "https://www.yanshisan.cn/layui/images/face/26.gif"
        },
        {
          alt: "[疑问]",
          src: "https://www.yanshisan.cn/layui/images/face/27.gif"
        },
        {
          alt: "[馋嘴]",
          src: "https://www.yanshisan.cn/layui/images/face/28.gif"
        },
        {
          alt: "[拜拜]",
          src: "https://www.yanshisan.cn/layui/images/face/29.gif"
        },
        {
          alt: "[思考]",
          src: "https://www.yanshisan.cn/layui/images/face/30.gif"
        },
        {
          alt: "[汗]",
          src: "https://www.yanshisan.cn/layui/images/face/31.gif"
        },
        {
          alt: "[困]",
          src: "https://www.yanshisan.cn/layui/images/face/32.gif"
        },
        {
          alt: "[睡]",
          src: "https://www.yanshisan.cn/layui/images/face/33.gif"
        },
        {
          alt: "[钱]",
          src: "https://www.yanshisan.cn/layui/images/face/34.gif"
        },
        {
          alt: "[失望]",
          src: "https://www.yanshisan.cn/layui/images/face/35.gif"
        },
        {
          alt: "[酷]",
          src: "https://www.yanshisan.cn/layui/images/face/36.gif"
        },
        {
          alt: "[色]",
          src: "https://www.yanshisan.cn/layui/images/face/37.gif"
        },
        {
          alt: "[哼]",
          src: "https://www.yanshisan.cn/layui/images/face/38.gif"
        },
        {
          alt: "[鼓掌]",
          src: "https://www.yanshisan.cn/layui/images/face/39.gif"
        },
        {
          alt: "[晕]",
          src: "https://www.yanshisan.cn/layui/images/face/40.gif"
        },
        {
          alt: "[悲伤]",
          src: "https://www.yanshisan.cn/layui/images/face/41.gif"
        },
        {
          alt: "[抓狂]",
          src: "https://www.yanshisan.cn/layui/images/face/42.gif"
        },
        {
          alt: "[黑线]",
          src: "https://www.yanshisan.cn/layui/images/face/43.gif"
        },
        {
          alt: "[阴险]",
          src: "https://www.yanshisan.cn/layui/images/face/44.gif"
        },
        {
          alt: "[怒骂]",
          src: "https://www.yanshisan.cn/layui/images/face/45.gif"
        },
        {
          alt: "[互粉]",
          src: "https://www.yanshisan.cn/layui/images/face/46.gif"
        },
        {
          alt: "[心]",
          src: "https://www.yanshisan.cn/layui/images/face/47.gif"
        },
        {
          alt: "[伤心]",
          src: "https://www.yanshisan.cn/layui/images/face/48.gif"
        },
        {
          alt: "[猪头]",
          src: "https://www.yanshisan.cn/layui/images/face/49.gif"
        },
        {
          alt: "[熊猫]",
          src: "https://www.yanshisan.cn/layui/images/face/50.gif"
        },
        {
          alt: "[兔子]",
          src: "https://www.yanshisan.cn/layui/images/face/51.gif"
        },
        {
          alt: "[ok]",
          src: "https://www.yanshisan.cn/layui/images/face/52.gif"
        },
        {
          alt: "[耶]",
          src: "https://www.yanshisan.cn/layui/images/face/53.gif"
        },
        {
          alt: "[good]",
          src: "https://www.yanshisan.cn/layui/images/face/54.gif"
        },
        {
          alt: "[NO]",
          src: "https://www.yanshisan.cn/layui/images/face/55.gif"
        },
        {
          alt: "[赞]",
          src: "https://www.yanshisan.cn/layui/images/face/56.gif"
        },
        {
          alt: "[来]",
          src: "https://www.yanshisan.cn/layui/images/face/57.gif"
        },
        {
          alt: "[弱]",
          src: "https://www.yanshisan.cn/layui/images/face/58.gif"
        },
        {
          alt: "[草泥马]",
          src: "https://www.yanshisan.cn/layui/images/face/59.gif"
        },
        {
          alt: "[神马]",
          src: "https://www.yanshisan.cn/layui/images/face/60.gif"
        },
        {
          alt: "[囧]",
          src: "https://www.yanshisan.cn/layui/images/face/61.gif"
        },
        {
          alt: "[浮云]",
          src: "https://www.yanshisan.cn/layui/images/face/62.gif"
        },
        {
          alt: "[给力]",
          src: "https://www.yanshisan.cn/layui/images/face/63.gif"
        },
        {
          alt: "[围观]",
          src: "https://www.yanshisan.cn/layui/images/face/64.gif"
        },
        {
          alt: "[威武]",
          src: "https://www.yanshisan.cn/layui/images/face/65.gif"
        },
        {
          alt: "[奥特曼]",
          src: "https://www.yanshisan.cn/layui/images/face/66.gif"
        },
        {
          alt: "[礼物]",
          src: "https://www.yanshisan.cn/layui/images/face/67.gif"
        },
        {
          alt: "[钟]",
          src: "https://www.yanshisan.cn/layui/images/face/68.gif"
        },
        {
          alt: "[话筒]",
          src: "https://www.yanshisan.cn/layui/images/face/69.gif"
        },
        {
          alt: "[蜡烛]",
          src: "https://www.yanshisan.cn/layui/images/face/70.gif"
        },
        {
          alt: "[蛋糕]",
          src: "https://www.yanshisan.cn/layui/images/face/71.gif"
        }
      ]
    };
  },
  methods: {
    showemoji() {
      this.showEmoji = !this.showEmoji;
    },
    addEmoji: function(item) {
      // this.textarea+=title;
      // document.getElementById("test").innerHTML+="<img :alt='"+item.alt+"' :src='"+item.src+"' />";
      // console.log(document.getElementById("test").innerHTML);
      // eval("<img :alt='"+item.alt+"' :src='"+item.src+"' />")
      // document.getElementById("test").appendChild(eval("<img :alt='"+item.alt+"' :src='"+item.src+"' />"))

      this.textarea += item.alt;
      this.showEmoji = !this.showEmoji;

      // 编译表情替换成图片展示出来
      //   var pattern1=/\[[\u4e00-\u9fa5]+\]/g;
      //   var pattern2=/\[[\u4e00-\u9fa5]+\]/;
      //   var content=item.match(pattern1);
      //   var str=item;
      //   if(content){
      //     for(var i=0;i<content.length;i++){
      //       for(var j=0;j<this.emoji.length;j++){
      //         if("["+this.emoji[j].title+"]"==content[i]){
      //           var src=this.emoji[j].src;
      //           break;
      //         }
      //       }

      //       str=str.replace(pattern1,'<img src="src" />')
      //     }
      //     console.log(str);
      //   }
      //         return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-middlewrap {
  width: 65%;
  border: 1px solid rgb(218, 218, 218);
  margin: 0 15px;
  padding: 20px 50px;
  .top {
    .tittle {
      text-align: center;

      color: rgb(71, 69, 69);
      h1 {
        font-size: 26px;
        font-weight: bold;
        // font-size: 30px;
      }
      span {
        font-weight: bold;
        font-size: 20px;
      }
    }
    .comment-box {
      display: flex;
      padding-top: 18px;
      .left {
        // padding: 10px;
        width: 50px;
        height: 50px;
        background-color: rgb(173, 172, 172);
        border-radius: 99px;
        text-align: center;
        align-items: center;
        svg {
          margin-top: 5px;
        }
      }
      .right {
        margin-left: 20px;
        // border: 1px solid gray;
        width: 100%;
        textarea {
          width: 100%;
          outline: none;
          border-radius: 6px;
          padding: 15px;
          // border: none;
        }

    
          .commit {
            display: flex;

            justify-content: space-between;
            position: relative;
            .emoji-content {
              position: absolute;
              line-height: 22px;
              font-size: 12px;
              top: 30px;
              left: 20px;
              border: 1px solid #d9d9d9;
              background-color: #fff;
              .emoji {
                position: relative;
                width: 384px;
                padding: 10px;
                height: 100%;
                //   border: 1px solid #d9d9d9;
                //   background-color:#d9d9d9;
                //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                //   display: flex;
                list-style-type: none;

                li {
                  padding: 4px;
                  //   display: flex;
                  float: left;
              }
            }
          }
        }
      }
    }
  }

  // 评论列表
  .commentList {
    padding-top: 40px;
    .single {
      display: flex;
      border-bottom: 1px solid rgb(228, 224, 224);
      padding-top: 10px;
      padding-bottom: 30px;

      img {
        height: 50px;
        width: 50px;
        border-radius: 99px;
      }
      .right {
        margin-left: 20px;
        h1 {
          margin-top: 1px;
          font-weight: bold;
          font-size: 16px;
          color: rgb(61, 60, 60);
        }
        p {
          font-size: 15px;
        }
        span{
                    color: gray;

        }
        // span:last-child {
        //   padding-left: 20px;
        //   color: rgb(55, 101, 170);
        // }
      }
    }
  }
}
</style>