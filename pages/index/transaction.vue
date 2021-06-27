<template>
	<view class="width-full bg-color">
		<view v-for="(tabItem, idx) in newsList" style="height:100%;" :key="idx" v-if="tabIndex === idx" scroll-y>
			<block v-for="(newsItem, newsIndex) in newsList" :key="newsIndex">
				<uni-media-list :data="newsItem" @click="goDetail(newsItem)"></uni-media-list>
			</block>
			<view class="uni-tab-bar-loading">
				<view class="loading-more news-loading-text">{{loadingText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import transList from "@/components/trans-item/trans-list-item.vue"
	// import uniMediaList from '@/components/uni-media-list/uni-media-list.vue';
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {zRequestMap,formatMixDate,friendlyDate} from '@/common/js/util.js'

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
				newsList: [
					{id: 230,
						address: "#10-88 Bayview Street, Toronto, Ontario M1V3N3",
						mlsid: "C250032",
						time: "2020-02-24",
						image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
						paid: "0",
						article_type:1},
					{id: 230,
						address: "test",
						mlsid: "test",
						time: "2020-02-24",
						image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
						paid: "1",
						article_type:1},
					{id: 230,
						address: "test",
						mlsid: "test",
						time: "2020-02-24",
						image_url: "https://f001.backblazeb2.com/file/trebimg/house_news/22433132bcacc39a23a133595769ac81.jpg",
						paid: "1",
						article_type:1}
					
				],
				tabIndex: 0,
				page: 1,
			}
			
		},
		// components:{
		// 	transList,
		// 	uniMediaList,
		// 	uniLoadMore
		// },
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			console.log("on refresh")
			this.onRefresh()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods:{
			getList(action = 1) {
				let _this = this
				let activeTab = this.newsList[this.tabIndex];
				// activeTab.requestParams.time = new Date().getTime() + '';
				// if (action === 1) {
				// 	activeTab.requestParams.minId = 0;
				// }
				this.loadingText = '加载中...';
				let url = '/api/other/news'
				let para = {
					"id" : this.page
				}
				console.log("request",url,para)
				zRequestMap(url,para,"GET").then(
					function(result){
						console.log('result',result)
						if(result.success){
							if (result.data){
								var newsList = []
								newsList = result.data.data
								console.log("news result",newsList)
								const data = result.data.data.map((news)=>{
									return {
										id: news.id,
										address: news.nm,
										mlsid: news.s,
										time: formatMixDate(news.t),
										image_url: news.i,
										count: news.v,
										article_type:1,
									}
								})
								if(data.length < 10){
									_this.loadingText = "没有更多记录"
								}else{
									_this.page += 1
								}
								if (action == 1) {
									activeTab.data = data;
									_this.refreshing = false;
									uni.stopPullDownRefresh()
								} else {
									let dataLength = data.length
									if (dataLength < 10){
										let length = activeTab.data.length
										let compareNews = activeTab.data.slice(length - dataLength,length)
										let compareIds = compareNews.map(function(item){
											return item.id
										})
										console.log("compare data",compareIds,activeTab.data)
										data.forEach((news) => {
											if (!compareIds.includes(news.id)){
												console.log("includes news")
												activeTab.data.push(news);
											}
										});
									}else{
										data.forEach((news) => {
											activeTab.data.push(news);
										});
									}
									
								}
								// activeTab.requestParams.minId = data[data.length - 1].id;
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
