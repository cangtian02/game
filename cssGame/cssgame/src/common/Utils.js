export default {
	/**
	 * css源码字符串转对象
	 * @param {*} str
	 * @returns
	 */
	cssToObj(str) {
		str = str.replace(/\{|\}/g, "");
		let arr = str.split(';');
		let obj = {};
		arr.forEach(val => {
			if (val !== '') {
				val = val.split(':');
				obj[this.deleteSpace(val[0])] = this.deleteSpace(val[1]);
			}
		});
		return obj;
	},
	/**
	 * css源码对象转数组
	 * @param {*} obj
	 * @returns
	 */
	objToArr(obj) {
		let arr = [];
		for (let key in obj) {
			let o = {};
			o[key] = obj[key];
			arr.push(o);
		}
		return arr;
	},
	/**
	 * 数组随机打乱sort
	 * @returns
	 */
	randomsort() {
		return Math.random() > .5 ? -1 : 1;
	},
	/**
	 * 去除字符串前后空格
	 * @param {*} str
	 * @returns
	 */
	deleteSpace(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/**
	 * 获取一个数字内的随机数
	 * @param {*} num 整数
	 * @returns 随机整数
	 * 如：传入10 return 3
	 */
	getRandom(num) {
		return parseInt(Math.random() * (num), 10);
	},
	/**
	 * 将一行css转换成换行形式
	 * @param {*} code .c{color: #fff;}
	 * @returns .c{<br/>color: #fff;<br/>}
	 */
	tranCode(code) {
		let reg1 = /\.(.+?)\}/g;
		let reg2 = /\.(.+?)\{/g;
		let reg3 = /\{(.+?)\}/g;

		let arr = code.match(reg1);
		let str = '';

		arr.forEach(val => {
			let s1 = val.match(reg2)[0];
			s1 = s1.substring(0, s1.length - 1);
			s1 = this.deleteSpace(s1);
			str += s1 + '{<br />';

			let s2 = this.cssToObj(val.match(reg3)[0]);
			let s3 = this.objToArr(s2);
			for (let i = 0, len = s3.length; i < len; i++) {
				str += '  ' + Object.keys(s3[i])[0] + ': ' + s3[i][Object.keys(s3[i])[0]] + ';<br />';
			}
			str += '}<br />';
		});

		return str;
	},
}