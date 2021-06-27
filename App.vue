<script>
	import Vue from 'vue';
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.systemInfo = e;
					console.log('envirenment:', e);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/css/colorui/main.css';
	/* @import './common/css/colorui/icon.css'; */
	
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}
	
	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}
	
	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	.m-row{
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
	}
	.m-column{
		display: flex;
		flex-direction: column;
	}
	.m-flex-item{
		flex: 1;
	}
	
	.m-txt-center{
		text-align: center;
	}
	
	.m-left-border{
		border-left-style: solid;
		border-left-color:#eee;
		width: 1upx;
	}
	.m-right-border{
		border-right-style:solid;
		border-right-color:#eee;
		width: 1upx;
	}
	.m-v-line{
		width: 100%;
		height: 1upx;
		background: #eee;
		margin: 10upx 0;
	}
	.m-h-line{
		width: 1upx;
		height: 30upx;
		background: #7a7a7a;
		margin-top: 50upx;
	}
	.m-row-title{
		font-size: 32upx;
		width: 20%;
		height: 26px;
		min-height: 26px;
		padding: 8px 0;
		padding-left: 16px;
		line-height: 26px;
	}
	.m-row-content{
		font-size: 28upx;
		display: flex;
		align-items: center;
	}
	
	.m-btn{
		line-height: 75upx;
		font-size: 33upx;
	}
	.m-title-size{
		font-size: 32upx;
	}
	.m-not-login{
		filter: blur(5px);
	}
	.contact-btn-setting{
		position: fixed;
	}
</style>
