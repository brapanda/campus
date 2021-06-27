<template>
	<view class="ask-c" @click="openDetail">
		<view class="ask-title" v-if="title">{{title}}</view>
		<view class="ask-answer-status">
			<view class="ask-answer-status-item">
				<text class="cuIcon-attention ask-answer-status-item-icon"></text>
				<view>{{formatViews}}查看</view>
			</view>
			<view class="ask-answer-status-item">
				<text class="cuIcon-friendfavor ask-answer-status-item-icon"></text>
				<view>{{formatFollows}}关注</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatNumber} from "@/common/js/util.js";
	export default{
		data(){
			return {}
		},
		methods:{
			openDetail(){
				uni.navigateTo({
					url: '/pages/detail/detail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		computed:{
			formatViews(){
				return formatNumber(this.views);
			},
			formatFollows(){
				return formatNumber(this.follows);
			}
		},
		props:{
			title:{
				default:"宝宝六个月了，晚上睡觉会打呼噜，这是什么问题？宝宝六个月了，晚上睡觉会打呼噜，这是什么问题？宝宝六个月了，晚上睡觉会打呼噜，这是什么问题？宝宝六个月了，晚上睡觉会打呼噜，这是什么问题？"
			},
			views:{
				default: 464646
			},
			follows:{
				default: 464646
			}
		}
	}
</script>

<style scoped="true">
	.ask-c{
		width: 750rpx;
		background: white;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.ask-title{
		width: 100%;
		font-size: 28rpx;
		color:#357FC6;
		font-weight: bold;
		line-height: 43rpx;

		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow : hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		/* white-space: nowrap; */
	}
	.ask-answer-status{
		display: flex;
		align-items: center;
		color: #FC769E;
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	.ask-answer-status-item{
		display: flex;
		align-items: center;
		width: 250rpx;
	}
	.ask-answer-status-item-icon{
		font-size: 38rpx;
		margin-right: 10rpx;
	}
</style>
