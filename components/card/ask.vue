<template>
	<view class="ask-c" @click="openDetail">
		<view class="ask-title" v-if="title" v-html="title"></view>
		<view class="ask-answer-user" v-if="header">
			<image class="ask-answer-user-header" :src="anonymous ? anonymousHeader : header" mode="widthFix"></image>
			<view class="ask-answer-user-name">{{anonymous ? anonymousName : name}}</view>
		</view>
		<view class="ask-answer-content" v-html="content" v-if="content"></view>
		<view class="ask-answer-status">
			<view class="ask-answer-status-item" v-if="showViews">
				<text class="cuIcon-attention ask-answer-status-item-icon"></text>
				<view>{{formatViews}}查看</view>
			</view>
			<view class="ask-answer-status-item" v-if="showUps">
				<text class="cuIcon-appreciate ask-answer-status-item-icon"></text>
				<view>{{formatUps}}赞同</view>
			</view>
			<view class="ask-answer-status-item" v-if="showComments">
				<view class="cuIcon-comment ask-answer-status-item-icon"></view>
				<view>{{formatComments}}评论</view>
			</view>
			<view class="ask-answer-status-item" v-if="showAnswers">
				<view class="cuIcon-comment ask-answer-status-item-icon"></view>
				<view>{{formatAnswers}}回答</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatNumber} from "@/common/js/util.js";
	export default{
		data(){
			return {
				anonymousHeader:"/static/img/anonymous.png",
				anonymousName:"匿名用户"
			}
		},
		methods:{
			openDetail(){
				this.$emit("openAsk");
			}
		},
		computed:{
			
			formatUps(){
				return formatNumber(this.ups);
			},
			formatComments(){
				return formatNumber(this.comments);
			},
			formatAnswers(){
				return formatNumber(this.answers);
			},
			formatViews(){
				return formatNumber(this.views);
			}
		},
		props:{
			anonymous:{
				default:false
			},
			title:{
				default:""
			},
			header:{
				default:""
			},
			name:{
				default:""
			},
			content:{
				default:""
			},
			ups:{
				default: 0
			},
			comments:{
				default: 0
			},
			answers:{
				default:0
			},
			views:{
				default: 0
			},
			showUps:{
				default: false
			},
			showViews:{
				default: false
			},
			showComments:{
				default: false
			},
			showAnswers:{
				default :false
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
		font-size: 35rpx;
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
	.ask-answer-user{
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}
	.ask-answer-user-header{
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.ask-answer-user-name{
		font-size: 25rpx;
		color: #333;
		font-weight: bold;
		text-overflow: ellipsis;
		overflow : hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 250rpx;
		margin-left: 10rpx;
	}
	.ask-answer-content{
		color:#515151;
		font-size: 28rpx;
		margin-top: 10rpx;
		line-height: 40rpx;
		
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
