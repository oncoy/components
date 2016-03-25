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
	 * Created by xcp on 2016/3/15.
	 */

	var ReactDOM = __webpack_require__(3);
	var Popup = __webpack_require__(29);
	var Bubble = __webpack_require__(28);
	var Bias = __webpack_require__(27);
	var assign = __webpack_require__(5);

	var __button = function __button(message) {
	    return React.createElement('button', { className: 'btn btn-primary btn-sm' }, message);
	};

	// 根据弹层内容和触发元素位置，定义symbolStyle微调弹层位置
	var horizontal = React.createElement(Bubble, { symbolStyle: { left: '50%', marginLeft: -10 } }, React.createElement('div', { style: { width: 270 } }, 'Popup组件中的元素，在body被点击后，会隐藏'));

	var vertical = React.createElement(Bubble, { symbolStyle: { top: 6 } }, React.createElement('div', { style: { width: 270 } }, 'Popup组件中的元素，在body被点击后，会隐藏'));

	ReactDOM.render(React.createElement(Popup, { placement: 'top', content: horizontal }, __button('靠上的弹层')), document.getElementById('top'));

	ReactDOM.render(React.createElement(Popup, { placement: 'right', content: vertical }, __button('靠右的弹层')), document.getElementById('right'));

	ReactDOM.render(React.createElement(Popup, { placement: 'bottom', content: horizontal }, __button('靠下的弹层')), document.getElementById('bottom'));

	ReactDOM.render(React.createElement(Popup, { placement: 'left', content: vertical }, __button('靠左的弹层')), document.getElementById('left'));

	// Bias
	var biasContent = 'some text for bias';

	ReactDOM.render(React.createElement(Popup, {
	    placement: 'top',
	    content: React.createElement(Bias, { style: { width: 160 } }, biasContent) }, __button('不可自关闭的弹层')), document.getElementById('bias-top-left'));

	ReactDOM.render(React.createElement(Popup, {
	    trigger: 'hover',
	    placement: 'top',
	    content: React.createElement(Bias, { style: { width: 160 } }, biasContent) }, __button('hover显示关闭弹层')), document.getElementById('bias-top-left-hover'));

	ReactDOM.render(React.createElement(Bias, { closeable: true, placement: 'right' }, biasContent), document.getElementById('bias-right'));

	ReactDOM.render(React.createElement(Bias, { closeable: true, placement: 'topRight' }, biasContent), document.getElementById('bias-top-right'));

	ReactDOM.render(React.createElement(Bias, { closeable: true, placement: 'left' }, biasContent), document.getElementById('bias-left'));

	// 操作弹出面板内容
	(function () {

	    var popup = null;

	    var holdPopup = function holdPopup(popupInstance) {
	        popup = popupInstance;
	    };

	    var unmountPopup = function unmountPopup() {
	        if (popup) {
	            popup.autoVisible && popup.autoVisible();
	        }
	    };

	    var Confirm = React.createElement(Bubble, { style: { width: 210 }, symbolStyle: { left: '50%', marginLeft: -10 } }, React.createElement('button', { className: 'btn btn-sm btn-primary', onClick: unmountPopup }, '删除'), React.createElement('span', { className: 'bub-text-gap-lg' }, '确定删除该贴纸吗?'));

	    ReactDOM.render(React.createElement(Popup, {
	        onComponentMount: holdPopup,
	        placement: 'top',
	        content: Confirm }, React.createElement('span', { className: 'color-link' }, '取消采购')), document.getElementById('unmount-with-other'));
	})();

	// 复杂一点的弹出面板内容
	(function () {

	    var popup = null;

	    var holdPopup = function holdPopup(popupInstance) {
	        popup = popupInstance;
	    };

	    // 再复杂的操作，与 <Popup/> 本身无关
	    // 只是弹层中的操作可能会使用到 Popup 的某个方法
	    // 所以要想办法将 Popup 的实例引入到弹层的实例中

	    var ComplexPanel = React.createClass({
	        displayName: 'ComplexPanel',

	        unmountPopup: function unmountPopup() {
	            if (popup) {
	                popup.autoVisible && popup.autoVisible();
	            }
	        },

	        render: function render() {
	            // 需要继承父级传入的 style
	            // 用于指定绝对位置
	            return React.createElement(Bubble, {
	                style: assign(this.props.style, { width: 210 }),
	                symbolStyle: { left: '50%', marginLeft: -10 } }, React.createElement('button', {
	                className: 'btn btn-sm btn-primary',
	                onClick: this.unmountPopup }, '删除'), React.createElement('span', { className: 'bub-text-gap-lg' }, '确定删除该贴纸吗?'));
	        }
	    });

	    ReactDOM.render(React.createElement(Popup, {
	        onComponentMount: holdPopup,
	        placement: 'top',
	        content: React.createElement(ComplexPanel, null) }, React.createElement('span', { className: 'color-link' }, '憋说话，点我！看源码！')), document.getElementById('unmount-with-other-complex'));
	})();

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
/* 11 */,
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by xcp on 2016/3/15.
	 */

	module.exports = function (node) {
	    var result = { x: 0, y: 0 };
	    var body = document.body || document.documentElement;

	    if (!(node && node.nodeType === 1)) return result;

	    var offsetLeft = node.offsetLeft;
	    var offsetTop = node.offsetTop;

	    var parent = node.offsetParent;
	    while (parent !== body) {
	        offsetLeft += parent.offsetLeft;
	        offsetTop += parent.offsetTop;
	        parent = parent.offsetParent;
	    }
	    return {
	        x: offsetLeft,
	        y: offsetTop
	    };
	};

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/15.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);

	var Bias = React.createClass({
	    displayName: 'Bias',

	    propTypes: {
	        symBolClass: React.PropTypes.array
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            placement: 'topLeft',
	            closeable: false,
	            symbolStyle: {},
	            symbolClass: [],
	            style: {}
	        };
	    },

	    getClassName: function getClassName() {
	        var symbolDir = {
	            topLeft: 'd-l',
	            right: 'r',
	            topRight: 'd-r',
	            left: 'l'
	        }[this.props.placement] || 'd-l';

	        var dir = {
	            topLeft: 'd',
	            topRight: 'd',
	            right: 'r',
	            left: 'l'
	        }[this.props.placement] || 'd';

	        return {
	            wrapperClass: 'bub bub-bias-dir-' + dir,
	            symbolClass: 'bub-symbol icon-img icon-bias-' + symbolDir
	        };
	    },

	    unmount: function unmount() {
	        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
	    },

	    render: function render() {

	        var classNames = this.getClassName();
	        var symbolClassName = this.props.symbolClass.length > 0 ? ' ' + this.props.symbolClass.join(' ') : '';
	        var closeElement = null;
	        if (this.props.closeable) {
	            closeElement = React.createElement('span', {
	                className: 'icon-img icon-close-yellow bub-bias-last',
	                onClick: this.unmount });
	        }

	        return React.createElement('div', { className: classNames.wrapperClass, style: this.props.style }, React.createElement('span', { className: classNames.symbolClass + symbolClassName,
	            style: this.props.symbolStyle }), React.createElement('div', { className: 'bub-bias-con' }, React.createElement('div', { className: 'bub-bias-con-text inline-block' }, this.props.children), closeElement));
	    }
	});

	module.exports = Bias;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/15.
	 */

	var React = __webpack_require__(1);
	var Bubble = React.createClass({
	    displayName: 'Bubble',

	    propTypes: {
	        symBolClass: React.PropTypes.array
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            placement: 'top',
	            symbolStyle: {},
	            symbolClass: [],
	            style: {}
	        };
	    },

	    getClassName: function getClassName() {
	        var dir = {
	            top: 'd',
	            right: 'l',
	            bottom: 't',
	            left: 'r'
	        }[this.props.placement] || 'd';

	        return {
	            wrapperClass: 'bub bub-dir-' + dir,
	            symbolClass: 'bub-symbol icon-img icon-arrow-blue-' + dir
	        };
	    },

	    render: function render() {

	        var classNames = this.getClassName();
	        var symbolClassName = this.props.symbolClass.length > 0 ? ' ' + this.props.symbolClass.join(' ') : '';

	        return React.createElement('div', { className: classNames.wrapperClass, style: this.props.style }, React.createElement('span', { className: classNames.symbolClass + symbolClassName,
	            style: this.props.symbolStyle }), React.createElement('div', { className: 'bub-con bub-all-pd' }, this.props.children));
	    }
	});

	module.exports = Bubble;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/15.
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var PopupWrap = __webpack_require__(30);
	var absolutePosition = __webpack_require__(18);
	var body = __webpack_require__(7);
	var noop = __webpack_require__(2);
	var POPUP_GAP = 5;

	var Popup = React.createClass({
	    displayName: 'Popup',

	    getInitialState: function getInitialState() {
	        return {
	            isVisible: true
	        };
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            animate: {
	                from: { opacity: 0 },
	                to: { opacity: 1 },
	                during: 500
	            },
	            trigger: 'click',
	            onComponentMount: noop
	        };
	    },

	    getTrigger: function getTrigger() {
	        return { click: 'onClick', hover: 'onMouseEnter' }[this.props.trigger] || 'onClick';
	    },

	    componentWillMount: function componentWillMount() {
	        this.__popupMountNode = null;
	        this.__position = null;
	        this.__content = null;
	        this.__isUnmount = false;
	    },

	    // Invoked once, only on the client
	    componentDidMount: function componentDidMount() {
	        var popupMountNode = this.__popupMountNode = document.createElement('div');
	        body.appendChild(popupMountNode);

	        var props = this.props;
	        var targetNode = this.refs.targetNode;
	        // 左上角的位置
	        var pos = absolutePosition(targetNode);
	        var placement = props.placement;
	        var w = targetNode.offsetWidth;
	        var h = targetNode.offsetHeight;

	        // 在该组件内，只需将最外层定位到对应位置
	        // 不用理会内容的size
	        switch (placement) {
	            case "top":
	                pos.y = pos.y - POPUP_GAP;
	                break;
	            case "right":
	                pos.x = pos.x + w + POPUP_GAP;
	                break;
	            case "bottom":
	                pos.y = pos.y + h + POPUP_GAP;
	                break;
	            case "left":
	                pos.x = pos.x - POPUP_GAP;
	                break;
	        }

	        this.__position = pos;

	        if (typeof props.content === 'string') props.content = React.createElement('span', null, props.content);

	        this.__content = React.cloneElement(props.content, {
	            placement: props.placement
	        });

	        this.props.onComponentMount(this);
	    },

	    onVisible: function onVisible() {
	        if (this.__isUnmount) return;
	        var self = this;
	        self.setState({ isVisible: true }, function () {
	            ReactDOM.unmountComponentAtNode(self.__popupMountNode);
	        });
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	        if (this.state.isVisible !== prevState.isVisible) this.renderPopup();
	    },

	    autoVisible: function autoVisible() {
	        if (this.__isUnmount) return;
	        var self = this;
	        if (self.__animate) {
	            self.__animate.backToTheStart(function () {
	                self.setState({ isVisible: true }, function () {
	                    ReactDOM.unmountComponentAtNode(self.__popupMountNode);
	                });
	            });
	        }
	    },

	    renderPopup: function renderPopup() {
	        if (!this.isMounted()) return;
	        var props = this.props;

	        ReactDOM.render(React.createElement(PopupWrap, {
	            onAnimateMount: this.onAnimateMount,
	            style: { position: 'absolute', left: this.__position.x, top: this.__position.y },
	            placement: props.placement,
	            isVisible: this.state.isVisible,
	            onVisible: this.onVisible,
	            refTarget: this.refs.targetNode }, this.__content), this.__popupMountNode);
	    },

	    showPopup: function showPopup() {
	        this.setState({ isVisible: false });
	    },

	    onAnimateMount: function onAnimateMount(animate) {
	        this.__animate = animate;
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        this.__isUnmount = true;
	        try {
	            body.removeChild(this.__popupMountNode);
	        } catch (e) {}
	    },

	    render: function render() {
	        var props = { ref: 'targetNode' };
	        props[this.getTrigger()] = this.showPopup;
	        if (props.onMouseEnter) {
	            props.onMouseLeave = this.autoVisible;
	        }

	        return React.cloneElement(this.props.children, props);
	    }
	});

	module.exports = Popup;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by xcp on 2016/3/15.
	 * PopupWrap 的作用：
	 * 1. 确定 popup 的位置
	 * 2. 监听 body click 事件，卸载元素
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(3);
	var assign = __webpack_require__(5);
	var noop = __webpack_require__(2);
	var DOMEvent = __webpack_require__(13);
	var HideOnBodyClick = __webpack_require__(12);

	var PopupWrap = React.createClass({
	    displayName: 'PopupWrap',

	    getInitialState: function getInitialState() {
	        return {
	            left: 0,
	            top: 0
	        };
	    },

	    getDefaultProps: function getDefaultProps() {

	        return {
	            style: { backgroundColor: '#fff' },
	            onVisible: noop,
	            refTarget: null,
	            placement: 'top',
	            isVisible: false,
	            onAnimateMount: noop
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var node = ReactDOM.findDOMNode(this.refs.popup);
	        var position = { x: node.offsetWidth, y: node.offsetHeight };

	        switch (this.props.placement) {
	            case "top":
	                position.x = -(position.x - this.props.refTarget.offsetWidth) / 2;
	                position.y = -position.y;
	                break;
	            case "bottom":
	                position.x = -(position.x - this.props.refTarget.offsetWidth) / 2;
	                position.y = 0;
	                break;
	            case "left":
	                position.x = -position.x;
	                position.y = 0;
	                break;
	            default:
	                position.x = 0;
	                position.y = 0;
	        }

	        this.setState({ left: position.x, top: position.y });
	    },

	    render: function render() {
	        var props = this.props;
	        var style = {
	            top: this.state.top,
	            left: this.state.left,
	            position: 'absolute'
	        };

	        if (props.isVisible) {
	            style = assign(style, { display: 'none' });
	        }

	        var children = React.cloneElement(props.children, {
	            style: assign(style, props.children.props.style),
	            placement: props.placement,
	            ref: 'popup'
	        });

	        return React.createElement(HideOnBodyClick, {
	            refTarget: props.refTarget,
	            style: props.style,
	            onAnimateMount: props.onAnimateMount,
	            onVisible: props.onVisible }, children);
	    }
	});

	module.exports = PopupWrap;

/***/ }
/******/ ]);