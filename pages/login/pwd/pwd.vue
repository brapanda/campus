<template>
    <view class="content background-style">
        <view class="input-group">
            <view class="input-row">
                <text class="m-row-title">邮箱：</text>
                <m-input  class="m-row-content m-flex-item" type="text" focus clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary m-btn" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import mInput from '../../../components/m-input.vue';
	import {zFormReuestMap, zRequestMap,emailReg,forcedLogin} from '@/common/js/util.js';
	
    export default {
        components: {
            mInput
        },
        data() {
            return {
                email: ''
            }
        },
        methods: {
            findPassword() {
                /**
                 * 仅做示例
                 */
                if (!emailReg.test(this.email)) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法',
                    });
                    return;
                }
				uni.showLoading({
					title: '请求中。。。',
					mask: false
				});

				var _this = this;
                zRequestMap("/api/user/EmailPassReset?el=" + this.email, null, "GET").then(function(result){ 
					uni.hideLoading();
					if(result.success){
						uni.showToast({
							title: '验证信息已发送至邮箱',
							mask: false,
							duration: 1500
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
        }
    }
</script>

<style>
	.background-style{
		background: #fbfbfb;
	}

</style>
