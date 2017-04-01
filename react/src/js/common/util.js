var app = app || {};

(function () {
	'use strict';

	app.Utils={
		/**
		 * [pluralize 剩余1条：1word；剩余大于1条：n words]
		 */
		pluralize:function(count,word){
			return count===1?word:word+'s';
		}
	};
})();
