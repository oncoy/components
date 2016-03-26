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
	 * Created by xcp on 2016/3/18.
	 */

	var Message = __webpack_require__(26);

	function __message(message, log) {
	    return function () {
	        Message(message, function () {
	            console.log(log);
	        });
	    };
	}

	setTimeout(__message('message-1', 1), 0);
	setTimeout(__message('message-2', 2), 500);
	setTimeout(__message('message-3', 3), 1000);
	setTimeout(__message('message-4', 4), 1500);
	setTimeout(__message('message-5', 5), 2000);
	setTimeout(__message('message-6', 6), 2500);

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
/* 5 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by xcp on 2016/3/19.
	 */
	module.exports = document.body || document.documentElement;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = TWEEN;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller
	// fixes from Paul Irish and Tino Zijdel

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = window.setTimeout(function () {
	        callback(currTime + timeToCall);
	    }, timeToCall);
	    lastTime = currTime + timeToCall;
	    return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
	    clearTimeout(id);
	};

	module.exports = {
	    requestAnimationFrame: window.requestAnimationFrame,
	    cancelAnimationFrame: window.cancelAnimationFrame
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/14.
	 */

	var TweenEvents = ['Start', 'Update', 'Complete', 'Stop'];
	var noop = __webpack_require__(2);
	var TWEEN = __webpack_require__(7);
	var Tween = TWEEN.Tween;
	var requestAnimation = __webpack_require__(8);
	var requestAnimationFrame = requestAnimation.requestAnimationFrame;
	var cancelAnimationFrame = requestAnimation.cancelAnimationFrame;
	var assign = __webpack_require__(6);
	var React = __webpack_require__(1);

	module.exports = {

	    propTypes: {
	        component: React.PropTypes.string,
	        style: React.PropTypes.object,
	        from: React.PropTypes.object,
	        to: React.PropTypes.object,
	        during: React.PropTypes.number,
	        delay: React.PropTypes.number,
	        repeat: React.PropTypes.number,
	        easing: React.PropTypes.func,
	        className: React.PropTypes.string
	    },

	    getInitialState: function getInitialState() {
	        return { to: {} };
	    },

	    getDefaultProps: function getDefaultProps() {
	        var props = {};

	        TweenEvents.forEach(function (name) {
	            props['on' + name] = noop;
	        });

	        return assign(props, {
	            className: '',
	            component: 'span',
	            styleProps: { position: 'absolute' },
	            from: {},
	            to: {},
	            during: 1000,
	            delay: 0,
	            repeat: 0,
	            componentDidMount: noop,
	            easing: TWEEN.Easing.Linear.None
	        });
	    },

	    styleProps: function styleProps() {
	        return assign({}, this.state.to, this.props.style);
	    },

	    onTweenUpdate: function onTweenUpdate(result) {
	        this.setState({ to: result });
	    },

	    backToTheStart: function backToTheStart(callback) {
	        this.animate(this.props.to, this.props.from, callback);
	    },

	    animate: function animate(from, to, callback) {
	        var self = this;
	        var id = null;
	        var props = this.props;
	        var _animate = null;
	        var cancelAnimate = null;

	        from = assign({}, from);
	        to = assign({}, to);

	        var tween = this.__tween = new Tween(from).to(to, props.during).delay(props.delay).repeat(props.repeat).easing(props.easing);

	        tween.onStart(function () {
	            props.onStart.call(self);
	        });

	        tween.onUpdate(function () {
	            // this 为 tween 中的 props 对象
	            // 所以可以直接传递给函数
	            props.onUpdate.call(self, this);
	            self.onTweenUpdate.call(self, this);
	        });

	        tween.onComplete(function () {
	            typeof callback === 'function' && callback();
	            cancelAnimate();
	        });

	        tween.onStop(function () {
	            cancelAnimate();
	            props.onStop.call(this);
	        });

	        tween.start();

	        cancelAnimate = function cancelAnimate() {
	            if (id !== null) {
	                cancelAnimationFrame(id);
	                id = null;
	            }
	        };

	        _animate = function animate(time) {
	            id = requestAnimationFrame(_animate);
	            TWEEN.update(time);
	        };

	        _animate();
	    },

	    componentDidMount: function componentDidMount() {
	        this.props.componentDidMount(this);
	        this.animate(this.props.from, this.props.to, this.props.onComplete);
	    }
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var AnimateMixin = __webpack_require__(9);
	var assert = __webpack_require__(4);

	var Animate = React.createClass({
	    displayName: 'Animate',

	    mixins: [AnimateMixin],

	    render: function render() {
	        var children = this.props.children;
	        var Components = this.props.component;
	        var self = this;

	        children = children && children.constructor === Array ? children : [children];

	        assert(children.length, "children is required");

	        children = React.Children.map(children, function (child) {
	            return React.cloneElement(child, { parent: self });
	        });

	        return React.createElement(Components, {
	            className: this.props.className,
	            style: this.styleProps() }, children);
	    }

	});

	module.exports = Animate;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/18.
	 */

	var ReactDOM = __webpack_require__(3);
	var noop = __webpack_require__(2);

	module.exports = {

	    getInitialState: function getInitialState() {
	        return { isVisible: true };
	    },

	    getDefaultProps: function getDefaultProps() {
	        this.__backToTheStart = noop;
	        return {
	            message: '',
	            during: 3000,
	            onComplete: noop,
	            closeable: false,
	            afterClose: noop,
	            animate: {
	                component: 'span',
	                from: { opacity: 0 },
	                to: { opacity: 1 },
	                during: 500
	            }
	        };
	    },

	    // export animate
	    animateDidMount: function animateDidMount(animate) {
	        this.__backToTheStart = animate.backToTheStart;
	    },

	    unmount: function unmount() {
	        var self = this;
	        var mountNode = ReactDOM.findDOMNode(self).parentNode;
	        if (typeof self.__backToTheStart === 'function') {
	            self.__backToTheStart(function () {
	                ReactDOM.unmountComponentAtNode(mountNode);
	            });
	        } else {
	            ReactDOM.unmountComponentAtNode(mountNode);
	        }
	        self.props.afterClose();
	    },

	    autoUnmount: function autoUnmount() {
	        setTimeout(this.unmount, this.props.during);
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/18.
	 * 全局提示信息，会自动隐藏掉
	 * 如果有多个信息同时出现，则依次排成一列
	 */

	var React = __webpack_require__(1);
	var Animate = __webpack_require__(10);
	var AutoUnmountMixin = __webpack_require__(24);
	var noop = __webpack_require__(2);

	var Message = React.createClass({
	    displayName: 'Message',

	    mixins: [AutoUnmountMixin],

	    render: function render() {
	        var props = this.props;
	        var onComplete = props.closeable ? noop : this.autoUnmount;

	        return React.createElement(Animate, {
	            component: props.animate.component,
	            from: props.animate.from,
	            to: props.animate.to,
	            during: props.animate.during,
	            componentDidMount: this.animateDidMount,
	            onComplete: onComplete }, React.createElement('div', { className: 'inline-block' }, React.createElement('div', { className: 'bub-bill' }, React.createElement('div', { className: 'util-bill-pd' }, props.message))));
	    }
	});

	module.exports = Message;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by xcp on 2016/3/19.
	 */
	"use strict";

	var ReactDOM = __webpack_require__(3);
	var Message = __webpack_require__(25);
	var body = __webpack_require__(5);
	var mountNodeWrap = document.createElement('div');
	mountNodeWrap.style.cssText = 'position:absolute;top:20px;left:50%;';
	body.appendChild(mountNodeWrap);

	module.exports = function (message, callback) {
	    var mountNode = document.createElement('div');
	    mountNode.style.cssText = 'margin-bottom:10px';
	    mountNodeWrap.appendChild(mountNode);
	    var afterClose = function afterClose() {
	        callback && callback();
	        mountNodeWrap.removeChild(mountNode);
	    };

	    ReactDOM.render(React.createElement(Message, {
	        message: message,
	        afterClose: afterClose }), mountNode);
	};

/***/ }
/******/ ]);