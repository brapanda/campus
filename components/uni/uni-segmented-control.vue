<template>
	<view class="segmented-control" :class="styleType" :style="wrapStyle">
		<view v-for="(item, index) in values" class="segmented-control-item" :class="styleType" :key="index" :style="item.id === currentId ? activeStyle : itemStyle" @click="onClick(item.id)">
			{{item.name}}
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
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `border:0;`;
						break;
					default:
						styleString = `border-color: ${this.activeColor}`;
						break;
				}
				return styleString;
			},
			itemStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:#000;border-left:0;`;
						break;
					default:
						styleString = `color:${this.activeColor};border-color:${this.activeColor};`;
						break;
				}
				return styleString;
			},
			activeStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:${this.activeColor};border-left:0;border-bottom-style:solid;`;
						break;
					default:
						styleString = `color:#fff;border-color:${this.activeColor};background-color:${this.activeColor}`;
						break;
				}
				return styleString;
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
		font-size: 30rpx;
		box-sizing: border-box;
		overflow: auto;
	}

	.segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 60rpx;
		/* min-width: 80rpx; */
		padding: 0 15rpx;
		box-sizing: border-box;
	}
</style>