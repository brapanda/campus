<template>
	<view class="u-f-c">
		<view class="u-f-user">
			<image class="u-f-user-header" :src="header" mode="widthFix"></image>
			<view class="u-f-user-info-name m-line-1">{{name}}</view>
		</view>
		<view class="u-content" v-html="content">
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			}
		},
		props:{
			header:{
				default:""
			},
			name:{
				default:""
			},
			content:{
				default:""
			},
		}
	}
</script>

<style scoped="true">
	.u-f-c{
		/* margin-top: 20rpx; */
		/* padding:  25rpx; */
		padding: 0rpx 25rpx 25rpx 25rpx;
		background: white;
		display: flex;
		flex-direction: column;
	}
	.u-f-user{
		display: flex;
		align-items: center;
	}
	.u-f-user-header{
		width: 60rpx;
		height: 60rpx;
		margin-right: 15rpx;
		/* margin-bottom: 10rpx; */
		border-radius: 30rpx;
	}
	.u-f-user-info-name{
		font-size: 30rpx;
		color: 333;
		font-weight: bold;
		/* white-space: nowrap; */
		overflow: hidden;
		flex:1;
	}
	.u-content{
		margin-top:10rpx;
		margin-left:75rpx;
	}
</style>
