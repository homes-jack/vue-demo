<template>
  <mt-popup v-model="popupVisible" class="act_tag_pop">
    <div class="act_target">
      <div class="iconfont icon-icon--" @click="popupVisible=false"></div>
      <smcv-cell class="title no_border" title="潜客目标" :value="$MD.mtActFlow.dealerTag | filTag"></smcv-cell>
      <smcv-cell
        v-for="item in $MD.mtActFlow.dealerTag"
        :key="item.id"
        :title="item.seriesName"
        :value="item.targetCount"
      ></smcv-cell>
    </div>
  </mt-popup>
</template>

<script>
import SmcvCell from "@/components/SmcvCell";
export default {
  name:'SmcvActTarget',
  components: {
    SmcvCell
  },
  data () {
    return {
      popupVisible:true,
    }
  },
  props: {
    value:{
      type:Boolean,
      default:false
    }
  },
  created(){
    this.popupVisible = this.value
  },
  filters: {
		filTag(arr){
			let all = 0;
			arr.forEach(i=>{
				all += i.targetCount;
			})
			return all
		}
  },
  watch:{
    value(){
      this.popupVisible = this.value
    },
    popupVisible(){
      this.$emit('input',this.popupVisible)
    }
  }
}
</script>

<style lang="scss">
.act_target {
  width: 250px;
  padding: 8px 20px 20px;
  position: relative;

  .icon-icon-- {
    position: absolute;
    bottom: -90px;
    left: 50%;
    transform:translateX(-50%) rotate(45deg);
    font-size: 35px;
    color: #fff;
  }
  .smcv_cell_contener .smcv_cell {
    padding: 0 5px;
    line-height: 40px;
    .title {
      font-size: 14px;
    }
    .ipt_box {
      width: 100px;
    }
  }

  .title.smcv_cell_contener .smcv_cell {
    .title {
      color: #999;
    }
    .ipt_box {
      color: #999;
    }
  }
  .no_border.smcv_cell_contener .smcv_cell,.smcv_cell_contener:last-child .smcv_cell{
    border-bottom: 0 none;
  }
}
.act_tag_pop {
  border-radius: 5px;
  top: 40%;
}
</style>

