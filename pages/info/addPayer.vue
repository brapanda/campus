<template>
	<view class="content zero-padding">
		<form @submit="formSubmit" @reset="formReset">
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						银行账号信息
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						币种
					</view>
					<picker @change="currencyChange" :value="currencyIndex" :range="currencyList" range-key="name">
						<view class="picker">
							{{currencyIndex>-1?currencyList[currencyIndex].name:'==请选择=='}}
						</view>
					</picker>
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
						账号
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="accountNo" type="number" placeholder="账号" id="accountNo" @input="inputInfo" :value="initalData.accountNo"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						支行地址(中文)
					</view>
				</view>
				<view class="uni-list-item__container" style="height:100upx;">
				<view class="uni-list-item__content item-font" style="height:100upx; ">
					<textarea style="height: 200upx;width: 100%;font-size: 32upx;" name="branchAddress" placeholder="填写地址" id="branchAddress" @input="inputInfo"
						:value="initalData.branchAddress" />
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						账号别名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="alias" type="string" placeholder="别名" id="alias" @input="inputInfo" :value="initalData.alias"/>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title" style="font-weight: 700;">
						持卡人信息（限本人)
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						姓
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerLName" type="string" placeholder="姓" id="payerLName" @input="inputInfo" :value="initalData.payerLName"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerFName" type="string" placeholder="名" id="payerFName" @input="inputInfo" :value="initalData.payerFName"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						电话
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerTel" type="string" placeholder="电话" id="payerTel" @input="inputInfo" :value="initalData.payerTel"/>
					</view>
				</view>
				
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						付款人地址(请填写中文拼音)
					</view>
				</view>
				<view class="uni-list-item__container" style="height:100upx;">
					<view class="uni-list-item__content item-font" style="height:100upx; ">
						<textarea style="height: 200upx;width: 100%;font-size: 32upx;" name="payerAddress" placeholder="如:平安路111号 应填写为:111 PINGANLU" id="payerAddress" @input="inputInfo"
						:value="initalData.payerAddress" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						城市 (请填写中文拼音)
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerCity" type="string" placeholder="城市" id="payerCity" @input="inputInfo" :value="initalData.payerCity"/>
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						省份
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerProvince" type="string" placeholder="省" id="payerProvince" @input="inputInfo" :value="initalData.payerProvince"/>
					</view>
					<!-- <picker @change="provinceChange" :value="provinceIndex" :range="provinceList" range-key="name">
						<view class="picker">
							{{provinceIndex>-1?provinceList[provinceIndex].name:'==请选择=='}}
						</view>
					</picker> -->
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						邮编
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="payerPostal" type="string" placeholder="邮编" id="payerPostal" @input="inputInfo" :value="initalData.payerPostal"/>
					</view>
				</view>
			</view>
			
			
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
					"attach":{"width": 0,"height":0}
				},
				user: '0',
				imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
				initalData:{
					imageList:{ "attach":"/static/img/no_image_640x426.jpg"},
					"id":0,
					"currencyType": "Yuan",
					"bankName":"",
					"accountNo":"",
					"branchAddress":"",
					"alias":"",
					"payerLName":"",
					"payerFName":"",
					"payerTel":"",
					"payerAddress":"",
					"payerCity":"",
					"payerProvince":"",
					"payerPostal":"",
					"payerCountry": "default",
					"type" : false,
					
					//default info
					"swift": "default",
					"branchNo": "default",
					"branchCity" :"default",
					"branchProvince": "default",
					"branchPostal": "default",
					"branchCountry" : "default",
					
					
					
					
					
				},
				currencyIndex: 0,
				bankIndex:-1,
				provinceIndex: -1,
				currencyList:[
					{name: "人民币",id:0}
				],
				bankList:[
					{name:"中国人民银行"}
				],
				provinceList: [
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
			currencyChange(e){
				this.currencyIndex = e.detail.value
				this.initalData.currencyType = this.currencyList[this.currencyIndex].name
			},
			bankChange(e){
				this.bankIndex = e.detail.value
				this.initalData.bankName = this.bankList[this.bankIndex].name
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
				console.log("保存中", e);
				if (this.onHandle == true){
					console.log("已保存中");
					return
				}
				var _this = this;
				if(!_this.initalData.currencyType){
					showMsgBox("请选择币种");
					return;
				}
				if(!_this.initalData.bankName){
					showMsgBox("请选择银行");
					return;
				}
				if(!_this.initalData.accountNo){
					showMsgBox("请输入账户号");
					return;
				}
				if(!_this.initalData.branchAddress){
					showMsgBox("请输入分行地址");
					return;
				}
				if(!_this.initalData.alias){
					showMsgBox("请输入账户别名");
					return;
				}
				if(!_this.initalData.payerLName){
					showMsgBox("请输入付款人姓氏");
					return;
				}
				if(!_this.initalData.payerFName){
					showMsgBox("请输入付款人名字");
					return;
				}
				if(!_this.initalData.payerTel){
					showMsgBox("请输入付款人电话");
					return;
				}
				if(!_this.initalData.payerAddress){
					showMsgBox("请输入付款人地址");
					return;
				}
				if(!_this.initalData.payerCity){
					showMsgBox("请输入付款人城市");
					return;
				}
				if(!_this.initalData.payerProvince){
					showMsgBox("请输入付款人所在省");
					return;
				}
				if(!_this.initalData.payerPostal){
					showMsgBox("请输入付款人邮编");
					return;
				}
				_this.onHandle = true;
				uni.showLoading({
					title:"保存中",
					mask:true
				})
				
				let url = "/api/User/AccountSave"
					
				let para = {
					"id":_this.initalData.id,//id
					"type" : this.initalData.type, // 收款人或付款人
					"bankNo":_this.initalData.bankName,//银行号
					"swiftCode":_this.initalData.swift,//银行汇款码
					"branchBankNo": _this.initalData.branchNo,//分行号
					"accountNo": _this.initalData.accountNo,//账户号码
					"moneyType":_this.initalData.currencyType,//币种
					"accountName":_this.initalData.alias,//账户名
					"address": _this.initalData.branchAddress,//银行地址
					"city": _this.initalData.branchCity,//银行城市
					"province": _this.initalData.branchProvince,//银行省
					"postCode": _this.initalData.branchPostal,//银行邮编
					"country":_this.initalData.branchCountry,//银行国家
					"surName":_this.initalData.payerLName,//收款人姓
					"name":_this.initalData.payerFName,//收款人名
					"tel":_this.initalData.payerTel,//收款人电话
					"userAddress":_this.initalData.payerAddress,//收款人地址
					"userCity":_this.initalData.payerCity,//收款人城市
					"userProvince":_this.initalData.payerProvince,//收款人省
					"userPostCode":_this.initalData.payerPostal,//收款人邮编
					"userCountry":_this.initalData.payerCountry,//收款人国家
				}
				
				authRequestMap(url,para,"POST").then(
					function(result){
						console.log("result",result)
						if(result.success){
							uni.showToast({
								title: "提交成功",
								mask: false
							})
						}else{
							uni.showToast({
								title: "提交失败",
								mask: false
							})
						}
						_this.onHandle = false;
					}
				)
				
				// try{
				// 	uni.uploadFile({
				// 		url: api+"/api/User/AccountSave",
				// 		// filePath: _this.imageList['attach'],
				// 		name: "Attach",
				// 		formData:{
				// 			"id":_this.initalData.id, // id
				// 			"moneyType": this.initalData.currencyType, //币种
				// 			"bankNo":this.initalData.bankName,//银行名字
				// 			"accountNo":this.initalData.accountNo,//账户号码
				// 			"address":this.initalData.branchAddress,//银行地址
				// 			"alias":this.initalData.alias,//账户别名
				// 			"surName":this.initalData.payerLName,//持卡人姓
				// 			"name":this.initalData.payerFName,//持卡人名
				// 			"userAddress":this.initalData.payerAddress,//持卡人地址
				// 			"userCity":this.initalData.payerCity,//持卡人地址
				// 			"userProvince":this.initalData.payerProvince,//持卡人省
				// 			"userPostCode":this.initalData.payerPostal,//持卡人邮编
				// 		},
				// 		header:{
				// 			// 'content-type':"multipart/form-data",
				// 			'Authorization': 'Bearer ' + _this.token
				// 		},
				// 		success(logoResult){
				// 			uni.hideLoading();
				// 			console.log('下单内容', logoResult)
				// 			// if(logoResult.statusCode == "401"){
				// 			// 	console.log('推出登陆');
				// 			// 	logoutHandle();
				// 			// 	return;
				// 			// }else{
				// 			// 	var res = JSON.parse(logoResult.data);
				// 			// 	console.log("转化结果", res);
				// 			// 	console.log("code对比", res.code == 0);
				// 			// 	if(res.code == 0){
				// 			// 		var data = res.data;
				// 			// 		if(res.data.url){//显示二维码
				// 			// 			uni.navigateTo({
				// 			// 				url: '/pages/qrcode/qrcode?code=' + encodeURIComponent(res.data.url),
				// 			// 				success: res => {},
				// 			// 				fail: () => {},
				// 			// 				complete: () => {}
				// 			// 			});
				// 			// 			return;
				// 			// 		}else{
				// 			// 			console.log("appid pay", _this.appId);
				// 			// 			jwx.chooseWXPay({
				// 			// 				appId : _this.appId,
				// 			// 				timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
				// 			// 				nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位  
				// 			// 				package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
				// 			// 				signType: 'MD5' , // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
				// 			// 				paySign: data.paySign, // 支付签名  
				// 			// 				success: function (res) {  
				// 			// 					// console.log(res);  
				// 			// 					showMsgBox("保存成功");
				// 			// 				},  
				// 			// 				fail:function(res){  
				// 			// 					showMsgBox("保存失败");
				// 			// 				},  
				// 			// 				// complete:function(res){  
				// 			// 				//     console.log(res)  
				// 			// 				// }  
				// 			// 			});  
				// 			// 		}
				// 			// 	}else{
				// 			// 		errorCodeHandle(res.code);
				// 			// 		return;
				// 			// 	}
				// 			// }
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
				// 	showMsgBox("保存失败请重试，请重试");
				// 	uni.hideLoading();
				// 	console.log("出问题了", e);
				// }
				// _this.onHandle = false;
			},
			
			getAccount(id) {
				let _this = this
				let url = '/api/User/AccountDetail'
				let para = {
					id:id
				}
				console.log("request",url,para)
				zRequestMap(url,para,"GET").then(
					function(result){
						console.log('result',result)
						if(result.success){
							if (result.data){
								console.log("data",result.data.data)
								const data = result.data.data
								let newInitial = {
									"id":data.id,//id
									"type" : data.type, // 收款人或付款人
									"bankName": data.bankNo,//银行号
									"swift":data.swiftCode,//银行汇款码
									"branchNo":data.branchBankNo,//分行号
									"accountNo": data.accountNo,//账户号码
									"currencyType":data.moneyType,//币种
									"alias":data.accountName,//账户名
									"branchAddress": data.address,//银行地址
									"branchCity": data.city,//银行城市
									"branchProvince": data.province,//银行省
									"branchPostal":data.postCode,//银行邮编
									"branchCountry":data.country,//银行国家
									"payerLName":data.surName,//收款人姓
									"payerFName":data.name,//收款人名
									"payerTel":data.tel,//收款人电话
									"payerAddress":data.usreAddress,//收款人地址
									"payerCity":data.userCity,//收款人城市
									"payerProvince":data.userProvince,//收款人省
									"payerPostal":data.userPostCode,//收款人邮编
									"payerCountry":data.userCountry,//收款人国家
								}
								_this.initialData = newInitial
							}
						}else{
							uni.showLoading({
								title: "数据加载失败"
							})
						}
					}
				)
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
					case "currencyType":
						this.initalData.currencyType = value
						break
					case "bankName":
						this.initalData.bankName = value
						break
					case "accountNo":
						this.initalData.accountNo = value
						break
					case "branchAddress":
						this.initalData.branchAddress = value
						break
					case "alias":
						this.initalData.alias = value
						break
					case "payerLName":
						this.initalData.payerLName = value
						break
					case "payerFName":
						this.initalData.payerFName = value
						break
					case "payerTel":
						this.initalData.payerTel = value
						break
					case "payerAddress":
						this.initalData.payerAddress = value
						break
					case "payerCity":
						this.initalData.payerCity = value
						break
					case "payerProvince":
						this.initalData.payerProvince = value
						break
					case "payerPostal":
						this.initalData.payerPostal = value
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
			if(!this.hasLogin){
				redirectWechatAuth();
				return;
			}
			this.getMpConfig();
			if(e.user){
				this.user = e.user
			}
			if(e.item){
				this.getAccount(e.item.id)
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
