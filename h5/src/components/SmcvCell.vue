<template>
  <div class="smcv_cell_contener">
    <div class="smcv_cell" @click="showAll">
      <div class="title">{{title}}
        <span v-if="isShow && isShowAll" class="xiajian" :class="{upArrow:showDetail}"></span>
      </div>
      <div v-if="!showDetail" class="ipt_box ellipsis">
        {{value}}
      </div>
      <img class="tagIcon" v-if="showTagIcon" :src="require('@/assets/img/dealerTag.png')" >
    </div>
    <div v-if="showDetail" class="cell_content">
      {{value}}
    </div>
  </div>
</template>
<script>
export default {
  name:'smcvCell',
  props: {
    title:{
      type:[String,Number],
      default:'姓名'
    },
    value:{
      type:[String,Number],
      default:''
    },
    isShowAll:{
      type:Boolean,
      default:true
    },
    showTagIcon:{
      type:Boolean,
      default:false,
    }
  },
  created () {
    this.init();
  },
  data () {
    return {
      isShow:false,
      showDetail:false,
    }
  },
  methods: {
    init(){
      if ((this.value+'').length>16) {
        this.isShow = true
      }
    },
    showAll(){
      if (!this.isShow || !this.isShowAll) {
        return;
      }
      this.showDetail = !this.showDetail;
    }
  },
  watch:{
    value(){
      this.init();
    }
  }
}
</script>
<style lang="scss">
.smcv_cell_contener {
  background: #fff;
  .smcv_cell {
    position: relative;
    padding: 0 15px;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    .title {
      color: #333;
      font-size: 16px;
      font-weight:400;
    }
    .ipt_box {
      width: 225px;
      text-align: right;
      font-size: 14px;
      color: #666;
      font-weight: 400;
    }
    .xiajian {
      display: inline-block;
      vertical-align: 2px;
      margin-left: 6px;
      border-top: 5px solid #999;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      transition: all 500ms ease;
    }
    .upArrow {
      transform: rotate(180deg);
    }
    .tagIcon {
      width: 18px;
      margin-left: -20px;
    }
  }
  .cell_content {
    word-wrap: break-word;
    padding: 18px 15px;
    line-height: 20px;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    border-bottom: 1px solid #d8d8d8;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
  }
}

</style>


