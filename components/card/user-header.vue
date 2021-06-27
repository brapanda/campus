<template>
	<view>
		<view class="u-h-bg">
			<view class="u-h-bg-1"></view>
			<view class="u-h-bg-2"></view>
			<image class="u-h-img" :src="header" mode="widthFix"></image>
			<view class="u-h-name">{{name}}</view>
		</view>
		<view class="u-h-days">今天是你加入妈妈谈心社的第{{(days == "0" ? 1 : days)}}天</view>
		<view class="u-h-follow"><text class="u-h-follow-number">{{formatFollows}}</text> 我关注的人，<text class="u-h-follow-number">{{formatFollowedBy}}</text> 关注我的人</view>
		<view class="u-h-followby">共回答了<text class="u-h-followby-number">{{formatAnswers}}</text> 个答案，获得了<text class="u-h-followby-number">{{formatComments}}</text> 个赞</view>
	</view>
</template>

<script>
	import {formatMoney} from '@/common/js/util.js'
	export default{
		data(){
			return {}
		},
		computed:{
			formatFollows(){
				return formatMoney(this.follows, 0);
			},
			formatFollowedBy(){
				return formatMoney(this.followedBy, 0);
			},
			formatComments(){
				return formatMoney(this.comments, 0);
			},
			formatAnswers(){
				return formatMoney(this.answers, 0);
			}
		},
		props:{
			name:{
				default:""
			},
			header:{
				default:""
			},
			days:{
				default:0
			},
			follows:{
				default:0
			},
			followedBy:{
				default:0
			},
			comments:{
				default:0
			},
			answers:{
				default:0
			}
		}
	}
</script>

<style scoped="true">
	.u-h-bg{
		display: flex;
		flex-direction: column;
		position: relative;
		height: 255rpx;
		background:pink;
	}
	.u-h-bg-1{
		flex: 1;
		background: #FC769E;
		/* background: yellow; */
	}
	.u-h-bg-2{
		flex: 1;
		background: white;
	}
	.u-h-img{
		position: absolute;
		left: 40rpx;
		top: 40rpx;
		border-radius: 50%;
		width: 175rpx;
		height: 175rpx;
	}
	.u-h-name{
		font-size: 35rpx;
		font-weight: bold;
		position: absolute;
		bottom: 60rpx;
		left: 255rpx;
	}
	.u-h-days{
		font-size: 34rpx;
		color:#666666;
		margin-left: 30rpx;
	}
	.u-h-follow{
		margin-top: 20rpx;
		font-size: 34rpx;
		margin-left: 30rpx;
	}
	.u-h-follow-number{
		font-size: 38rpx;
		color: #FC769E;
		font-weight: bold;
	}
	.u-h-followby{
		margin-top: 20rpx;
		font-size: 32rpx;
		margin-left: 30rpx;
	}
	.u-h-followby-number{
		font-size: 36rpx;
		color: #3366FF;
		font-weight: bold;
	}
</style>
