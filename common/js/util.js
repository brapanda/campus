import Vue from 'vue';

const forcedLogin = false;
var api = "http://house.quartetpay.com";//"http://localhost:60170";//  "http://localhost:7079";
var md5 = require("@/common/js/md5.min.js");
const noImage = "/static/img/no_image_640x426.jpg";
var emailReg = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
var appVersion = '1.0.0';
var channel = 'other';//产品渠道
var shareTitle = '畅享生活';
var popularizeId = "";
// #ifdef MP-QQ
channel = 'qq';
popularizeId = "9160916_111687609";
// #endif
// #ifdef MP-WEIXIN
channel = 'mw';
popularizeId = "9160916_116059258";
// #endif
// #ifdef MP-TOUTIAO
channel = 'mtt';
// #endif
// #ifdef APP-PLUS
channel = plus.runtime.channel;
// #endif

function isWechatH5() {
	// #ifdef H5
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/micromessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
	// #endif
	// #ifndef H5
	return false;
	// #endif
}

function getProductId(platform){
	if(platform == 'android'){
		return 2;
	}else if(platform == 'ios'){
		return 1;
	}else{
		return 3;
	}
}

function getNetworkType(network){
	if(network == 'wifi'){
		return 1;
	}else if(network == '2g'){
		return 2;
	}else if(network == '3g'){
		return 3;
	}else if(network == '4g'){
		return 4;
	}else if(network == '5g'){
		return 5;
	}else if(network == 'ethernet'){
		return 6;
	}else if(network == 'none'){
		return 7;
	}else{
		return 0;
	}
}

async function getRequestParam(){
	var imei = uni.getStorageSync("iimm");
	if(!imei){
		imei = md5(Date().toString());
		// #ifdef APP-PLUS
		imei = md5(plus.device.imei);
		// #endif
		
		uni.setStorageSync("iimm", imei);
	}
	var systemVersion = 'uk';
	var machine = 'uk';//机器型号
	var network = 'uk';
	var productId = '';

	try {
		await uni.getNetworkType({
			success: function (res) {
				network = getNetworkType(res.networkType);
				//console.log('network:' + network + ':' + res.networkType);
			}
		}); 
		
		await uni.getSystemInfo({
			success: function (res) {
				systemVersion = res.version;
				//console.log('systemVersion:' + systemVersion);
				machine = encodeURI(res.model);
				//console.log('machine:' + machine)
				//console.log('language:' + res.language);
				productId = getProductId(res.platform);
				//console.log('productId:' + productId + ':' + res.platform);
			}
		});
	} catch (e) {
		// errorpromis js
		//console.log('get system info error');
	}
	return 'a=' + appVersion + '&i=' + imei + '&s=' + systemVersion  + '&m=' + machine  + '&pd=' + productId  + '&n=' + network  + '&ch=' + channel;
}

var timer;
function notLoginHandle(notShowTip){
	logoutHandle();
	uni.hideLoading();
	
	if(timer) clearTimeout(timer);
	
	if(notShowTip) return;
	
	timer = setTimeout(()=>{
		redirectWechatAuth();
		clearTimeout(timer);
	}, 500);
}

async function zRequest(url, data, method, needAuth, contentType, mapResult,notShowTip){
	if(url.indexOf('http') == -1){
		url = api + url;
	}
	
	var authObj = getUserAuth();
	if(needAuth && !authObj){
		notLoginHandle(notShowTip);
		return {};
	}
	var token = authObj.token;
	
	var requestData;
	var requestMethod;
	var requestContentType;
	if(data){
		requestData = data;
	}else{
		requestData = {};
	}
	if(method){
		requestMethod = method;
	}else{
		requestMethod = 'POST';
	}
	if(contentType){
		requestContentType = contentType;
	}else{
		requestContentType = 'application/json';
	}
	
	if(/\?[\d_\w]+\=/.test(url)){
		url = url + "&" + await getRequestParam();
	}else{
		url = url + "?" + await getRequestParam();
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: requestData,
			header: {
				'content-type':requestContentType,
				'Access-Control-Allow-Origin': '*', 
				'Access-Control-Allow-Headers':'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin',
				'Authorization': 'Bearer ' + token //授权头
			},
			method: requestMethod,
			dataType:'json',
			success: (res) => {
// 				console.log('success');
// 				console.log(res);
				if(res.statusCode == 401){
					notLoginHandle(notShowTip);
					return;
				}

				if(mapResult){
					//结果重新映射
					resolve(successRequestWithData(res));
				}else{
					resolve(res);
				}
				
			},
			fail:(res)=>{
			// console.log('request faile');奔溃请求不会进入这里
 			// 	console.log(res);
				//reject(res);
				if(mapResult){
					//结果重新映射
					resolve({statusCode : 408, data:{error:1, message:"request timeout!"}});
				}else{
					resolve({error:1,message:"request timeout!"});
				}
			}
		});
	})
}

