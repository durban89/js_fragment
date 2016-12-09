//获取当前页面域名地址
static domain(){
	let host = window.location.host;
	let protocol = window.location.protocol + '//';

	return protocol + host;
}
