
<template>
  <section class="wh_container smcv_calendar">
    <div class="wh_content_all">
      <!--头部-->
      <div class="wh_top_changge">
        <li v-if="!showWeek" @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li
          class="wh_content_li"
          :class="{week:showWeek}"
          @click="titleClick"
        >{{dateTop}}</li>
        <li v-if="!showWeek" @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <!-- 星期几-->
      <div class="wh_content wh_week">
        <div
          class="wh_content_item"
          v-for="(tag,index) in textTop"
          :key="index"
          :class="{weekend:tag == '六' || tag == '日'}"
        >
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>

      <div class="wh_content wh_date">
        <div
          class="wh_content_item"
          v-for="(item,index) in list"
          :key="index"
          @click="clickDay(item,index)"
        >
          <div
            class="wh_item_date"
            :class="[{ wh_isMark: item.isMark},
            {wh_show_point:showPoint},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},{wh_is_rang:inActRange(item.date)},setClass(item)]">
            {{item.id}}
            <div v-if="showPoint" class="point"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar';
import { handDate,copy } from "@/common/utils";
export default {
  name:'calendar',
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: '',
      click_item:'',
      textTop:['日', '一', '二', '三', '四', '五', '六']
    };
  },
  props: {
    showPoint:{
      type:Boolean,
      default:false
    },
    loading:{
      type:Boolean,
      default:false
    },
    actRange:{
      type:Array,
      default:()=>['1970/1/1','2050/12/31']
    },
    showWeek:{
      type:Boolean,
      default:false
    },
    firstCheck:{
      type:String,
      default:handDate(new Date(),'yyyy/MM/dd',false)
    },
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default:true
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created() {
    this.intStart();
    this.myDate = new Date();
    if(this.firstCheck) {
      let f_check = handDate(this.firstCheck,'yyyy/MM/dd',false)
      this.myDate = new Date(this.firstCheck)
      this.historyChose.push(f_check)
    }
  },
  methods: {
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
      if(!this.sundayStart) {
        this.textTop = ['一', '二', '三', '四', '五', '六','日']
      }
    },
    inActRange(date){
      let day = handDate(date,'yyyy/MM/dd');
      if(this.actRange.length < 2) {
        return true
      }
      if(this.actRange[0] <= day && day <= this.actRange[1]) {
        return true;
      }
      return false
    },
    titleClick(){
      this.$emit('titleClick')
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay(item) {
      this.click_item = item;
      if(this.loading) {
        let obj = copy(item);
        obj.date = handDate(obj.date,'yyyy/MM/dd');
        this.$emit('load',obj,this.hand_click_day)
      }else {
        this.hand_click_day()
      }
    },
    hand_click_day(){
      let item = this.click_item
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k);
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k;
      })
      return [markDate, markDateMore];
    },
    getList(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      if(this.showWeek) {
        arr = this.weekList(arr)
      }
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true;
        }
      }
      // arr
      this.list =arr ;
    },
    weekList(arr){
      let checkDate = this.historyChose[this.historyChose.length-1];
      let count = (arr.findIndex(i=>i.date==checkDate)+1)/7;
      let index = 0;
      if(count<=6) index = 5;
      if(count<=5) index = 4;
      if(count<=4) index = 3;
      if(count<=3) index = 2;
      if(count<=2) index = 1;
      if(count<=1) index = 0;
      return arr.slice(index*7,index*7+7)
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.agoDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.futureDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    firstCheck(){
      if(this.firstCheck) {
        let f_check = handDate(this.firstCheck,'yyyy/MM/dd',false);
        this.myDate = new Date(this.firstCheck);
        this.historyChose.push(f_check);
        this.getList(this.myDate);
      }
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      }, deep: true
    }
  }
};
</script>

<style lang='scss'>
.smcv_calendar {
  &.wh_container {
    max-width: 410px;
    margin: auto;
  }

  .wh_top_changge {
    display: flex;
  }

  .wh_top_changge li {
    padding-right: 15px;
    display: flex;
    color: #4E8EFF;
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
    &.week {
      justify-content: flex-end;
    }
  }

  .wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 2.5;
  }
  .wh_content_all {
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
  }

  .wh_content {
    display: flex;
    flex-wrap: wrap;
    color: #666;
    width: 100%;
  }


  .wh_content:first-child .wh_content_item_tag,
  .wh_content:first-child .wh_content_item {
    color: #ddd;
    font-size: 16px;
  }
  .wh_content_item,
  wh_content_item_tag {
    font-size: 15px;
    width: 53px;
    text-align: center;
    position: relative;
  }
  .wh_week .wh_content_item.weekend{
    color: #6ABAF9;
  }
  .wh_date {
    color: #dcdcdc;
    .wh_item_date {
      color: #bfbfbf;
      &.wh_is_rang {
        color: #666;
      }
      // .point {
      //   background-color:#4E8EFF;
      // }
    }
  }
  .wh_content_item {
    .wh_top_tag {
      width: 40px;
      height: 40px;
      line-height: 40px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .wh_item_date {
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      margin: auto;
      &.wh_show_point {
        height: 45px;
        line-height: 30px;
      }
      &.wh_chose_day {
        background: #4E8EFF;
        border-radius: 5px;
        color: #fff;
        .point {
          background-color: #4E8EFF;
        }
        // &.wh_is_rang .point {
        //   background: #fff;
        // }
      }
      .point {
        border-radius: 50%;
        width: 6px;
        height: 6px;
        margin: auto;
        background-color: #fff;
      }
    }
  }


  .wh_jiantou1 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #c9c9c9;
    border-left: 2px solid #c9c9c9;
    transform: rotate(-45deg);
  }

  .wh_jiantou2 {
    width: 12px;
    height: 12px;
    border-top: 2px solid #c9c9c9;
    border-right: 2px solid #c9c9c9;
    transform: rotate(45deg);
  }
  .wh_content_item > .wh_isMark {
    margin: auto;
    border-radius: 100px;
    background: blue;
    z-index: 2;
  }
  .wh_content_item .wh_other_dayhide.wh_item_date {
    color: #bfbfbf;
  }
  .wh_content_item .wh_want_dayhide {
    color: #bfbfbf;
  }
  // .wh_content_item .wh_isToday {
  //   background: #4E8EFF;
  //   border-radius: 50%;
  // }

}
</style>