<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
		
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<view class="cuIcon-title text-black" style="font-weight: 600;">收款人账户信息</view> 
				</view>
			</view>
			
			<view class="cu-list menu">
				<block v-for="(payeeItem, payeeIndex) in payeeInfoList" :key="payeeIndex">
					
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-warn text-green"></text>
								<text class="text-black">{{payeeInfoList[payeeIndex].title}}</text>
							</view>
							<view class="action">
								<text class="text-black text-sm">{{payeeInfoList[payeeIndex].detail}}</text>
							</view>
						</view>
				</block>
				
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<view class="cuIcon-title text-black" style="font-weight: 600;">付款人账户信息</view> 
				</view>
			</view>
			
			<view class="cu-list menu">
				<block v-for="(payerItem, payerIndex) in payerInfoList" :key="payerIndex">
					
						<view class="cu-item">
							<view class="content">
								<text class="cuIcon-warn text-green"></text>
								<text class="text-black">{{payerInfoList[payerIndex].title}}</text>
							</view>
							<view class="action">
								<text class="text-black text-sm">{{payerInfoList[payerIndex].detail}}</text>
							</view>
						</view>
				</block>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<view class="cuIcon-title text-black" style="font-weight: 600;">总计金额￥</view> 
				</view>
				
				<view class="action">
					<view class="cuIcon-title text-black" style="font-weight: 600;">{{(Number(initalData.Amount)*(1+Number(service))*(Number(rate))).toFixed(2)}}</view> 
				</view>
			</view>
			
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="formSubmit">确认支付</button>
			</view>
		
		</scroll-view>
	</view>
</template>

