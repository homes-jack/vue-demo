<template>
  <div class="baseInformation dialog">
    <div class="info_item middle">
      <span class="info_title">页面名称</span>
      <el-input class='info_detail'
        v-model.trim="add_data.pageName"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="info_item middle">
      <span class="info_title">页面地址</span>
      <el-input class='info_detail'
        v-model.trim="add_data.pageurl"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="info_item middle">
      <span class="info_title">备注</span>
      <el-input class='info_detail'
        v-model.trim="add_data.remark"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
  </div>
</template>
<script>
export default {
  name:'t_page_edit',
  props:{
    add_data:{
      type:Object,
      default:()=>({
        pageName:'',
        pageurl:{},
        remark:'',
      })
    }
  }
}
</script>

