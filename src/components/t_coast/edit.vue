<template>
<el_dialog v-model="is_show" @confirm="confirm">
  <div class="baseInformation dialog">
    <div class="info_item middle">
      <span class="info_title">类型</span>
      <el-select class='info_detail'
        v-model="add_data.type"
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
    <div class="info_item middle">
      <span class="info_title">日期</span>
      <el-date-picker
        class='info_detail'
        v-model="add_data.date"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <div class="info_item middle">
      <span class="info_title">费用</span>
      <smcv-number-input class='info_detail'
        mode="decimal"
        v-model.trim="add_data.coast"
        clearable
        placeholder="请输入内容"
      ></smcv-number-input>
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
</el_dialog>
</template>
<script>
import el_dialog from "@/components/el_dialog.vue";
import SmcvNumberInput from "@/components/smcvNumberInput.vue";
import { indexedDB,message,store_edit } from "@/common/mixinx";
import { handDate } from "@/common/utils";
export default {
  name:'t_coast_edit',
  mixins: [indexedDB,message,store_edit],
  components: {
    el_dialog,SmcvNumberInput
  },
  props:{
    add_data:{
      type:Object,
      default:()=>({
        typeName:'',
        type:'',
        date: '',
        coast: '',
        remark:'',
      })
    }
  },
  data () {
    return {
      code_type_list:[],
    }
  },
  updated () {
    if(!this.add_data.date) {
      this.$set(this.add_data,"date",handDate(new Date()))
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
    confirm(){
      if(!this.add_data.type) {
        this.message('类型必填');
        return;
      }
      this.add_data.typeName = this.code_type_list.find(i=>i.code == this.add_data.type).codeName;
      if(!this.add_data.date) {
        this.message('日期必填');
        return;
      }
      if(!this.add_data.coast) {
        this.message('费用必填');
        return;
      }
      let param = {
        typeName:this.add_data.typeName,
        type:this.add_data.type,
        date:this.add_data.date,
        coast:this.add_data.coast,
        remark:this.add_data.remark?this.add_data.remark:'',
      };
      if(this.add_data.id) { //update
        param.id = this.add_data.id;
        this.$emit('confirm','update',param);
        return;
      }
      this.$emit('confirm','add',param);
    }
  },
  watch: {
    "add_data.coast"(val){
      if(val == 5) {
        this.add_data.remark = '鸡蛋饼'
      }
    }
  }
}
</script>
<style lang="scss">
.smcv_number_input {
  border: 1px solid #DCDFE6;
  border-radius:4px;
  padding: 0 15px;
  &:focus{
    border-color: #409EFF;
  }
}
</style>

