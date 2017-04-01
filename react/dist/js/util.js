webpackJsonp([1],{

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var app = app || {};

(function () {
	'use strict';

	app.Utils = {
		/**
   * [pluralize 剩余1条：1word；剩余大于1条：n words]
   */
		pluralize: function pluralize(count, word) {
			return count === 1 ? word : word + 's';
		}
	};
})();

/***/ })

},[182]);
//# sourceMappingURL=util.js.map