<template>
  <div class="filter_css">
    <div class="filter_demo demo1"></div>
    <div class="filter_demo demo2">
      <div class="yuan small"></div>
      <div class="yuan middle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter_css",
  data() {
    return {
    };
  },
  created() {
  },
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
    background:url(../../../assets/img/Tulips.jpg) no-repeat;
    background-size: cover;
    &::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top: 10%;
      background: inherit;
      filter: blur(10px) brightness(80%) opacity(.8);
      z-index: -1;
    }
  }
  .demo2 {
    display: flex;
    filter: contrast(20);
    background: #dfdfdf;
    overflow: hidden;
    .yuan {
      border-radius: 50%;
      &.small {
        width: 60px;
        height: 60px;
        margin-top: 20px;
        background: skyblue;
        z-index: 10;
        filter: blur(10px);
        transform: translateX(25px);
        animation: filterBallMove 2s ease infinite;
      }
      &.middle {
        width: 100px;
        height: 100px;
        background: darkorchid;
        filter: blur(10px);
      }
    }
  }
}
@keyframes filterBallMove {
  50% {
    transform: translateX(125px);
  }
}
</style>