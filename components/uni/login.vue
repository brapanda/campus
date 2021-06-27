<template>
	<view class="cu-modal" :class="{ show : (showModal && (!hasLogin))}">
		<view class="cu-dialog bg-white">
			<view class="cu-bar bg-white justify-end">
				<view class="content">授权头像昵称</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="login-img-c">
				<image src="../../static/img/login-show.png" mode="widthFix"></image>
			</view>
			<view class="padding bg-white">
				授权后可体验所有功能
			</view>
			<view class="cu-bar bg-white">
				<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
				<view class="action margin-0 flex-sub text-green solid-left" @tap="testLogin">确定</view>
<!-- 				<button class="cu-btn bg-white text-blue margin-0 flex-sub" open-type="getUserInfo"
				withCredentials="true" @getuserinfo="afterGetUserInfo">确定</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState} from 'vuex';
	import {
		loginHandle,logoutHandle,forcedLogin,authRequestMap,notLoginHandle,setUserAllInfo,setUserInfo,getUserInfo,getAuth,zRequestMap
	} from '@/common/js/util.js'
	export default{
		data(){
			return {
			}
		},
		onLoad() {
			console.log("是否登陆", this.hasLogin);
		},
		computed:{
			...mapState(["hasLogin"])
		},
		methods:{
			testLogin(){
				loginHandle("token1", 123, "testtavat", "name");
			},
			hideModal(){
				this.$emit('update:showModal', false);
			},
			afterGetUserInfo(e) {
				// #ifdef MP-TOUTIAO
				return;
				// #endif
				if(e && e.detail && e.detail.userInfo){
					var _this = this;
					var provider = "";
					var api = "";
					// #ifdef MP-WEIXIN
					provider = "weixin"
					api = "/api/user/MWechatLogin";
					// #endif
					// #ifdef MP-QQ
					provider = "qq";
					api = "/api/user/MQQLogin";
					// #endif
					var shareFrom = uni.getStorageSync("shareFrom");
					if(shareFrom) api = api + "?u=" + shareFrom;
					
					var nickName = e.detail.userInfo.nickName; //昵称
					var avatarUrl = e.detail.userInfo.avatarUrl; //头像
					var ge = e.detail.userInfo.gender;
					uni.login({
						provider: provider,
						success: function(loginRes) {
							var code = loginRes.code;
							uni.showLoading({
								title: "> < 加载中...",
								mask: false
							});
							_this.serverLogin(api, code, avatarUrl, nickName,ge);
						}
					});
				}
			},
			serverLogin(api, code, avatarUrl, nickName,ge){
				var _this = this;
				zRequestMap(api, {
					code: code,
					avatar: avatarUrl,
					name: nickName,
					ge: ge
				}, "POST").then(
					function(result) {
						uni.hideLoading();
						if (result.success) {
							//var seessionKey = result.data.data.Session;
							var token = result.data.data.tk;
							var id = result.data.data.id
							loginHandle(token, id, avatarUrl, nickName);
							//_this.hideModal();
							_this.$emit("loginSuccess");
						} else {
							uni.showToast({
								icon: 'none',
								title: result.message || '登陆失败请重试！',
								mask: true,
								duration: 2000
							});
						}
					}
				)
			}
		},
		props:{
			showModal:{
				default:true
			}
		}
	}
</script>

<style scoped="true">
	.login-img-c{
		display: flex;
		padding: 0 200rpx;
	}
</style>
