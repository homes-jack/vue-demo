<template>
  <div class="baseInformation dialog">
    <div class="info_item middle">
      <span class="info_title">code类型</span>
      <el-select class='info_detail'
        v-model="add_data.codeType"
        :disabled="Boolean(add_data.id)"
        placeholder=" - 请选择 -"
        value-key="codeType"
      >
        <el-option v-for="item in code_type_list"
          :key="item.id"
          :label="item.remark"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div class="info_item middle" v-if="add_data.codeType.codeType == 1000">
      <span class="info_title">code类型名称</span>
      <el-input class='info_detail'
        v-model.trim="add_data.codeTypeName"
        clearable
        placeholder="请输入内容"
      ></el-input>
    </div>
    <div class="info_item middle">
      <span class="info_title">code名称</span>
      <el-input class='info_detail'
        v-model.trim="add_data.codeName"
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
import { indexedDB,message } from "@/common/mixinx";
export default {
  name:'t_code_edit',
  mixins: [indexedDB,message],
  props: {
    db_store:{
      default:()=>({})
    },
    add_data:{
      type:Object,
      default:()=>({
        codeTypeName:'',
        codeType:{},
        codeName:'',
        remark:'',
        max_code_type:1000,
      })
    }
  },
  data () {
    return {
      code_type_list:[]
    }
  },
  methods:{
    init(){
      this.get_code_type_list();
    },
    get_code_type_list(){
      this.db_query_data_by_options('t_code').then(res=>{
        let arr = [];
        res.data.forEach(itm=>{
          itm.codeType > this.add_data.max_code_type && (this.add_data.max_code_type = itm.codeType);
          if(!arr.some(i=>i.codeType == itm.codeType)){
            arr.push(itm)
          }
        });
        arr.push({
          codeType:1000,
          id:1,
          remark:"新增code类型",
        })
        this.code_type_list = arr;
      }).catch(()=>{
        this.message('查询错误');
      })
    },
  }
}
</script>
