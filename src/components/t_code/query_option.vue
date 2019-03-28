<template>
  <div class="df">
    <div class="info_item">
      <span class="info_title">code名称</span>
      <el-input class='info_detail'
        v-model.tirm="param.codeName"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="info_item">
      <span class="info_title">code类型</span>
      <el-select class='info_detail'
        clearable
        v-model="param.codeType"
        placeholder=" - 请选择 -"
      >
        <el-option v-for="item in code_type_list_less"
          :key="item.id"
          :label="item.codeTypeName"
          :value="item.codeType"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { indexedDB,message } from "@/common/mixinx";
export default {
  name:'t_code_query_option',
  mixins: [indexedDB,message],
  props: {
    db_store:{
      default:()=>({})
    },
    param:{
      type:Object,
      default:()=>({
        codeName:undefined,
        codeType:undefined,
      })
    }
  },
  data () {
    return {
      code_type_list_less:[],
    }
  },
  methods: {
    init () {
      this.get_code_type_list();
    },
    get_code_type_list(){
      this.db_query_data_by_options('t_code').then(res=>{
        let arr = [];
        res.data.forEach(itm=>{
          if(!arr.some(i=>i.codeType == itm.codeType)){
            arr.push(itm)
          }
        });
        this.code_type_list_less = arr;
      }).catch((e)=>{
        this.message('查询错误');
      })
    },
  }
}
</script>
