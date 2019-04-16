<template>
<el-container>
  <el-header></el-header>
  <el-main>
    <div class="code_maintain">
      <div class="baseInformation">
        <div class="info_item">
          <span class="info_title">表</span>
          <el-select class='info_detail'
            v-model="store"
          >
            <el-option v-for="(item,index) in db.stores"
              :key="index"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
        </div>
        <component
          :is="`${db.stores[store].name}_query_option`"
          :db_store="db_store"
          ref="query"
          :param="param"
        ></component>

        <div class="df">
          <div class="info_item"></div>
          <div class="info_item"></div>
          <div class="info_item">
            <button class="btn hand" @click="query_data(1)">查询</button>
            <!-- <button class="btn hand">清空</button> -->
          </div>
        </div>
      </div>

      <div class="operate">
        <div class="add hand" @click="add_code">新增</div>
        <div class="add hand" @click="log_out">导出数据</div>
      </div>

      <el-table
        :data="data_list"
      >
        <el-table-column
          v-for="(key,index) in store_keys"
          :key="index"
          :prop="key"
          :label="key"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native="edit(scope.row)">编辑</el-button>
            <el-button  type="text" size="small" @click.native="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes,->, prev, pager, next, jumper"
        :page-sizes="[5,10, 20, 50, 100]"
        :total="page_dto.total"
        :current-page='page_dto.currentPage'
        :pageSize="page_dto.pageSize"
        @current-change='paginationChange'
        @size-change="handleSizeChange"
      ></el-pagination>

      <component
        v-model="add_show"
        :is="`${db.stores[store].name}_edit`"
        :db_store="db_store"
        ref="edit"
        :add_data="add_data"
        @confirm="confirm"
      ></component>
    </div>
  </el-main>
</el-container>

</template>

<script>
import { indexedDB,message } from "../../../common/mixinx";
import t_code_query_option from "@/components/t_code/query_option.vue"
import t_coast_query_option from "@/components/t_coast/query_option.vue"
import t_coast_edit from "@/components/t_coast/edit.vue"
import t_code_edit from "@/components/t_code/edit.vue"
export default {
  name: "codeMaintain",
  mixins: [indexedDB,message],
  components: {
    t_code_query_option,t_code_edit,t_coast_query_option,t_coast_edit
  },
  data() {
    return {
      db: { //数据库配置
        name: "test",
        version: 1,
        stores: [{
          name:'t_code', //表名
          keys:{        //主键id 默认
            codeTypeName:false,//键名:是否包含重复的值
            codeType: false,
            codeName: false,
            code: true,
            remark:false,
          }
        },{
          name:'t_coast', //表名
          keys:{        //主键id 默认
            typeName:false,//key不能使用 _
            type:false,
            date: false,  //日期筛选使用start_[key]/end_[key]
            coast: false,
            remark:false,
          }
        }]
      },
      db_store:null,  //表操作对象
      store:0,  //表
      add_show:false,
      add_data:{
        codeTypeName:'',
        codeType:{},
        codeName:'',
        remark:'',
        max_code_type:1000,
      },
      data_list:[],
      param:{},
      page_dto:{
        total:1,
        currentPage:1,
        pageSize:5,
      }
    };
  },
  created() {
    this.db_open().then(()=>{
      this.update();
      this.query_data();
    })
  },
  methods: {
    update(){
      return new Promise((reslove,rej)=>{
        setTimeout(() => {
          this.$refs.query.init && this.$refs.query.init();
          this.$refs.edit && this.$refs.edit.init && this.$refs.edit.init();
          reslove();
        });
      })
    },
    log_out(){
      this.db_query_data_by_options(this.db.stores[this.store].name,this.param).then(res=>{
        console.log("object",res.data);
      })
    },
    paginationChange(val){
      this.page_dto.currentPage = val;
      this.query_data();
    },
    handleSizeChange(val){
      this.page_dto.pageSize = val;
      this.page_dto.currentPage = 1;
      this.query_data();
    },
    query_data(page){
      if(page)this.page_dto.currentPage = page;
      this.db_query_data_by_options(this.db.stores[this.store].name,this.param,this.option_page).then(res=>{
        this.data_list = res.data;
        this.page_dto.total = res.total;
      }).catch((e)=>{
        console.error(e)
        this.message('查询错误');
      })
    },
    confirm(type,param){
      if(type == 'add') {
        this.db_add(this.db.stores[this.store].name,param).then(res=>{
          this.message('新增成功','success');
          this.update();
          this.query_data();
          this.clear_add();
        }).catch(e=>{
          console.error(e);
          this.message('新增失败');
        });
      }

      if(type == "update") {
        this.db_update(this.db.stores[this.store].name,param).then(()=>{
          this.message('更新成功',"success");
          this.update();
          this.clear_add();
          this.query_data();
        }).catch(()=>{
          console.error(e);
          this.message('更新失败');
        })
      }
    },
    add_code(){
      Object.keys(this.add_data).forEach(key=>{
        if(this.add_data[key] instanceof Array) {
          this.add_data[key] = [];
          return;
        }
        if(typeof this.add_data[key] == 'object') {
          this.add_data[key] = {};
          return;
        }
        this.add_data[key] = ''
      })
      this.update().then(()=>{
        this.add_show = true;
      });
    },
    edit(data){
      // console.log("object",data);
      this.add_data = JSON.parse(JSON.stringify(data));
      this.add_show = true;
    },
    clear_add(){
      this.update().then(()=>{
        this.add_data={
          codeTypeName:'',
          codeType:{},
          codeName:'',
          remark:'',
          max_code_type:1000,
        };
        this.add_show = false;
      });
    },
    del(data) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.db_delete(this.db.stores[this.store].name,data.id).then(()=>{
          this.message('删除成功','success');
          this.update();
          this.query_data();
        }).catch(e=>{
          console.error(e);
          this.message('删除失败');
        })
      }).catch(()=>{})
    }
  },
  watch: {
    store(now,old){
      this.param = {};
      this.query_data(1);
      this.update();
    }
  },
  computed:{
    option_page(){
      return {
        length:this.page_dto.pageSize,
        start:this.page_dto.pageSize * (this.page_dto.currentPage -1)
      }
    },
    store_keys(){
      let keys = Object.keys(this.db.stores[this.store].keys);
      return keys;
    }
  },
};
</script>

<style lang="scss">
.code_maintain {
  background: #fff;
  padding: 15px;
  .df {
    display: flex;
    width: 100%;
  }
  .baseInformation {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    padding: 5px 20px 15px 0px;
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
  .el-table {
    margin-top: 15px;
    border: 1px solid #dfdfdf;
    .cell {
      text-align: center;
    }
    thead th {
      background: #EEF4FF;
    }
  }
  .el-pagination {
    padding-top: 15px;
  }
}

</style>