<script>
	import {getToken, hasLogin, api,isWechatH5,showMsgBox,zRequest, authRequestMap,loginHandle,logoutHandle,zRequestMap,redirectWechatAuth,errorCodeHandle} from '@/common/js/util.js'
	var jwx = require('@/common/js/jwexin.js')
	
	export default {
		data() {
			return {
				modalName: null,
				appId:"",
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
				service: 0.01,
				rate: 5.3,
				onHandle: false,
				payeeInfo: {},
				payerInfo: {},
				
				bankList:[
					{id:'0331',name:'ABN AMRO BANK CANADA'},
					{id:'0501',name:'ACADIA TRUST COMPANY'},
					{id:'0343',name:'ADS CANADIAN BANK'},
					{id:'0830',name:'AIRLINE (MALTON) CREDIT UNION LTD'},
					{id:'0219',name:'ALBERTA TREASURY BRANCHES'},
					{id:'0799',name:'ALBERTA WHEAT POOL'},
					{id:'0810',name:'ALL TRANS FINANCIAL SERVICES CR UN LTD'},
					{id:'0843',name:'AMCU CREDIT UNION INC'},
					{id:'0369',name:'AMERICAN EXPRESS C $ TRAVELLERS` CHEQUES'},
					{id:'0303',name:'AMEX BANK OF CANADA'},
					{id:'0326',name:'AMICUS BANK'},
					{id:'0808',name:'ARNSTEIN COMMUNITY CREDIT UNION LIMITED'},
					{id:'0839',name:'ATLANTIC CENTRAL'},
					{id:'0560',name:'B2B BANK'},
					{id:'0618',name:'B2B BANK'},
					{id:'0619',name:'B2B BANK'},
					{id:'0241',name:'BANK OF AMERICA NATIONAL ASSOCIATION'},
					{id:'0177',name:'BANK OF CANADA'},
					{id:'0308',name:'BANK OF CHINA (CANADA)'},
					{id:'0372',name:'BANK OF CHINA-TORONTO BRANCH'},
					{id:'0001',name:'BANK OF MONTREAL'},
					{id:'0325',name:'BANK ONE CANADA'},
					{id:'0337',name:'BANK WEST'},
					{id:'0248',name:'BARCLAYS BANK OF CANADA'},
					{id:'0360',name:'BARCLAYS BANK PLC-CANADA BRANCH'},
					{id:'0220',name:'BC COMMUNITY FINANCIAL SERVICES CORP'},
					{id:'0305',name:'BCPBANK CANADA'},
					{id:'0250',name:'BNP PARIBAS'},
					{id:'0289',name:'BNP PARIBAS (CANADA)'},
					{id:'0367',name:'BNP PARIBAS (CANADA)'},
					{id:'0311',name:'BOFA CANADA BANK'},
					{id:'0347',name:'BRIDGEWATER BANK'},
					{id:'0849',name:'BRUNSWICK CREDIT UNION FEDERATION'},
					{id:'0836',name:'CAISSE POPULAIRE DE KAPUSKASING LTEE'},
					{id:'0819',name:'CAISSES POPULAIRE GROUPE FINANCIER LTEE'},
					{id:'0127',name:'CANADA POST OFFICE'},
					{id:'0010',name:'CANADIAN IMPERIAL BANK OF COMMERCE'},
					{id:'0538',name:'CANADIAN ITALIAN TRUST'},
					{id:'0319',name:'CANADIAN NATIONAL MONEY ORDERS'},
					{id:'0338',name:'CANADIAN TIRE BANK'},
					{id:'0030',name:'CANADIAN WESTERN BANK'},
					{id:'0323',name:'CAPITAL ONE BANK (CANADA BRANCH)'},
					{id:'0267',name:'CCF CANADA'},
					{id:'0366',name:'CHINA CONSTRUCTION BANK TORONTO BRANCH'},
					{id:'0548',name:'CIBC TRUST CORPORATION'},
					{id:'0378',name:'CIDEL BANK CANADA'},
					{id:'0356',name:'CITCO BANK CANADA'},
					{id:'0260',name:'CITIBANK CANADA'},
					{id:'0328',name:'CITIBANK NA'},
					{id:'0554',name:'CITIZENS TRUST COMPANY'},
					{id:'0842',name:'CIVIL SERVICE CO-OP CREDIT SOCIETY LTD'},
					{id:'0551',name:'CLARICA TRUST COMPANY'},
					{id:'0879',name:'CO-OP CREDIT SOCIETY OF MANITOBA LTD'},
					{id:'0382',name:'COAST CAPITAL SAVINGS FEDERAL CREDIT UNI'},
					{id:'0259',name:'COMERICA BANK - CANADA'},
					{id:'0330',name:'COMERICA BANK, CANADA BRANCH'},
					{id:'0834',name:'COMMUNITY FIRST CREDIT UNION LIMITED'},
					{id:'0507',name:'COMMUNITY TRUST COMPANY LTD'},
					{id:'0853',name:'CONCENTRA FINANCIAL SERVICES ASSOCIATION'},
					{id:'0364',name:'CONTINENTAL BANK OF CANADA'},
					{id:'0258',name:'CREDIT SUISSE FIRST BOSTON,TORONTO BR'},
					{id:'0899',name:'CREDIT UNION CENTRAL OF ALBERTA LTD'},
					{id:'0809',name:'CREDIT UNION CENTRAL OF BC'},
					{id:'0869',name:'CREDIT UNION CENTRAL OF CANADA (CUCC)'},
					{id:'0828',name:'CREDIT UNION CENTRAL OF ONTARIO (CCCS)'},
					{id:'0889',name:'CREDIT UNION CENTRAL OF SASKATCHEWAN'},
					{id:'0505',name:'CROWN TRUST COMPANY'},
					{id:'0313',name:'CS ALTERNA BANK'},
					{id:'0608',name:'CS ALTERNA BANK'},
					{id:'0187',name:'CSB REDEMPTION CERTIFICATES'},
					{id:'0315',name:'CTBC BANK CORP (CANADA)'},
					{id:'0239',name:'DESJARDINS CREDIT UNION INC'},
					{id:'0329',name:'DEUTSCHE BANK AG'},
					{id:'0265',name:'DEUTSCHE BANK CANADA'},
					{id:'0352',name:'DIRECTCASH BANK'},
					{id:'0515',name:'DOMINION TRUST COMPANY'},
					{id:'0261',name:'DRESDNER BANK CANADA'},
					{id:'0806',name:'DUCA FINANCIAL SERVICES CREDIT UNION LTD'},
					{id:'0848',name:'DUCA FINANCIAL SERVICES CREDIT UNIT LTD'},
					{id:'0840',name:'DUNDALK DISTRICT CREDIT UNION LIMITED'},
					{id:'0359',name:'DUO BANK OF CANADA'},
					{id:'0701',name:'EDWARD JONES'},
					{id:'0623',name:'EQUITABLE BANK'},
					{id:'0520',name:'EVANGELINE SAVINGS & MORTGAGE CO'},
					{id:'0376',name:'EXCHANGE BANK OF CANADA'},
					{id:'0345',name:'FIFTH THIRD BANK-NATIONALASSOCIATION'},
					{id:'0332',name:'FIRST COMMERCIAL BANK'},
					{id:'0310',name:'FIRST NATIONS BANK OF CANADA'},
					{id:'0278',name:'FUJI BANK CANADA'},
					{id:'0815',name:'FEDERATION DES CAISSES DESJARDINS DU QUE'},
					{id:'0622',name:'GE MONEY TRUST COMPANY'},
					{id:'0344',name:'GENERAL BANK OF CANADA'},
					{id:'0572',name:'GENERAL TRUST CORPORATION OF CANADA'},
					{id:'0844',name:'GODERICH COMMUNITY CREDIT UNION LIMITED'},
					{id:'0854',name:'GOLDEN HORSESHOE CREDIT UNION LIMITED'},
					{id:'0117',name:'GOVERNMENT OF CANADA'},
					{id:'0528',name:'GRANVILLE SAVINGS & MORTGAGE CORPORATION'},
					{id:'0523',name:'GUARDIAN TRUST COMPANY'},
					{id:'0321',name:'HABIB CANADIAN BANK'},
					{id:'0361',name:'HOME BANK'},
					{id:'0535',name:'HOME SAVINGS AND LOAN CORPORATION'},
					{id:'0358',name:'HOMEEQUITY BANK'},
					{id:'0630',name:'HOUSEHOLD TRUST COMPANY'},
					{id:'0016',name:'HSBC BANK CANADA'},
					{id:'0298',name:'HSBC BANK CANADA'},
					{id:'0316',name:'HSBC BANK CANADA'},
					{id:'0333',name:'HSBC BANK USA'},
					{id:'0604',name:'HSBC MORTGAGE CORPORATION'},
					{id:'0552',name:'HSBC TRUST COMPANY (CANADA)'},
					{id:'0340',name:'ICICI BANK CANADA'},
					{id:'0881',name:'INDEPENDENT CREDIT UNIONS IN ALTA & NWT'},
					{id:'0861',name:'INDEPENDENT CREDIT UNIONS IN MANITOBA'},
					{id:'0831',name:'INDEPENDENT CREDIT UNIONS IN NB'},
					{id:'0801',name:'INDEPENDENT CREDIT UNIONS IN NFLD'},
					{id:'0821',name:'INDEPENDENT CREDIT UNIONS IN NOVA SCOTIA'},
					{id:'0851',name:'INDEPENDENT CREDIT UNIONS IN ONTARIO'},
					{id:'0841',name:'INDEPENDENT CREDIT UNIONS IN QUEBEC'},
					{id:'0625',name:'INDUSTRIAL ALLIANCE TRUST INC'},
					{id:'0307',name:'INDUSTRIAL AND COMMERCIAL BANK OF CHINA'},
					{id:'0539',name:'INLAND TRUST AND SAVINGS CORPORATION'},
					{id:'0534',name:'INTERNATIONAL TRUST COMPANY'},
					{id:'0249',name:'INTESA BANK CANADA'},
					{id:'0536',name:'INVESTORS GROUP TRUST COMPANY LTD'},
					{id:'0354',name:'JAMESON BANK'},
					{id:'0314',name:'JP MORGAN BANK CANADA'},
					{id:'0281',name:'JP MORGAN CANADA'},
					{id:'0252',name:'JP MORGAN CHASE BANK'},
					{id:'0317',name:'JP MORGAN CHASE BANK'},
					{id:'0270',name:'JPMORGAN CHASE BANK, NATIONAL ASSOC'},
					{id:'0275',name:'KEB HANA BANK CANADA'},
					{id:'0890',name:'L`ALLIANCE DES CAISSES POP DE L`ONT LTEE'},
					{id:'0865',name:'LA FED DES CAISSES POP ACADIENNES LTEE'},
					{id:'0829',name:'LA FED DES CAISSES POP DE L`ONTARIO INC'},
					{id:'0549',name:'LA SOCIETE D`EPARGNE ST BERNARD'},
					{id:'0850',name:'LAMBTON FINANCIAL CREDIT UNION LTD'},
					{id:'0351',name:'LANDSBANKI CANADA'},
					{id:'0803',name:'LATVIAN CREDIT UNION LTD'},
					{id:'0039',name:'LAURENTIAN BANK OF CANADA'},
					{id:'0357',name:'M&T BANK'},
					{id:'0779',name:'MANITOBA POOL ELEVATORS'},
					{id:'0540',name:'MANULIFE BANK'},
					{id:'0626',name:'MANULIFE TRUST COMPANY'},
					{id:'0336',name:'MAPLE BANK GMBH'},
					{id:'0380',name:'MEGA INTERNATIONAL COMMERCIAL BANK (CANA'},
					{id:'0269',name:'MEGA INTERNATIONAL COMMERCIAL BANK CO LT'},
					{id:'0547',name:'MENNONITE TRUST LIMITED'},
					{id:'0837',name:'MERIDIAN CREDIT UNION'},
					{id:'0277',name:'MIZUHO BANK LTD-CANADA BRANCH'},
					{id:'0350',name:'MIZUHO CORPORATE BANK (CANADA)'},
					{id:'0544',name:'MONTREAL TRUST COMPANY OF CANADA'},
					{id:'0550',name:'MONTREAL TRUST COMPANY OF CANADA'},
					{id:'0374',name:'MOTUS BANK'},
					{id:'0245',name:'MUFG BANK LTD CANADA BRANCH'},
					{id:'0553',name:'MUNICIPAL SAVINGS & LOAN CORP'},
					{id:'0006',name:'NATIONAL BANK OF CANADA'},
					{id:'0286',name:'NATIONAL BANK OF GREECE (CANADA)'},
					{id:'0577',name:'NATIONAL BANK TRUST INC'},
					{id:'0590',name:'NATIONAL TRUST COMPANY'},
					{id:'0802',name:'NEWTEL CREDIT UNION LTD'},
					{id:'0812',name:'NORTH YORK COMMUNITY CREDIT UNION'},
					{id:'0846',name:'ONTARIO CIVIL SERVICE CR UNION LTD'},
					{id:'0807',name:'ONTARIO TELEPHONE EMPLOYEES CR UNION'},
					{id:'0568',name:'PEACE HILLS TRUST COMPANY'},
					{id:'0383',name:'PEOPLES BANK OF CANADA'},
					{id:'0621',name:'PEOPLES TRUST COMPANY'},
					{id:'0365',name:'PNC BANK CANADA BRANCH'},
					{id:'0320',name:'PRESIDENT`S CHOICE BANK'},
					{id:'0312',name:'RABOBANK CANADA'},
					{id:'0322',name:'RABOBANK CANADA'},
					{id:'0244',name:'REPUBLIC NATIONAL BANK OF NEW YORK (CDA)'},
					{id:'0620',name:'RESMOR TRUST COMPANY'},
					{id:'0377',name:'RFA BANK OF CANADA'},
					{id:'0872',name:'ROCHDALE CREDIT UNION'},
					{id:'0368',name:'ROGERS BANK'},
					{id:'0592',name:'ROYAL BANK MORTGAGE CORPORATION'},
					{id:'0003',name:'ROYAL BANK OF CANADA'},
					{id:'0789',name:'SASKATCHEWAN WHEAT POOL'},
					{id:'0294',name:'SBI CANADA BANK'},
					{id:'0700',name:'SCOTIA ITRADE CORP'},
					{id:'0606',name:'SCOTIA MORTGAGE CORPORATION'},
					{id:'0588',name:'SETTLERS SAVINGS & MORTGAGE CORP'},
					{id:'0355',name:'SHINHAN BANK OF CANADA'},
					{id:'0292',name:'SOCIETE GENERALE (CANADA)'},
					{id:'0346',name:'SOCIETE GENERALE(CANADA BRANCH)'},
					{id:'0833',name:'ST STANISLAUS-ST CASIMIRS CREDIT UN LTD'},
					{id:'0327',name:'STATE STREET BANK AND TRUST COMPANY'},
					{id:'0373',name:'SUMITOMO MITSUI BANKING CORP OF CANADA'},
					{id:'0301',name:'SUMITOMO MITSUI BANKING CORPORATION CANA'},
					{id:'0614',name:'TANGERINE BANK'},
					{id:'0597',name:'TD MORTGAGE CORPORATION'},
					{id:'0603',name:'TD PACIFIC MORTGAGE CORPORATION'},
					{id:'0242',name:'THE BANK OF NEW YORK MELLON'},
					{id:'0002',name:'THE BANK OF NOVA SCOTIA'},
					{id:'0509',name:'THE CANADA TRUST COMPANY'},
					{id:'0613',name:'THE CANADA TRUST COMPANY'},
					{id:'0532',name:'THE EFFORT TRUST COMPANY'},
					{id:'0279',name:'THE INDUSTRIAL BANK OF JAPAN (CANADA)'},
					{id:'0349',name:'THE NORTHERN TRUST COMPANY, CANADA BRANC'},
					{id:'0240',name:'THE ROYAL BANK OF SCOTLAND N.V. (CANADA)'},
					{id:'0363',name:'THE ROYAL BANK OF SCOTLAND N.V.CANADA BR'},
					{id:'0570',name:'THE ROYAL TRUST COMPANY'},
					{id:'0580',name:'THE ROYAL TRUST CORPORATION OF CANADA'},
					{id:'0004',name:'THE TORONTO-DOMINION BANK'},
					{id:'0375',name:'THOMAS COOK C $ TRAVELLERS` CHEQUES'},
					{id:'0300',name:'TOKAI BANK CANADA'},
					{id:'0804',name:'TORONTO FIRE DEPT EMPLOYEES` CR UN LTD'},
					{id:'0607',name:'TRIMARK TRUST'},
					{id:'0506',name:'TRUST GENERAL INC'},
					{id:'0522',name:'TRUST LA LAURENTIENNE'},
					{id:'0339',name:'UBS AG CANADA BRANCH'},
					{id:'0290',name:'UBS BANK (CANADA)'},
					{id:'0243',name:'UFJ BANK CANADA'},
					{id:'0302',name:'UNITED OVERSEAS BANK (CANADA)'},
					{id:'0335',name:'UNITED OVERSEAS BANK LIMITED'},
					{id:'0318',name:'US BANK NATIONAL ASSOCIATION'},
					{id:'0309',name:'VANCITY COMMUNITY INVESTMENT BANK'},
					{id:'0334',name:'VERSABANK'},
					{id:'0370',name:'WEALTH ONE BANK OF CANADA'},
					{id:'0362',name:'WELLS FARGO BANK, NATIONAL ASSOCIATION C'},
					{id:'0342',name:'ZAG BANK'}
				],
				payeeInfoList:[],//{title:"titel",detail:""},{title:"titel",detail:""},{title:"titel",detail:""}],
				payerInfoList:[],
			};
		},
		methods:{
			getBankName(id){
				for (let i=0; i<this.bankList.length;i++){
					if (this.bankList[i].id == id){
						return this.bankList[i].name
					}
				}
				return
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
				_this.onHandle = true;
				uni.showLoading({
					title:"支付中",
					mask:true
				})
				
				try{
					uni.uploadFile({
						url: api+"/api/House/EOrder",
						filePath: _this.imageList['attach'],
						name: "Attach",
						formData:{
							"PayeeId":_this.initalData.PayeeId,//收款人id
							"PayerId":_this.initalData.PayerId,//付款人id
							"Amount":_this.initalData.Amount,//支付金额
							"SelfPay": _this.initalData.SelfPay,//是否自付
							"Remark": _this.initalData.Remark,//备注
						},
						header:{
							// 'content-type':"multipart/form-data",
							'Authorization': 'Bearer ' + _this.token
						},
						success(logoResult){
							uni.hideLoading();
							console.log('下单内容', logoResult)
							if(logoResult.statusCode == "401"){
								console.log('退出登陆');
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
			getAccountInfo(id,type){
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
								if (type == "payee"){
									let newInitial = {
										"id":data.id,//id
										"type" : data.type, // 收款人或付款人
										"bankNo": data.bankNo,//银行号
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
										"payeeLName":data.surName,//收款人姓
										"payeeFName":data.name,//收款人名
										"payeeTel":data.tel,//收款人电话
										"payeeAddress":data.usreAddress,//收款人地址
										"payeeCity":data.userCity,//收款人城市
										"payeeProvince":data.userProvince,//收款人省
										"payeePostal":data.userPostCode,//收款人邮编
										"payerCountry":data.userCountry,//收款人国家
									}
									_this.payeeInfo = newInitial
									_this.payeeInfoList=[
										{title: "银行名称",detail:_this.getBankName(_this.payeeInfo.bankNo)},
										{title: "SWIFT码",detail:_this.payeeInfo.swift},
										{title: "银行号",detail:_this.payeeInfo.bankNo},
										{title: "分行号",detail:_this.payeeInfo.branchNo},
										{title: "账户号码",detail:_this.payeeInfo.accountNo},
										{title: "币种",detail:_this.payeeInfo.currencyType},
										{title: "--- 收款人信息 ---",detail:""},
										{title: "姓氏",detail:_this.payeeInfo.payeeLName},
										{title: "名字",detail:_this.payeeInfo.payeeFName},
										{title: "电话",detail:_this.payeeInfo.payeeTel},
										{title: "地址",detail:_this.payeeInfo.payeeAddress},
										{title: "城市",detail:_this.payeeInfo.payeeCity},
										{title: "省份",detail:_this.payeeInfo.payeeProvince},
										{title: "邮编",detail:_this.payeeInfo.payeePostal},
									]
								}else{
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
										"payerAddress":data.userAddress,//收款人地址
										"payerCity":data.userCity,//收款人城市
										"payerProvince":data.userProvince,//收款人省
										"payerPostal":data.userPostCode,//收款人邮编
										"payerCountry":data.userCountry,//收款人国家
									}
									_this.payerInfo = newInitial
									_this.payerInfoList=[
										{title: "银行名称",detail:_this.payerInfo.bankName},
										{title: "账号",detail:_this.payerInfo.accountNo},
										{title: "银行地址",detail:_this.payerInfo.branchAddress},
										{title: "--- 付款人信息 ---",detail:""},
										{title: "姓氏",detail:_this.payerInfo.payerLName},
										{title: "名字",detail:_this.payerInfo.payerFName},
										{title: "电话",detail:_this.payerInfo.payerTel},
										{title: "地址",detail:_this.payerInfo.payerAddress},
										{title: "城市",detail:_this.payerInfo.payerCity},
										{title: "省份",detail:_this.payerInfo.payerProvince},
										{title: "邮编",detail:_this.payerInfo.payerPostal},
									]
								}
							}
						}else{
							uni.showLoading({
								title: "数据加载失败"
							})
						}
					}
				)
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
		onLoad(e) {
			console.log("payment review",e)
			this.getMpConfig();
			if(e.image){
				this.imageList.attach = e.image
			}
			if(e.PayeeId){
				this.initalData.PayeeId = e.PayeeId
				this.getAccountInfo(this.initalData.PayeeId,"payee")
			}
			if(e.PayerId){
				this.initalData.PayerId = e.PayerId
				this.getAccountInfo(this.initalData.PayerId,"payer")
			}
			if(e.Amount){
				this.initalData.Amount = e.Amount
			}
			if(e.Remark){
				this.initalData.Remark = e.Remark
			}
		}
	}
</script>

<style>
</style>
