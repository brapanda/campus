<template>
	<view class="segmented-control" :class="styleType" :style="wrapStyle">
		<view v-for="(item, index) in values" class="segmented-control-item" :class="styleType" :key="index"  @click="onClick(item.id)">
			<view :style="item.id === currentId ? activeStyle : itemStyle">
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
				return `border-color: ${this.activeColor}`;
			},
			itemStyle() {
				return `color:#fff;`;
			},
			activeStyle() {
				return `border-radius:25rpx;color:${this.activeColor};background-color:#fff;padding:8rpx 25rpx`;
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
		background: #FC769E;
		box-sizing: border-box;
		overflow: auto;
		justify-content: center;
	}

	.segmented-control-item {
		/* flex: 1; */
		width: 200rpx;
		text-align: center;
		/* line-height: 60rpx; */
		/* min-width: 80rpx; */
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}
</style>