<template>
	<view class="content zero-padding" style="background: #fbfbfb;">
		<form @submit="formSubmit" @reset="formReset">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<view class="cuIcon-title" style="font-weight: 700;">收款人信息</view>
				</view>
				<button class='cu-btn bg-cyan shadow' style="margin-right: 40upx;" @click="addPayee">添加</button>
			</view>
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						选择收款人
					</view>
					<picker @change="payeeChange" :value="payeeIndex" :range="payeeList" range-key="accountName">
						<view class="picker">
							{{payeeIndex>-1?payeeList[payeeIndex].accountName:'==请选择=='}}
						</view>
					</picker>
				</view>
			</view>
			
			
			<view class="cu-bar margin-top bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">付款人信息</text>
				</view>
				<button class='cu-btn bg-cyan shadow' style="margin-right: 40upx;" @click="addPayer">添加</button>
			</view>
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						选择付款人
					</view>
					<picker @change="payerChange" :value="payerIndex" :range="payerList" range-key="accountName">
						<view class="picker">
							{{payerIndex>-1?payerList[payerIndex].accountName:'==请选择=='}}
						</view>
					</picker>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">其他信息(可选)</text>
				</view>
				<view style="margin-right: 40upx;">
					<checkbox-group @change="boxChanged">
						<label>
							<checkbox value="true" :class="{'checked': checkBox == 'true'}" color="#1cbbb4" style="transform:scale(0.7)" />
						</label>
					</checkbox-group>
				</view>
			</view>

			<!-- 				<view>
					<sunuiUpimg :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunuiUpimg>
				</view> -->
			<view class="cu-list menu margin-top image-cell-height" :class="[true?'card-menu':'']" style="background: white;" v-if="checkBox=='true'">
				<view class="cell-pd">
					<view class="upload-image-container">
						<view class="uni-list-item__content-title image-container-left">文件</view>
						<view class="image-container-left"></view>
						<image class="image-container-right" :src="imageList['attach']" :data-src="imageList['attach']" @tap="chooseImage('attach')"
						 mode="aspectFill"></image>
					</view>
				</view>
				
			</view>
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;" v-if="checkBox=='true'">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						备注
					</view>
				</view>
				<view class="uni-list-item__container" style="height:225upx;">
				<view class="uni-list-item__content item-font" style="height:225upx; ">
					<textarea style="height: 200upx;width: 100%;font-size: 32upx;" name="desc" placeholder="填写备注" id="desc" @input="inputInfo"
						:value="initalData.Remark" />
					</view>
				</view>
			</view>

				
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">金额总计</text>
				</view>
			</view>
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						支付金额  $
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="amount" type="number" placeholder="金额" id="amount" @input="inputInfo" :value="initalData.Amount"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						服务费  $
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right;">{{service*100+'%'}}</view>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						总计支付  $
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right;">{{(Number(initalData.Amount)*(1+Number(service))).toFixed(2)}}</view>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						汇率 CAD/RMB
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right;">{{rate}}</view>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						总计人民币 ￥
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right;font-size: 50upx;">{{(Number(initalData.Amount)*(1+Number(service))*(Number(rate))).toFixed(2)}}</view>
					</view>
				</view> 
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="formSubmit">支付</button>
			</view>

		</form>
		<!-- #ifndef H5 -->
		<canvas canvas-id='myCanvas-attach' :style="'position:absolute;border: 1px solid red; width:'+imgFrameDic.attach.width+'px;height:'+imgFrameDic.attach.height+'px;top:-9999px;left:-9999px;'"></canvas>
		<!-- #endif -->
	</view>
</template>

