<template>
  <div class="smcv_publicBox">
    <span class="title">{{title}}</span>
    <div class="ipt_box">
      <smcv-input :number='isNumber' :isDouble="isDouble" v-if="isEdit" class="pd5" type="text" placeholder="请输入" v-model="cust_name"/>
      <i
        v-if="isEdit && clearable && (cust_name+'').length"
        class="iconfont icon--zhuangtai-cuowu"
        @click="clear"
      ></i>
      <span
        v-if="!isEdit"
        :class="{ipt_nodata:!(cust_name || (cust_name + '') === '0')}"
      >{{(cust_name || (cust_name + '') === '0')?cust_name:'暂无信息'}}</span>
    </div>
  </div>
</template>
<script>
import SmcvInput from "./SmcvInput.vue";
export default {
  name:'smcvCellInput',
  components: {
    SmcvInput
  },
  props: {
    clearable:{
      type:Boolean,
      default:true,
    },
    title:{
      type:String,
      default:'姓名'
    },
    value:{
      type:[String,Number],
      default:''
    },
    isEdit:{
      type:Boolean,
      default:false
    },
    isNumber:{
      type:Boolean,
      default:true
    },
    isDouble:{
      type:Boolean,
      default:false
    }
  },
  created () {
    this.cust_name = this.value
  },
  data () {
    return {
      cust_name:''
    }
  },
  methods: {
    clear(){
      this.cust_name = ''
    }
  },
  watch: {
    value(){
      this.cust_name = this.value
    },
    cust_name(now){
      if(now.length >= 1 && this.isNumber) {
        now = Number(now) + '';
      }
      this.cust_name = now;
      this.$emit('input',this.cust_name)
    }
  }
}
</script>
<style lang="scss">
.smcv_publicBox {
  padding: 0 5px;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #DCDCDC;
  .ipt_nodata {
    color: #C9C9C9;
  }
  .title {
    color: #333;
    font-size: 16px;
  }
  .ipt_box {
    position: relative;
    input {
      line-height: 30px;
      font-size: 16px;
      padding: 0 30px 0 0;
      box-sizing: border-box;
      outline: 0 none;
      border: 0 none;
      text-align: right;
    }
    .icon--zhuangtai-cuowu {
      position: absolute;
      right: 0;
      top: 0;
      color: #c9c9c9;
    }
  }
}
</style>


