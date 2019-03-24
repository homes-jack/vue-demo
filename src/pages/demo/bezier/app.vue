<template>
  <canvas id="cv" width="600" height="400" @mousedown="c_click"></canvas>
</template>

<script>
import smcvNumberInput from "@/components/smcvNumberInput";
export default {
  name: "bezier",
  components: {
    smcvNumberInput
  },
  data() {
    return {
      coefficient_list: [],
      draw_point:[],
      point:[
        {x:120,y:160},
        {x:35,y:200},
        {x:220,y:260},
        {x:220,y:40}
      ],
      ck_ind:-1,
      ctx:'',
    };
  },
  created() {
    this.coefficient_list = this.new_coefficient_list(7);
  },
  mounted() {
    let cv = document.querySelector("#cv");
    let ctx = cv.getContext("2d");
    console.log(ctx);
    this.ctx = ctx;
    ctx.lineWidth = 1;
    this.draw(ctx)
  },
  methods: {
    draw(ctx) {
      ctx.strokeStyle = '#666';
      for(let t=0;t<=1;t+=.05) {
        t=+(t.toFixed(2))
        let draw_point = this.bezier(t,3);
        this.draw_point.push(draw_point)
        if(t== 0) {
          ctx.moveTo(draw_point.x, draw_point.y);
        }else {
          ctx.lineTo(draw_point.x, draw_point.y);
        }
      }
      ctx.stroke();
      this.draw_point_arr(this.point,ctx)
    },
    draw_point_arr(arr,ctx){
      arr.forEach((point,i)=>{
        if(i== 0) {
          ctx.moveTo(point.x, point.y);
        }else {
          ctx.lineTo(point.x, point.y);
        }
        ctx.font = "14px";
        ctx.fillText(`(${point.x},${point.y})`,point.x+5,point.y);
      })
      ctx.stroke();

      arr.forEach(point=>{
        ctx.beginPath();
        ctx.arc(point.x,point.y,5,0,2*Math.PI);
        ctx.fill();
      })
    },
    c_click(e){
      let r = 5;
      let ck_pt = {x:e.offsetX,y:e.offsetY};
      this.ck_ind = this.point.findIndex(pt=>this.distence_point(ck_pt,pt)<=r);
      if(this.ck_ind != -1) {
        e.target.addEventListener('mousemove',this.mousemove);
        e.target.addEventListener('mouseup',this.mouseup);
      }
    },
    mousemove(e) {
      let new_point = {x:e.offsetX,y:e.offsetY};
      this.point.splice(this.ck_ind,1,new_point);
      this.ctx.clearRect(0,0,600,400);
      this.draw_point = []
      this.draw(this.ctx);
    },
    mouseup(e){
      e.target.removeEventListener('mousemove',this.mousemove);
      e.target.removeEventListener('mouseup',this.mouseup);
    },
    distence_point(p1,p2){
      let x = p1.x-p2.x;
      let y = p1.y-p2.y;
      return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
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
        sumX += this.point[k].x*this.binomial(k,n) * (+Math.pow(1 - t,n - k).toFixed(6)) * (+Math.pow(t,k).toFixed(6));
        sumY += this.point[k].y*this.binomial(k,n) * (+Math.pow(1 - t,n - k).toFixed(6)) * (+Math.pow(t,k).toFixed(6));
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
    margin:20px auto;
    display: block;
  }
}
</style>