<template>
	<view class="lazy-image-container">
		<image class="image" :data-index="index" @load="imageLoaded" :src="show?coverPhoto:''" :mode="mode"/>
		<image class="image placeholder" :class="{loaded:loaded}" :src="placeholderSrc" :mode="mode"/>
	</view>
</template>

<script>
	import {getCover} from '@/common/js/util.js'
	export default{
		data(){
			return {
				placeholderSrc: '/static/img/no_image_640x426.jpg',
				loaded : false
			}
		},
		methods:{
			imageLoaded(){
				var _this = this;
				this.loaded = true;
				//_this.$emit('imageLoaded', _this.index);
			}
		},
		computed:{
			coverPhoto(){
				return getCover(this.src);
			}
		},
		props:{
			src:{
				
			},
			show:{
				type:Boolean,
				default: false
			},
			index:{
				type:Number,
				default:0
			},
			mode:{
				type:String,
				default:"aspectFill"
			}
		},
		onReady() {
			this.$emit("lazeImgReady");
		}
	}
</script>

<style scoped="true">
	.lazy-image-container{
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.placeholder {
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}

	.placeholder.loaded {
		opacity: 0;
	}

	.image{
		width: 100%;
		height: 100%;
		position: absolute;
		left : 0;
	}
</style>
