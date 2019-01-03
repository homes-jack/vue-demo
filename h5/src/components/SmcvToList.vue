<template>
  <div class="smcv_to_list" @click="goList">
    返回列表
  </div>
</template>
<script>
export default {
  name:'toList',
  methods: {
    goList(){
      this.$router.push({name:'newCards'})
    }
  }
}
</script>

<style lang="scss">
.smcv_to_list {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 100;
  background: #4E8EFF;
  font-size: 14px;
  color: #fff;
  width: 80px;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
}
</style>

