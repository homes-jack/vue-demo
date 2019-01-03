<template>
	<mt-popup v-model="popupVisible"
	  position="bottom"
	  class="smcv_popup">
		<div class="popup_content">
			<div class="popup_title"
			  @touchmove="ios_gundong">
				<span @click="leave()">取消</span>
				<span>{{title}}{{type === 'checkbox'?'(多选)':''}}</span>
				<span class="popup_active"
				  @click="leave(true)">确认</span>
			</div>

			<div v-if="type === 'radio'"
			  class="popup_list"
			  @touchmove="ios_gundong2">
				<p v-for="(item,index) in data"
				  :key="item.id"
				  :class="{'popup_active':active === index}"
				  @click="select(index)">
					<slot :item="item">
						{{item[option.label]}}
					</slot>
					<i v-if="active === index"
					  class="iconfont icon-duigou popup_active"></i>
				</p>
			</div>

			<div v-if="type === 'checkbox'"
			  class="popup_list"
			  @touchmove="ios_gundong2">
				<p v-for="(item,index) in data"
				  :key="item.id"
				  :class="{'popup_active':checkbox[index]}"
				  @click="select(index)">
					<slot :item="item">
						{{item[option.label]}}
					</slot>
					<i v-if="checkbox[index]"
					  class="iconfont icon-duigou popup_active"></i>
				</p>
			</div>

			<div v-if="type === 'cascading'"
			  class="popup_cascading">
				<div class="popup_tab"
				  @touchmove="ios_gundong">
					<span
						v-for="num in cascading"
						:key="num"
						:class="{'popup_tab_active':currentCascader === num}"
					  @click="cascaderTab(num)">
						{{cascading_arr[num]?cascading_arr[num][option.label]:'请选择'}}
					</span>
				</div>
				<div class="popup_list" @touchmove="ios_gundong2">
					<p v-for="item in cascading_arr[currentCascader-1][option.children]"
					  :key="item[option.id]"
					  :class="{'popup_active':active == item[option.id]}"
					  @click="selectCascading(item)">
						<slot :item="item">
							{{item[option.label]}}
						</slot>
						<i v-if="active == item[option.id]"
						  class="iconfont icon-duigou popup_active"></i>
					</p>
				</div>
			</div>

		</div>
	</mt-popup>
</template>

<script>
import { handDate } from "@/common/utils.js";
import SmcvDatePicker from './SmcvDatePicker.vue'

