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
	 * Created by xcp on 2016/3/22.
	 */

	var Selector = __webpack_require__(37);
	var DropDown = __webpack_require__(16);
	var ReactDOM = __webpack_require__(3);
	var React = __webpack_require__(1);

	var log = function log() {
	    console.info(arguments);
	};

	ReactDOM.render(React.createElement(Selector.Importable, { onSelect: log }), document.getElementById('demo'));

	// 自定义内容
	var itemList = ['全部时间', '3天内', '7天内', '30天内', '其他'];
	ReactDOM.render(React.createElement(Selector.Importable, {
	    onSelect: log,
	    itemList: itemList,
	    defaultSelectedValue: itemList[0],
	    rejectValue: itemList[itemList.length - 1] }), document.getElementById('time'));

	// itemList:
	// [{value:0, text: '筛选异常原因'}]
	// 凡value不为真的item，全部会设置为不可选择项
	ReactDOM.render(React.createElement(Selector.Diff, { onSelect: log }), document.getElementById('diff'));

	// 自定义下拉菜单-货柜详情列表
	ReactDOM.render(React.createElement(Selector.Container, {
	    itemList: [{ index: 0, percent: 0.8 }, { index: 1, percent: 0.23 }],
	    onSelect: log }), document.getElementById('container'));

	// 自定义下拉菜单-先出货柜
	var containers = [{ index: 0, percent: 0.8 }, { index: 1, percent: 0.23 }, { index: 2, percent: 0.23 }, { index: 12, percent: 0.83 }];

	ReactDOM.render(React.createElement(Selector.FOContainer, {
	    firstOut: [containers[2]],
	    itemList: containers,
	    onSelect: log }), document.getElementById('fo-container'));

	ReactDOM.render(React.createElement(Selector.MiniContainer, {
	    itemList: containers,
	    onSelect: log }), document.getElementById('mini-container'));

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
/* 6 */
/***/ function(module, exports) {

	module.exports = TWEEN;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by xcp on 2016/3/19.
	 */
	module.exports = document.body || document.documentElement;

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
	var TWEEN = __webpack_require__(6);
	var Tween = TWEEN.Tween;
	var requestAnimation = __webpack_require__(8);
	var requestAnimationFrame = requestAnimation.requestAnimationFrame;
	var cancelAnimationFrame = requestAnimation.cancelAnimationFrame;
	var assign = __webpack_require__(5);
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/22.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var Animate = __webpack_require__(10);
	var contains = __webpack_require__(14);
	var DOMEvent = __webpack_require__(13);
	var body = __webpack_require__(7);
	var noop = __webpack_require__(2);
	var assert = __webpack_require__(4);
	var triggerHide = function triggerHide() {
	    return true;
	};

	var HideOnBodyClick = React.createClass({
	    displayName: 'HideOnBodyClick',

	    getInitialState: function getInitialState() {
	        return {
	            isVisible: true
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            component: 'div',
	            isVisible: true,
	            refTarget: null,
	            onVisible: noop,
	            onAnimateMount: noop,
	            triggerHide: triggerHide
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var self = this;

	        this.__bodyHandle = function (e) {
	            var target = e.target || e.srcElement;
	            var mountNode = ReactDOM.findDOMNode(self);
	            var props = self.props;

	            if (!props.triggerHide() || props.refTarget && contains(props.refTarget, target) || contains(mountNode, target)) {
	                return;
	            }

	            if (self.__animate && self.__animate.backToTheStart) {
	                self.__animate.backToTheStart(function () {
	                    props.onVisible();
	                });
	            }
	        };

	        DOMEvent.on(body, 'click', this.__bodyHandle, false);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        DOMEvent.off(body, 'click', this.__bodyHandle, false);
	    },

	    holdAnimate: function holdAnimate(animate) {
	        this.__animate = animate;
	        this.props.onAnimateMount(animate);
	    },

	    render: function render() {
	        var props = this.props;
	        assert(props.children, 'children required in HideOnBodyClick');

	        return React.createElement(Animate, {
	            style: props.style,
	            component: props.component,
	            from: { opacity: 0 },
	            to: { opacity: 1 },
	            during: 500,
	            componentDidMount: this.holdAnimate }, props.children);
	    }
	});

	module.exports = HideOnBodyClick;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/19.
	 */

	var isElement = function isElement(elem) {
	    var result = false;
	    try {
	        result = elem.nodeType === 1;
	    } catch (e) {}
	    return result;
	};

	var body = __webpack_require__(7);
	var isW3c = !!body.addEventListener;
	var ADD_EVENT_NAME = isW3c ? 'addEventListener' : 'attachEvent';
	var REMOVE_EVENT_NAME = isW3c ? 'removeEventListener' : 'detachEvent';
	var EVENT_TYPE_PREFIX = isW3c ? '' : 'on';

	var eventType = function eventType(type) {
	    return EVENT_TYPE_PREFIX + type;
	};

	var factory = function factory(handleName) {
	    return function (elem, type, handle, capture) {
	        if (!isElement(elem)) return elem;
	        if (elem[handleName]) {
	            elem[handleName](eventType(type), handle, capture);
	        }
	        return elem;
	    };
	};

	module.exports = {
	    on: factory(ADD_EVENT_NAME),
	    off: factory(REMOVE_EVENT_NAME)
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by xcp on 2016/3/15.
	 *
	 * from jquery-1.9.1
	 */

	module.exports = function (a, b) {
	    var c = a.nodeType === 9 ? a.documentElement : a;

	    return a === b || !!(b && b.nodeType === 1 && (c.contains ? c.contains(b) : a.compareDocumentPosition && a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_CONTAINED_BY));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/24.
	 */

	var classNames = __webpack_require__(11);

	module.exports = {

	    addOne: function addOne() {
	        var index = 0;
	        this.props.itemList.forEach(function (item) {
	            if (item.index > index) index = item.index;
	        });

	        this.props.itemList.push({ percent: 0, index: index + 1 });
	        this.reRender(this.props.itemList);
	    },

	    removeOne: function removeOne(item) {
	        var index = this.props.itemList.indexOf(item);
	        if (index !== -1) {
	            this.props.itemList.splice(index, 1);
	            this.reRender(this.props.itemList);
	        }
	    },

	    getProgressClassName: function getProgressClassName() {
	        var args = Array.prototype.slice.call(arguments, 1);
	        var percent = arguments[0];
	        var className = {};

	        args.forEach(function (name) {
	            className[name] = true;
	        });

	        className['progress-' + parseInt(percent * 100)] = true;
	        return classNames(className);
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/22.
	 */

	var React = __webpack_require__(1);
	var noop = __webpack_require__(2);
	var Selectable = __webpack_require__(36);

	var DropDown = React.createClass({
	    displayName: 'DropDown',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onSelect: noop,
	            selectorContent: null,
	            selectorBindEvent: true,
	            panelContent: null
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            currentSelectedValue: null
	        };
	    },

	    onSelect: function onSelect(value) {
	        this.props.onSelect(value);
	        this.__selector.onSelect(value);
	        if (this.__selectable) {
	            this.__selectable.onSelect(value);
	        }
	    },

	    onSelectableMount: function onSelectableMount(selectable) {
	        this.__selectable = selectable;
	    },

	    onSelectorMount: function onSelectorMount(selector) {
	        this.__selector = selector;
	    },

	    render: function render() {
	        var props = this.props;
	        var items = React.Children.map(props.panelContent, function (item) {
	            return item.props.isItem ? React.cloneElement(item, { onSelect: this.onSelect }) : item;
	        }, this);

	        var panelContent = React.createElement('ol', { className: 'comp-select-m-t' }, items);

	        var selectorContent = React.cloneElement(props.selectorContent, {
	            componentDidMount: this.onSelectorMount
	        });

	        return React.createElement(Selectable, {
	            selectorBindEvent: props.selectorBindEvent,
	            componentDidMount: this.onSelectableMount,
	            selectorContent: selectorContent,
	            panelContent: panelContent });
	    }

	});

	DropDown.Item = React.createClass({
	    displayName: 'Item',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: null,
	            isItem: true,
	            getItemContent: noop,
	            onSelect: noop
	        };
	    },

	    onSelect: function onSelect() {
	        this.props.onSelect(this.props.value);
	    },

	    render: function render() {
	        return this.props.children ? React.cloneElement(this.props.children, { onClick: this.onSelect }) : this.props.getItemContent(this.props.value, { onClick: this.onSelect });
	    }
	});

	DropDown.Selector = React.createClass({
	    displayName: 'Selector',

	    getInitialState: function getInitialState() {
	        return {
	            panelStateIsShow: false,
	            currentSelectedValue: null
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            defaultSelectedValue: null,
	            onSelect: noop,
	            componentDidMount: noop,
	            getSelectorContent: noop
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.props.componentDidMount(this);
	    },

	    componentWillMount: function componentWillMount() {
	        this.setState({ currentSelectedValue: this.props.defaultSelectedValue });
	    },

	    onSelect: function onSelect(value) {
	        var self = this;
	        this.setState({ currentSelectedValue: value }, function () {
	            self.props.onSelect(value);
	        });
	    },

	    render: function render() {
	        return this.props.children ? this.props.children : this.props.getSelectorContent(this.state.currentSelectedValue);
	    }
	});

	module.exports = DropDown;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/24.
	 */

	var React = __webpack_require__(1);
	var noop = __webpack_require__(2);

	module.exports = {

	    propTypes: {
	        itemList: React.PropTypes.array,
	        defaultSelectedValue: React.PropTypes.any,
	        onSelect: React.PropTypes.func
	    },

	    getInitialState: function getInitialState() {
	        return {
	            panelStateIsShow: false,
	            currentSelectedValue: null
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        var itemList = [];
	        return {
	            itemList: itemList,
	            defaultSelectedValue: itemList[0],
	            onSelect: noop
	        };
	    },

	    onSelect: function onSelect(value) {
	        var self = this;
	        self.setState({ currentSelectedValue: value }, function () {
	            self.props.onSelect(value);
	        });
	        self.__animate.backToTheStart(function () {
	            self.onVisible();
	        });
	    },

	    onVisible: function onVisible() {
	        this.setState({ panelStateIsShow: false });
	    },

	    triggerHide: function triggerHide() {
	        return this.state.panelStateIsShow;
	    },

	    onAnimateMount: function onAnimateMount(animate) {
	        this.__animate = animate;
	    },

	    showPanel: function showPanel() {
	        var self = this;
	        self.setState({ panelStateIsShow: true }, function () {
	            var animate = self.__animate;
	            var animateProps = animate.props;
	            animate.animate(animateProps.from, animateProps.to);
	        });
	    },

	    componentWillMount: function componentWillMount() {
	        this.setState({ currentSelectedValue: this.props.defaultSelectedValue });
	    }
	};

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/23.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var HideOnBodyClick = __webpack_require__(12);
	var classNames = __webpack_require__(11);
	var noop = __webpack_require__(2);

	var SelectableMixin = __webpack_require__(17);
	var ContainerMixin = __webpack_require__(15);

	var Container = React.createClass({
	    displayName: 'Container',

	    mixins: [SelectableMixin, ContainerMixin],

	    reRender: function reRender(itemList) {
	        var mountNode = ReactDOM.findDOMNode(this).parentNode;
	        ReactDOM.render(React.createElement(Container, {
	            itemList: itemList,
	            onSelect: this.props.onSelect,
	            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
	    },

	    render: function render() {
	        var panelClassName = {
	            'comp-custom-select': true,
	            'comp-show-panel': this.state.panelStateIsShow
	        };

	        var progressText = 'progress-bar-text';

	        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, progressText);

	        var itemList = this.props.itemList.map(function (item) {
	            return React.createElement('li', { className: 'comp-panel-item', key: item.index }, React.createElement('strong', { className: 'comp-icon-gap' }, item.index), React.createElement('div', { className: 'comp-select-progress comp-icon-gap',
	                onClick: this.onSelect.bind(this, item) }, React.createElement('span', { className: this.getProgressClassName(item.percent, progressText) })), React.createElement('span', {
	                className: 'icon-img icon-close util-v-m',
	                onClick: this.removeOne.bind(this, item) }));
	        }, this);

	        return React.createElement('div', { className: classNames(panelClassName), ref: 'selectable' }, React.createElement('div', { className: 'comp-select-selector-pd' }, React.createElement('div', { className: 'comp-select-selector', onClick: this.showPanel }, React.createElement('div', { className: 'comp-select-progress' }, React.createElement('span', { className: progressClassName })), React.createElement('span', { className: 'icon-img icon-tran-black-d' }))), React.createElement(HideOnBodyClick, {
	            refTarget: this.refs.selectable,
	            onVisible: this.onVisible,
	            onAnimateMount: this.onAnimateMount,
	            triggerHide: this.triggerHide }, React.createElement('div', { className: 'comp-select-panel comp-progress-panel' }, React.createElement('ol', { className: 'comp-select-m-t' }, itemList, React.createElement('li', { className: 'comp-panel-title util-text-center' }, React.createElement('span', { className: 'icon-img icon-plus util-v-m', onClick: this.addOne }))))));
	    }
	});

	module.exports = Container;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _typeof(obj) {
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}

	/**
	 * Created by xcp on 2016/3/23.
	 */

	var React = __webpack_require__(1);
	var DropDown = __webpack_require__(16);
	var noop = __webpack_require__(2);

	var getSelectorContent = function getSelectorContent(item) {
	    return React.createElement('div', { className: 'comp-select-selector' }, React.createElement('span', { className: 'util-font-12' }, item.text), React.createElement('span', { className: 'icon-img icon-tran-black-d' }));
	};

	var getItemContent = function getItemContent(item, props) {
	    var elem = React.createElement(DropDown.Item, { isItem: !!item.value, value: item }, item.value ? React.createElement('li', { className: 'comp-panel-item' }, React.createElement('strong', null, item.text)) : React.createElement('li', { className: 'comp-panel-title' }, React.createElement('span', { className: 'color-remind' }, item.text)));
	    return React.cloneElement(elem, props);
	};

	var Diff = React.createClass({
	    displayName: 'Diff',

	    getInitialState: function getInitialState() {
	        return {
	            currentSelectedValue: null
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        var itemList = [{ value: 0, text: '筛选异常原因' }, { value: 1, text: '全部' }, { value: 2, text: '编号重复' }, { value: 3, text: '编号不存在' }, { value: 4, text: '已下架' }];

	        return {
	            itemList: itemList,
	            defaultSelectedValue: itemList[0],
	            onSelect: noop,
	            getSelectorContent: getSelectorContent,
	            getItemContent: getItemContent
	        };
	    },

	    onSelect: function onSelect(value) {
	        var self = this;
	        self.setState({ currentSelectedValue: value }, function () {
	            self.props.onSelect(value);
	        });
	    },

	    ensureEvent: function ensureEvent() {
	        var value = this.state.currentSelectedValue;
	        return value !== this.props.rejectValue || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !value.target;
	    },

	    render: function render() {
	        var self = this;
	        var props = self.props;
	        var panelContent = props.itemList.map(props.getItemContent);
	        var selector = React.createElement(DropDown.Selector, {
	            onSelect: self.onSelect,
	            defaultSelectedValue: props.defaultSelectedValue,
	            getSelectorContent: props.getSelectorContent });

	        return React.createElement(DropDown, {
	            selectorContent: selector,
	            panelContent: panelContent });
	    }
	});

	module.exports = Diff;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/23.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var HideOnBodyClick = __webpack_require__(12);
	var classNames = __webpack_require__(11);
	var noop = __webpack_require__(2);

	var SelectableMixin = __webpack_require__(17);
	var ContainerMixin = __webpack_require__(15);

	var FOContainer = React.createClass({
	    displayName: 'FOContainer',

	    propTypes: {
	        firstOut: React.PropTypes.array
	    },

	    mixins: [SelectableMixin, ContainerMixin],

	    getDefaultProps: function getDefaultProps() {
	        return { firstOut: [] };
	    },

	    reRender: function reRender(itemList) {
	        var mountNode = ReactDOM.findDOMNode(this).parentNode;
	        ReactDOM.render(React.createElement(FOContainer, {
	            itemList: itemList,
	            firstOut: this.props.firstOut,
	            onSelect: this.props.onSelect,
	            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
	    },

	    getItemElement: function getItemElement(item) {
	        return React.createElement('li', { className: 'comp-panel-item', key: item.index }, React.createElement('strong', { className: 'comp-icon-gap' }, item.index), React.createElement('div', { className: 'comp-select-progress comp-icon-gap',
	            onClick: this.onSelect.bind(this, item) }, React.createElement('span', { className: this.getProgressClassName(item.percent, 'progress-bar-text') })), React.createElement('span', { className: 'icon-img icon-close util-v-m', onClick: this.removeOne.bind(this, item) }));
	    },

	    render: function render() {
	        var panelClassName = {
	            'comp-custom-select': true,
	            'comp-show-panel': this.state.panelStateIsShow
	        };

	        var progressText = 'progress-bar-text';

	        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, progressText);

	        var props = this.props;

	        var itemList = props.itemList.filter(function (item) {
	            return props.firstOut.indexOf(item) === -1;
	        }, this).map(this.getItemElement, this);

	        var firstOutList = props.firstOut.map(this.getItemElement, this);

	        return React.createElement('div', { className: classNames(panelClassName), ref: 'selectable' }, React.createElement('div', { className: 'comp-select-selector-pd' }, React.createElement('div', { className: 'comp-select-selector', onClick: this.showPanel }, React.createElement('div', { className: 'comp-select-progress' }, React.createElement('span', { className: progressClassName })), React.createElement('span', { className: 'icon-img icon-tran-black-d' }))), React.createElement(HideOnBodyClick, {
	            refTarget: this.refs.selectable,
	            onVisible: this.onVisible,
	            onAnimateMount: this.onAnimateMount,
	            triggerHide: this.triggerHide }, React.createElement('div', { className: 'comp-select-panel comp-progress-panel' }, React.createElement('div', { className: 'bub-bd-b' }, React.createElement('div', { className: 'bub-pd-l-lg bub-pd-r-lg' }, React.createElement('span', { className: 'color-selection comp-neg-m-l comp-icon-gap' }, '先出货柜'), React.createElement('span', { className: 'icon-img icon-qa-normal util-v-text-t' })), React.createElement('div', { className: 'bub-pd-b' }, React.createElement('ol', { className: 'comp-select-m-t bub-pd-t' }, firstOutList))), React.createElement('ol', { className: 'comp-select-m-t bub-pd-t' }, React.createElement('li', { className: 'comp-panel-title util-line-14' }, React.createElement('span', { className: 'color-selection comp-neg-m-l comp-icon-gap' }, '其他货柜'), React.createElement('span', { className: 'icon-img icon-qa-normal util-v-text-t' })), itemList, React.createElement('li', { className: 'comp-panel-title util-text-center' }, React.createElement('span', { className: 'icon-img icon-plus util-v-m', onClick: this.addOne }))))));
	    }
	});

	module.exports = FOContainer;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _typeof(obj) {
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}

	/**
	 * Created by xcp on 2016/3/23.
	 */

	var React = __webpack_require__(1);
	var DropDown = __webpack_require__(16);
	var noop = __webpack_require__(2);

	var getSelectorContent = function getSelectorContent(rejectValue, onChange) {
	    return function (value) {
	        if (value === rejectValue) {
	            return React.createElement('input', {
	                onChange: onChange,
	                className: 'input-default',
	                style: { width: 60 },
	                placeholder: '请输入...' });
	        }
	        return React.createElement('div', { className: 'comp-select-selector' }, React.createElement('span', { className: 'util-font-12' }, value), React.createElement('span', { className: 'icon-img icon-tran-black-d' }));
	    };
	};

	var getItemContent = function getItemContent(value, props) {
	    var item = React.createElement('li', { className: 'comp-panel-item' }, React.createElement('strong', null, value));
	    return React.cloneElement(item, props);
	};

	var Importable = React.createClass({
	    displayName: 'Importable',

	    getInitialState: function getInitialState() {
	        return {
	            currentSelectedValue: null
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'],
	            defaultSelectedValue: 1,
	            onSelect: noop,
	            getSelectorContent: getSelectorContent(null),
	            getItemContent: getItemContent,
	            rejectValue: '10+'
	        };
	    },

	    onSelect: function onSelect(value) {
	        var self = this;
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.target) {
	            self.props.onSelect(value.target.value);
	        } else {
	            self.setState({ currentSelectedValue: value }, function () {
	                self.props.onSelect(value);
	            });
	        }
	    },

	    componentWillMount: function componentWillMount() {
	        this._getSelectorContent = getSelectorContent(this.props.rejectValue, this.onSelect);
	    },

	    ensureEvent: function ensureEvent() {
	        var value = this.state.currentSelectedValue;
	        return value !== this.props.rejectValue || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !value.target;
	    },

	    render: function render() {
	        var self = this;
	        var props = self.props;

	        var selectorContent = React.createElement(DropDown.Selector, {
	            onSelect: self.onSelect,
	            defaultSelectedValue: self.state.currentSelectedValue !== null ? self.state.currentSelectedValue : props.defaultSelectedValue,
	            getSelectorContent: self._getSelectorContent });

	        var panelContent = React.Children.map(props.itemList, function (value, index) {
	            return React.createElement(DropDown.Item, {
	                value: value,
	                key: index,
	                getItemContent: props.getItemContent });
	        });

	        return React.createElement(DropDown, {
	            selectorBindEvent: this.ensureEvent(),
	            selectorContent: selectorContent,
	            panelContent: panelContent });
	    }
	});

	module.exports = Importable;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/23.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var HideOnBodyClick = __webpack_require__(12);
	var classNames = __webpack_require__(11);

	var SelectableMixin = __webpack_require__(17);
	var ContainerMixin = __webpack_require__(15);

	var MiniContainer = React.createClass({
	    displayName: 'MiniContainer',

	    mixins: [SelectableMixin, ContainerMixin],

	    reRender: function reRender(itemList) {
	        var mountNode = ReactDOM.findDOMNode(this).parentNode;
	        ReactDOM.render(React.createElement(MiniContainer, {
	            itemList: itemList,
	            onSelect: this.props.onSelect,
	            defaultSelectedValue: this.props.defaultSelectedValue }), mountNode);
	    },

	    render: function render() {
	        var panelClassName = {
	            'comp-custom-select': true,
	            'comp-show-panel': this.state.panelStateIsShow
	        };

	        var progressClassName = this.getProgressClassName(this.state.currentSelectedValue ? this.state.currentSelectedValue.percent : 0, 'progress-bar-text');

	        var itemList = this.props.itemList.map(function (item) {
	            return React.createElement('div', { className: 'col-xs-4', key: item.index }, React.createElement('div', { className: 'comp-mini-item', onClick: this.onSelect.bind(this, item) }, React.createElement('div', { className: 'row' }, React.createElement('strong', { className: 'col-xs-4 util-text-right' }, item.index), React.createElement('div', { className: 'col-xs-8' }, React.createElement('span', { className: this.getProgressClassName(item.percent) })))));
	        }, this);

	        return React.createElement('div', { className: classNames(panelClassName), ref: 'selectable' }, React.createElement('div', { className: 'comp-select-selector-pd' }, React.createElement('div', { className: 'comp-select-selector', onClick: this.showPanel }, React.createElement('div', { className: 'comp-select-progress' }, React.createElement('span', { className: progressClassName })), React.createElement('span', { className: 'icon-img icon-tran-black-d' }))), React.createElement(HideOnBodyClick, {
	            refTarget: this.refs.selectable,
	            onVisible: this.onVisible,
	            onAnimateMount: this.onAnimateMount,
	            triggerHide: this.triggerHide }, React.createElement('div', { className: 'comp-select-panel comp-progress-panel comp-mini-progress' }, React.createElement('div', { className: 'comp-select-m-t' }, React.createElement('div', { className: 'row' }, itemList, React.createElement('div', { className: 'comp-panel-title util-text-center col-xs-12' }, React.createElement('span', { className: 'icon-img icon-plus util-v-m', onClick: this.addOne })))))));
	    }
	});

	module.exports = MiniContainer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/22.
	 */

	var React = __webpack_require__(1);
	var noop = __webpack_require__(2);
	var classNames = __webpack_require__(11);
	var HideOnBodyClick = __webpack_require__(12);

	var Selectable = React.createClass({
	    displayName: 'Selectable',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onSelect: noop,
	            componentDidMount: noop,
	            selectorBindEvent: true,
	            selectorContent: null,
	            panelContent: null
	        };
	    },

	    getInitialState: function getInitialState() {
	        return {
	            panelStateIsShow: false
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.props.componentDidMount(this);
	    },

	    showPanel: function showPanel() {
	        var self = this;
	        self.setState({ panelStateIsShow: true }, function () {
	            var animate = self.__animate;
	            var animateProps = animate.props;
	            animate.animate(animateProps.from, animateProps.to);
	        });
	    },

	    onAnimateMount: function onAnimateMount(animate) {
	        this.__animate = animate;
	    },

	    onSelect: function onSelect(item) {
	        var self = this;
	        self.props.onSelect(item);
	        self.__animate.backToTheStart(function () {
	            self.onVisible();
	        });
	    },

	    onVisible: function onVisible() {
	        this.setState({ panelStateIsShow: false });
	    },

	    triggerHide: function triggerHide() {
	        return this.state.panelStateIsShow;
	    },

	    render: function render() {
	        var props = this.props;
	        var className = classNames({
	            'comp-custom-select': true,
	            'comp-show-panel': this.state.panelStateIsShow
	        });

	        var selector = null;
	        if (props.selectorBindEvent) {
	            selector = React.createElement('div', { onClick: this.showPanel }, props.selectorContent);
	        } else {
	            selector = props.selectorContent;
	        }

	        // todo 加载完成后，应该计算最长的宽度是多少，以免换行
	        // 或者应该用样式自己控制？如果此处写死了 width，也是个麻烦
	        // 再说吧
	        return React.createElement('div', { className: className, ref: 'selectable' }, React.createElement('div', { className: 'comp-select-selector-pd' }, selector), React.createElement(HideOnBodyClick, {
	            refTarget: this.refs.selectable,
	            onVisible: this.onVisible,
	            onAnimateMount: this.onAnimateMount,
	            triggerHide: this.triggerHide }, React.createElement('div', { className: 'comp-select-panel' }, props.panelContent)));
	    }

	});

	module.exports = Selectable;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/22.
	 */

	module.exports = {
	    Importable: __webpack_require__(34),
	    Diff: __webpack_require__(32),
	    Container: __webpack_require__(31),
	    FOContainer: __webpack_require__(33),
	    MiniContainer: __webpack_require__(35)
	};

/***/ }
/******/ ]);