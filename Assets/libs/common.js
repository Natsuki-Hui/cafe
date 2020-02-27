// 正则验证函数

/***
 * 手机号验证
 */
function checkPhone(phone){
	if(/^1[3456789]\d{9}$/.test(phone)){
		return true;
	}else{
		return false;
	}
}

/***
 * 邮箱验证
 */
function checkEmail(email){
	if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)){
		return true;
	}else{
		return false;
	}
}

/***
 * 身份证验证
 */
function checkIdcard(code){
	if(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(code)){
		return true;
	}else{
		return false;
	}
}

/***
 * 中文验证
 */
function checkChinese(text){
	// ASCII 码
	if(/^[\u0391-\uFFE5]+$/.test(text)){
		return true;
	}else{
		return false;
	}
}

/***
 * 空值验证
 */
function checkRequired(text){
	if(/^\s*$/.test(text) || text==undefined){
		return true;
	}else{
		return false;
	}
}

/***
 * 密码验证（数字）
 */
function checkPwd(text){
	if(/^\w{6,12}$/.test(text)){
		return true;
	}else{
		return false;
	}
}

/***
 * 整数+小数验证（小数点后1-2位）
 */
function checkFloat(number){
	if(/^[0-9]+(.[0-9]{1,2})?$/.test(number)){
		return true;
	}else{
		return false;
	}
}

// 应用
// if(!checkPhone(13800138000)){
// 	// 验证不成功，提示
// 	alert(11)
// }