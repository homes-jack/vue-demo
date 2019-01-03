<template>
  <div>
    <smcvNumberInput v-model="txt" mode='decimal'></smcvNumberInput>
  </div>
</template>

<script>
import smcvNumberInput from "@/components/smcvNumberInput";
export default {
  name: "test",
  components: {
    smcvNumberInput
  },
  data() {
    return {
      txt:'',
    };
  },

};
</script>

<style lang="scss">
body {
  padding: 20px;
}
</style>