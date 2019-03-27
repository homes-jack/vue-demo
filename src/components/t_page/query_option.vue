<template>
	<div class="df">
		<div class="info_item">
      <span class="info_title">页面名称</span>
      <el-input class='info_detail'
        v-model.tirm="param.pageName"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
		<div class="info_item">
      <span class="info_title">页面名称</span>
      <el-input class='info_detail'
        v-model.tirm="param.pageName"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
	</div>
</template>
<script>
export default {
	name:'t_page_query_option',
	props: {
    param:{
      type:Object,
      default:()=>({
        pageName:'',
        remark:'',
      })
    }
	},
}
</script>
