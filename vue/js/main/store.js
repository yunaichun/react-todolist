(function(exports){
     var STORAGE_KEY = 'todos-vuejs';
     exports.todoStorage={
     	fetch:function(){
     		//return转化后的js的object对象,
     		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
     	},
     	save:function(todos){
     		//存入JSON对象格式
     		localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
     	}
     };
})(window)