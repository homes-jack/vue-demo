<template>
    <input class="smcv_num_input" :type="type" :readonly="readonly" :placeholder="placeholder" v-model="text"/>
</template>
<script>
export default {
    name: "fillInput",
    data() {
        return {
            text:''
        };
    },
    created(){
        this.text = this.value;
    },
    props: {
        value:{
            type:[String,Number],
            default:''
        },
        readonly:{
            type:Boolean,
            default:false
        },

        type:{
            type:String,
            default:'text'
        },
        placeholder:{
            type:String,
            default:'请输入'
        }
    },
    watch:{
        value(){
            this.text = this.value
        },
        text(now,old){
            // if(!now) return;
            now = now + '';
            now = now.replace(/[^0-9]/g,'');
            if(now.length >= 1) {
                now = Number(now) + '';
            }
            this.text = now;

            this.$emit('input',this.text);
        }
    }
};
</script>
<style lang="scss">
.smcv_num_input{
    // width: 100%;
	&[readonly] {
		background: #f4f4f4;
		color: #c0c4cc;
		cursor: not-allowed;
	}
	&::-webkit-input-placeholder{
		color:#c0c4cc;
	}
	&::-moz-placeholder{   /* Mozilla Firefox 19+ */
		color:#c0c4cc;
	}
	&:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
		color:#c0c4cc;
	}
	&:-ms-input-placeholder{  /* Internet Explorer 10-11 */
		color:#c0c4cc;
	}
}
</style>