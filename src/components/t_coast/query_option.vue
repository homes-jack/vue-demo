<template>
	<div class="df">
		<div class="info_item">
      <span class="info_title">类型</span>
      <el-select class='info_detail'
        v-model="param.type"
        clearable
        placeholder=" - 请选择 -"
        value-key="codeType"
      >
        <el-option v-for="item in code_type_list"
          :key="item.id"
          :label="item.codeName"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>
		<div class="info_item">
      <span class="info_title">开始日期</span>
      <el-date-picker
        class='info_detail'
        v-model="param.start_date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <div class="info_item">
      <span class="info_title">结束日期</span>
      <el-date-picker
        class='info_detail'
        v-model="param.end_date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
	</div>
</template>
<script>
import { indexedDB,message } from "@/common/mixinx";
export default {
  name:'t_coast_query_option',
  mixins: [indexedDB,message],
	props: {
    param:{
      type:Object,
      default:()=>({
        type:'',
        date:'',
      })
    },
    db_store: {
      default: () => ({})
    },
  },
  data () {
    return {
      code_type_list:[],
    }
  },
  methods: {
    init(){
      this.query_type_list();
    },
    query_type_list(){
      let param = {codeType:1002};
      this.db_query_data_by_options('t_code',param).then(res=>{
        this.code_type_list = res.data;
      }).catch(e=>{
        console.error(e);
      })
    },
  }
}
</script>
