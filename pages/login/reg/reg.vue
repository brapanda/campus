<template>
    <view class="content background-style">
        <view class="input-group">
            <view class="input-row border">
                <text class="m-row-title">邮箱：</text>
                <m-input class="m-row-content m-flex-item" type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
            <view class="input-row ">
                <text class="m-row-title">密码：</text>
                <m-input class="m-row-content m-flex-item" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary m-btn" @tap="getCode">注册</button>
        </view>
		<uni-popup :show="popType === 'code'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<email-check :email="email" @verify="registerWithCode" @cancel="togglePopup('')"></email-check>
		</uni-popup>
    </view>
</template>

<script>
    import mInput from '../../../components/m-input.vue';
	import emailCheck from '@/components/module/email-check.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import {zFormReuestMap, zRequestMap,emailReg,forcedLogin} from '@/common/js/util.js';
	var md5 = require("@/common/js/md5.min.js");
	
    export default {
        components: {
            mInput,
			emailCheck,
			uniPopup
        },
        data() {
            return {
				popType : '',
                password: '',
                email: ''
            }
        },
        methods: {
			togglePopup(val){
				this.popType = val;
			},
			//获取验证码
            getCode() {
                if (this.password.length < 8) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 8 个字符'
                    });
                    return;
                }
                if (!emailReg.test(this.email)) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }
				var _this = this;
				
				uni.showLoading({
					title: '请求验证码中。。。',
					mask: false
				});
				
				try{
					zRequestMap("/api/user/EmailCode?id=" + _this.email, null, "GET").then(function(result){ 
						uni.hideLoading();
						if(result.success){
							_this.togglePopup('code');
						}else{
							uni.showToast({
								title: result.message,
								mask: false,
								duration: 1500
							});
						}
					});
				}catch(e){
					uni.showToast({
						title: "请重试",
						mask: false,
						duration: 1500
					});
				}

				uni.hideLoading();
            },
			//注册
			registerWithCode(code){
				uni.showLoading({
					title: '注册中。。。',
					mask: false
				});
				var data = {
					el: this.email,
					p: md5(this.email + this.password),
					c : code
				};
				var _this = this;
                zFormReuestMap("/api/user/EmailRWithCode", data, "POST").then(function(result){ 
					uni.hideLoading();
					if(result.success){
						uni.showToast({
							title: '注册成功',
							mask: false,
							duration: 1500
						});
						
						_this.toMain(result.data.data.accessToken,result.data.data.id);
					}else{
						uni.showToast({
							title: result.message,
							mask: false,
							duration: 1500
						});
					}
				});
				
				uni.hideLoading();
			},
			//登陆成功操作
			toMain(token,id) {
				loginHandle(token, id);
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
        }
    }
</script>

<style>
	.background-style{
		background: #fbfbfb;
	}
</style>
