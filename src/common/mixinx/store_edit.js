export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    db_store: {
      default: () => ({})
    },
  },
  data () {
    return {
      is_show: false,
    }
  },
  created() {
    this.is_show = this.value;
  },
  watch: {
    value() {
      this.is_show = this.value;
    },
    is_show() {
      this.$emit('input', this.is_show)
    }
  }
}