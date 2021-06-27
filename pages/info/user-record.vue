<template>
	<view class="content zero-padding">
		<form @submit="formSubmit" @reset="formReset">
			
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						用户信息
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						姓
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userLName" type="string" placeholder="姓" id="userLName" @input="inputInfo" :value="initalData.userLName"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userFName" type="string" placeholder="名" id="userFName" @input="inputInfo" :value="initalData.userFName"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						电话
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userPhone" type="number" placeholder="电话" id="userPhone" @input="inputInfo" :value="initalData.userPhone"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						邮箱
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userEmail" type="string" placeholder="Email" id="userEmail" @input="inputInfo" :value="initalData.userEmail"/>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						用户地址
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						地址
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userAddress" type="string" placeholder="地址" id="userAddress" @input="inputInfo" :value="initalData.userAddress"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						城市
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userCity" type="string" placeholder="城市" id="userCity" @input="inputInfo" :value="initalData.userCity"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						省份
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userProvince" type="string" placeholder="省份" id="userProvince" @input="inputInfo" :value="initalData.userProvince"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						邮编
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="userPostal" type="string" placeholder="邮编" id="userPostal" @input="inputInfo" :value="initalData.userPostal"/>
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						国家
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right">加拿大</view>
					</view>
				</view>
			</view>
			
		<!-- 	<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						银行账号信息
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						银行名称
					</view>
					<picker @change="bankChange" :value="bankIndex" :range="bankList" range-key="name">
						<view class="picker">
							{{bankIndex>-1?bankList[bankIndex].name:'==请选择=='}}
						</view>
					</picker>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						SWIFT码
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="swift" type="string" placeholder="Swift码" id="swift" @input="inputInfo" :value="initalData.swift"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						银行号
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="bankNo" type="number" placeholder="银行号" id="bankNo" @input="inputInfo" :value="initalData.bankNo"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						分行号
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="branchNo" type="number" placeholder="分行号" id="branchNo" @input="inputInfo" :value="initalData.branchNo"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						银行账号
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="accountNo" type="number" placeholder="账号" id="accountNo" @input="inputInfo" :value="initalData.accountNo"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						币种
					</view>
					<picker @change="currencyChange" :value="currencyIndex" :range="currencyList" range-key="name">
						<view class="picker">
							{{currencyIndex>-1?currencyList[currencyIndex].name:'==选择币种=='}}
						</view>
					</picker>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						账号类型
					</view>
					<picker @change="accountType" :value="accountIndex" :range="accountList" range-key="name">
						<view class="picker">
							{{accountIndex>-1?accountList[accountIndex].name:'==请选择=='}}
						</view>
					</picker>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						账号别名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="alias" type="string" placeholder="账户别名" id="alias" @input="inputInfo" :value="initalData.alias"/>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						银行分行信息
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						地址
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="branchAddress" type="string" placeholder="地址" id="branchAddress" @input="inputInfo" :value="initalData.branchAddress"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						城市
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="branchCity" type="string" placeholder="城市" id="branchCity" @input="inputInfo" :value="initalData.branchCity"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						省
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="branchProvince" type="string" placeholder="省" id="branchProvince" @input="inputInfo" :value="initalData.branchProvince"/>
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						邮编
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="branchPostal" type="string" placeholder="邮编" id="price" @input="inputInfo" :value="initalData.branchPostal"/>
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						国家
					</view>
					<view class="uni-list-item__content item-font">
						<view style="text-align:right">加拿大</view>
					</view>
				</view>
			</view> -->
			
			
			
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="formSubmit">保存</button>
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
					"attach":{"width": 0,"height":0},
					// "bankName":"",
					// "swift": "",
					// "bankNo": "",
					// "branchNo":"",
					// "accountNo":"",
					// "currencyType":"",
					// "alias":"",
					// "branchAddress":"",
					// "branchCity":"",
					// "branchProvince":"",
					// "branchPostal":"",
					"userLName":"",
					"userFName":"",
					"userPhone":"",
					"userEmail":"",
					"userAddress":"",
					"userCity":"",
					"userProvince":"",
					"userPostal":"",
				},
				user: '0',
				imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
				initalData:{
					imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
				},
				index: -1,
				bankIndex: -1,
				currencyIndex:0,
				accountIndex:-1,
				bankList:[
					{id:'0331',name:'Royal Bank of Canda',swift: 'ROOOO'},
					{id:'0501',name:'ACADIA TRUST COMPANY',swift: 'ROOOO'},
					{id:'0343',name:'ADS CANADIAN BANK',swift: 'ROOOO'}
				],
				currencyList:[
					{name: "加币"},
					{name: '人民币'}
				],
				accountList:[
					
				],
				pickerInfo: [
					// {id:'1',name:'Aimhome Realty' ,address:'2170 Sheppard Ave East',phone: '416-490-0880'},
				],
				service: 0.01,
				rate: 5.3,
				onHandle: false,
				basicArr: []
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
			bankChange(e){
				console.log("bank info",e)
				this.bankIndex = e.detail.value
				this.initalData.bankName = this.bankList[this.bankIndex].name
				this.initalData.swift = this.bankList[this.bankIndex].swift
				this.initalData.bankNo = this.bankList[this.bankIndex].id
			},
			currencyChange(e){
				this.currencyIndex = e.detail.value
				this.initalData.currencyType = this.currencyList[this.currencyIndex].name
			},
			accountChange(e){
				this.accountIndex = e.detail.value
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
				if (this.onHandle == true){
					console.log("已支付中");
					return
				}
				var _this = this;
				// if(!_this.initalData.bankName){
				// 	showMsgBox("请选择银行");
				// 	return;
				// }
				// if(!_this.initalData.swift){
				// 	showMsgBox("请输入银行Swift码");
				// 	return;
				// }
				// if(!_this.initalData.bankNo){
				// 	showMsgBox("请输入银行号");
				// 	return;
				// }
				// if(!_this.initalData.branchNo){
				// 	showMsgBox("请输入分行号");
				// 	return;
				// }
				// if(!_this.initalData.accountNo){
				// 	showMsgBox("请输入银行账号");
				// 	return;
				// }
				// if(!_this.initalData.alias){
				// 	showMsgBox("请输入账号别名");
				// 	return;
				// }
				// if(_this.imageList.attach == _this.initalData.imageList.attach){
				// 	showMsgBox("请上传合同");
				// 	return;
				// }
				if(!_this.initalData.userLName){
					showMsgBox("请输入用户姓氏");
					return;
				}
				if(!_this.initalData.userFName){
					showMsgBox("请输入用户名字");
					return;
				}
				if(!_this.initalData.userPhone){
					showMsgBox("请输入用户电话");
					return;
				}
				if(!_this.initalData.userEmail){
					showMsgBox("请输入用户邮件");
					return;
				}
				if(!_this.initalData.userAddress){
					showMsgBox("请输入收款人地址");
					return;
				}
				if(!_this.initalData.userCity){
					showMsgBox("请输入收款人城市");
					return;
				}
				if(!_this.initalData.userProvince){
					showMsgBox("请输入收款人所在省");
					return;
				}
				if(!_this.initalData.userPostal){
					showMsgBox("请输入收款人邮编");
					return;
				}
				_this.onHandle = true;
				uni.showLoading({
					title:"支付中",
					mask:true
				})
				
				try{
					uni.uploadFile({
						url: api+"/api/house/Order",
						filePath: _this.imageList['attach'],
						name: "Attach",
						formData:{
							"Id":_this.initalData.brokerageId,//公司id
							"Address":_this.initalData.brokerageAddress,//公司地址
							"Tel":_this.initalData.brokeragePhone,//公司电话
							"HouseId": _this.initalData.mlsid,//MlsId
							"Agent": _this.initalData.agent,//挂牌经纪
							"CName":_this.initalData.tenantName,//租客名称
							"CTel":_this.initalData.tenantPhone,//租客电话
							"Remark": _this.initalData.desc,//备注
							"FeeType": 1,//费用类型
							"SelfPay": _this.user == 1,//是否不显示二维码
							"Amount": _this.initalData.price//金额（加币）
						},
						header:{
							// 'content-type':"multipart/form-data",
							'Authorization': 'Bearer ' + _this.token
						},
						success(logoResult){
							uni.hideLoading();
							console.log('下单内容', logoResult)
							if(logoResult.statusCode == "401"){
								console.log('推出登陆');
								logoutHandle();
								return;
							}else{
								var res = JSON.parse(logoResult.data);
								console.log("转化结果", res);
								console.log("code对比", res.code == 0);
								if(res.code == 0){
									var data = res.data;
									if(res.data.url){//显示二维码
										uni.navigateTo({
											url: '/pages/qrcode/qrcode?code=' + encodeURIComponent(res.data.url),
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
										return;
									}else{
										console.log("appid pay", _this.appId);
										jwx.chooseWXPay({
											appId : _this.appId,
											timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
											nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
											package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
											signType: 'MD5' , // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
											paySign: data.paySign, // 支付签名  
											success: function (res) {  
												// console.log(res);  
												showMsgBox("支付成功");
											},  
											fail:function(res){  
												showMsgBox("支付失败");
											},  
											// complete:function(res){  
											//     console.log(res)  
											// }  
										});  
									}
								}else{
									errorCodeHandle(res.code);
									return;
								}
							}
						},
						fail(e) {
							uni.showToast({
								title: "提交失败",
								mask: false
							})
							_this.requesting = false
							console.log("header 失败", e)
						},
						complete(e){
							uni.hideLoading();
						}
					})
				}catch(e){
					showMsgBox("支付失败请重试，请重试");
					uni.hideLoading();
					console.log("出问题了", e);
				}
				_this.onHandle = false;
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
					case "userLName":
						this.initalData.userLName = value
						break
					case "userFName":
						this.initalData.userFName = value
						break
					case "userPhone":
						this.initalData.userPhone = value
						break
					case "userEmail":
						this.initalData.userEmail = value
						break
					case "userAddress":
						this.initalData.userAddress = value
						break
					case "userCity":
						this.initalData.userCity = value
						break
					case "userProvince":
						this.initalData.userProvince = value
						break
					case "userPostal":
						this.initalData.userPostal = value
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
			}
		},
		onLoad(e) {
			// if(!this.hasLogin){
			// 	redirectWechatAuth();
			// 	return;
			// }
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
