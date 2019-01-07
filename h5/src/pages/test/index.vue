<template>
  <div class="smcv_test">
    <mt-button class="btn" type="primary"  @click="click">smcvPop</mt-button>
    <mt-button class="btn" type="primary"  @click="click2">click2</mt-button>
    <h3>smcv-cell-input</h3>
    <smcv-cell-input
      title="title"
      v-model="default_data"
    ></smcv-cell-input>
    <h3>smcv-cell-input</h3>
    <smcv-long-tabel :lt_list="list" showAll></smcv-long-tabel>
    <h3>smcv-calendar</h3>
    <smcv-calendar
      ref='calendar'
      loading
      :markDateMore="arr"
      firstCheck="2019/01/09"
      :actRange="actRange"
      @load="load"
      @choseDay="choseDay"
    ></smcv-calendar>

    <smcv-input-pop
      v-model="show"
      title="test"
      type="date"
      :default="default_data"
      @sendDate="getdata"
      @loading="loading"
    ></smcv-input-pop>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import SmcvInputPop from "@/components/SmcvInputPop";
import SmcvCellInput from "@/components/SmcvCellInput";
import SmcvLongTabel from "@/components/SmcvLongtabel";
import SmcvCalendar from "@/components/SmcvCalendar";
import { handDate, clone, eptToStr, getUrlParams } from "@/common/utils";
import { getJWconfig, getUserInfo, getToken } from "@/common/api";
let data_list = [
  {code:10011001,codeName:'test1',children:[
    {code:10021001,codeName:'test101',children:[
      {code:10031001,codeName:'test111'}
    ]}
  ]},
  {code:10011002,codeName:'test2',children:[
    {code:10121001,codeName:'test201',children:[
      {code:10131001,codeName:'test211'}
    ]}
  ]},
  {code:10011003,codeName:'test3'},
  {code:10011004,codeName:'test4'},
  {code:10011005,codeName:'test5'},
  {code:10011006,codeName:'test6'},
  // {code:10011007,codeName:'test7'},
]
let list = [{
    activityDateString:"12.01",
    d90:"1",
    eg10:"1",
    g10:"3",
    g50:"5",
    rg10:"2",
    rv80:"4",
    t60:"2",
    v80:"4"
}]
let arr = [{
  className:'is_write',
  date:'2019-01-08'
}]
let actRange = []
export default {
  name: "test",
  components: {
    SmcvInputPop,SmcvCellInput,SmcvLongTabel,SmcvCalendar
  },
  data() {
    return {
      show: false,
      data_list,list,arr,actRange,
      pop_data:{data:''},
      default_data:'asd',
      id:10012001,
    };
  },
  methods: {
    click(){
      this.default_data = this.pop_data.data;
      this.show = true;
    },
    load(a,b){
      console.log(a,b);
      Indicator.open({spinnerType:'snake'});
      setTimeout(() => {
       b()
       Indicator.close();
      },1000);
    },
    choseDay(d){
      console.log(d);
    },
    click2(){
      this.default_data = [];
      this.show = true;
    },
    loading(data,reslove){
      console.log('1',data);
			Indicator.open({spinnerType:'snake'});
      setTimeout(() => {
        reslove([{code:this.id++,codeName:'test'+this.id}]);
        Indicator.close();
      }, 800);
    },
    getdata(d){
      this.pop_data = d;
    }
  }
};
</script>

<style lang='scss'>
.smcv_test {
  .linkto {
    margin-top: 100px;
  }
  .btn {
    margin-left: 50px;
    margin-top: 20px;
  }
  h3 {
    margin:10px;
    font-size: 16px;
  }
}
</style>
