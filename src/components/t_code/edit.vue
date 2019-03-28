<template>
<el_dialog v-model="is_show" @confirm="confirm">
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
          :label="item.codeTypeName"
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
</el_dialog>
</template>
<script>
import el_dialog from "@/components/el_dialog.vue";
import { indexedDB,message,store_edit } from "@/common/mixinx";
export default {
  name:'t_code_edit',
  mixins: [indexedDB,message,store_edit],
  components: {
    el_dialog
  },
  props: {
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
      code_type_list:[],
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
          codeTypeName:"新增code类型",
        })
        this.code_type_list = arr;
      }).catch(()=>{
        this.message('查询错误');
      })
    },
    confirm(){
      if(!this.add_data.codeType.codeType) {
        this.message('code类型必填');
        return;
      }
      if(this.add_data.codeType.codeType == 1000 && !this.add_data.codeTypeName) {
        this.message('code类型名称必填');
        return;
      }
      if(!this.add_data.codeName) {
        this.message('code名称必填');
        return;
      }
      if(!this.add_data.remark) {
        this.message('备注必填');
        return;
      }
      let param = {};
      if(this.add_data.id) { //更新
        param = {
          id:this.add_data.id,
          code:this.add_data.code,
          codeName:this.add_data.codeName,
          codeTypeName:this.add_data.codeTypeName,
          codeType:this.add_data.codeType.codeType,
          remark:this.add_data.remark,
        };
        this.$emit('confirm','update',param);
        return;
      }

      param = {
        codeName:this.add_data.codeName,
        remark:this.add_data.remark
      };
      if(this.add_data.codeType.codeType == 1000) {
        param.codeTypeName = this.add_data.codeTypeName;
        param.codeType = this.add_data.max_code_type + 1;
        param.code = +(param.codeType + '1001');
        this.$emit('confirm','add',param);
        return;
      }
      param.codeTypeName = this.add_data.codeType.codeTypeName;
      param.codeType = this.add_data.codeType.codeType;
      this.db_query_data_by_options("t_code",{codeType:param.codeType}).then(res=>{
        let max_code = -1;
        res.data.forEach(i=>{
          i.code > max_code && (max_code = i.code);
        });
        param.code = max_code + 1;
        this.$emit('confirm','add',param);
      }).catch(()=>{
        this.message('新增失败');
      });
    }
  },
  watch: {
    add_data(now,old){
      this.add_data.codeType = {
        codeType:this.add_data.codeType
      }
    }
  }
}
</script>