async function zRequestMap(url, data, method, needAuth, contentType){
	return await zRequest(url, data, method, needAuth, contentType, true);
}

function zFormReuest(url, data, method, needAuth){
	return zRequest(url, data, method, needAuth, 'application/x-www-form-urlencoded')
}

function zFormReuestMap(url, data, method, needAuth){
	return zRequest(url, data, method, needAuth, 'application/x-www-form-urlencoded', true)
}

function authRequest(url, data, method){
	return zRequest(url, data, method, true);
}

function authRequestMap(url, data, method, notShowTip){
	return zRequest(url, data, method, true, null, true, notShowTip);
}

function successRequest(result){
	return result && result.statusCode == 200 && result.data && result.data.code === 0;
}

function successRequestWithData(result){
	if(result && result.statusCode == 200 && result.data && result.data.code === 0){
		return { success : true,data : result.data };
	}
	
	var message = "";
	//TODO 通过code查找message，查不到才取message
	if(result.data.message)
		message = result.data.message;

	return { success : false, message: message, code : result.data.code};
}

function loginHandle(token, id, avatar, name){
	var user = {
		token : token || "",
		id : id || 0,
		avatar: avatar || "",
		name:name || ""
	};

	uni.setStorageSync("user:auth", user);
}

function logoutHandle(){
	uni.removeStorageSync("user:auth");
}

function getUserAuth(){
	return uni.getStorageSync("user:auth")
}

function hasLogin(){
	var userAuth = getUserAuth();
	return userAuth;
}

function getToken(){
	var userAuth = getUserAuth();
	return (userAuth || {}).token;
}

//FieldPropertyName 图片字段名称 列表字段名称  imageWithContainer图片是否被包一层
function lazyLoad(_this,imageWithContainer,listPropertyName, FieldPropertyName) {//选取未加载的图片处理
	// #ifdef MP-TOUTIAO
	return;
	// #endif
	if(!(_this[listPropertyName] && _this[listPropertyName].length > 0)) return;

	let lazies = uni.createSelectorQuery().in(_this).selectAll('.lazy');

	lazies.boundingClientRect(images => {
		//console.log('list images', images)
		if(images instanceof Array){
			images.forEach((image, index) => {
				if (image && image.top <= _this.windowHeight && image.left <= _this.windowWidth) {
					if(_this[listPropertyName][image.dataset.index] && !_this[listPropertyName][image.dataset.index].showImg){
						if(!imageWithContainer){
							_this[listPropertyName][image.dataset.index].showImg = true;
						}else{
							_this.$set(_this[listPropertyName][image.dataset.index],"showImg",true);
						}
					}
				}
			})
		}else{
			var image = images;
			if (image && image.top <= _this.windowHeight && image.left <= _this.windowWidth) {
				if(_this[listPropertyName][image.dataset.index] && !_this[listPropertyName][image.dataset.index].showImg){
					if(!imageWithContainer){
						_this[listPropertyName][image.dataset.index].showImg = true;
					}else{
						_this.$set(_this[listPropertyName][image.dataset.index],"showImg",true);
					}
				}
			}
		}

	}).exec();
}

function lazyLoadInit(_this,isStrArray, listPropertyName, fieldPropertyName) {//选取未加载的图片处理
	lazyLoadWindow(_this);
	lazyLoad(_this);
}

function lazyLoadWindow(_this){
	var systemInfo = uni.getSystemInfoSync();
	_this.windowHeight = systemInfo.windowHeight;
	_this.windowWidth = systemInfo.windowWidth;
}

