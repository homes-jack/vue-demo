<template>
  <div class="smcv_cell_file">
    <span class="title">{{title}}</span>
    <div
      class="ipt_box ellipsis"
      v-if="(value+'').length"
      @click="preview"
    >
      {{value}}
    </div>
    <div
      class="ipt_box_no"
      v-if="edit && !(value+'').length"
      @click="upload"
    >
      <span>选择上传</span>
      <i :class="icon"></i>
    </div>
    <i
      class="iconfont icon--zhuangtai-cuowu"
      @click="clear"
      v-if="edit && (value+'').length"
    ></i>
  </div>
</template>
<script>
export default {
  name:'smcvCellFile',
  props: {
    title:{
      type:[String,Number],
      default:'姓名'
    },
    value:{
      type:[String,Number],
      default:''
    },
    edit:{
      type:Boolean,
      default:false
    },
    icon:{
      type:String,
      default:'iconfont icon-bianji'
    }
  },
  created () {
  },
  data () {
    return {

    }
  },
  methods: {
    clear(){
      this.$emit('clear')
    },
    preview(){
      this.$emit('preview')
    },
    upload(){
      this.$emit('upload')
    }
  },
  watch:{

  }
}
</script>
<style lang="scss">
.smcv_cell_file {
  background: #fff;
  padding: 0 15px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  .title {
    flex: 1;
    color: #333;
    font-size: 16px;
    font-weight:400;
  }
  .ipt_box {
    width: 215px;
    text-align: right;
    text-decoration: underline;
    font-size: 14px;
    color: #60C0FF;
    font-weight: 400;
  }
  .ipt_box_no {
    flex: 1;
    text-align: right;
    span {
      font-size: 14px;
      color: #c9c9c9;
    }
    .icon-bianji {
      margin-left: 5px;
      color: #60C0FF;
      font-size: 16px
    }
  }
  .icon--zhuangtai-cuowu {
    padding-left: 10px;
    color: #c9c9c9;
    font-size: 14px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
  }
}

</style>


