<template>
	<view class="container">
		<view class="qrimg">
			<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
		</view>
<!-- 		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="saveQrcode">保存到图库</button>
		</view> -->
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
export default {
	data() {
		return {
			ifShow: true,
			val: 'xxxx', // 要生成的二维码值
			size: 500, // 二维码大小
			unit: 'upx', // 单位
			background: '#b4e9e2', // 背景色
			foreground: '#309286', // 前景色
			pdground: '#32dbc6', // 角标色
			icon: '/static/img/tabbar/home.png', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' // 二维码生成后的图片地址或base64
		}
	},
	methods: {
		creatQrcode() {
			this.$refs.qrcode._makeCode()
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode()
		},
		qrR(res) {
			this.src = res
		}
	},
	components: {
		tkiQrcode
	},
	onLoad(e) {
		//console.log("二维码", e);
		if(e && e.code){
			this.val = decodeURIComponent(e.code);
		}
	}
}
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.qrimg {
	display: flex;
	justify-content: center;
}
.btns {
	display: flex;
	flex-direction: column;
	width: 100%;
}
</style>
