/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/12.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var Condition = __webpack_require__(23);

	var conditionDemoData = [{ value: 0, children: 'a' }, { value: 1, children: 'b' }, { value: 2, children: 'c' }, { value: 3, children: 'd' }];

	var log = function log() {
	    console.info(arguments);
	};

	ReactDOM.render(React.createElement(Condition, {
	    itemList: conditionDemoData,
	    onChecked: function onChecked(isChecked, value) {
	        log('onChecked');
	        log(isChecked, value);
	    },
	    onChange: function onChange(prev, current) {
	        log('onChange');
	        log(prev, current);
	    }
	}), document.getElementById('demo'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by xcp on 2016/3/14.
	 */
	"use strict";

	module.exports = function () {};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	module.exports = function (condition, format) {
	    var args = Array.prototype.splice.call(arguments, 0);

	    if (args.length < 2) {
	        throw new Error("condition and message are required");
	    }

	    format = '' + format;

	    if (!condition) {
	        var index = 2;
	        var message = format.replace(/%s/g, function () {
	            return args[index++];
	        });

	        if (typeof console !== 'undefined') console.log(message);
	        try {
	            throw new Error(message);
	        } catch (e) {}
	    }
	};

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	var React = __webpack_require__(1);
	var noop = __webpack_require__(2);
	var ConditionMixins = __webpack_require__(22);
	var classNames = __webpack_require__(12);

	var ConditionItem = React.createClass({
	    displayName: 'ConditionItem',

	    mixins: [ConditionMixins],

	    getInitialState: function getInitialState() {
	        return {
	            isChecked: false
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            className: 'cond-item',
	            checkedClassName: 'checked',
	            children: null,
	            value: null,
	            onChecked: noop,
	            onChange: noop,
	            isChecked: false
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        this.setState({ isChecked: this.props.isChecked });
	    },

	    // todo 该组件设计得有点绕，得改
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({ isChecked: nextProps.isChecked });
	    },

	    onChecked: function onChecked() {
	        this.setState({ isChecked: !this.state.isChecked }, function () {
	            this.props.onChecked(this.state.isChecked, this.props.value);
	        });
	    },

	    render: function render() {
	        var props = this.props;
	        var className = {};

	        className[props.className] = true;
	        className[props.checkedClassName] = props.isChecked;

	        return React.createElement('span', {
	            className: classNames(className),
	            onClick: this.onChecked }, props.children);
	    }

	});

	module.exports = ConditionItem;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	var React = __webpack_require__(1);

	module.exports = {
	    propTypes: {
	        itemList: React.PropTypes.array,
	        onChecked: React.PropTypes.func,
	        onChange: React.PropTypes.func,
	        className: React.PropTypes.string,
	        itemClassName: React.PropTypes.string,
	        checkedClassName: React.PropTypes.string,
	        defaultChecked: React.PropTypes.any
	    }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	var React = __webpack_require__(1);

	module.exports = {
	    propTypes: {
	        itemList: React.PropTypes.array,
	        onChecked: React.PropTypes.func,
	        onChange: React.PropTypes.func,
	        className: React.PropTypes.string,
	        itemClassName: React.PropTypes.string,
	        checkedClassName: React.PropTypes.string,
	        defaultChecked: React.PropTypes.any
	    }
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	var React = __webpack_require__(1);
	var assert = __webpack_require__(4);
	var noop = __webpack_require__(2);
	var ConditionItem = __webpack_require__(20);
	var ConditionMixin = __webpack_require__(21);

	var Conditional = React.createClass({
	    displayName: 'Conditional',

	    mixins: [ConditionMixin],

	    getInitialState: function getInitialState() {
	        return {
	            checkedItemValue: null
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            itemList: [],
	            onChecked: noop,
	            onChange: noop,
	            className: 'conditional',
	            itemClassName: 'cond-item',
	            checkedClassName: 'checked',
	            defaultChecked: null
	        };
	    },

	    onChecked: function onChecked(isChecked, currentValue) {
	        var prev = this.state.checkedItemValue;

	        this.setState({ checkedItemValue: isChecked ? currentValue : null });
	        this.props.onChecked(isChecked, currentValue);

	        if (isChecked && prev !== currentValue) {
	            this.props.onChange(prev, currentValue);
	        }
	    },

	    componentWillMount: function componentWillMount() {
	        this.setState({ checkedItemValue: this.props.defaultChecked });
	    },

	    render: function render() {
	        var props = this.props;

	        var items = props.itemList.map(function (item) {
	            return React.createElement(ConditionItem, {
	                key: item.value,
	                isChecked: this.state.checkedItemValue === item.value,
	                onChecked: this.onChecked,
	                value: item.value }, item.children);
	        }, this);

	        return React.createElement('div', { className: props.className }, items);
	    }
	});

	module.exports = Conditional;

/***/ }
/******/ ]);