<template>
  <div class="testTemplateSolt" :class="{active}" @click="chose">
    {{label}}
    
  </div>
</template>
<script>
export default {
  name:'testTemplateSolt',
  props:{
    label:{
      default:''
    },
    value:{
      default:''
    }
  },
  data(){
    return {
      active:false,
    }
  },
  mounted(){
    // console.log("object_child",this.$parent);
  },
  methods:{
    chose(){
      this.$emit('chose',this.value)
    }
  }
}
</script>
<style lang="scss">
.testTemplateSolt {
  padding: 0 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 32px;
  &.active {
    color: skyblue;
  }
}
</style>

