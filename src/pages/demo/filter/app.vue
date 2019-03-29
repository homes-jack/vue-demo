<template>
  <div class="filter_css">
    <div class="filter_demo demo1"></div>
    <div class="filter_demo demo2">
      <div class="yuan small"></div>
      <div class="yuan middle"></div>
    </div>
    <div class="filter_demo demo3">
      <div class="img">
        <p :style="{'mix-blend-mode':mix_blend_mode}">SHOW滤镜效果</p>
        <img src="../../../assets/img/Tulips.jpg"
          alt="">
      </div>
      <el-select v-model="mix_blend_mode"
        placeholder="请选择">
        <el-option v-for="item in mix_blend_mode_list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="filter_demo demo4">
      <div class="fire"></div>
    </div>
    <div class="filter_demo demo5">
      文字融合文字融合文字融合
    </div>
  </div>
</template>

<script>
const mix_blend_mode_list = [
  { label: "normal-正常", value: "normal" },
  { label: "multiply-正片叠底", value: "multiply" },
  { label: "screen-滤色", value: "screen" },
  { label: "overlay-叠加", value: "overlay" },
  { label: "darken-变暗", value: "darken" },
  { label: "lighten-变亮", value: "lighten" },
  { label: "color-dodge-颜色减淡", value: "color-dodge" },
  { label: "color-burn-颜色加深", value: "color-burn" },
  { label: "hard-light-强光", value: "hard-light" },
  { label: "soft-light-柔光", value: "soft-light" },
  { label: "difference-差值", value: "difference" },
  { label: "exclusion-排除", value: "exclusion" },
  { label: "hue-色相", value: "hue" },
  { label: "saturation-饱和度", value: "saturation" },
  { label: "color-颜色", value: "color" },
  { label: "luminosity-亮度", value: "luminosity" },
  { label: "initial-初始", value: "initial" },
  { label: "inherit-继承", value: "inherit" },
  { label: "unset-复原", value: "unset" }
];
export default {
  name: "filter_css",
  data() {
    return {
      mix_blend_mode: "overlay",
      mix_blend_mode_list: mix_blend_mode_list
    };
  },
  created() {}
};
</script>

<style lang="scss">
.filter_css {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -20px;
  .filter_demo {
    width: 200px;
    height: 200px;
    margin-right: 20px;
  }
  .demo1 {
    position: relative;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background: url(../../../assets/img/Tulips.jpg) no-repeat;
    background-size: cover;
    &::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top: 10%;
      background: inherit;
      filter: blur(10px) brightness(80%) opacity(0.8);
      z-index: -1;
    }
  }
  .demo2 {
    display: flex;
    padding-top: 45px;
    box-sizing: border-box;
    filter: contrast(20);
    background: #fff;
    overflow: hidden;
    .yuan {
      border-radius: 50%;
      &.small {
        width: 60px;
        height: 60px;
        margin-top: 20px;
        background: #333;
        z-index: 10;
        filter: blur(6px);
        transform: translateX(5px);
        animation: filterBallMove 4s ease infinite;
      }
      &.middle {
        width: 100px;
        height: 100px;
        background: #3f51b5;
        filter: blur(6px);
      }
    }
  }
  .demo3 {
    .img {
      width: 160px;
      margin: 20px auto 0;
    }
    p {
      position: absolute;
      font-size: 20px;
      font-weight: 700;
      top: 55px;
      color: #fff;
    }
    img {
      width: 160px;
      height: 100px;
    }
    .el-select {
      margin-top: 20px;
    }
  }
  .demo4 {
    .fire {
      width: 0;
      height: 0;
      border-radius: 45%;
      box-sizing: border-box;
      border: 100px solid #000;
      border-bottom: 100px solid transparent;
      background-color: #b5932f;
      transform: scaleX(0.4);
      filter: blur(20px) contrast(30);
    }
  }
  .demo5 {
    width: 600px;
    background: #000;
    color: #fff;
    font-size: 30px;
    line-height: 200px;
    text-align: center;
    letter-spacing: 5px;
    filter: blur(0px);
    animation: words 4s ease infinite;
  }
}
@keyframes words {
  0% {
    letter-spacing: 5px;
    filter: blur(0px);
  }
  50% {
    letter-spacing: -30px;
    filter: blur(8px);
  }
  100% {
    letter-spacing: 5px;
    filter: blur(0px);
  }
}
@keyframes filterBallMove {
  50% {
    transform: translateX(150px);
  }
}
</style>