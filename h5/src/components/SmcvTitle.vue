<template>
  <div class="smcv_title clearfix">
    <span class="title-left" v-show=showText>{{text}}</span>
    <span class="title-right" @click="edit" v-show=showIcon>
      <i class="icon iconfont icon-bianji" v-if="editIcon"></i>
      <i class="icon iconfont icon-baocun" v-else></i>
    </span>
  </div>
</template>

<script>
  export default {
    props:{
      text:{
        type:[String,Number],
        required:true
      },
      showText:{
        type:Boolean,
        default:true
      },
      showIcon:{
        type:Boolean,
        default:true
      },
      // editIcon:{
      //   type:Boolean,
      //   default:true
      // }
    },
    data(){
      return {
        editIcon:true
      }
    },
    created(){
    },
    methods: {
      edit(){
        this.$emit('clickEdit', '')
      },
      changeIcon(bool){
        if(bool)
        {
          this.editIcon = bool;
        }
        else
        {
          if(this.editIcon)
          {
            this.editIcon = false;
          }
          else
          {
            this.editIcon = true;
          }
        }
      }
    },
    watch: {

    }
  };
</script>

<style lang='scss'>
.smcv_title{
  background-color: white;
  padding: 12px 15px 12px 24px;
  display: flex;
  justify-content:space-between;
  .title-left{
    font-size: 16px;
    position: relative;
    &:after{
      display: block;
      content: "";
      width: 1px;
      height: 16px;
      background-color: #4E8EFF;
      position: absolute;
      top: -1px;
      left: -9px;
    }
  }
  .title-right{
    margin-left: auto;
    i{
      font-size: 16px;
      color: #4E8EFF;
    }
  }
}
</style>
