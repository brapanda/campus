<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="m-row-title">旧密码：</text>
                <m-input class="m-row-content m-flex-item" type="password" displayable v-model="oldPassword" placeholder="请输入旧密码"></m-input>
            </view>
            <view class="input-row ">
                <text class="m-row-title">新密码：</text>
                <m-input class="m-row-content m-flex-item" type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary m-btn" @tap="changePassword">提交</button>
        </view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';
	import {zFormReuestMap, zRequestMap,emailReg,forcedLogin} from '@/common/js/util.js';
	var md5 = require("@/common/js/md5.min.js");
	
    export default {
        components: {
            mInput
        },
        data() {
            return {
                email: '',
				oldPassword : '',
				password : ''
            }
        },
        methods: {
            changePassword() {
				if(!this.email){
                    uni.showToast({
                        icon: 'none',
                        title: '非邮箱用户不可更改密码',
                    });
                    return;
				}
                if (!emailReg.test(this.email)) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
                if (this.password.length < 8) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 8 个字符'
                    });
                    return;
                }
                if (this.oldPassword.length < 1) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入旧密码'
                    });
                    return;
                }
				uni.showLoading({
					title: '请求中。。。',
					mask: false
				});
				
				var data = {
					np: md5(this.email + this.password),
					op: md5(this.email + this.oldPassword)
				};

				var _this = this;
                zFormReuestMap("/api/user/PassReset", data, "POST", true).then(function(result){ 
					uni.hideLoading();
					if(result.success){
						uni.showToast({
							title: '密码已修改',
							mask: false,
							duration: 1500
						});
						
						uni.redirectTo({
							url: '/pages/main/main',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}else{
						uni.showToast({
							title: result.message,
							mask: false,
							duration: 1500
						});
					}
				});
				
				uni.hideLoading();
			}
        },
		onLoad(e){
			if(e && e.email){
				this.email = e.email;
			}
		}
    }
</script>

<style>

</style>
