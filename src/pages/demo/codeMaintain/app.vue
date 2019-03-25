<template>
<el-container>
  <el-header></el-header>
  <el-main>
    <div class="code_maintain">
      <div class="baseInformation">
        <div class="info_item">
          <span class="info_title">活动名称</span>
          <el-input class='info_detail'
            clearable
            placeholder="请输入内容"></el-input>
        </div>
        <div class="info_item"></div>
        <div class="info_item">
          <button class="btn hand" @click="query_data">查询</button>
          <button class="btn hand">清空</button>
        </div>
      </div>

      <div class="operate">
        <div class="add hand" @click="add_show=true">新增</div>
      </div>
      <el_dialog v-model="add_show" @confirm="confirm">
        <div class="baseInformation dialog">
          <div class="info_item middle">
            <span class="info_title">code类型</span>
            <el-select class='info_detail'
              v-model="add_data.codeType"
              placeholder=" - 请选择 -"
              value-key="id"
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
      </el_dialog>
    </div>
  </el-main>
</el-container>

</template>

<script>
import { indexedDB,message } from "../../../common/mixinx";
import el_dialog from "@/components/el_dialog.vue";
export default {
  name: "codeMaintain",
  mixins: [indexedDB,message],
  components: {
    el_dialog
  },
  data() {
    return {
      db: {
        name: "test",
        version: 1,
        stores: [{
          name:'t_code', //表名
          keys:{        //主键id 默认
            code: true, //键名:是否包含重复的值
            codeType: false,
            codeTypeName:false,
            codeName: false,
            remark:false,
          }
        }]
      },
      add_show:false,
      code_type_list:[],
      add_data:{
        codeTypeName:'',
        codeType:{},
        codeName:'',
        remark:'',
        max_code_type:1000,
      },
      code_list:[],
    };
  },
  created() {
    this.open().then(()=>{
      this.get_code_type_list();
    })
  },
  methods: {
    query_data(){
      this.query_data_by_options('t_code',this.param).then(res=>{
        this.code_list = res;
      })
    },
    get_code_type_list(){
      this.query_data_by_options('t_code').then(res=>{
        let arr = [];
        res.forEach(itm=>{
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
      let param = {
        codeName:this.add_data.codeName,
        remark:this.add_data.remark
      };
      if(this.add_data.codeType.codeType == 1000) {
        param.codeTypeName = this.add_data.codeTypeName;
        param.codeType = this.add_data.max_code_type + 1;
        param.code = +(param.codeType + '1001');
        this.add('t_code',param).then(res=>{
          this.clear_add();
        });
        return;
      }
      param.codeTypeName = this.add_data.codeType.codeTypeName;
      param.codeType = this.add_data.codeType.codeType;
      this.query_data_by_options('t_code',{codeType:param.codeType}).then(res=>{
        let max_code = -1;
        res.forEach(i=>{
          i.code > max_code && (max_code = i.code);
        });
        param.code = max_code + 1;
        console.log("object",param);
        this.add('t_code',param).then(res=>{
          this.clear_add();
        });
      })
    },
    clear_add(){
      this.message('新增成功','success');
      this.get_code_type_list();
      this.add_data={
        codeTypeName:'',
        codeType:{},
        codeName:'',
        remark:'',
        max_code_type:1000,
      };
      this.add_show = false;
    }
  },
  computed: {
    param:{}
  }
};
</script>

<style lang="scss">
.code_maintain {
  background: #fff;
  padding: 15px;
  .baseInformation {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    padding: 5px 30px 15px;
    border-radius: 4px;
    &.dialog {
      padding: 0 10px 10px 0;
    }
    .info_item {
      width: 33.33%;
      display: flex;
      font-size: 14px;
      line-height: 30px;
      margin-top:10px;
      &.middle {
        width: 50%;
      }
      .btn {
        background-color: transparent;
        color: #4e8eff;
        margin-left: 10px;
        width: 100px;
        height: 30px;
        border: 1px solid #4e8eff;
        outline: none;
        border-radius: 3px;
        font-size: 14px;
        &:first-child{
          margin-left:auto;
        }
      }
      .info_title {
        width: 90px;
        text-align: right;
        color: #313131;
        margin-right: 10px;
      }
      .info_detail {
        flex: 1;
        color: #808080;
      }
    }
  }
  .operate {
    margin-top: 15px;
    .add {
      background-color: #ff8b00;
      display: inline-block;
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      border-radius: 3px;
    }
  }
}

</style>