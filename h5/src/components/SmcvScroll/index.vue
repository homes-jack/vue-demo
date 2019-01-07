<template>
  <div class="page-loadmore">
    <div
      class="loading-background"
      :style="{ transform: 'scale3d(' + moveTranslate + ',' + moveTranslate + ',1)' }"
    >
    </div>
    <div
      class="page-loadmore-wrapper"
      ref="wrapper"
      :style="{ height: wrapperHeight + 'px' ,'-webkit-overflow-scrolling': scrollMode}"
    >
      <mt-loadmore
        :top-method="loadTop"
        @translate-change="translateChange"
        @top-status-change="handleTopChange"
        :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :auto-fill=false
        :bottomDistance="-10"
      >
        <div slot="top" class="mint-loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ 'is-rotate': topStatus === 'drop' }"
          >下拉刷新</span>
          <span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
        <slot></slot>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >上拉加载</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<style>
  .loading-background,
  .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }

  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1px solid #eee
  }

  .page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
  }

  .page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll;
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }

  .mint-loadmore-content {
    /* padding-bottom: 40px; */
  }
</style>

<script type="text/babel">
    export default {
      props: {
        allLoaded:{
          type:Boolean,
          default:false
        },
        scrollMode:{
          type:String,
          default:'touch'
        },
        noReflesh:{
          type:Boolean,
          default:true
        },
        maxDistance:{
          type:[String,Number],
          default:0
        },
        bottomDistance:{
          type:[Number],
          default:0
        }
      },
      data() {
        return {
          list: [],
          bottomStatus: '',
          wrapperHeight: 0,
          topStatus: '',
          //wrapperHeight: 0,
          translate: 0,
          moveTranslate: 0
        };
      },

      methods: {
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        reseizeHeight(){
          this.$nextTick(()=>{
            let scHeight = 0
            if(/buildCard|ToFollowUpProCustomer|activityTransmit/gi.test(this.$route.path)) {
              scHeight = this.$refs.wrapper.getBoundingClientRect().top?0:41
            }
            if(/unassigned/gi.test(this.$route.path)) {
              scHeight = 48
            }
            this.wrapperHeight = document.body.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-this.bottomDistance - scHeight
          })

        },

        loadBottom() {
          this.$emit('addData',()=>{
            this.$refs.loadmore.onBottomLoaded()
          })
        },
        handleTopChange(status) {
          this.moveTranslate = 1;
          this.topStatus = status;
        },
        translateChange(translate) {
          const translateNum = +translate;
          this.translate = translateNum.toFixed(2);
          this.moveTranslate = (1 + translateNum / 70).toFixed(2);

        },
        loadTop() {
          if(!this.noReflesh){
            this.$refs.loadmore.onTopLoaded()
          }else{
            this.$emit('resetData',()=>{
              this.$refs.loadmore.onTopLoaded();
            })
          }
        },

  },
      created() {
      },

      mounted() {
        setTimeout(()=>{
          this.reseizeHeight()
        })
      }

    };
  </script>
