/**
 * [Utils 通用操作模块]
 */
var app = app || {};
(function () {
	'use strict';

	app.Utils = {
		/**
		 * [pluralize 剩余1条：1word；剩余大于1条：n words]
		 * @param  {[type]} count [剩余条数]
		 * @param  {[type]} word  [字符串]
		 * @return {[type]}       [处理后的字符串]
		 */
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		/**
		 * [store localStorage存储于取值操作]
		 * @param  {[type]} namespace [localStorage设置字段名称]
		 * @param  {[type]} data      [有：setItem,无：getItem]
		 * @return {[type]}           [description]
		 */
		store: function (namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},
		/**
		 * [uuid 生成随机的36位十六进制字符串]
		 * @return {[string]} [7b193911-1910-4f90-89cc-564df6b2535c]
		 */
		uuid: function () {
			var i, random;
			var uuid = '';
			for (i = 0; i < 32; i++) {
                /*
				    1、|0：取整运算，相当于Math.floor()
				       |n：转换为2进制之后相加得到的结果
				       【3|4：转换为二进制之后011 |100  相加得到111=7】
				       【4|4：转换为二进制之后100 |100  相加得到100=4】
				    2、$n：两个二进制数按每一位比较，两个都为1则为1，否则为0。
				       【1111&0110 = 0110】
				    正是由于&和|是逐位运算符，才出现了第一点中所说的，
				    它们总是要比较两个运算数才得出结果，才导致性能会比&&和||低一些
				*/
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
                /*
					i=12,等于4转换成16进制
					i=16,(random & 3 | 8)转换成16进制
					i!=12&&i!=16,等于random转换成16进制
				*/
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}
			return uuid;
		},
		/**
		 * [extend 拷贝覆盖对象全部属性]
		 * @return {[type]} [返回一个具有传递参数对象的全部属性的对象]
		 */
		extend: function () {
			/* 
			this.todos = this.todos.map(function (todo) {
				return Utils.extend({}, todo, {completed: checked});
			});
			*/
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		}
	};
})();
