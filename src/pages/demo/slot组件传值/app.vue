<template>
<div class="test">
  test
  <testTemplate v-model="chose_test">
    <testTemplateSlot
      v-for="item in list"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></testTemplateSlot>
  </testTemplate>
</div>
</template>

<script>
import testTemplate from "@/components/testTemplate";
import testTemplateSlot from "@/components/testTemplateSlot";
export default {
  name: "test",
  components: {
    testTemplate,testTemplateSlot
  },
  data() {
    return {
      chose_test:'',
      list:[]
    };
  },
  created(){
    for (let i = 0; i<5; i++) {
      let d = new Date().getTime() + i;
      this.list.push({
        value:"key_"+d,
        label:d
      })
    }
  }
};
</script>

<style lang="scss">
body {
  background: black;
 
}
</style>