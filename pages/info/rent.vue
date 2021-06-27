<template>
	<view class="content zero-padding" style="background: #fbfbfb;">
		<form @submit="formSubmit" @reset="formReset">

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">房东信息</text> 
				</view>
			</view>

			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						姓名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="name" placeholder="房东姓名" id="landlordName" @input="inputInfo" :value="initalData.landlordName" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						电话
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="name" placeholder="电话" id="landlordPhone" @input="inputInfo" :value="initalData.landlordPhone" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						银行
					</view>
					<picker @change="bankChange" :value="index" :range="pickerInfo" range-key="name">
						<view class="picker">
							{{index>-1?pickerInfo[index].name:'==请选择=='}}
						</view>
					</picker>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						银行号
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="name" placeholder="银行号" id="bankid" @input="inputInfo" :value="initalData.bankid" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						分行号码
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="name" placeholder="分行号" id="branchid" @input="inputInfo" :value="initalData.branchid" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						账号号码
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="name" placeholder="银行账户" id="accountid" @input="inputInfo" :value="initalData.accountid" />
					</view>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">租约合同</text>
				</view>
			</view>

			<!-- 				<view>
					<sunuiUpimg :upImgConfig="upImgBasic" @onUpImg="upBasicData" @onImgDel="delImgInfo" ref="uImage"></sunuiUpimg>
				</view> -->
			<view class="cu-list menu margin-top image-cell-height" :class="[true?'card-menu':'']" style="background: white;">
				<view class="cell-pd">
					<view class="upload-image-container">
						<view class="uni-list-item__content-title image-container-left">合同</view>
						<view class="image-container-left"></view>
						<image class="image-container-right" :src="imageList['attach']" :data-src="imageList['attach']" @tap="chooseImage('attach')"
						 mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action">
					<text class="cuIcon-title" style="font-weight: 700;">租客信息</text>
				</view>
			</view>

			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						租客姓名
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="tenantName" placeholder="租客姓名" id="tenantName" @input="inputInfo" :value="initalData.tenantName" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						电话
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="tenantPhone" placeholder="电话" id="tenantPhone" @input="inputInfo" :value="initalData.tenantPhone" />
					</view>
				</view>
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						地址
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="address" placeholder="地址" id="address" @input="inputInfo" :value="initalData.address" />
					</view>
				</view>
			</view>

			<view class="cu-list menu margin-top" :class="[true?'card-menu':'']" style="background: white;">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content-title">
						备注
					</view>
				</view>
				<view class="uni-list-item__container" style="height:225upx;">
				<view class="uni-list-item__content item-font" style="height:225upx; ">
					<textarea style="height: 200upx;width: 100%;font-size: 32upx;" name="desc" placeholder="填写备注" id="desc" @input="inputInfo"
						:value="initalData.desc" />
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
						租金  $
					</view>
					<view class="uni-list-item__content item-font">
						<input style="text-align:right" name="price" type="number" placeholder="租金" id="price" @input="inputInfo" :value="initalData.price"/>
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
						<view style="text-align:right;">{{(Number(initalData.price)*(1+Number(service))).toFixed(2)}}</view>
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
						<view style="text-align:right;font-size: 50upx;">{{(Number(initalData.price)*(1+Number(service))*(Number(rate))).toFixed(2)}}</view>
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
	import {getToken, hasLogin, api,isWechatH5,showMsgBox,zRequest, authRequestMap,loginHandle,logoutHandle,zRequestMap,redirectWechatAuth,errorCodeHandle} from '@/common/js/util.js'
	var jwx = require('@/common/js/jwexin.js')
	export default {
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
					mlsid:"",
					landlordName: "",
					landlordPhone: "",
					bankid: "",
					bankName: "",
					branchid:"",
					accountid:"",
					address:"",
					tenantName: "",
					tenantPhone: "",
					desc: "",
					price: 0,
				},
				index: -1,
				pickerInfo: [
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
				service: 0.05,
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
				if(!_this.initalData.landlordName){
					showMsgBox("请输入房东姓名");
					return;
				}
				if(!_this.initalData.landlordPhone){
					showMsgBox("请输入房东电话");
					return;
				}
				if(!_this.initalData.bankName){
					showMsgBox("请选择银行");
					return;
				}
				if(!_this.initalData.bankid){
					showMsgBox("请选择银行");
					return;
				}
				if(!_this.initalData.branchid){
					showMsgBox("请输入银行分行号");
					return;
				}
				if(!_this.initalData.accountid){
					showMsgBox("请输入银行账号");
					return;
				}
				if(_this.imageList.attach == _this.initalData.imageList.attach){
					showMsgBox("请上传合同");
					return;
				}
				if(!_this.initalData.tenantName){
					showMsgBox("请输入租客姓名");
					return;
				}
				if(!_this.initalData.tenantPhone){
					showMsgBox("请输入租客电话");
					return;
				}
				if(!_this.initalData.address){
					showMsgBox("请输入租房地址");
					return;
				}
				if(_this.initalData.price <= 0){
					showMsgBox("请输入有效的租金");
					return;
				}
				_this.onHandle = true;
				uni.showLoading({
					title:"处理中",
					mask:true
				})
				
				try{
					uni.uploadFile({
						url: api+"/api/house/ROrder",
						filePath: _this.imageList['attach'],
						name: "Attach",
						formData:{
							"Name":_this.initalData.landlordName,//房东名称
							"Tel":_this.initalData.landlordPhone,//房东电话
							"BankName":_this.initalData.bankName,//房东银行名称
							"BankNo": _this.initalData.bankid,//房东银行号
							"BranchBankNo": _this.initalData.branchid,//房东分行号
							"AccountNo":_this.initalData.accountid,//房东银行账号
							"Remark":_this.initalData.tenantPhone,//备注
							"Address": _this.initalData.address,//地址
							"CName": _this.initalData.tenantName,//顾客姓名
							"CTel": _this.initalData.tenantPhone,//顾客电话
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
			bankChange(e) {
				this.index = e.detail.value;
				this.initalData.bankid = this.pickerInfo[this.index].id;
				this.initalData.bankName = this.pickerInfo[this.index].name;
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
					case "landlordName":
						this.initalData.landlordName = value
						break
					case "landlordPhone":
						this.initalData.landlordPhone = value
						break
					case "price":
						this.initalData.price = value
						break
					case "mlsid":
						this.initalData.mlsid = value
						break
					case "brokerageAddress":
						this.initalData.brokerageAddress = value
						break
					case "brokeragePhone":
						this.initalData.brokeragePhone = value
						break
					case "agent":
						this.initalData.agent = value
						break
					case "tenantName":
						this.initalData.tenantName = value
						break
					case "tenantPhone":
						this.initalData.tenantPhone = value
						break
					case "address":
						this.initalData.address = value
						break
					case "desc":
						this.initalData.desc = value
						break
					case "branchid":
						this.initalData.branchid = value
						break
					case "accountid":
						this.initalData.accountid = value
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
			var configs = uni.getStorageSync("configs");
			var _this = this;
			configs.forEach((p)=>{
				if(p.id == 4){
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