//保存列表状态（列表，页码，下一页状态）
function saveListStatus(listId, categoryId, env){
	var _this = env[listId];
	var stringId = categoryId;
	_this.allList[stringId] = env.list;//保存旧种类list
	_this.allPageIndex[stringId] = env.pageIndex;//保存当前种类页码
	_this.allStatus[stringId] = env.status;
}
//初始化列表状态（列表，页码，下一页状态, newListHandle :未获取到状态处理）
function initListStatus(listId, categoryId, env, newListHandle){
	if(!env[listId]) env[listId] = {};
	if(!env[listId].allList) env[listId].allList = {};
	if(!env[listId].allPageIndex) env[listId].allPageIndex = {};
	if(!env[listId].allStatus) env[listId].allStatus = {};
	
	var _this = env[listId];
	var stringId = categoryId;//切换到当前类别
	env.list = _this.allList[stringId] || [];//获取当前种类list;
	env.pageIndex = _this.allPageIndex[stringId] || 1;//获取当前种类页码
	env.status = _this.allStatus[stringId] || "more";
	
	if(env.list.length == 0){
		newListHandle();
	}
}

function getDateStr(){
	var myDate = new Date(); 
	return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
}

function checkVersion(userAction){
	const updateManager = uni.getUpdateManager();

	updateManager.onCheckForUpdate(function (res) {
		// 请求完新版本信息的回调
		if(userAction && !res.hasUpdate){
			uni.showToast({
				title:"没有版本更新"
			})
		}
		//console.log("version check",res.hasUpdate);
		if(res.hasUpdate){
				updateManager.onUpdateReady(function (res) {
				//console.log("version check ready",res);
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
					  if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					  }
					}
				});

			});

			updateManager.onUpdateFailed(function (res) {
			  // 新的版本下载失败
			});
		}
	});
}

function saleIncrease(id){
	var config = getGlobalConfig();
	if(config && config.gcs){
		var change = false;
		for(var i=0;i<config.gcs.length;i++){
			if(config.gcs[i].i == id){
				config.gcs[i].sa = config.gcs[i].sa + 1;
				change = true;
				break;
			}
		}
		if(change) setGlobalConfig(config);
	}
}

function showMsgBox(message, confirmHandle,cancellHandle, confirmText,cancelText, titleText){
	uni.showModal({
		title: titleText || '提示',
		content: message,
		showCancel: cancelText != "" && cancelText != undefined && cancelText != null,
		cancelText: cancelText || '',
		confirmText: confirmText || '知道了',
		success: res => {
			if(res.confirm){
				if(confirmHandle) confirmHandle();
			}else{
				if(cancellHandle) cancellHandle();
			}
		},
		fail: () => {},
		complete: () => {}
	});
}

var codeDic = {
	1:"抱歉出错了，请重试",
	2:"抱歉出错了，请重试",
	3:"抱歉出错了，请重试或联系客服",
	4:"正在处理",
	5:"请求太频繁",
	6:"请求失败",
	
	100:"未找到指定地产公司",
	101:"未授权用户",
	102:"未找到该房产",
	
	201:"不支持的图片",
}

