<template>
  <div class="longTabel">
    <div class="lt_left">
      <div
        v-for="(item,index) in option_list"
        :key="index"
        class="lt_left_item"
      >
        {{index==0?'':item.name}}
      </div>
    </div>
    <div class="lt_content">
      <div
        class="lt_content_item"
        v-for="(item,index) in res_lt_list"
        :key="index"
      >
        <div class="lt_conten_date">{{item[option_list[0].label]?item[option_list[0].label]:'--'}}</div>
        <div
          class="lt_conten_detail"
          v-for="(leftItem,leftIndex) in option_list"
          :key="leftIndex"
          v-if="leftIndex != 0"
        >
          <p class="lt_content_number">{{(item[option_list[leftIndex].label] || item[option_list[leftIndex].label] == 0)?item[option_list[leftIndex].label]:'--'}}</p>
        </div>

      </div>
    </div>
    <div class="lt_right" v-if="showAll">
      <div class="lt_right_title">{{option_list[0].name}}</div>
      <div
        class="lt_right_all"
        v-for="(item,index) in option_list"
        :key="index"
        v-if="index != 0"
      >
        <p class="lt_content_number">{{cptAll(item.label)}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import { copy } from "@/common/utils";
  export default {
    name: "longTabel",
    props: {
      lt_list:{
        type:Array,
        default(){
          return [{}]
        }
      },
      option_list:{
        type:Array,
        default(){
          return [
            {name:'汇总',label:'activityDateString'},
            {name:'D90',label:'d90'},
            {name:'T60',label:'t60'},
            {name:'G10',label:'g10'},
            {name:'V80',label:'v80'},
            {name:'RV80',label:'rv80'},
          ]
        }
      },
      showAll:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        res_lt_list:[],
      }
    },
    created () {
      this.updatList();
    },
    methods: {
      updatList () {
        this.res_lt_list = copy(this.lt_list);
        let length = 4;
        if(!this.showAll) length = 5
        if(this.res_lt_list.length < length) {
          this.res_lt_list.length = length;
          this.res_lt_list.fill({},this.lt_list.length,length+1)
        }
      },
      cptAll(key){
        let all = 0;
        this.lt_list.forEach(i=>{
          if(i[key]=="--" || !i[key]) {
            all += 0
          }else {
            all += i[key] -0
          }
        });
        return all;
      },
    },
    watch: {
      lt_list(){
        this.updatList();
      }
    }
  };
</script>

<style lang='scss'>
.longTabel {
  display:flex;
  text-align: center;
  line-height: 45px;
  .lt_left {
    font-size: 14px;
    width: 70px;
    .lt_left_item {
      height: 46px;
      color: #999;
      &:first-child {
        height:45px;
        border-bottom: 1px solid #D8D8D8;
      }
    }
  }
  .lt_content {
    flex: 1;
    display: flex;
    overflow: auto;
    .lt_content_item {
      .lt_conten_date {
        height: 45px;
        width: 62px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #D8D8D8;
      }
      .lt_conten_detail {
        height: 45px;
        font-size: 16px;
        color: #000;
        border-bottom: 1px solid #D8D8D8;
      }
    }
  }
  .lt_right {
    width: 60px;
    box-shadow:-3px 2px 5px rgba(0, 0, 0, .1);
    font-size: 16px;
    font-weight: 700;
    .lt_right_title {
      color: #999;
      border-bottom: 1px solid #D8D8D8;
    }
    .lt_right_all {
      height: 45px;
      color: #4E8EFF;
      border-bottom: 1px solid #D8D8D8;
    }
    .lt_content_number {
      width: 60px;
    }
  }
  .lt_content_number {
    width: 45px;
    line-height: 20px;
    display: inline-block;
    word-wrap: break-word;
  }
}
</style>