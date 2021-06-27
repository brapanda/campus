<template>
	<view class="width-full bg-color">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title" style="font-weight: 700;">收款人账户</text>
			</view>
			<button class='cu-btn bg-cyan shadow' style="margin-right: 40upx;" @click="addPayee">添加</button>
		</view>
		<block v-for="(payeeItem, payeeIndex) in payeeList" :key="payeeIndex">
			<accountItem :data="payeeItem" @click="goPayee(payeeItem)"></accountItem>
		</block>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title" style="font-weight: 700;">付款人账户</text>
			</view>
			<button class='cu-btn bg-cyan shadow' style="margin-right: 40upx;" @click="addPayer">添加</button>
		</view>
		<block v-for="(payerItem, payerIndex) in payerList" :key="payerIndex">
			<accountItem :data="payerItem" @click="goPayer(payerItem)"></accountItem>
		</block>
	</view>
</template>

<script>
	// import transList from "@/components/trans-item/trans-list-item.vue"
	// import uniMediaList from '@/components/uni-media-list/uni-media-list.vue';
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {zRequestMap,formatMixDate,friendlyDate} from '@/common/js/util.js'
	import accountItem from "@/components/uni-media-list/account-item.vue"

	export default{
		data(){
			return{
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				scrollLeft: 0,
				refreshing: true,
				refreshText: '下拉可以刷新',
				payeeList: [
					{id: '1',type:true,accountName: "1"}
					// {id: 230,
					// 	address: "#10-88 Bayview Street, Toronto, Ontario M1V3N3",
					// 	mlsid: "C250032",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "0",
					// 	article_type:1},
					// {id: 230,
					// 	address: "test",
					// 	mlsid: "test",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "1",
					// 	article_type:1},
					// {id: 230,
					// 	address: "test",
					// 	mlsid: "test",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "1",
					// 	article_type:1}
					
				],
				payerList: [
					{id: '1',type:false,accountName: "1"}
					// {id: 230,
					// 	address: "#10-88 Bayview Street, Toronto, Ontario M1V3N3",
					// 	mlsid: "C250032",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "0",
					// 	article_type:1},
					// {id: 230,
					// 	address: "test",
					// 	mlsid: "test",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "1",
					// 	article_type:1},
					// {id: 230,
					// 	address: "test",
					// 	mlsid: "test",
					// 	time: "2020-02-24",
					// 	image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
					// 	paid: "1",
					// 	article_type:1}
					
				],
				tabIndex: 0,
				page: 1,
				
			}
			
		},
		components:{
			// transList,
			// uniMediaList,
			// uniLoadMore
			accountItem
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log("on refresh")
			this.onRefresh()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods:{
			goPayee(item){
				uni.navigateTo({
					url: '/pages/info/addPayee?item=' + JSON.stringify(item)
				})
				
			},
			goPayer(item){
				uni.navigateTo({
					url: '/pages/info/addPayer?item=' + JSON.stringify(item)
				})
			},
			addPayee(){
				uni.navigateTo({
					url: '/pages/info/addPayee',
				})
			},
			addPayer(){
				uni.navigateTo({
					url: '/pages/info/addPayee',
				})
			},
			getList(action = 1) {
				let _this = this
				this.loadingText = '加载中...';
				let url = '/api/User/AccountList'
				let para = {
				}
				console.log("request",url,para)
				zRequestMap(url,para,"GET").then(
					function(result){
						console.log('result',result)
						if(result.success){
							if (result.data){
								console.log("data",result.data.data)
								const data = result.data.data.map((account)=>{
									return {
										id: account.id,
										type: account.type,
										accountName:account.accountName
									}
								})
								console.log("data2",data)
								for (let i = 0; i < data.length; i++){
									if (data[i].type == true){
										_this.payeeList.push(data[i])
									}else{
										_this.payerList.push(data[i])
									}
								}
							}
						}else{
							_this.loadingText = "没有更多记录"
						}
						uni.stopPullDownRefresh()
					}
				)
			},
			loadMore() {
				console.log('load more');
				this.getList(2);
			},
			onRefresh(event) {
				this.refreshText = '正在刷新...';
				this.refreshing = true;
				this.page = 1
				this.newsList[this.tabIndex].data = []
				this.getList();
			},
			goDetail(){
				uni.navigateTo({
					url: '../info/contract-info?user='
				})
			}
		},
		onLoad(e) {
			console.log(e)
			this.getList();
		}
	}
	
</script>

<style>
	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 11px;
		line-height: 1.8;
	}

	.uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.uni-tab-bar .list {
		width: 750upx;
		height: calc(100% - 100upx);
		margin-top: 100upx;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 100upx;
		height: 100upx;
		border-bottom: 1px solid #c8c7cc;
		position: fixed;
		background: #FFFFFF;
		z-index: 999;
		top: var(--window-top);
		left: 0;
	}

	.swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.uni-tab-bar .active {
		color: #007AFF;
	}

	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
		overflow: scroll;
	}

	.uni-tab-bar-loading {
		text-align: center;
		padding: 20upx 0;
		font-size: 14px;
		color: #CCCCCC;
	}
	.news-list{
		padding-top: 0upx;
	}
	.news-loading-text{
		width: 750upx;
		text-align: center;
	}
</style>
