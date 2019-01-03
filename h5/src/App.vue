<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { registerFindIndex, registryFilter, registryFrom, registryFill, registrySome } from '@/common/utils.js';
	export default {
		name: 'App',
		created() {
      registerFindIndex();
      registryFilter();
      registryFrom();
      registryFill();
      registrySome();
		},
	};
</script>

<style lang='scss'>
	#app {
		width: 100%;
		height: 100%;
		font-family: "Microsoft YaHei","PingFangSC";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow: auto;
	}
	.v-modal {
		position: absolute;
	}
	html,
	body {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		/* overflow: hidden; */
	}

	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;
		-webkit-overflow-scrolling: touch;
	}
.mint-msgbox-wrapper {
	.mint-msgbox-btn {
		font-size: 16px;
	}
}
	.clear::after {
		display: table;
		clear: both;
		content: "";
	}

	h3 {
		font-weight: bold;
	}
.mint-toast-text {
	line-height: 16px;
}
	.btnsWrap {
		padding: 15px;
	}
	textarea {
		resize: none;
		font-family:"Microsoft YaHei","PingFangSC"
	}
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		color: #BEBEBE;
	}

	input:-moz-placeholder,
	textarea:-moz-placeholder {
		color: #BEBEBE;
	}

	input::-moz-placeholder,
	textarea::-moz-placeholder {
		color: #BEBEBE;
	}

	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		color: #BEBEBE;
	}
	.mint-indicator-wrapper {
		z-index: 9999;
	}

	.mint-indicator-mask {
		z-index: 9999;
	}
</style>