<script>
	// import uniList from '@/components/uni-list/uni-list.vue'
	// import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {getToken, hasLogin, api,isWechatH5,showMsgBox,zRequest, authRequestMap,loginHandle,logoutHandle,zRequestMap,redirectWechatAuth,errorCodeHandle} from '@/common/js/util.js'
	var jwx = require('@/common/js/jwexin.js')
	export default {
		// components: {
		// 	uniList,
		// 	uniListItem,
		// },
		data(){
			return{
				appId:"",
				compressW: 800,
				imgFrameDic: {
					"attach":{"width": 0,"height":0}
				},
				user: '0',
				imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
				initalData:{
					imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
					PayeeId: "",
					PayerId: "",
					Amount: 0,
					SelfPay: true,
					Remark: "",
				},
				index: -1,
				payeeIndex: -1,
				payerIndex:-1,
				payeeList:[
					// {id: '1',type:true,accountName: "1"}
					// {id:'1',accountName:'Shawn',address:'123 Main Street',city:'Markham',province:'Ontario',postalcode:'A1B1C1',country:'Canada',phone:'647-123-4567'}
				],
				payerList:[
					// {id: '1',type:false,accountName: "1"}
					// {id:'1',accountName:'Shawn',address:'123 Main Street',city:'Markham',province:'Ontario',postalcode:'A1B1C1',country:'Canada',phone:'647-123-4567'}
				],
				pickerInfo: [
					// {id:'1',name:'Aimhome Realty' ,address:'2170 Sheppard Ave East',phone: '416-490-0880'},
				],
				service: 0.01,
				rate: 5.3,
				onHandle: false,
				basicArr: [],
				checkBox: 0,
				
			}
		},
		computed:{
			hasLogin(){
				return hasLogin();
			},
			token(){
				return getToken();
			}
		},
		methods:{
			addPayee(){
				uni.navigateTo({
					url:'/pages/info/addPayee?type=payee'
				})
			},
			addPayer(){
				uni.navigateTo({
					url:'/pages/info/addPayer?type=payee'
				})
			},
			payeeChange(e){
				console.log("payee",e)
				this.payeeIndex = e.detail.value
				this.initalData.PayeeId = this.payeeList[this.payeeIndex].id
			},
			payerChange(e){
				this.payerIndex = e.detail.value
				this.initalData.PayerId = this.payerList[this.payerIndex].id
			},
			boxChanged(e){
				console.log("checkbox",e.detail)
				if(e.detail.value){
					this.checkBox = e.detail.value
				}
			},
			getMpConfig(){
				var _this = this;
				//获取微信公众号配置
				zRequestMap("/api/tool/MpConfig", null, "POST").then(
					function(res){
						if(res.success && res.data.data){
							console.log("微信配置", res.data.data);
							_this.appId = res.data.data.appId;
							console.log("appid", _this.appId);
							jwx.config({
								debug: false,  
								appId: res.data.data.appId,  
								timestamp: res.data.data.timestamp,  
								nonceStr: res.data.data.nonceStr,  
								signature: res.data.data.signature,  
								jsApiList: [//这里是需要用到的接口名称  
									'checkJsApi',//判断当前客户端版本是否支持指定JS接口  
									'onMenuShareAppMessage',//分享接口  
									'getLocation',//获取位置  
									'openLocation',//打开位置  
									'scanQRCode',//扫一扫接口  
									'chooseWXPay',//微信支付  
									'chooseImage',//拍照或从手机相册中选图接口  
									'previewImage',//预览图片接口  
									'uploadImage'//上传图片  
								]  
							});   
						}
					}
				);
			},
			formSubmit(e){
				console.log("支付中", e);
				// if (this.onHandle == true){
				// 	console.log("已支付中");
				// 	return
				// }
				var _this = this;
				// if(!_this.initalData.PayeeId){
				// 	showMsgBox("请选择收款人信息");
				// 	return;
				// }
				// if(!_this.initalData.PayerId){
				// 	showMsgBox("请选择付款人信息");
				// 	return;
				// }
				// if(!_this.initalData.Amount){
				// 	showMsgBox("请输入支付金额");
				// 	return;
				// }
				uni.navigateTo({
					url: "/pages/info/payment-review?image=" + _this.imageList.attach + "&PayeeId=" + _this.initalData.PayeeId + "&PayerId=" + _this.initalData.PayerId + "&Amount=" + _this.initalData.Amount + "&Remark=" + _this.initalData.Remark 
				})
				// _this.onHandle = true;
				// uni.showLoading({
				// 	title:"支付中",
				// 	mask:true
				// })
				
				// try{
				// 	uni.uploadFile({
				// 		url: api+"/api/House/EOrder",
				// 		filePath: _this.imageList['attach'],
				// 		name: "Attach",
				// 		formData:{
				// 			"PayeeId":_this.initalData.PayeeId,//收款人id
				// 			"PayerId":_this.initalData.PayerId,//付款人id
				// 			"Amount":_this.initalData.Amount,//支付金额
				// 			"SelfPay": _this.initalData.SelfPay,//是否自付
				// 			"Remark": _this.initalData.Remark,//备注
				// 		},
				// 		header:{
				// 			// 'content-type':"multipart/form-data",
				// 			'Authorization': 'Bearer ' + _this.token
				// 		},
				// 		success(logoResult){
				// 			uni.hideLoading();
				// 			console.log('下单内容', logoResult)
				// 			if(logoResult.statusCode == "401"){
				// 				console.log('推出登陆');
				// 				logoutHandle();
				// 				return;
				// 			}else{
				// 				var res = JSON.parse(logoResult.data);
				// 				console.log("转化结果", res);
				// 				console.log("code对比", res.code == 0);
				// 				if(res.code == 0){
				// 					var data = res.data;
				// 					if(res.data.url){//显示二维码
				// 						uni.navigateTo({
				// 							url: '/pages/qrcode/qrcode?code=' + encodeURIComponent(res.data.url),
				// 							success: res => {},
				// 							fail: () => {},
				// 							complete: () => {}
				// 						});
				// 						return;
				// 					}else{
				// 						console.log("appid pay", _this.appId);
				// 						jwx.chooseWXPay({
				// 							appId : _this.appId,
				// 							timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
				// 							nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
				// 							package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
				// 							signType: 'MD5' , // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
				// 							paySign: data.paySign, // 支付签名  
				// 							success: function (res) {  
				// 								// console.log(res);  
				// 								showMsgBox("支付成功");
				// 							},  
				// 							fail:function(res){  
				// 								showMsgBox("支付失败");
				// 							},  
				// 							// complete:function(res){  
				// 							//     console.log(res)  
				// 							// }  
				// 						});  
				// 					}
				// 				}else{
				// 					errorCodeHandle(res.code);
				// 					return;
				// 				}
				// 			}
				// 		},
				// 		fail(e) {
				// 			uni.showToast({
				// 				title: "提交失败",
				// 				mask: false
				// 			})
				// 			_this.requesting = false
				// 			console.log("header 失败", e)
				// 		},
				// 		complete(e){
				// 			uni.hideLoading();
				// 		}
				// 	})
				// }catch(e){
				// 	showMsgBox("支付失败请重试，请重试");
				// 	uni.hideLoading();
				// 	console.log("出问题了", e);
				// }
				// _this.onHandle = false;
			},
			async chooseImage(type) {
				let _this = this
				uni.chooseImage({
					sourceType: ["album","camera"],
					sizeType: ["compressed"],
					count: 1,
					success: (res) => {
						// _this.imageList[type] = res.tempFilePaths[0];
						_this.getImageInfo(type,res.tempFilePaths[0])
						console.log("path",_this.imageList)
					},fail:(res) => {
						// uni.showToast({
						// 	title: '无效图片'
						// })
					}
				})
			},
			previewImage(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			companyChange(e) {
				this.index = e.detail.value;
				this.initalData.brokerageId = this.pickerInfo[this.index].id;
				this.initalData.brokerageAddress = this.pickerInfo[this.index].address;
				this.initalData.brokeragePhone = this.pickerInfo[this.index].phone;
			},
			h5Compress(res,imagePath, type){
				var _this = this;
				let compressW = _this.compressW;// uni.upx2px(100)
				let imgRatio = res.width / res.height
				let img = new Image();  
				img.src = imagePath; // 要压缩的图片  
				let canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');

				if (res.width > compressW ){
					canvas.width = compressW;
					canvas.height =  compressW / imgRatio;
					// canvas.toBlob(function (fileSrc) {
					// 	let imgSrc = window.URL.createObjectURL(fileSrc);//原生JS生成文件路径
					// 	uni.downloadFile({
					// 		url: imgSrc, //仅为示例，并非真实的资源
					// 		success: (resFile) => {
					// 			if (resFile.statusCode === 200) {
					// 				_this.imageList[type] = resFile.tempFilePath
					// 			}
					// 		},
					// 		complete:(e)=>{
					// 			uni.hideLoading();
					// 		}
					// 	});
					// });
				}else{
					canvas.width = res.width;
					canvas.height =  res.height;
				}
				ctx.drawImage(img, 0, 0,canvas.width,canvas.height)
				var base64 = canvas.toDataURL('image/jpeg', 0.7);
				_this.imageList[type] = base64;
				uni.hideLoading();
			},
			notH5Compress(res,imagePath, type){
				var _this = this;
				let compressW = _this.compressW// uni.upx2px(100)
				let imgW = res.width
				let imgH = res.height
				let imgRatio = res.width / res.height
				if (imgW > compressW ){
					var ctx;
					ctx = uni.createCanvasContext('myCanvas-'+type);
					_this.imgFrameDic[type].width = compressW
					_this.imgFrameDic[type].height = compressW / imgRatio
					ctx.drawImage(imagePath, 0, 0,_this.imgFrameDic[type].width,_this.imgFrameDic[type].height)
					ctx.draw(true, () => {
						uni.canvasToTempFilePath({
							quality: 0.5,
							canvasId: 'myCanvas-'+type,
							success: function (nres) {
								console.log("crop path",nres.tempFilePath)
								_this.imageList[type] = nres.tempFilePath
							},
							fail: (e) => {
								console.log("crop fail",_this.imageList[type],e)
							},
							complete: (e) => {
								uni.hideLoading()
								console.log("crop complete",e)
							}
						})
					})
				}else{
					_this.imageList[type] = imagePath
					uni.hideLoading()
				}	
			},
			inputInfo(e){
				let id = e.currentTarget.id
				let value = e.detail.value
				switch (id){
					case "amount":
						this.initalData.Amount = value
						break
					case "desc":
						this.initalData.desc = value
						break
					default:
						break
				}
			},
			async getImageInfo(type,imagePath) {
				var _this = this;
				uni.showLoading({
					title: '图片生成中...',
				});
				
				uni.getImageInfo({
					src: imagePath,
					success: function success(res){
						// #ifdef H5
						_this.h5Compress(res,imagePath,type);
						// #endif
						// #ifndef H5
						_this.notH5Compress(res,imagePath,type)
						// #endif
					},
					fail: (e) => {
						uni.hideLoading()
						console.log("get image info fail",e)
						showMsgBox("无效图片,请重选", ()=>{}, ()=>{}, "知道了");
					},
				})
			},
			getList() {
				let _this = this
				_this.payeeList = []
				_this.payerList = []
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
		},
		onShow() {
			this.getList()
		},
		onLoad(e) {
			if(!this.hasLogin){
				redirectWechatAuth();
				return;
			}
			this.getMpConfig();
			if(e.user){
				this.user = e.user
			}
			var offices = uni.getStorageSync("offices");
			console.log("offices", offices);
			this.pickerInfo = offices;
			var configs = uni.getStorageSync("configs");
			var _this = this;
			configs.forEach((p)=>{
				if(p.id == 1){
					_this.service = (p.content / 10000.0).toFixed(4);
				}
				console.log('配置',p);
			})
			_this.rate = ((uni.getStorageSync("rate") || 530000000) / 100000000.0).toFixed(4);
			if(_this.rate == 0) _this.rate = 5.3;
		}
	}
</script>

<style>
	@import "../../components/uni-list-item/uni-list-item.css";
	.cell-pd {
		padding: 22upx 30upx;
	}
	
	.list-pd {
		margin-top: 50upx;
	}
	.image-cell-height{
		height: 245upx;
	}
	.upload-image-container{
		flex:1;
		flex-direction: row;
		display: flex;
	}
	.image-container-left{
		flex: 1;
		line-height: 200upx;
	}
	.image-container-right{
		flex: 1;
		width: 200upx;
		max-height: 200upx;
	}
	.textarea-colum-style{
		flex-direction: column;
	}
</style>
