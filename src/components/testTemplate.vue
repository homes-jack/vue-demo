<template>
  <div class="testTemplate">
    testTemplate:{{value}}
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'testTemplate',
  props:{
    value:{
      default:'',
    }
  },
  data(){
    return {
      p1:'',
      slots:[]
    }
  },
  created(){
    this.p1 = this.value;
  },
  mounted(){
    this.get_solts();
    this.init_childs();
    this.listen();
  },
  methods:{
    get_solts(){
      // console.log("object",this.$slots);
      if(this.$slots.default) {
        let childs = this.$slots.default.filter(node=>{
          return node.tag && node.componentOptions && node.componentOptions.Ctor.options.name == "testTemplateSolt"
        }).map(({componentInstance})=>componentInstance);
        this.slots = childs;
      }
    },
    init_childs(){
      this.slots.forEach(node=>{
        node.active = false;
        if(node.value == this.p1) {
          node.active = true;
        }
      })
    },
    listen(){
      this.slots.forEach(node => {
        node.$on('chose',data=>{
          console.log(data)
          this.p1 = data;
          this.init_childs();
        })
      })
    }
  },
  watch:{
    value(){
      this.p1 = this.value
    },
    p1(){
      this.$emit("input",this.p1);
    }
  }
}
</script>
<style lang="scss">

</style>