//返回false表示无法处理
function errorCodeHandle(code){
	if(!code) return false;
	var result = false;
	var msg = codeDic[code];
	if(msg){
		result = true;
		showMsgBox(msg);
	}
	return result;
}
function onHideShareHandle(_this){
	if(_this.onShare_XXX){
		if(_this.shareTimer_XXX){
			clearInterval(_this.shareTimer_XXX);
		}
		_this.shareSecond_XXX = 0.0;
		_this.shareTimer_XXX = setInterval(()=>{
			_this.shareSecond_XXX = _this.shareSecond_XXX + .5;
		}, 500);
	}
}
function onShowShareHandle(_this,shareSuccessHandle){
	if(_this.onShare_XXX){
		_this.onShare_XXX = false;
		if(_this.shareSecond_XXX > 1.3 && shareSuccessHandle){
			shareSuccessHandle();
		}
	}
	if(_this.shareTimer_XXX){
		clearInterval(_this.shareTimer_XXX);
	}
}
function shareHandle(_this){
	_this.onShare_XXX = true;
}
//saveListStatusKey 保存历史状态（类别和专题使用，防止切换时重新加载） 
//displayPosition:uc sc m s c
function getGoods(_this, para, requestUrl,saveListStatusKey, displayPosition, adIdx){
	if(_this.status == "noMore") return;
	
	uni.showLoading({
		title: '获取优惠中',
		mask: false
	});
	
	_this.status = "loading";
	var adIndex = 4;
	if(adIdx != undefined && adIdx != null){
		adIndex = adIdx;
	}
	
	var qEnable = false;//displayPosition && _this.allConfig && _this.allConfig.adConfig&& _this.allConfig.adConfig.q && _this.allConfig.adConfig.q[displayPosition];
	var wEnable = false;//displayPosition && _this.allConfig && _this.allConfig.adConfig&& _this.allConfig.adConfig.w && _this.allConfig.adConfig.w[displayPosition];
	var tEnable = false;//displayPosition && _this.allConfig && _this.allConfig.adConfig&& _this.allConfig.adConfig.t && _this.allConfig.adConfig.t[displayPosition];
	try{
		zRequestMap(requestUrl, para).then(
			function(res){
				uni.hideLoading();
				if(res.success){
					if(res.data.last){
						_this.status = "noMore";
						if(res.data.data.length == 0) return;
					}else{
						_this.status = "more";
						_this.pageIndex = _this.pageIndex + 1;
					}
					
					if(!_this.list || _this.list.length == 0){
						var addList = [];
						for(var j=0;j < res.data.data.length;j++){
							// #ifdef MP-QQ
							if(j==adIndex && qEnable){
								addList.push({i:-99,p:'/static/img/ad_200x200.png'});
								addList.push({i:-98,p:'/static/img/ad_200x200.png'});
							}
							// #endif
							// #ifdef MP-TOUTIAO
							if(j==adIndex && tEnable){
								addList.push({i:-99,p:'/static/img/ad_200x200.png'});
								addList.push({i:-98,p:'/static/img/ad_200x200.png'});
							}
							// #endif
							addList.push(res.data.data[j]);
						}
						_this.list = addList;
						
						if(saveListStatusKey){
							saveListStatus(saveListStatusKey, _this.currentCatgory, _this);
						}
					}else{
						var oldListLength = _this.list.length;
						var begin = oldListLength - res.data.data.length;
						if(begin < 0) begin = 0;
						var addList = [];
						for(var j=0;j < res.data.data.length;j++){
							//去重 只去重最后 获得相同的则不加
							var exists = false;
							for(var i= begin;i< oldListLength; i++){
								if(res.data.data[j].goods_id == _this.list[i].goods_id){
									exists = true;
									adIndex = adIndex + 1;
									break;
								}
							}
							
							// #ifdef MP-QQ
							if(j==adIndex && qEnable){
								addList.push({i:-99,p:'/static/img/ad_200x200.png'});
								addList.push({i:-98,p:'/static/img/ad_200x200.png'});
							}
							// #endif
							
							// #ifdef MP-TOUTIAO
							if(j==adIndex && tEnable){
								addList.push({i:-99,p:'/static/img/ad_200x200.png'});
								addList.push({i:-98,p:'/static/img/ad_200x200.png'});
							}
							// #endif
							
							if(!exists){
								addList.push(res.data.data[j]);
							}
						}
						if(addList.length > 0){
							_this.list = _this.list.concat(addList);
							if(saveListStatusKey){
								saveListStatus(saveListStatusKey, _this.currentCatgory, _this);
							}
						}
					}
				}else{
					_this.status = "more";
					uni.showModal({
						title: '提示',
						content: '出错了，请稍后重试，或者联系客服',
						showCancel: false,
						cancelText: '',
						confirmText: '确认',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		);
	}catch(e){
		uni.hideLoading();
		_this.status = "more";
	}
}
function getGoodsPromotePath(goodsId, handle){
	uni.showLoading({
		title: '获取信息中...',
		mask: true
	});
	var _this = this;
	try{
		zRequestMap(`https://guess.zouzuhui.top/api/tool/path?id=${goodsId}&pid=${popularizeId}`, {}).then(
			function(res){
				uni.hideLoading();
				if(res.success){
					if(res.data){
						if(handle){
							handle(res.data.data);
						}
					}
				}else{
					var handled = errorCodeHandle(res.code);
					if(!handled) showMsgBox('获取信息失败，请重试');
					return;
				}
			}
		);
	}catch(e){
		uni.hideLoading();
		console.log('getGoodsPromotePath error', e)
	}
}

function gotoPddMiniPRogram(path){
	// #ifdef MP-WEIXIN
	var appId = "wx32540bd863b27570";
	// #endif
	// #ifdef MP-QQ
	var appId = "1108233859";
	// #endif
	
	uni.navigateToMiniProgram({
		appId:appId,
		path:path
	})
}

function setSearchHis(val){
	if(!val) return;
	let searchHistory = uni.getStorageSync('search:history');
	if (!searchHistory) searchHistory = [];
	let serachData = {};
	if (typeof(val) === 'string') {
		serachData = {
			name:val
		};
	} else {
		serachData = val
	}

	// 判断数组是否存在，如果存在，那么将放到最前面
	for (var i = 0; i < searchHistory.length; i++) {
		if (searchHistory[i].name === serachData.name) {
			searchHistory.splice(i, 1);
			break;
		}
	}

	searchHistory.unshift(serachData);
	searchHistory = searchHistory.splice(0, 15);
	uni.setStorageSync('search:history',searchHistory);
}

function getSearchHis(){
	return uni.getStorageSync('search:history');
}

function clearSearchHis(){
	return uni.removeStorageSync('search:history');
}

function formatNumber(num){
	if(num / 10000 > 1){
		return (num / 10000).toFixed(1) + "万";
	}else{
		return num;
	}
}
function formatMoney(s, n){
   n = n > 0 && n <= 20 ? n : 0;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   var t = "";   
   for(var i = 0; i < l.length; i ++ ){
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }
   
   if(n == 0){
	   return t.split("").reverse().join("")
   }
   return t.split("").reverse().join("") + "." + r;   
}
function getList(api, getIdMethod, _this, saveListStatusKey, rParam){
	var requestParam = rParam || {};
	requestParam.i = _this.pageIndex;
	try{
		zRequestMap(api, requestParam).then(
			function(res){
				uni.hideLoading();
				if(res.success){
					if(res.data.last){
						_this.status = "noMore";
						if(res.data.data.length == 0) return;
					}else{
						_this.status = "more";
						_this.pageIndex = _this.pageIndex + 1;
					}
					
					if(!_this.list || _this.list.length == 0){
						var addList = [];
						for(var j=0;j < res.data.data.length;j++){
							addList.push(res.data.data[j]);
						}
						_this.list = addList;
						
						if(saveListStatusKey){
							saveListStatus(saveListStatusKey, getIdMethod(), _this);
						}
					}else{
						var oldListLength = _this.list.length;
						var begin = oldListLength - res.data.data.length;
						if(begin < 0) begin = 0;
						var addList = [];
						for(var j=0;j < res.data.data.length;j++){
							//去重 只去重最后 获得相同的则不加
							var exists = false;
							for(var i= begin;i < oldListLength; i++){
								if(res.data.data[j].id == _this.list[i].id){
									exists = true;
									//adIndex = adIndex + 1;
									break;
								}
							}

							if(!exists){
								addList.push(res.data.data[j]);
							}
						}
						if(addList.length > 0){
							_this.list = _this.list.concat(addList);
							if(saveListStatusKey){
								saveListStatus(saveListStatusKey, getIdMethod(), _this);
							}
						}
					}
				}else{
					var handled = errorCodeHandle(res.code);
					// if(!handled) showMsgBox('发布失败，请重试');
					
					return; 
				}
			}
		);
	}catch(e){
		console.log('get recommend list error', e)
	}
}

function handleNewLine(content){
	// console.log(content.indexOf("\r\n"));
	// console.log(content.indexOf("\n"));
	// console.log(content.indexOf("↵"))
	return content.replace("\n", "<br/>");
}
function redirectWechatAuth(){
	var redirectUrl = window.location.protocol + "//" + window.location.host + "/rent/index.html"
	window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7eedd6d73b57ce69&redirect_uri=" + encodeURIComponent(redirectUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect" ;
}
function getConfig(handle){
	try{
		zRequestMap('/api/house/gconfig', {}).then(
			function(res){
				if(res.success){
					if(res.data){
						if(res.data.data){
							//配置
							uni.setStorageSync("configs", res.data.data);
						}
						if(res.data.ex1){
							//公司列表
							uni.setStorageSync("offices", res.data.ex1);
						}
						if(res.data.ex2){
							//汇率
							uni.setStorageSync("rate", res.data.ex2);
						}
						if(handle) handle();
					}
				}
			}
		);
	}catch(e){
		console.log('get getConfig error', e)
	}
}

export {
	handleNewLine,isWechatH5,redirectWechatAuth,getConfig,hasLogin,getToken,
	onHideShareHandle,onShowShareHandle,shareHandle,formatNumber,formatMoney,
	getDateStr,lazyLoad,lazyLoadInit,lazyLoadWindow,
	shareTitle,setSearchHis,getSearchHis,clearSearchHis,
	loginHandle,notLoginHandle,logoutHandle,
	forcedLogin,showMsgBox,errorCodeHandle,saleIncrease,
	api,channel,appVersion,
	authRequest,zRequestMap,authRequestMap,
	saveListStatus,initListStatus,getList,
	checkVersion,popularizeId,getGoodsPromotePath,gotoPddMiniPRogram,getGoods
}