var app = app || {};
(function(){
	app.Utils={
		//获取和保保存数据
		store:function(namespace,data){
			if(data){
				return localStorage.setItem(namespace,JSON.stringfy(data));
			}
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},
	};
})();