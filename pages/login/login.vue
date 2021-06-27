<template>
	<view class="content" style="background: #fbfbfb;">
		<view class="center-style">
			<view class="cu-avatar xl round avatar-style center-style" :style="'background-image: url(' + info.logo + ')'"></view>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="m-row-title">账号：</text>
				<m-input class="m-input m-row-content m-flex-item" @clear="accountClear" type="text" clearable v-model="account" :placeholder="i18n['Email'] || 'Email'"></m-input>
			</view>
			<view class="input-row">
				<text class="m-row-title">密码：</text>
				<m-input class="m-row-content m-flex-item" type="password" displayable v-model="password" :placeholder="i18n['Password'] || 'Password'"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary m-btn" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator class="m-title-size" url="reg/reg" style="color: #2a2a2a;">注册账号</navigator>
			<text>|</text>
			<navigator class="m-title-size" url="pwd/pwd" style="color: #DD6161;">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var md5 = require("@/common/js/md5.min.js");
	import {zFormReuestMap,loginHandle,forcedLogin,successRequest,setUserInfo} from '@/common/js/util.js'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				info:{
					img: "",
					logo: 'data:image/png;base64,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',
					about: "悠居科创，专注于高端网站建设，Android，iOS多平台App开发，微信小程序高端定制，数据采集与挖掘以及SEO ASO优化。多年行业经验的资深团队，秉持标新立异的创新精神，在互联网浪潮中为服务过的多家企业创造了众多美观的高性能产品，帮助企业在同行业竞争中脱颖而出，成为行业领先者。",
					phone: "6476861789",
					phoneText:"647.686.1789",
					email:"vigorous.network@gmail.com",
					website:"http://solution.youju.ca",
				},
				aweixin:null
			}
		},
		methods: {
			accountClear(){
				this.account = "";
			},
			initProvider() {
				var _this = this;
				const filters = ['weixin', 'facebook'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						console.log("res",res)
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/** 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。 反向使用 top 进行定位，可以避免此问题。 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			async bindLogin() {

				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				var data = {
					el: this.account,
					p: md5(this.account + this.password)
				};

				uni.showLoading({
					title:"登陆中...",
					mask:true
				});
				
				try{
					let result = await zFormReuestMap("/API/USER/EmailL", data)
					uni.hideLoading();
					if(result.success){
						
						console.log("user: info",result.data)
						this.toMain(result.data.data.accessToken,result.data.data.id),
						uni.navigateTo({
							url:"/pages/main/main"
						})
					}else{
						console.log('登陆失败:' + JSON.stringify(result));
						uni.showToast({
							icon:'none',
							title:  result.message,
							mask: true,
							duration: 2000
						});
					}
				}catch(e){
					uni.hideLoading();
					console.log(JSON.stringify(e));
					//TODO handle the exception
					uni.showToast({
						icon:'none',
						title: '登陆错误，重试',
						mask: true,
						duration: 2000
					});
				}
			},
			oauth(value) {
				var _this = this;
				uni.login({
					provider: 'weixin',
					success: (loginres) => {
						console.log('loginres',loginres);
						uni.getUserInfo({
							provider: 'weixin',
							success:function(res){
									uni.showLoading({
										title:"登陆中...",
										mask:true
									});
									
									console.log('user res',res);
									
									var data = {
										uid :loginres.authResult.openid,
										ut : loginres.authResult.access_token,
										nm : res.userInfo.nickName,
										hd : res.userInfo.avatarUrl,
										tp : 2,//2 微信
									};
									
									console.log('login param',data);
									
									try{
										zFormReuestMap("/API/USER/Login", data).then(function(result){
											uni.hideLoading();
											if(result.success){
												_this.toMain(result.data.data.accessToken,result.data.data.id, data.nm, data.hd),
												uni.navigateTo({
													url:"/pages/main/main"
												})
											}else{
												console.log('登陆失败:' + JSON.stringify(result));
												uni.showToast({
													icon:'none',
													title:  result.message,
													mask: true,
													duration: 2000
												});
											}
										});
									}catch(e){
										uni.hideLoading();
										console.log(JSON.stringify(e));
										//TODO handle the exception
										uni.showToast({
											icon:'none',
											title: '登陆错误，重试',
											mask: true,
											duration: 2000
										});
									}
							},
							fail(res) {}
						});
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});

			},
			//登陆成功操作
			toMain(token,id,nickName,  avatarUrl) {
				loginHandle(token, id);
				setUserInfo({avatar:avatarUrl, name:nickName || this.account,  id: id});
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (forcedLogin) {
					uni.reLaunch({
						url: '/pages/main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onLoad(e) {

			console.log('login on load');
			if(e && e.email){
				this.account = e.email;
			}
			this.initPosition();
			this.initProvider();
		},
		computed: {
			i18n() {
				return this.$t('message');
			}
		},
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #00bf8f;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
	.avatar-style{
		margin-top: 40upx;
	}
	.center-style{
		display: inline-flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		text-align: center;
	}
</style>
