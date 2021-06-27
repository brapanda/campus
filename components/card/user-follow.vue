<template>
	<view class="u-f-c">
		<view class="u-f-user">
			<image class="u-f-user-header" :src="header" mode="widthFix"></image>
			<view class="u-f-user-info">
				<view class="u-f-user-info-name">{{name}}</view>
				<view class="u-f-user-info-param">
					<view class="u-f-user-info-param-item">{{formatFollows}} 关注</view>
					<view class="u-f-user-info-param-item">{{formatAnswers}} 回答</view>
				</view>
			</view>
		</view>
		<view class="u-f-btn" v-if="inviteUse">
			<button class="cu-btn bg-main" v-if="!followed" @click="inviteClick">+ 邀请</button>
			<button class="cu-btn text-white" v-else @click="unInviteClick">已邀请</button>
		</view>
		<view class="u-f-btn" v-else>
			<button class="cu-btn bg-main" v-if="!isFollowed" @click="followClick">+ 关注</button>
			<button class="cu-btn text-white" v-else @click="unFollowClick">已关注</button>
		</view>
	</view>
</template>

<script>
	import {formatNumber} from "@/common/js/util.js";
	export default{
		data(){
			return {
				isFollowed:false
			}
		},
		methods:{
			inviteClick(){
				this.$emit("inviteClick");
			},
			followClick(){
				this.$emit("followClick");
				this.isFollowed = true;
			},
			unInviteClick(){
				this.$emit("unInviteClick");
			},
			unFollowClick(){
				this.$emit("unFollowClick");
				this.isFollowed = false;
			}
		},
		computed:{
			formatAnswers(){
				return formatNumber(this.answers);
			},
			formatFollows(){
				return formatNumber(this.follows);
			}
		},
		watch:{
			followed: {
			　　handler(newValue) {
			  　	this.isFollowed = newValue;	 　　
				},
			　　immediate: true
			}
		},
		props:{
			// id:{
			// 	default:0
			// },
			header:{
				default:"/static/img/header.jpg"
			},
			name:{
				default:"用户名字很长"
			},
			follows:{
				default: 1699
			},
			answers:{
				default:878789
			},
			followed:{
				default:false
			},
			inviteUse:{
				default:false
			}
		}
	}
</script>

<style scoped="true">
	.u-f-c{
		margin-top: 20rpx;
		padding:  25rpx;
		background: white;
		display: flex;
	}
	.u-f-user{
		flex: 1;
		display: flex;
		align-items: center;
	}
	.u-f-user-header{
		width: 100rpx;
		height: 100rpx;
		margin-right: 15rpx;
		margin-bottom: 10rpx;
		border-radius: 50rpx;
	}
	.u-f-user-info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100rpx;
	}
	.u-f-user-info-name{
		font-size: 30rpx;
		color: 333;
	}
	.u-f-user-info-param{
		display: flex;
	}
	.u-f-user-info-param-item{
		color: #FC769E;
		font-size: 27rpx;
		width: 150rpx;
	}
	.u-f-btn{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>
