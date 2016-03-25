'use strict';

/**
 * Created by xcp on 2016/3/15.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var PopupWrap = require('./PopupWrap');
var absolutePosition = require('../../com/absolutePosition');
var body = require('../../com/DOM/DOMBody');
var noop = require('../../com/noop');
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
        return ({ click: 'onClick', hover: 'onMouseEnter' })[this.props.trigger] || 'onClick';
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

        if (typeof props.content === 'string') props.content = React.createElement(
            'span',
            null,
            props.content
        );

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

        ReactDOM.render(React.createElement(
            PopupWrap,
            {
                onAnimateMount: this.onAnimateMount,
                style: { position: 'absolute', left: this.__position.x, top: this.__position.y },
                placement: props.placement,
                isVisible: this.state.isVisible,
                onVisible: this.onVisible,
                refTarget: this.refs.targetNode },
            this.__content
        ), this.__popupMountNode);
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