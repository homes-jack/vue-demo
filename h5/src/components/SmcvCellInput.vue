<template>
  <div class="smcv_publicBox">
    <span class="smcv_cell_title">{{title}}</span>
    <div class="smcv_cell_ipt_box">
      <input
        v-if="edit"
        class="smcv_cell_pd5"
        type="text"
        :placeholder="placeholder"
        v-model="cust_name"
      />
      <i
        v-if="edit && clearable && (cust_name+'').length"
        class="iconfont icon--zhuangtai-cuowu"
        @click="clear"
      ></i>
      <span
        v-if="!edit"
        :class="{smcv_cell_ipt_nodata:!(cust_name || (cust_name + '') === '0')}"
      >{{(cust_name || (cust_name + '') === '0')?cust_name:no_data_str}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'smcvCellInput',
  props: {
    title:{
      type:String,
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
    number:{
      type:Boolean,
      default:false
    },
    clearable:{
      type:Boolean,
      default:true,
    },
    placeholder:{
      type:String,
      default:'请输入'
    },
    no_data_str:{
      type:String,
      default:''
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
      if(now.length >= 1 && this.number) {
        now = now.replace(/[^0-9]/g, "");
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
  .smcv_cell_ipt_nodata {
    color: #C9C9C9;
  }
  .smcv_cell_title {
    color: #333;
    font-size: 16px;
    flex: 1;
  }
  .smcv_cell_ipt_box {
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