export default {
	name: "inputPop",
	components: {
		SmcvDatePicker
	},
  data() {
    return {
      popupVisible: false,
      active: -1,
			checkbox: [],
			cascading_arr:[],
			cut_cascading_item:{},
      currentCascader: 1,
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
		},
		lazy: {
			type: Boolean,
      default: false,
		},
    default: {
      type: [String, Object, Array],
      default: ""
    },
    title: {
      type: String,
      default: "证件类型"
    },
    type: {
      type: String,
      default: "radio",
      required: true
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    option: {
      type: Object,
      default: function() {
        return {
          id: "code",
          label: "codeName",
          children: "children"
        };
      }
    },
    entry: {
      type: String,
      default: ""
    },
    cascading: {
      type: Number,
      default: 3
    }
  },
  created() {
    this.popupVisible = this.value;
    this.init();
  },
  methods: {
    init() {
			this.cascading_arr = [];
			this.currentCascader = 1;
			this.cut_cascading_item = {};
			this.active = -1;
			this.checkbox = [];
      switch (this.type) {
        case "radio":
          if (this.default) {
            this.active = this.data.findIndex(
              item => item[this.option.id] == this.default[this.option.id]
            );
          }
          break;
        case "checkbox":
          this.checkbox.length = this.data.length;
          this.checkbox.fill(false);
          this.default !== "" &&
            this.default.forEach(item => {
              let index = this.data.findIndex(
                i => i[this.option.id] == item[this.option.id]
              );
              if (index !== -1) this.checkbox[index] = true;
            });
          break;
				case "cascading":
					this.cascading_arr[0] = {[this.option.children]:this.data};
          var searchArr = JSON.parse(JSON.stringify(this.data));
          if (this.default && this.default.length) {
            // 过滤空字符
            let defaultArr = this.default.filter(i => i);

            defaultArr.forEach((item, index) => {
              this.currentCascader = index + 2;
							if (this.currentCascader > this.cascading) this.currentCascader = this.cascading;
							this.cascading_arr.push(item);
              this.active = item[this.option.id];
            });
          }
          break;
      }
    },
    leave(isOk) {
      let obj = {};
      obj.entry = this.entry;
      this.popupVisible = false;
      switch (this.type) {
        case "radio":
          obj.data = this.data[this.active];
          this.active = "";
          break;
        case "checkbox":
          obj.data = [];
          this.data.forEach((item, index) => {
            if (this.checkbox[index]) {
              obj.data.push(item);
            }
          });
          this.checkbox.fill(false);
          break;
        case "cascading":
          obj.data = [];
          for (var i = 0; i < this.cascading; i++) {
						if(this.cascading_arr[i + 1]) {
							obj.data[i] = this.cascading_arr[i + 1]
						}
          }
					this.active = "";
          this.currentCascader = 1;
          break;
      }

      if (isOk) {
        obj.status = "ok";
        this.$emit("sendDate", obj);
      } else {
        obj.status = "cancel";
        this.$emit("sendDate", obj);
      }
    },
    // 点击单选 多选
    select(index) {
      if (this.type === "radio") {
        this.active = index;
        this.leave(true);
      }
      if (this.type === "checkbox") {
        this.checkbox[index] = !this.checkbox[index];
        this.$set(this, "checkbox", [...this.checkbox]);
      }
    },
    // 级联list点击
    selectCascading(item) {
			this.cut_cascading_item = item;
			if(this.lazy) {
				this.$emit('loading',item,this.no_loading);
			}else {
				if(!item[this.option.children]) item[this.option.children] = [];
				this.no_loading(item[this.option.children])
			}
		},
		no_loading(data) {
			this.cut_cascading_item[this.option.children] = data
			this.cascading_arr[this.currentCascader] = this.cut_cascading_item;
			if (this.currentCascader == this.cascading) {
				this.leave(true);
				return;
			}
			this.cascading_arr = this.cascading_arr.filter((i,j)=>j<=this.currentCascader)
			this.currentCascader++;
		},
    // 级联tab点击
    cascaderTab(index) {
			if (!this.cascading_arr[index]) return;
			this.currentCascader = index;
			this.active = this.cascading_arr[index][this.option.id];
    },
    ios_gundong(e) {
      e.preventDefault();
    },
    ios_gundong2(e) {
      if (this.data.length < 6) {
        e.preventDefault();
      }
    }
  },
  watch: {
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      this.$emit("input", val);
      if (val) {
        this.init();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/index.scss";
.smcv_popup {
  width: 100%;
  .popup_active {
    color: #60c0ff !important;
  }

  span.popup_tab_active {
    color: #60c0ff;
    border-bottom: 3px solid #60c0ff !important;
  }
  .popup_content {
    width: 100%;
    background: $white;
    font-size: $desc-font3;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;

    .popup_title {
      display: flex;
      justify-content: space-between;
      padding: 0 15px;
      border-bottom: 1px solid #ddd;
      line-height: 50px;

      span:nth-child(2) {
        font-size: $h1-font;
      }
    }

    .popup_list {
      box-sizing: border-box;
      padding: 10px 0;
      min-height: 150px;
      max-height: 300px;
      overflow: auto;
      color: #666;
    }
    p {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 2.5px 15px;
      line-height: 40px;
    }
    .popup_cascading {
      .popup_tab {
        display: flex;
        // border-bottom: 1px solid #ddd;
        line-height: 40px;
        font-size: $desc-font3;
        color: $desc3-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          flex: 1;
          text-align: center;
          position: relative;
          border-bottom: 1px solid #ddd;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:after {
            content: "|";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: $desc3-color;
          }

          &:last-child {
            &:after {
              content: "";
            }
          }
        }
      }
    }
  }
}
</style>
