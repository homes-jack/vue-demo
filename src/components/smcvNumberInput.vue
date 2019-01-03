<template>
	<input class="smcv_number_input"
	  type="text"
    :mode="mode"
	  :readonly="readonly"
	  :placeholder="placeholder"
	  v-model="text" />
</template>

<script>
export default {
  name: "smcvNumberInput",
  data() {
    return {
      text: ""
    };
  },
  created() {
    this.text = this.value;
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    mode: {
      type: String,
      default: "number", //decimal
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  watch: {
    value() {
      this.text = this.value;
    },
    text(now, old) {
      now = now + "";
      if(this.mode == 'number') {
        this.text = now.replace(/[^0-9]/g, "");
      }
      if(this.mode == 'decimal') {
        let strArr = now.split('.').map(i=>i?i:'');
        if(strArr.length == 1) {
          now = strArr[0].replace(/[^0-9]/g,'')
        }

        if(strArr.length == 2) {
          now = strArr[0].replace(/[^0-9]/g,'') +'.'+ strArr[1].replace(/[^0-9]/g,'').slice(0,2)
        }

        if(strArr.length > 2){
          now = old;
        }
        this.text = now;
      }
      this.$emit("input", this.text);
    }
  }
};
</script>
<style lang="scss">
.smcv_number_input {
  // width: 100%;
  &[readonly] {
    background: #f4f4f4;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  &::-webkit-input-placeholder {
    color: #c0c4cc;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c0c4cc;
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c0c4cc;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #c0c4cc;
  }
}
</style>

