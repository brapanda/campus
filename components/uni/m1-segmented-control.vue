<template>
	<view class="segmented-control" :class="styleType" :style="wrapStyle">
		<view class="segmented-control-item" :class="{ 'style-1' : style1, 'style-2': !style1 }" v-for="(item, index) in values" :key="index" @click="onClick(item.id)">
			<view class="segmented-control-item-text" :class="styleType" :style="item.id === currentId ? activeStyle : itemStyle" >
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-segmented-control',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			styleType: {
				type: String,
				default: 'button'
			},
			style1:{
				default:true
			}
		},
		data() {
			return {
				currentId: this.current
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentId) {
					this.currentId = val;
				}
			}
		},
		computed: {
			wrapStyle() {
				return `border:0;`;
			},
			itemStyle() {
				return `color:#000;border-left:0;`;
			},
			activeStyle() {
				return `color:${this.activeColor};border-left:0;border-bottom-style:solid;`;
			}
		},
		methods: {
			onClick(id) {
				if (this.currentId !== id) {
					this.currentId = id;
					this.$emit('clickItem', id);
				}
			}
		},
	}
</script>

<style scoped="true">
	.segmented-control {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		box-sizing: border-box;
		overflow: auto;
	}
	.segmented-control-item {
		text-align: center;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.style-1{
		flex: 1;
	}
	
	.style-2{
		padding:0 30rpx;
	}
	
	.segmented-control-item-text {
		padding-bottom: 10rpx;
		font-size: 35rpx;
	}
</style>