<template lang="html">
  <div class="v_modal" v-show="show">
    <div class="el-loading-spinner">
      <i class="el-icon-loading"></i>
    <p class="el-loading-text">Loading</p>
  </div>
</template>

<script>
  export default {
    name:'v_modal',
    data(){
      return {
        show:false
      }
    },
    created(){
      setInterval(()=>{
        this.getShow();
      },100)
    },
    methods:{
      getShow(){
        let str = localStorage.getItem('isModalShow');
        if(str == 'true') {
          this.show = true;
        }else {
          this.show = false;
        }
      }
    }
  }
</script>

<style lang="css">
  .v_modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999999;
    background: rgba(0, 0, 0, .7);
    width: 100%;
    height: 100%;
  }
</style>
