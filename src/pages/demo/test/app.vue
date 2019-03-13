<template>
  <canvas id="cv" width="600" height="400"></canvas>
</template>

<script>
import smcvNumberInput from "@/components/smcvNumberInput";
export default {
  name: "test",
  components: {
    smcvNumberInput
  },
  data() {
    return {
      coefficient_list: [],
      draw_point:[],
      point:[120,160,35,200,220,260,220,40]
    };
  },
  created() {
    this.coefficient_list = this.new_coefficient_list(7);
  },
  mounted() {
    let cv = document.querySelector("#cv");
    let ctx = cv.getContext("2d");
    ctx.lineWidth = 1;
    this.draw(ctx)
  },
  methods: {
    draw(ctx) {
      for(let t=0;t<=1;t+=.05) {
        let draw_point = this.bezier(t,3);
        this.draw_point.push(draw_point)
        if(t== 0) {
          ctx.moveTo(draw_point.x, draw_point.y);
        }else {
          ctx.lineTo(draw_point.x, draw_point.y);
        }
      }
      ctx.stroke();
    },
    new_coefficient_list(length) {
      let arr = [];
      for (let i = 0; i < length; i++) {
        let item = [];
        item.length = i + 1;
        item.fill(0);
        item = item.map((j, ind) => {
          if (ind == 0) {
            j = 1;
            return j;
          }
          let j_arr = arr[i - 1] || [1];
          j = j_arr[ind - 1] + (j_arr[ind] || 0);
          return j;
        });
        arr.push(item);
      }
      return arr;
    },
    binomial(k,n=3) {
      while (n >= this.coefficient_list.length) {
        let stop = this.coefficient_list.length;
        new_item = [1];
        new_item.length = stop + 1;
        for (let i = 1, pre = stop - 1; i < new_item.length; i++) {
          new_item[i] =
            this.coefficient_list[pre][i - 1] + this.coefficient_list[pre][i];
        }
        new_item[stop] = 1;
        this.coefficient_list.push(new_item);
      }
      return this.coefficient_list[n][k];
    },
    bezier(t,n=3) {
      let sumX = 0,sumY = 0;
      for (let k = 0; k <= n; k++) {
        sumX += this.point[2*k]*this.binomial(k,n) * (+Math.pow(1 - t,n - k).toFixed(6)) * (+Math.pow(t,k).toFixed(6));
        sumY += this.point[2*k+1]*this.binomial(k,n) * (+Math.pow(1 - t,n - k).toFixed(6)) * (+Math.pow(t,k).toFixed(6));
      }
      return {x:sumX,y:sumY};
    },

  }
};
</script>

<style lang="scss">
body {
  background: black;
  canvas {

    background: #fff;
    margin: auto;
    display: block;
  }
}
</style>