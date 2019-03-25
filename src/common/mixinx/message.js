export default {
  methods: {
    message(message = '', type = 'warning') {
      this.$message({
        message,
        type,
        duration: 2000
      });
    },
  }
}