<template>
	<view class="bg-color">
		<scroll-view scroll-y class="page center-style">
			<!-- <image :src="info.img"
			 mode="widthFix" class="response"></image> -->
			<view class="cu-avatar xl round avatar-style" :style="'background-image: url(' + info.logo + ')'"></view>
			
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view class="cu-list comment solids-top">
						<view class="cu-item">
							<view class="content">
								<view class="text-grey title">{{info.name}}</view>
								<view class="text-gray text-content text-df sub-title">
									{{info.slogan}}
								</view>
								<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view class="flex-sub">{{info.about}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view>
						<text class="cuIcon-phone text-green icon-style"></text>
						<text class="text-black text-style">电话: {{info.phoneText}}</text>
					</view>
					<view class="action">
						<button class="round btn-text bg-green shadow" @tap="callPhone">
							<text></text>呼叫</button>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view>
						<text class="cuIcon-mail text-pink icon-style"></text>
						<text class="text-black text-style">邮件</text>: {{info.email}}</text>
					</view>
					<view class="action">
						<button class="round btn-text bg-pink shadow" @tap="copyEmail">
							<text></text>复制</button>
					</view>
				</view>
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view>
						<text class="cuIcon-discover text-mauve icon-style"></text>
						<text class="text-black text-style">网站: {{info.website}}</text>
					</view>
					<view class="action">
						<button class="round bg-mauve shadow btn-text" @tap="copyWeb">
							<text></text>前往</button>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="margin-top"></view>
	</view>
</template>

<script>
	import {appVersion} from '@/common/js/util.js'
	export default {
		name: "basics",
		data() {
			return {
				info:{
					img: "",
					name : "悠居科创",
					slogan :"为改变世界而成长",
					logo: 'https://youju.nyc3.digitaloceanspaces.com/PublicImage/Other/Pay-Logo-001.png',
					about: "悠居科创，专注于高端网站建设，Android，iOS多平台App开发，微信小程序高端定制，数据采集与挖掘以及SEO ASO优化。多年行业经验的资深团队，秉持标新立异的创新精神，在互联网浪潮中为服务过的多家企业创造了众多美观的高性能产品，帮助企业在同行业竞争中脱颖而出，成为行业领先者。",
					phone: "6476861789",
					phoneText:"647.686.1789",
					email:"vigorous.network@gmail.com",
					website:"http://solution.youju.ca",
				},
				menuBorder: false,
				menuArrow: false,
				menuCard: true,
			};
		},
		methods:{
			callPhone(){
				// window.location.href = 'tel://' + this.info.phone
				uni.makePhoneCall({
					phoneNumber: this.info.phone
				})
				console.log("call phone")
			},
			copyEmail(){
				// uni.setClipboardData({
				// 	data: this.info.email,
				// 	success() {
				// 		console.log("copy email success")
				// 	},
				// 	fail() {
				// 		console.log("copy email fail")
				// 	},
				// 	complete() {
				// 		console.log("copied")
				// 	}
				// })
				// window.location.href = 'mailto://' + this.info.email
				uni.setClipboardData({
					data: this.info.email,
					success() {
					}
				})
				console.log("copy email")
			},
			copyWeb(){
				uni.navigateTo({
					url: '/pages/main/banner-page?url=' + 'https://solution.zouzuhui.top',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				// uni.setClipboardData({
				// 	data: this.info.website,
				// 	success() {
				// 	}
				// })
				// window.location.href=this.info.website
				console.log("copy web")
			}
		},
		onShow() {
			console.log("success")
		},
		onLoad(option) {
			if(option){
				if(option.agentInfo){
					console.log("user info",option)
					let infoData = option.agentInfo
					console.log("infodata",infoData)
					if (infoData){
						let agentInfo = JSON.parse(infoData)
						for (var i in agentInfo){
							console.log("agent info about us",agentInfo[i])
							agentInfo[i] = decodeURIComponent(agentInfo[i])
						}
						console.log("agent info",agentInfo)
						if (agentInfo){
							var newInfo = {
								img : "",
								name : agentInfo.name,
								slogan: agentInfo.company_name,
								logo : agentInfo.header,
								about : agentInfo.detail,
								phone : agentInfo.phone,
								phoneText : agentInfo.phone,
								email : agentInfo.email,
								website : agentInfo.site
							}
							this.info = newInfo
						}
						
						// let agentInfo = uni.getStorageSync("user:agentInfo")
						// console.log("about us agent info",agentInfo)
						// if (agentInfo){
						// 	var newInfo = {
						// 		img : "",
						// 		name : agentInfo.name,
						// 		slogan: "",
						// 		logo : agentInfo.header,
						// 		about : agentInfo.detail,
						// 		phone : agentInfo.phone,
						// 		phoneText : agentInfo.phone,
						// 		email : agentInfo.email,
						// 		website : agentInfo.site
						// 	}
						// 	this.info = newInfo
						// }
					}
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.bg-color{
		height: 100%;
		width: 100%;
		background: #fbfbfb;
	}
	.center-style{
		display: inline-flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		text-align: center;
	}
	.avatar-style{
		margin-top: 40upx;
	}
	.about-text{
		padding: 20upx 20upx;
	}
	.title{
		font-size: 40upx;
		font-weight: 500;
		text-align: center;
	}
	.sub-title{
		text-align: center;
		font-size: 30upx;
		font-weight: 400;
		color: #82848A
	}
	.icon-style{
		font-size: 40upx;
		padding-right: 20upx;
		padding-top: 5upx;
	}
	.text-style{
		font-size: 26upx;
		font-weight:4 500;
		margin-bottom: 20upx;
	}
	.btn-text{
		height: 60upx;
		font-size: 24upx;
	}
</style>
