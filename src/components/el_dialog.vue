<template>
<el-dialog
  class="el_dialog"
  :title="title"
  :visible.sync="dialogTableVisible"
>
  <slot></slot>
  <div class="footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
export default {
  name:"el_dialog",
  props: {
    value:{
      type:Boolean,
      default:true,
    },
    title:{
      type:String,
      default:'新增code'
    },
  },
  data () {
    return {
      dialogTableVisible:false,
    }
  },
  created () {
    this.dialogTableVisible = this.value;
  },
  methods: {
    confirm(){
      this.$emit('confirm')
    }
  },
  watch: {
    dialogTableVisible(){
      this.$emit('input',this.dialogTableVisible)
    },
    value(){
      this.dialogTableVisible = this.value;
    }
  }
}
</script>
<style lang="scss">
.el_dialog {
  .el-dialog__header {
    background-color: #4E8EFF;
    padding-top:10px;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn{
      top:15px;
      .el-dialog__close {
        color: #fff;
      }
    }
  }
  .footer {
    padding-top: 15px;
    text-align: center
  }
}
</style>

