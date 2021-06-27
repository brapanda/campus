<template>
	<view class="card-outside">
		<view class="card" >
			<view class="card-info" @click="openDetail">
				<view class="card-info-detail card-info-left">
					<view >
						<image class="card-img" :src="placeholderSrc" mode="aspectFill" v-if="!loaded"></image>
						<image class="card-img placeholder" :class="{loaded: loaded}" mode="aspectFill" @load="imageLoaded" :src="info.showImg?info.Photo:''"> </image>
						<!-- <lazyImg :show="info.showImg" :src="info.Photo" :index="index" mode="aspectFill" class="card-img" ></lazyImg> -->
					</view>
				</view>
			</view>
			<view class="d-card-g">
			</view>
		</view>
	</view>
</template>

<script>
	import lazyImg from '@/components/img/lazy-img.vue'
	
	export default{
		components:{
			lazyImg
		},
		data(){
			return {
				loaded: true,
				info : {
					ID: 18075560,
					TransactionType: "For sale",
					SizeTotalText: "50.41x129.29 FT",
					Price: 1798888,
					Lease: null,
					BathroomTotal: 4,
					BedroomTotal: 4,
					ListingID: "N3775448",
					StreetAddress: "693 FOXCROFT Boulevard ",
					City: "Newmarket",
					Province: "Ontario",
					PostalCode: "L3X1N2",
					LocationLat: 44.041649,
					LocationLng: -79.428848,
					Status: 2,
					SoldPrice: null,
					PropertyTax: null,
					SoldDate: null,
					ListingContractDate: "2016-11-18",
					Photo: "https://f001.backblazeb2.com/file/trebimg/house/E4328249/1.jpg",
					Dom:"1",
					BookLink: "https://cen060-wc.globalwolfweb.com/onlineshowing.asp",
					Ad:"Y",
					showImg:true,
				}
			};
		},
		computed:{
		},
		mounted() {
			console.log('test')
		},
		onLoad() {
			console.log("test")
		}, 
		methods:{
			imageLoaded(e){
				var _this = this;
				this.loaded = true;
				//_this.$emit('imageLoaded', _this.index);
			},
		},
		props:{
			
		}
	}
</script>

<style scoped="true">
	.card-outside{
		padding: 0upx 20upx;
		background: #fbfbfb;
	}
	.card{
		max-height: 300upx;
		/* width: 100%; */
		border-radius: 15upx;
		background-color: white;
		/* background-color: pink; */
		overflow: hidden;
		margin-top: 20upx;
		/* background: green; */
		box-shadow: 0 0 18upx #dedede;
		position: relative;
	}
	.card-mask{
		height: 300upx;
		width: 100%;
		position: absolute;
		top:0upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card-mask-detail{
		display: flex;
		flex-direction: row;
		margin-right: 20upx;
	}
	.card-info{
		display: flex;
		display: -webkit-flex;
		max-height: 220upx;
		max-width: 100%;
		text-align: left;
	}
	
	.card-info-detail{
		max-height: 220upx;
	}
	.card-info-detail>div{
	    text-align: center;
	}
	
	.card-info-left{
	    width: 45%;
	}
	
	.card-info-right{
	    width: 55%;
	}
	
	.card-info-detail-summary{
	    padding: 16upx 16upx
	}
	
	.card-img{
		max-width: 100%;
		max-height: 220upx;
		/* text-align: center; */
		/* display: table-cell */
	 }
	
	.card-general{
		display: -webkit-flex;
		display: flex;
		padding:6upx 30upx;
		text-align: center;
		font-size: 28upx;
	 }
	
	.card-general>span{
		flex:1;
	}
	
	 .d-card-g{
	    display: flex;
	    display: -webkit-flex;
	    /* padding: 10px; */
	    text-align: center;
	    height: 70upx;
	    line-height: 70upx;
	    font-size: 24upx;
		font-weight: 500;
	 }
	
	 .d-card-g-b{
	    flex: 1;
	    vertical-align: middle;
	    text-align: center;
	    /* display: table; */
	 }
	  .d-card-g-l-b{
	    flex: 1;
	    height: 100%;
	    width: 100%;
	 }
	
	.full{
	    height: 100%;
	    width: 100%;
	}
	.tag-style{
		border-radius: 5upx;
		font-size: 20upx;
		height: 35upx;
		margin-left: 15upx;
		margin-bottom: 5upx;
	}
	.through-line{
		text-decoration: line-through;
	}
	.m-in-line{
		display: inline;
	}
	.summary-address{
		font-size: 28upx;
		font-weight: 500;
	}
	.summary-detail{
		font-size: 24upx;
		font-weight: 300;
	}
	.placeholder {
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}
	.placeholder.loaded {
		opacity: 1;
	}
</style>
